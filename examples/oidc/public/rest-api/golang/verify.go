package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/hashicorp/cap/jwt"
)

// Validate a JWT
func verify(token string) (map[string]interface{}, error) {
	ctx := context.Background()

	// Fetch public keyset from the keycloak server to validate the signature.
	jwksURI := fmt.Sprintf("%s/protocol/openid-connect/certs", os.Getenv("REALM_URI"))
	keySet, err := jwt.NewJSONWebKeySet(ctx, jwksURI, "")
	if err != nil {
		log.Print("Failure to load key set")
		return nil, err
	}

	// Create a validator from the keyset
	validator, err := jwt.NewValidator(keySet)

	if err != nil {
		log.Print("Failure to create validator")
		return nil, err
	}

	// Claims to validate. The Validate method below always checks the expiry and signature.
	// Here you may include any additional claims in the token you want to check. In general,
	// you should at minimum verify the issuer and audience.
	expected := jwt.Expected{
		Issuer:    os.Getenv("REALM_URI"),
		Audiences: []string{os.Getenv("AUDIENCE")},
		// Clients use RS256 by default in the standard realm
		SigningAlgorithms: []jwt.Alg{jwt.RS256},
	}

	claims, err := validator.Validate(ctx, token, expected)
	if err != nil {
		log.Print("Invalid Token")
		log.Print(err)
		return nil, err
	}

	return claims, nil
}

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Check for valid token format
		authHeader := r.Header.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Invalid Authorization format", http.StatusUnauthorized)
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")

		// Verify the token's signature, expiry and additional claims.
		_, err := verify(token)
		if err != nil {
			http.Error(w, "Invalid Token", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
