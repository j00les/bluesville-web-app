## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /products/:id`
- `GET /products`
- `POST /products`
- `GET /products/categories`
- `GET /products/histories`
- `GET /products/categories/:id`
- `POST /products/categories`
- `DELETE /products/categories/:id`
- `DELETE /products/:id`
- `PATCH /products/:id`
- `PATCH /products/categories/:id`

- `POST pub/register`
- `POST pub/login`
- `POST pub/google-login`
- `GET pub/products`
- `GET pub/products/:id`
- `GET pub/bookmarks`
- `POST pub/bookmarks`

- `GET pub/products?filter[category]={value},{value}`
- `GET pub/products?sort=-{value}`
- `GET pub/products?/products?page[size]={value}&page[number]={value}`
- `GET pub/products?filter[category]={value},{value}&sort=-{value}&page[size]={value}&page[number]={value}`

  Routes below need authentication:

- `GET /products/:id`
- `GET /products`
- `POST /products`
- `GET /products/categories`
- `GET /products/categories/:id`

- `PATCH /products/categories/:id`
- `GET /products/histories`
- `POST /products/categories`
- `DELETE /products/categories/:id`

Routes below need authentication & authorization:

- `GET pub/bookmarks`
- `DELETE /products/:id`
- `PATCH /products/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Email is required", "Password is required"]
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "userId": "integer",
  "role": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
    "message": [
        "Email is required",
        "Password is required"
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Lined Indigo Herringbone Sakara",
        "description": "This classic sakara is made from cotton fabrics that we dip dyed into our natural indigo vat for around 3-4 days to achieve the deep indigo color that we are known for.",
        "price": 500000,
        "stock": 3,
        "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-897x1346.jpg",
        "categoryId": 1,
        "authorId": 1,
        "User": {
            "id": 1,
            "username": "admin1",
            "email": "admin1@mail.com",
            "role": "Admin",
            "phoneNumber": "096856",
            "address": "Jalan sotong"
        }
    },
    {
        "id": 2,
        "name": "Dobby Bandcollar Long LS Shirt",
        "description": "Inspired by middle-eastern style garb, we made a long sleeve shirt with a longer length, almost covering the knee.",
        "price": 600000,
        "stock": 2,
        "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1.jpg",
        "categoryId": 1,
        "authorId": 1,
        "User": {
            "id": 1,
            "username": "admin1",
            "email": "admin1@mail.com",
            "role": "Admin",
            "phoneNumber": "096856",
            "address": "Jalan sotong"
        }
    }
  ...,
]
```

&nbsp;

## 4. GET /products/:id

Description:

- Get product by Id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Lined Indigo Herringbone Sakara",
  "description": "This classic sakara is made from cotton fabrics that we dip dyed into our natural indigo vat for around 3-4 days to achieve the deep indigo color that we are known for.",
  "price": 500000,
  "stock": 3,
  "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-897x1346.jpg",
  "categoryId": 1,
  "authorId": 1
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 5. POST /products

Request:

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "product": {
    "id": 10,
    "name": "Hachiko Blue IV",
    "description": "Soft Japanese fabric ",
    "price": 100000,
    "stock": 4,
    "imgUrl": "url ke img",
    "categoryId": 1,
    "authorId": 1,
    "updatedAt": "2022-09-23T04:47:53.952Z",
    "createdAt": "2022-09-23T04:47:53.952Z",
    "status": "Active"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is Rp100.000"
}
```

&nbsp;

## 6. DELETE /products/:id

Description:

- Delete product by ID

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product with ID <id> deleted successfully"
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "Product not found"
}
```

## 7. POST /products/categories

Request:

- body:

```json
{
  "name": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Category created successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

&nbsp;

## 8. GET /products/categories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Shirt",
    "createdAt": "2022-09-20T03:53:42.592Z",
    "updatedAt": "2022-09-20T03:53:42.592Z"
  },
  {
    "id": 2,
    "name": "Tees",
    "createdAt": "2022-09-20T03:53:42.592Z",
    "updatedAt": "2022-09-20T03:53:42.592Z"
  },
  {
    "id": 3,
    "name": "Bottom",
    "createdAt": "2022-09-20T03:53:42.592Z",
    "updatedAt": "2022-09-20T03:53:42.592Z"
  }
]
```

&nbsp;

## 9. DELETE /products/categories/:id

Description:

- Delete category by Id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Category deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

&nbsp;

