package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

// Handler function for the "/users" endpoint
func getRestricted(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is restricted content"))
}

func getOpen(w http.ResponseWriter, _ *http.Request) {
	w.Write([]byte("This is an open endpoint"))
}

// Main function to set up routes and start the server
func main() {
	godotenv.Load()
	// Authenticated routes wrapped with Authenticate middleware. See verify.go for token authentication logic.
	http.Handle("/restricted", CORS(Authenticate(http.HandlerFunc(getRestricted))))

	// Open route
	http.Handle("/open", CORS(http.HandlerFunc(getOpen)))

	fmt.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
