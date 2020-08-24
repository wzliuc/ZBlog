package handler

import (
	"ZBlog/ZBlogServices/common"
	"ZBlog/ZBlogServices/database"
	"ZBlog/ZBlogServices/model"
	"encoding/json"
	"fmt"
	"net/http"
)

// HandleExperiences handles the request for multiple experience info
func HandleExperiences(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Experiences %s method called", r.Method))
	repo := database.NewExpRepo()
	switch r.Method {
	case http.MethodGet:
		exps, err := repo.GetAll()
		if err != nil {
			common.LogError(err)
		}
		w.Header().Set("Content-Type", "application/json")
		encoder := json.NewEncoder(w)
		err = encoder.Encode(exps)
		if err != nil {
			common.LogError(err)
		}
		return
	case http.MethodPost:
		var exp model.ExperienceDto
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&exp)
		if err != nil {
			common.LogError(err)
		}
		err = repo.Add(exp)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Experience inserted successfully-------")
		}
	}
}

// HandleExperience handles the request for a single experience info
func HandleExperience(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Experience %s method called", r.Method))
	id := getID(r)
	repo := database.NewExpRepo()
	switch r.Method {
	case http.MethodPut:
		var exp model.ExperienceDto
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&exp)
		if err != nil {
			common.LogError(err)
			return
		}
		err = repo.Update(exp)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Experience updated successfully-------")
		}
	case http.MethodDelete:
		err := repo.Delete(id)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Experience deleted successfully-------")
		}
	}
}
