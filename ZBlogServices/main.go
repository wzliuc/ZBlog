package main

import (
	"ZBlog/ZBlogServices/database"
	"ZBlog/ZBlogServices/handler"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	database.ConnectDB()
	defer database.CloseDB()

	handler.RegisterHandlers()
	http.ListenAndServe(":7070", nil)
}
