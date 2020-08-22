package model

import "time"

// EducationDto is used to tranfer 'Education' object
type EducationDto struct {
	UniName    string    `json:"uniName"`
	Degree     string    `json:"degree"`
	CourseName string    `json:"courseName"`
	Location   string    `json:"location"`
	StartDate  time.Time `json:"startDate"`
	EndDate    time.Time `json:"endDate"`
	Award      string    `json:"award"`
	Subjects   []string  `json:"subjects"`
	ImgURL     string    `json:"imgUrl"`
	Flag       string    `json:"flag"`
	ImgCaption string    `json:"imgCaption"`
}
