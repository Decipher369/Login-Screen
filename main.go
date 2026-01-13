package main

import (
	"html/template"
	"log"
	"net/http"
	"path/filepath"

	"login-screen/handlers"
)

var (
	// Cache templates for better performance
	templates *template.Template
)

func init() {
	// Parse all templates at startup
	var err error
	templates, err = template.ParseGlob(filepath.Join("templates", "*.html"))
	if err != nil {
		log.Fatal("Failed to parse templates:", err)
	}
}

func main() {
	// Create a new HTTP multiplexer for efficient routing
	mux := http.NewServeMux()

	// Serve static files (CSS, JS, images)
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// Register route handlers
	mux.HandleFunc("/", handlers.LoginPageHandler(templates))
	mux.HandleFunc("/login", handlers.LoginFormHandler)

	// Server configuration
	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("🚀 Server starting on http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}