## 10. POST /google-login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "userId": "integer",
  "role": "string",
  "name": "string"
}
```

&nbsp;

## 11. PATCH /products/:id

Request:

- body:

```json
{
  "status": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Status updated successfully"
}
```

&nbsp;

## 12. PUT /products/:id

Request:

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product updated successfully"
}
```

&nbsp;

## 13. GET /products/histories

Description:

- Get all history from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
 {
        "id": 22,
        "name": "NJAJAN White Slub Organic T-shirt",
        "description": "Special Edition release of our organic t-shirt commemorating NJAJAN event held in Breakfast Club Tokyo on August 28th. Graphics are done by renown Indonesian artist, Dwiky KA, printed in our signature organic slub t-shirt.",
        "updatedBy": "admin"
    },
    {
        "id": 21,
        "name": "NJAJAN White Slub Organic T-shirt",
        "description": "Special Edition release of our organic t-shirt commemorating NJAJAN event held in Breakfast Club Tokyo on August 28th. Graphics are done by renown Indonesian artist, Dwiky KA, printed in our signature organic slub t-shirt.",
        "updatedBy": "admin"
    },
    {
        "id": 20,
        "name": "NJAJAN White Slub Organic T-shirt",
        "description": "Special Edition release of our organic t-shirt commemorating NJAJAN event held in Breakfast Club Tokyo on August 28th. Graphics are done by renown Indonesian artist, Dwiky KA, printed in our signature organic slub t-shirt.",
        "updatedBy": "admin"
    },
    {
        "id": 19,
        "name": "Hachiko Blue V",
        "description": "Soft Japanese fabric ",
        "updatedBy": "admin"
    },
