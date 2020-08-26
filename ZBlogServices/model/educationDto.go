package model

import "time"

// EducationDto is used to tranfer 'Education' object
type EducationDto struct {
	ID         int       `json:"id"`
	UniName    string    `json:"uniName"`
	Degree     string    `json:"degree"`
	CourseName string    `json:"courseName"`
	Location   string    `json:"location"`
	Award      string    `json:"award"`
	Flag       string    `json:"flag"`
	StartDate  time.Time `json:"startDate"`
	EndDate    time.Time `json:"endDate"`
	Subjects   []string  `json:"subjects"`
	ImgCaption string    `json:"imgCaption"`
	ImgURL     string    `json:"imgUrl"`
}
