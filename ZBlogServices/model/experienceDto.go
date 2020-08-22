package model

import "time"

// ExperienceDto is used to tranfer 'Experience' object
type ExperienceDto struct {
	ID          int           `json:"id"`
	CompanyName string        `json:"companyName"`
	Role        string        `json:"role"`
	Location    string        `json:"location"`
	StartDate   time.Time     `json:"startDate"`
	EndDate     time.Time     `json:"endDate"`
	Description []Description `json:"description"`
	Flag        string        `json:"flag"`
	ImgURL      string        `json:"imgUrl"`
}

// Description represents the 'Decription' object
type Description struct {
	Intro        string   `json:"intro"`
	BulletPoints []string `json:"bulletPoints"`
}
