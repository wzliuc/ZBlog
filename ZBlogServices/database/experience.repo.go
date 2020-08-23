package database

import (
	"ZBlog/ZBlogServices/model"
)

// ExpRepo represents DTL for the experience object
type ExpRepo struct{}

// NewExpoRepo creates a new instance of expRepo
func NewExpoRepo() *ExpRepo {
	return &ExpRepo{}
}

// GetAll retrives all the experience row from database
func (er *ExpRepo) GetAll() ([]model.ExperienceDto, error) {
	rows, err := dbConnect.Query(
		`SELECT id, company,
		role, location,
		flag, imgurl,
		startdate, enddate
		FROM ZBlogDB.Experience`)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var exps []model.ExperienceDto
	for rows.Next() {
		var exp model.ExperienceDto
		err := rows.Scan(&exp.ID, &exp.CompanyName, &exp.Role, &exp.Location,
			&exp.Flag, &exp.ImgURL, &exp.StartDate, &exp.EndDate)
		if err != nil {
			return nil, err
		}
		exp.Description, err = getDescription(exp.ID)
		if err != nil {
			return nil, err
		}
		exps = append(exps, exp)
	}

	return exps, err
}

// Add inserts a experience data to the database
func (er *ExpRepo) Add(exp model.ExperienceDto) error {
	result, err := dbConnect.Exec(`
		INSERT INTO ZBlogDB.Experience (
		company, role, location, flag, imgurl, startdate, enddate
		) VALUES (?, ?, ?, ?, ?, ?, ?);
		`,
		exp.CompanyName, exp.Role, exp.Location, exp.Flag, exp.ImgURL, exp.StartDate, exp.EndDate)
	if err != nil {
		return err
	}

	expID, err := result.LastInsertId()
	if err != nil {
		return err
	}
	for i := range exp.Description {
		err := addDescription(exp.Description[i], int(expID))
		if err != nil {
			return err
		}
	}
	return err
}

// Update updates the experience data in database
func (er *ExpRepo) Update(exp model.ExperienceDto) error {
	_, err := dbConnect.Exec(`
	UPDATE ZBlogDB.Experience
	SET company = ?, role = ?, location = ?, flag = ?,
	imgurl = ?, startdate = ?, enddate = ?
	WHERE id = ?
	`, exp.CompanyName, exp.Role, exp.Location, exp.Flag,
		exp.ImgURL, exp.StartDate, exp.EndDate, exp.ID)

	err = deleteDecription(exp.ID)
	if err != nil {
		return err
	}
	for i := range exp.Description {
		err := addDescription(exp.Description[i], exp.ID)
		if err != nil {
			return err
		}
	}

	return err
}

// Delete deletes the experience with specified ID from database
func (er *ExpRepo) Delete(ID int) error {
	_, err := dbConnect.Exec(`DELETE FROM ZBlogDB.experience WHERE id = ?`, ID)
	return err
}

func addDescription(d model.Description, expID int) error {
	if d.Intro == "" && len(d.BulletPoints) == 0 {
		return nil
	}
	result, err := dbConnect.Exec(`
		INSERT INTO ZBlogDB.Description (introduction, expid) VALUES (?, ?);
		`,
		d.Intro, expID)
	if err != nil {
		return err
	}

	dID, err := result.LastInsertId()
	if err != nil {
		return err
	}
	for i := range d.BulletPoints {
		_, err := dbConnect.Exec(`
			INSERT INTO ZBlogDB.BulletPoint (BulletPoint, DescripId) VALUES (?, ?);
			`,
			d.BulletPoints[i], dID)
		if err != nil {
			return err
		}
	}
	return err
}

func getDescription(expID int) ([]model.Description, error) {
	rows, err := dbConnect.Query(
		`SELECT id, introduction 
		FROM ZBlogDB.Description
		WHERE expId = ?`, expID)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var descrips []model.Description
	for rows.Next() {
		var descrip model.Description
		var descripID int
		err := rows.Scan(&descripID, &descrip.Intro)
		if err != nil {
			return nil, err
		}
		descrip.BulletPoints, err = getBulletPoints(descripID)
		if err != nil {
			return nil, err
		}
		descrips = append(descrips, descrip)
	}
	return descrips, err
}

func getBulletPoints(descripID int) ([]string, error) {
	rows, err := dbConnect.Query(
		`SELECT BulletPoint 
		FROM ZBlogDB.BulletPoint
		WHERE DescripId = ?`, descripID)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var bps []string
	for rows.Next() {
		var bp string
		err := rows.Scan(&bp)
		if err != nil {
			return nil, err
		}
		bps = append(bps, bp)
	}
	return bps, err
}

func deleteDecription(expID int) error {
	_, err := dbConnect.Exec(`DELETE FROM ZBlogDB.description WHERE expId = ?`, expID)
	return err
}
