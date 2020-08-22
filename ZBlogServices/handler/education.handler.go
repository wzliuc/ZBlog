package handler

import (
	"ZBlog/ZBlogServices/common"
	"ZBlog/ZBlogServices/model"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// HandleEducation handles the request for education info
func HandleEducation(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Education %s method called", r.Method))
	switch r.Method {
	case http.MethodGet:
		var edu model.EducationDto = model.EducationDto{
			UniName:    "ic",
			Location:   "uk",
			Flag:       "recent",
			StartDate:  time.Date(2019, 10, 0, 0, 0, 0, 0, time.UTC),
			EndDate:    time.Time{},
			ImgURL:     "../../assets/img/wtw.jpg",
			Degree:     "MSc",
			Award:      "distinction",
			CourseName: "aerospace",
			ImgCaption: "ic",
			Subjects: []string{
				"cfd", "cla", "turbulence",
			},
		}

		w.Header().Set("Content-Type", "application/json")
		encoder := json.NewEncoder(w)
		encoder.Encode(edu)
		return
	}
}
