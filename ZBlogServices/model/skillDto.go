package model

// SkillDto is used to tranfer 'Skill' object
type SkillDto struct {
	Type      string     `json:"type"`
	SkillSets []SkillSet `json:"skillSets"`
	ImgURL    string     `json:"imgUrl"`
}

// SkillSet represents the 'Skillset' object
type SkillSet struct {
	Name   string   `json:"name"`
	Skills []string `json:"skills"`
}
