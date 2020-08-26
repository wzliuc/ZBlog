package handler

import (
	"ZBlog/ZBlogServices/common"
	"ZBlog/ZBlogServices/database"
	"ZBlog/ZBlogServices/model"
	"encoding/json"
	"fmt"
	"net/http"
)

// HandleSkills handles the request for multiple skill info
func HandleSkills(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Skills %s method called", r.Method))
	repo := database.NewSkillRepo()
	switch r.Method {
	case http.MethodGet:
		skills, err := repo.GetAll()
		if err != nil {
			common.LogError(err)
		}
		w.Header().Set("Content-Type", "application/json")
		encoder := json.NewEncoder(w)
		err = encoder.Encode(skills)
		if err != nil {
			common.LogError(err)
		}
		return
	case http.MethodPost:
		var skill model.SkillDto
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&skill)
		if err != nil {
			common.LogError(err)
		}
		err = repo.Add(skill)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Skill inserted successfully-------")
		}
	}
}

// HandleSkill handles the request for a single skill info
func HandleSkill(w http.ResponseWriter, r *http.Request) {
	common.LogInfo(fmt.Sprintf("Skill %s method called", r.Method))
	id := getID(r)
	repo := database.NewSkillRepo()
	switch r.Method {
	case http.MethodPut:
		var skill model.SkillDto
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&skill)
		if err != nil {
			common.LogError(err)
			return
		}
		err = repo.Update(skill)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Skill updated successfully-------")
		}
	case http.MethodDelete:
		err := repo.Delete(id)
		if err != nil {
			common.LogError(err)
		} else {
			common.LogInfo("-------Skill deleted successfully-------")
		}
	}
}
