package database

import (
	"ZBlog/ZBlogServices/common"
	"database/sql"
)

var dbConnect *sql.DB

// ConnectDB opens a connection to mysql database
func ConnectDB() {
	var err error
	dbConnect, err = sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/ZBlogDB?parseTime=true")
	if err != nil {
		common.LogError(err)
	} else {
		common.LogInfo("Database connection established")
	}
}

// CloseDB closes the database connection
func CloseDB() {
	dbConnect.Close()
}
