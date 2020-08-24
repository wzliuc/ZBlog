package handler

import (
	"ZBlog/ZBlogServices/common"
	"ZBlog/ZBlogServices/database"
	"ZBlog/ZBlogServices/model"
	"encoding/json"
	"fmt"
	"net/http"
)

// HandleEducations handles the request for multiple education info
func HandleEducations(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Education %s method called", r.Method))
	repo := database.NewEduRepo()
	switch r.Method {
	case http.MethodGet:
		edus, err := repo.GetAll()
		if err != nil {
			common.LogError(err)
		}
		w.Header().Set("Content-Type", "application/json")
		encoder := json.NewEncoder(w)
		err = encoder.Encode(edus)
		if err != nil {
			common.LogError(err)
		}
		return
	case http.MethodPost:
		var edu model.EducationDto
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&edu)
		if err != nil {
			common.LogError(err)
		}
		err = repo.Add(edu)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Education inserted successfully-------")
		}
	}
}

// HandleEducation handles the request for a single education info
func HandleEducation(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Education %s method called", r.Method))
	id := getID(r)
	repo := database.NewEduRepo()
	switch r.Method {
	case http.MethodPut:
		var edu model.EducationDto
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&edu)
		if err != nil {
			common.LogError(err)
			return
		}
		err = repo.Update(edu)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Education updated successfully-------")
		}
	case http.MethodDelete:
		err := repo.Delete(id)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Education deleted successfully-------")
		}
	}
}
