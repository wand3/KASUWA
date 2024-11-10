password reset
coupon system
search/filters
email notification


### Endpoint: Retrive Product
**URL**: `/api/products/<product_id>`
**Method**: `GET`
**Headers**:
**Parameters**:
- `product_id` (URL path parameter): ID of the Product.

**Success Response**:
- **Code**: 200 ok
- **Content**:
```json
{

}
```

## CATEGORY
### Endpoint: Categories
**URL**: `/api/categories`
**Method**: `GET`
**Headers**:
**Parameters**:

**Success Response**:
- **Code**: 200 ok
- **Content**:
```json
{
    "categories": [
        {
            "category_name": "all",
            "id": 1
        }
    ]
}
```

### Endpoint: Categories
**URL**: `/category/<int:category_id>`
**Method**: `GET`
**Headers**:
**Parameters**:
- `category_id` (URL path parameter): ID of the Category.

**Success Response**:
- **Code**: 200 ok
- **Content**:
```json
{
    "categories": [
        {
            "category_name": "all",
            "id": 1
        }
    ]
}
```


# ADMIN ROUTES

### Endpoint: Category
**URL**: `/api/admin/category`
**Method**: `POST`
**Headers**: `Authorization: Bearer <token>`
**Role Requirement**: Admin (Role ID: 1)
**Content-Type**: `application/json`

### Request Body Parameters

| Parameter       | Type   | Required | Description                     |
|-----------------|--------|----------|---------------------------------|
| `category_name` | string | Yes      | The name of the new category.   |

**Example Request Body**:
```json
{
  "category_name": "Electronics"
}
```

**Success Response**:
- **Code**: 201 Created
- **Content**:
```json
{
    "category_id": 1,
    "message": "Category created"
}
```
**Error Response**:
- **Code**: 400 BAD REQUEST
- **Content**:
```json
{
    "error": "Bad Request",
    "message": "Category Name is Required"
}
```

### Endpoint: Category
**URL**: `/admin/category/<int:category_id>`
**Method**: `PUT`
**Headers**: `Authorization: Bearer <token>`
**Role Requirement**: Admin (Role ID: 1)
**Content-Type**: `application/json`

### Request Body Parameters

| Parameter       | Type   | Required | Description                     |
|-----------------|--------|----------|---------------------------------|
| `category_name` | string | Yes      | The name of the category to be updated.   |

**Example Request Body**:
```json
{
  "category_name": "default"
}
```

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
    "category": {
        "category_name": "default",
        "id": 1
    },
    "message": "Category updated successfully"
}
```
**Error Response**:
- **Code**: 400 BAD REQUEST
- **Content**:
```json
{
    "error": "Bad Request",
    "message": "Category Name is Required"
}
```

### Endpoint: Category
**URL**: `/api/admin/category/<int:category_id>`
**Method**: `DELETE`
**Headers**: `Authorization: Bearer <token>`
**Role Requirement**: Admin (Role ID: 1)

**Success Response**:
- **Code**: 200 Ok
- **Content**:
```json
{
    "message": "category deleted successfully"
}
```
