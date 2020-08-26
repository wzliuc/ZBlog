package common

import (
	"log"
	"os"
)

var (
	infologger = log.New(os.Stderr, "[INFO]   ", log.Ldate|log.Ltime)
	warnlogger = log.New(os.Stderr, "[WARN]   ", log.Ldate|log.Ltime)
	errloggger = log.New(os.Stderr, "[ERROR]  ", log.Ldate|log.Ltime)
)

// LogInfo logs info to the console
func LogInfo(msg string) {
	infologger.Println(msg)
}

// LogWarn logs warning to the console
func LogWarn(msg string) {
	warnlogger.Println(msg)
}

// LogError logs error to the console
func LogError(msg interface{}) {
	errloggger.Println(msg)
}
