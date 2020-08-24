package database

import (
	"ZBlog/ZBlogServices/model"
	"strings"
)

// EduRepo represents DTL for the education object
type EduRepo struct{}

// NewEduRepo creates a new instance of eduRepo
func NewEduRepo() *EduRepo {
	return &EduRepo{}
}

// GetAll retrives all the education row from database
func (er *EduRepo) GetAll() ([]model.EducationDto, error) {
	rows, err := dbConnect.Query(
		`SELECT id, uniName,
		degree, courseName, 
		location, award,
		flag, startdate,
		enddate, subjects,
		imgCaption, imgurl
		FROM ZBlogDB.Education`)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var edus []model.EducationDto
	for rows.Next() {
		var edu model.EducationDto
		var subjectStr string
		err := rows.Scan(&edu.ID, &edu.UniName, &edu.Degree, &edu.CourseName, &edu.Location, &edu.Award,
			&edu.Flag, &edu.StartDate, &edu.EndDate, &subjectStr, &edu.ImgCaption, &edu.ImgURL)
		edu.Subjects = strings.Split(subjectStr, ";")
		if err != nil {
			return nil, err
		}
		edus = append(edus, edu)
	}

	return edus, err
}

// Add inserts an education object to the database
func (er *EduRepo) Add(edu model.EducationDto) error {
	subjectStr := strings.Join(edu.Subjects, ";")
	_, err := dbConnect.Exec(`
		INSERT INTO ZBlogDB.Education (
		uniName, degree, courseName, location, award, flag,
		startdate, enddate, subjects, imgCaption, imgurl
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
		`,
		edu.UniName, edu.Degree, edu.CourseName, edu.Location, edu.Award, edu.Flag,
		edu.StartDate, edu.EndDate, subjectStr, edu.ImgCaption, edu.ImgURL)
	if err != nil {
		return err
	}
	return err
}

// Update updates the education data in database
func (er *EduRepo) Update(edu model.EducationDto) error {
	subjectStr := strings.Join(edu.Subjects, ";")
	_, err := dbConnect.Exec(`
	UPDATE ZBlogDB.Education
	SET uniName = ?, degree = ?, courseName = ?, location = ?, award = ?, flag = ?,
	startdate = ?, enddate = ?, subjects = ?, imgCaption = ?, imgurl = ?
	WHERE id = ?
	`,
		edu.UniName, edu.Degree, edu.CourseName, edu.Location, edu.Award, edu.Flag,
		edu.StartDate, edu.EndDate, subjectStr, edu.ImgCaption, edu.ImgURL, edu.ID)
	return err
}

// Delete deletes the education with specified ID from database
func (er *EduRepo) Delete(ID int) error {
	_, err := dbConnect.Exec(`DELETE FROM ZBlogDB.Education WHERE id = ?`, ID)
	return err
}
