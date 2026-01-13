package handlers

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"strings"
)

// LoginPageHandler renders the login page template
func LoginPageHandler(templates *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Only GET requests allowed for this page
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Render the login template
		err := templates.ExecuteTemplate(w, "login.html", nil)
		if err != nil {
			log.Printf("Template execution error: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
	}
}

// LoginFormHandler processes login form submissions
func LoginFormHandler(w http.ResponseWriter, r *http.Request) {
	// Only POST requests allowed
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse form data
	if err := r.ParseForm(); err != nil {
		respondWithError(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	// Extract and validate credentials
	email := strings.TrimSpace(r.FormValue("email"))
	password := r.FormValue("password")
	rememberMe := r.FormValue("remember") == "on"

	// Basic validation
	if !isValidEmail(email) {
		respondWithError(w, "Invalid email address", http.StatusBadRequest)
		return
	}

	if len(password) < 6 {
		respondWithError(w, "Password must be at least 6 characters", http.StatusBadRequest)
		return
	}

	// TODO: Implement actual authentication logic here
	// For now, this is a stub that simulates authentication
	log.Printf("Login attempt - Email: %s, Remember: %v", email, rememberMe)

	// Simulate successful login
	respondWithJSON(w, map[string]interface{}{
		"success": true,
		"message": "Login successful!",
		"user": map[string]string{
			"email": email,
		},
	})
}

// isValidEmail performs basic email validation
func isValidEmail(email string) bool {
	// Simple validation: check for @ and domain
	if len(email) < 3 {
		return false
	}
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return false
	}
	return len(parts[0]) > 0 && len(parts[1]) > 2 && strings.Contains(parts[1], ".")
}

// respondWithJSON sends a JSON response
func respondWithJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}

// respondWithError sends an error JSON response
func respondWithError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{
		"error": message,
	})
}
