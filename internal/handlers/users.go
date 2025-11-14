package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
	// "github.com/ratludu/momentum/internal/storage"
)

func CreateUsers(c echo.Context) error {

	type parameters struct {
		Name              string `json:"name"`
		Email             string `json:"email"`
		Password_Unhashed string `json:"password"`
	}

	decoder := json.NewDecoder(c.Request().Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		echo.NewHTTPError(http.StatusBadRequest, "Could not decode body")
		return nil
	}

	return c.JSON(http.StatusCreated, params)
}
