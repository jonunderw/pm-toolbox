# Sample Pet Store API

A sample API for demonstrating OpenAPI tooling

**Version:** 1.0.0

## Contact

**Name:** API Support
**Email:** support@petstore.com
**URL:** https://petstore.com/support

## Base URLs

- **https://api.petstore.com/v1** - Production server
- **https://staging-api.petstore.com/v1** - Staging server

## Authentication

### bearerAuth

**Type:** http
**Scheme:** bearer
**Bearer Format:** JWT
**Description:** Bearer token authentication using JWT

## pets

### 🟢 GET /pets

**Operation ID:** `getPets`

List all pets

Retrieve a paginated list of pets in the store

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----- |----------|-------------|
| limit | query | integer | ❌ | Number of pets to return |
| offset | query | integer | ❌ | Number of pets to skip |
| userId | query | string (uuid) | ❌ | Filter pets by owner user ID |

#### Responses

##### ✅ 200

Successful response

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| pets | object[] | ❌ |  |
| pagination | object | ❌ |  |

##### ❌ 400

Invalid parameters

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

### 🟡 POST /pets

**Operation ID:** `createPet`

Create a new pet

Add a new pet to the store

#### Request Body

Pet object to create

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | ✅ | Pet's name |
| species | string | ✅ | Species of the pet |
| breed | string | ❌ | Breed of the pet |
| age | integer | ❌ | Age of the pet in years |
| ownerId | string (uuid) | ✅ | User ID of the pet's owner |

#### Responses

##### ✅ 201

Pet created successfully

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string (uuid) | ✅ | Unique identifier for the pet |
| name | string | ✅ | Pet's name |
| species | string | ✅ | Species of the pet |
| breed | string | ❌ | Breed of the pet |
| age | integer | ❌ | Age of the pet in years |
| ownerId | string (uuid) | ❌ | User ID of the pet's owner |
| createdAt | string (date-time) | ❌ | When the pet was added to the system |
| updatedAt | string (date-time) | ❌ | When the pet information was last updated |

##### ❌ 400

Invalid input

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

### 🟢 GET /pets/{petId}

**Operation ID:** `getPetById`

Get pet by ID

Retrieve a specific pet by its unique identifier

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----- |----------|-------------|
| petId | path | string (uuid) | ✅ | Unique identifier of the pet |

#### Responses

##### ✅ 200

Pet found

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string (uuid) | ✅ | Unique identifier for the pet |
| name | string | ✅ | Pet's name |
| species | string | ✅ | Species of the pet |
| breed | string | ❌ | Breed of the pet |
| age | integer | ❌ | Age of the pet in years |
| ownerId | string (uuid) | ❌ | User ID of the pet's owner |
| createdAt | string (date-time) | ❌ | When the pet was added to the system |
| updatedAt | string (date-time) | ❌ | When the pet information was last updated |

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 404

Pet not found

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

### 🟠 PUT /pets/{petId}

**Operation ID:** `updatePet`

Update pet

Update an existing pet's information

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----- |----------|-------------|
| petId | path | string (uuid) | ✅ | Unique identifier of the pet |

#### Request Body

Updated pet information

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | ✅ | Pet's name |
| species | string | ✅ | Species of the pet |
| breed | string | ❌ | Breed of the pet |
| age | integer | ❌ | Age of the pet in years |
| ownerId | string (uuid) | ✅ | User ID of the pet's owner |

#### Responses

##### ✅ 200

Pet updated successfully

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string (uuid) | ✅ | Unique identifier for the pet |
| name | string | ✅ | Pet's name |
| species | string | ✅ | Species of the pet |
| breed | string | ❌ | Breed of the pet |
| age | integer | ❌ | Age of the pet in years |
| ownerId | string (uuid) | ❌ | User ID of the pet's owner |
| createdAt | string (date-time) | ❌ | When the pet was added to the system |
| updatedAt | string (date-time) | ❌ | When the pet information was last updated |

##### ❌ 400

Invalid input

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 404

Pet not found

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

### 🔴 DELETE /pets/{petId}

**Operation ID:** `deletePet`

Delete pet

Remove a pet from the store

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----- |----------|-------------|
| petId | path | string (uuid) | ✅ | Unique identifier of the pet |

#### Responses

##### ✅ 204

Pet deleted successfully

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 404

Pet not found

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

## users

### 🟢 GET /users

**Operation ID:** `getUsers`

List all users

Retrieve a list of all users

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----- |----------|-------------|
| email | query | string (email) | ❌ | Filter users by email |

#### Responses

##### ✅ 200

Successful response

**application/json**

**Type:** object[]

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

### 🟡 POST /users

**Operation ID:** `createUser`

Create a new user

Register a new user in the system

#### Request Body

User object to create

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| email | string (email) | ✅ | User's email address |
| name | string | ✅ | User's full name |
| phone | string | ❌ | User's phone number |
| address | object | ❌ |  |

#### Responses

##### ✅ 201

User created successfully

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string (uuid) | ✅ | Unique identifier for the user |
| email | string (email) | ✅ | User's email address |
| name | string | ✅ | User's full name |
| phone | string | ❌ | User's phone number |
| address | object | ❌ |  |
| createdAt | string (date-time) | ❌ | When the user account was created |
| updatedAt | string (date-time) | ❌ | When the user information was last updated |

##### ❌ 400

Invalid input

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

### 🟢 GET /users/{userId}

**Operation ID:** `getUserById`

Get user by ID

Retrieve a specific user by their unique identifier

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----- |----------|-------------|
| userId | path | string (uuid) | ✅ | Unique identifier of the user |

#### Responses

##### ✅ 200

User found

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string (uuid) | ✅ | Unique identifier for the user |
| email | string (email) | ✅ | User's email address |
| name | string | ✅ | User's full name |
| phone | string | ❌ | User's phone number |
| address | object | ❌ |  |
| createdAt | string (date-time) | ❌ | When the user account was created |
| updatedAt | string (date-time) | ❌ | When the user information was last updated |

##### ❌ 401

Unauthorized

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

##### ❌ 404

User not found

**application/json**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| code | string | ✅ | Error code |
| message | string | ✅ | Human-readable error message |
| details | object | ❌ | Additional error details |

---

