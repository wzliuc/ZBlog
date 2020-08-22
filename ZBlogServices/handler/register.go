package handler

import (
	"ZBlog/ZBlogServices/common"
	"ZBlog/ZBlogServices/handler/middleware"
	"net/http"
	"strconv"
	"strings"
)

// RegisterHandlers registers the handlers
func RegisterHandlers() {
	ExperiencesHandler := http.HandlerFunc(HandleExperiences)
	ExperienceHandler := http.HandlerFunc(HandleExperience)
	EducationHandler := http.HandlerFunc(HandleEducation)
	http.Handle("/experience", middleware.SetCors(ExperiencesHandler))
	http.Handle("/experience/", middleware.SetCors(ExperienceHandler))
	http.Handle("/education", middleware.SetCors(EducationHandler))

	common.LogInfo("Handler registration completed")
}

func getID(r *http.Request) int {
	segments := strings.Split(r.URL.Path, "/")
	idStr := segments[len(segments)-1]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		common.LogError(err)
	}
	return id
}