```

## 14. GET /pub/products

Description:

- Get all products from database

_Response (200 - OK)_

```json
{
    "totalPages": 3,
    "totalItems": 27,
    "currentPage": 1,
    "products": [
        {
            "id": 1,
            "name": "Lined Indigo Herringbone Sakara",
            "description": "This classic sakara is made from cotton fabrics that we dip dyed into our natural indigo vat for around 3-4 days to achieve the deep indigo color that we are known for.",
            "price": 500000,
            "stock": 3,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-897x1346.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-433x514.jpg",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        },
        {
            "id": 2,
            "name": "Dobby Bandcollar Long LS Shirt",
            "description": "Inspired by middle-eastern style garb, we made a long sleeve shirt with a longer length, almost covering the knee.",
            "price": 600000,
            "stock": 2,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1-433x514.jpg",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        },
        ...
    ]
}
]
```

&nbsp;

## 15. GET pub/products?filter[category]={value},{value}

Description:

- Get all products filtered by category id

_Response (200 - OK)_

```json
    "totalPages": 1,
    "totalItems": 9,
    "products": [
        {
            "id": 1,
            "name": "Lined Indigo Herringbone Sakara",
            "description": "This classic sakara is made from cotton fabrics that we dip dyed into our natural indigo vat for around 3-4 days to achieve the deep indigo color that we are known for.",
            "price": 500000,
            "stock": 3,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-897x1346.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-433x514.jpg",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        },
        {
            "id": 2,
            "name": "Dobby Bandcollar Long LS Shirt",
            "description": "Inspired by middle-eastern style garb, we made a long sleeve shirt with a longer length, almost covering the knee.",
            "price": 600000,
            "stock": 2,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1-433x514.jpg",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        },
        {
            "id": 3,
            "name": "Dobby Patchwork Panel LS Shirt",
            "description": "This is an all-white patchwork shirt that we occasionally made from leftover fabrics in the workshop, ultimately leading to less impact and less waste.",
            "price": 1200000,
            "stock": 2,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Panel-LS-Shirt-1.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1-433x514.jpg",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        },
      ...
    ]
}
```

&nbsp;

## 16. GET pub/products?sort=-{value}

Description:

- Get all products sorted by selected field ascending or descending

_Response (200 - OK)_

```json
{
    "totalPages": 3,
    "totalItems": 27,
    "products": [
        {
            "id": 11,
            "name": "Terra Firma Black T-shirt",
            "description": "Special Edition release of our organic t-shirt commemorating NJAJAN event held in Breakfast Club Tokyo on August 28th. Graphics are done by renown Indonesian artist, Dwiky KA, printed in our signature organic slub t-shirt.",
            "price": 250000,
            "stock": 10,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2021/12/Terra-Firma-Logo-Black-Tees-1.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2021/12/Terra-Firma-Logo-Black-Tees-1-433x514.jpg",
            "categoryId": 2,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        },
        {
            "id": 18,
            "name": "Specimen White T-shirt",
            "description": "This T-shirt design is a collaboration effort between Bluesville and rising artist aldinism  who is known for his unprecedented creativity and imagination in creating a fictional world of Planet Amalgia. ",
            "price": 250000,
            "stock": 9,
            "status": "Active",
            "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2021/12/Terra-Firma-Inspired-White-tees-1.jpg",
            "imgCard": "https://www.thebluesville.com/wp-content/uploads/2021/12/Terra-Firma-Inspired-White-tees-1-433x514.jpg",
            "categoryId": 2,
            "authorId": 1,
            "createdAt": "2022-10-07T09:52:34.376Z",
            "updatedAt": "2022-10-07T09:52:34.376Z"
        }
    ...
    ]
}

```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 17. GET pub/products?/products?page[size]={value}&page[number]={value}

Description:

- Paginate product

_Response (200 - OK)_

```json
{
  "totalPages": 3,
  "totalItems": 27,
  "currentPage": 2,
  "products": [
    {
      "id": 10,
      "name": "Bluesville x Tenjin Black T-shirt",
      "description": "The graphic is made with a high-density oil-based hand screen printing technique to achieve detailed graphic looks on the shirt yet retain its smooth texture.",
      "price": 250000,
      "stock": 4,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/Tenjin-Black-1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/Tenjin-Navy-1-433x514.jpg",
      "categoryId": 2,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 11,
      "name": "Terra Firma Black T-shirt",
      "description": "Special Edition release of our organic t-shirt commemorating NJAJAN event held in Breakfast Club Tokyo on August 28th. Graphics are done by renown Indonesian artist, Dwiky KA, printed in our signature organic slub t-shirt.",
      "price": 250000,
      "stock": 10,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2021/12/Terra-Firma-Logo-Black-Tees-1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2021/12/Terra-Firma-Logo-Black-Tees-1-433x514.jpg",
      "categoryId": 2,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 12,
      "name": "Caffeine Life Black T-shirt",
      "description": "For this t-shirt iteration, we are cooperating with a reputable t-shirt company to make our signature 220 gsm weight t-shirt fabric from 100% cotton yarn to achieve a medium-to-heavy weight fabric.",
      "price": 250000,
      "stock": 9,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2021/12/CaTfein-Life-Black-Tees-1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2021/12/CaTfein-Life-Black-Tees-1-433x514.jpg",
      "categoryId": 2,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    }
    ...
  ]
}
```

&nbsp;

## 17. GET pub/products?filter[category]={value},{value}&sort=-{value}&page[size]={value}&page[number]={value}

Description:

- Filter, Sort, and ,Paginate product

_Response (200 - OK)_

```json
{
  "totalPages": 1,
  "totalItems": 9,
  "products": [
    {
      "id": 6,
      "name": "Olive Camp Collar Shirt",
      "description": "Our rendition of a utility camp shirt, featuring camp collar style and utility pocket on the chest and additional pockets on the bottom.",
      "price": 800000,
      "stock": 2,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/Olive-Camp-Shirt-1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/Olive-Camp-Shirt-1-433x514.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 5,
      "name": "Navy Stripe Cardigan Shirt",
      "description": "We try to mimic the ease of use of a cardigan and rendered it in a more structured way, resulting in a crossover of a shirt and cardigan.",
      "price": 700000,
      "stock": 2,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/Navy-Stripe-Cardigan-Shirt-1-433x514.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/Navy-Stripe-Cardigan-Shirt-2-433x514.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 7,
      "name": "Natural Indigo Bandcollar Shirt",
      "description": "The shirt is then dip dyed into a dark natural indigo vat to create dark shade of indigo blue color.",
      "price": 900000,
      "stock": 2,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2018/12/Natural_Indigo_Bandcollar_Shirt_1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2018/12/Natural_Indigo_Bandcollar_Shirt_1-433x514.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 1,
      "name": "Lined Indigo Herringbone Sakara",
      "description": "This classic sakara is made from cotton fabrics that we dip dyed into our natural indigo vat for around 3-4 days to achieve the deep indigo color that we are known for.",
      "price": 500000,
      "stock": 3,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-897x1346.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Herringbone-Sakara-1-433x514.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 9,
      "name": "Indigo Batik Ombak BD Shirt",
      "description": "Exclusive Made-to-Order garment. Bluesville’s signature Indigo dyed button down shirt with handwritten “Ombak” Batik. Part of SS16 collection.",
      "price": 1200000,
      "stock": 2,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2018/10/Indigo_Batik_Ombak_LS_Shirt_1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2018/10/Indigo_Batik_Ombak_LS_Shirt_1-433x514.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    },
    {
      "id": 4,
      "name": "Indigo Batik Brushed Plan.t.s Dyers Sleeve Shirt",
      "description": "PLAN.t.s. is our new line of collections consisting of all-natural material, colored with plant-based material.",
      "price": 600000,
      "stock": 2,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Brushed-Dyers-Sleeve-Shirt-1.jpg",
      "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/06/Indigo-Brushed-Dyers-Sleeve-Shirt-1-433x514.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-10-07T09:52:34.376Z",
      "updatedAt": "2022-10-07T09:52:34.376Z"
    }
  ...
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 18. GET /pub/products/:id

Description:

- Get product by Id from database

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "name": "Dobby Bandcollar Long LS Shirt",
  "description": "Inspired by middle-eastern style garb, we made a long sleeve shirt with a longer length, almost covering the knee.",
  "price": 600000,
  "stock": 2,
  "status": "Active",
  "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1.jpg",
  "imgCard": "https://www.thebluesville.com/wp-content/uploads/2022/04/White-Dobby-Long-Shirt-1-433x514.jpg",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2022-10-07T09:52:34.376Z",
  "updatedAt": "2022-10-07T09:52:34.376Z",
  "qrcode": "data:image/png;base64,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"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 19. POST /pub/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Email is required", "Password is required"]
}
```

&nbsp;

## 20. POST /pub/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "userId": "string",
  "role": "string",
  "name": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 21. GET /pub/bookmarks

Request:

- user:

```json
{
  "UserId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "UserId": 4,
    "ProductId": 4,
    "createdAt": "2022-09-28T05:05:32.309Z",
    "updatedAt": "2022-09-28T05:05:32.309Z",
    "Product": {
      "id": 4,
      "name": "NJAJAN White Slub Organic T-shirt",
      "description": "Special Edition release of our organic t-shirt commemorating NJAJAN event held in Breakfast Club Tokyo on August 28th. Graphics are done by renown Indonesian artist, Dwiky KA, printed in our signature organic slub t-shirt.",
      "price": 250000,
      "stock": 10,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/09/NJAJAN-1-NEW.jpg",
      "categoryId": 2,
      "authorId": 1,
      "createdAt": "2022-09-28T05:05:32.301Z",
      "updatedAt": "2022-09-28T05:05:32.301Z"
    }
  },
  {
    "UserId": 4,
    "ProductId": 5,
    "createdAt": "2022-09-28T05:05:32.309Z",
    "updatedAt": "2022-09-28T05:05:32.309Z",
    "Product": {
      "id": 5,
      "name": "Navy Easy Fatigue Slim Short",
      "description": "Our rendition of casual everyday shorts, taking a cue from military sports pants designed with comfort and utility in mind. Made from poplin fabric for comfortable everyday wear yet still durable for long wear.",
      "price": 300000,
      "stock": 7,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/09/Navy-fatigue-1-1024x1536.jpg",
      "categoryId": 3,
      "authorId": 1,
      "createdAt": "2022-09-28T05:05:32.301Z",
      "updatedAt": "2022-09-28T05:05:32.301Z"
    }
  },
  {
    "UserId": 4,
    "ProductId": 6,
    "createdAt": "2022-09-28T05:05:32.309Z",
    "updatedAt": "2022-09-28T05:05:32.309Z",
    "Product": {
      "id": 6,
      "name": "Khaki Easy Fatigue Slim Short",
      "description": "Our rendition of casual everyday shorts, taking a cue from military sports pants designed with comfort and utility in mind. Made from poplin fabric for comfortable everyday wear yet still durable for long wear.",
      "price": 300000,
      "stock": 10,
      "status": "Active",
      "imgUrl": "https://www.thebluesville.com/wp-content/uploads/2022/09/Khaki-Fatigue-1.jpg",
      "categoryId": 3,
      "authorId": 1,
      "createdAt": "2022-09-28T05:05:32.301Z",
      "updatedAt": "2022-09-28T05:05:32.301Z"
    }
  }
  ...
]
```

&nbsp;

## 22. POST /pub/favorite

Request:

- user:

```json
{
  "id": "integer"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "Favorite created!"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 23. PATCH /products/categories/:id

Description:

- Update category name

Request:

- body:

```json
{
  "name": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Category updated successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category Not Found"
}
```

&nbsp;

## 24. GET /products/category/:id

Description:

- Get category by Id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Shirt",
  "createdAt": "2022-09-28T05:05:32.294Z",
  "updatedAt": "2022-09-28T05:05:32.294Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category Not Found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
