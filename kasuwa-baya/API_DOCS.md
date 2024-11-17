password reset
coupon system
filter
email notification
product spec


# API Documentation

This document provides a detailed description of the API routes, their purposes, and necessary data to access each endpoint.

## Endpoints

---

### GET /user

**Description:** Retrieves the details of the current user.

**Authentication Required:** Yes

**Response:**
- Success: Returns user data including email.
- Unauthorized: Returns an error if user is not logged in.

---

### GET /address

**Description:** Retrieves all addresses of the current user.

**Authentication Required:** Yes

**Response:**
- Success: Returns a list of addresses.
- Not Found: Returns an error if no addresses are found.

---

### DELETE /address/<int:address_id>

**Description:** Deletes a specific address of the current user.

**Authentication Required:** Yes

**Parameters:**
- `address_id`: The ID of the address to be deleted.

**Response:**
- Success: Returns a success message.
- Not Found: Returns an error if the address does not exist.

---

### POST /address

**Description:** Adds a new address for the current user.

**Authentication Required:** Yes

**Request Body:**
- JSON data containing address information.

**Response:**
- Success: Returns a success message and address ID.
- Bad Request: Returns an error if the user has more than 5 addresses.

---

### PATCH /address/<int:address_id>/set-default

**Description:** Sets a specific address as the default for the current user.

**Authentication Required:** Yes

**Parameters:**
- `address_id`: The ID of the address to be set as default.

**Response:**
- Success: Returns a success message.
- Not Found: Returns an error if the address does not exist.

---

### GET /users

**Description:** Retrieves all users in the system.

**Authentication Required:** Yes

**Response:**
- Success: Returns a list of users.
- Not Found: Returns an error if no users are found.

---

### POST /user

**Description:** Creates a new user.

**Request Body:**
- JSON data containing `email` and `password`.

**Response:**
- Success: Returns a success message and user ID.
- Bad Request: Returns an error if email is missing or already exists.

---

### PUT /edit_user/<int:id>

**Description:** Updates the current user’s details.

**Authentication Required:** Yes

**Parameters:**
- `id`: The ID of the user to update.

**Response:**
- Success: Returns updated user data.
- Forbidden: Returns an error if attempting to update another user’s data.

---

### GET /products

**Description:** Retrieves all products.

**Response:**
- Success: Returns a list of products.

---

### GET /product/<int:product_id>

**Description:** Retrieves details of a specific product.

**Parameters:**
- `product_id`: The ID of the product.

**Response:**
- Success: Returns product details.
- Not Found: Returns an error if the product does not exist.

---

### DELETE /products

**Description:** Deletes all products.

**Response:**
- Success: Returns a success message.

---

### POST /cart

**Description:** Adds a product to the user's cart.

**Authentication Required:** Yes

**Request Body:**
- JSON data with `product_id` and optional `quantity`.

**Response:**
- Success: Returns a success message and cart data.
- Bad Request: Returns an error if `product_id` is missing.

---

### GET /cart

**Description:** Retrieves the current user's cart.

**Authentication Required:** Yes

**Response:**
- Success: Returns cart items and total price.

---

### PUT /cart/<int:product_id>

**Description:** Updates the quantity of a specific product in the cart.

**Authentication Required:** Yes

**Parameters:**
- `product_id`: The ID of the product.

**Request Body:**
- JSON data with `quantity`.

**Response:**
- Success: Returns a success message and updated cart data.
- Bad Request: Returns an error if quantity is invalid.

---

### DELETE /cart/<int:product_id>

**Description:** Deletes a specific product from the cart.

**Authentication Required:** Yes

**Parameters:**
- `product_id`: The ID of the product.

**Response:**
- Success: Returns a success message.
- Not Found: Returns an error if product is not in the cart.

---

### PUT /cart/shipping/<int:product_id>/<int:shipping_id>

**Description:** Updates the shipping method for a specific product in the cart.

**Authentication Required:** Yes

**Parameters:**
- `product_id`: The ID of the product.
- `shipping_id`: The ID of the shipping method.

**Response:**
- Success: Returns a success message.

---

### GET /shipping

**Description:** Retrieves all available shipping methods.

**Response:**
- Success: Returns a list of shipping methods.

---

### POST /product (Admin)

**Description:** Creates a new product.

**Authentication Required:** Admin

**Request Body:**
- Form data with product details and images.

**Response:**
- Success: Returns a success message and product ID.
- Bad Request: Returns an error if creation fails.

---

### PUT /products/<int:product_id>/default-image/<int:image_id> (Admin)

**Description:** Updates the default image of a product.

**Authentication Required:** Admin

**Parameters:**
- `product_id`: The ID of the product.
- `image_id`: The ID of the image.

**Response:**
- Success: Returns a success message.
- Not Found: Returns an error if product or image is missing.

---

### PUT /product/<int:product_id> (Admin)

**Description:** Edits an existing product.

**Authentication Required:** Admin

**Parameters:**
- `product_id`: The ID of the product.

**Request Body:**
- JSON data with updated product details.

**Response:**
- Success: Returns updated product data.
- Bad Request: Returns an error if required fields are missing.

---

### DELETE /product/<int:product_id> (Admin)

**Description:** Deletes a specific product.

**Authentication Required:** Admin

**Parameters:**
- `product_id`: The ID of the product.

**Response:**
- Success: Returns a success message.
- Not Found: Returns an error if the product does not exist.

---
