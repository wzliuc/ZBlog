package database

import (
	"ZBlog/ZBlogServices/model"
	"strings"
)

// SkillRepo represents DTL for the skill object
type SkillRepo struct{}

// NewSkillRepo creates a new instance of skillRepo
func NewSkillRepo() *SkillRepo {
	return &SkillRepo{}
}

// GetAll retrives all the skill row from database
func (sr *SkillRepo) GetAll() ([]model.SkillDto, error) {
	rows, err := dbConnect.Query(
		`SELECT id, type, ImgUrl
		FROM ZBlogDB.Skill`)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var skills []model.SkillDto
	for rows.Next() {
		var skill model.SkillDto
		err := rows.Scan(&skill.ID, &skill.Type, &skill.ImgURL)
		if err != nil {
			return nil, err
		}
		skill.SkillSets, err = getSkillSet(skill.ID)
		if err != nil {
			return nil, err
		}
		skills = append(skills, skill)
	}

	return skills, err
}

// Add inserts a skill object to the database
func (sr *SkillRepo) Add(skill model.SkillDto) error {
	result, err := dbConnect.Exec(`
		INSERT INTO ZBlogDB.Skill (
		type, imgUrl
		) VALUES (?, ?);
		`,
		skill.Type, skill.ImgURL)
	if err != nil {
		return err
	}

	skillID, err := result.LastInsertId()
	if err != nil {
		return err
	}
	for i := range skill.SkillSets {
		err := addSkillSet(skill.SkillSets[i], int(skillID))
		if err != nil {
			return err
		}
	}
	return err
}

// Update updates the skill object in database
func (sr *SkillRepo) Update(skill model.SkillDto) error {
	_, err := dbConnect.Exec(`
	UPDATE ZBlogDB.Skill
	SET type = ?, imgUrl = ?
	WHERE id = ?
	`, skill.Type, skill.ImgURL, skill.ID)

	err = deleteSkillSet(skill.ID)
	if err != nil {
		return err
	}
	for i := range skill.SkillSets {
		err := addSkillSet(skill.SkillSets[i], skill.ID)
		if err != nil {
			return err
		}
	}

	return err
}

// Delete deletes the skill object with specified ID from database
func (sr *SkillRepo) Delete(ID int) error {
	_, err := dbConnect.Exec(`DELETE FROM ZBlogDB.Skill WHERE id = ?`, ID)
	return err
}

func addSkillSet(set model.SkillSet, skillID int) error {
	if len(set.Skills) == 0 {
		return nil
	}
	_, err := dbConnect.Exec(`
		INSERT INTO ZBlogDB.SkillSet (name, skills, skillId) VALUES (?, ?, ?);
		`,
		set.Name, strings.Join(set.Skills, ";"), skillID)
	if err != nil {
		return err
	}
	return err
}

func getSkillSet(skillID int) ([]model.SkillSet, error) {
	rows, err := dbConnect.Query(
		`SELECT name, skills 
		FROM ZBlogDB.SkillSet
		WHERE skillId = ?`, skillID)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var skillSets []model.SkillSet
	for rows.Next() {
		var set model.SkillSet
		var skillStr string
		err := rows.Scan(&set.Name, &skillStr)
		if err != nil {
			return nil, err
		}
		set.Skills = strings.Split(skillStr, ";")
		skillSets = append(skillSets, set)
	}
	return skillSets, err
}

func deleteSkillSet(skillID int) error {
	_, err := dbConnect.Exec(`DELETE FROM ZBlogDB.SkillSet WHERE SkillId = ?`, skillID)
	return err
}
