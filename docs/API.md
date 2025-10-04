# API Documentation

## Overview

This document describes the REST API endpoints for the Pigeon Auction Platform.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

## Authentication

Most endpoints require authentication. Include the session token in cookies or use the `Authorization` header.

## Rate Limiting

- Auth endpoints: 5 requests per 15 minutes
- API endpoints: 100 requests per 15 minutes
- Upload endpoints: 10 requests per hour
- SMS verification: 3 requests per 15 minutes per user

## Endpoints

### User Authentication

#### POST /api/auth/register

Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "message": "Konto zostało utworzone. Sprawdź email i kliknij w link aktywacyjny.",
  "userId": "user_id"
}
```

#### POST /api/auth/activate

Activate user account.

**Request Body:**

```json
{
  "token": "activation_token"
}
```

**Response:**

```json
{
  "message": "Konto zostało aktywowane pomyślnie"
}
```

### Auctions

#### GET /api/auctions

Get all auctions with optional filtering.

**Query Parameters:**

- `category` (optional): Filter by category
- `status` (optional): Filter by status (ACTIVE, ENDED, CANCELLED, PENDING)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `sortBy` (optional): Sort by (newest, oldest, price-low, price-high, ending-soon)
- `search` (optional): Search term

**Response:**

```json
[
  {
    "id": "auction_id",
    "title": "Champion Thunder Storm",
    "description": "Elitarny champion...",
    "category": "Champions",
    "startingPrice": 5000,
    "currentPrice": 7500,
    "buyNowPrice": 10000,
    "reservePrice": 6000,
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-01-15T23:59:59Z",
    "status": "ACTIVE",
    "isApproved": true,
    "images": ["/path/to/image1.jpg"],
    "seller": {
      "id": "seller_id",
      "firstName": "John",
      "lastName": "Doe"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### GET /api/auctions/[id]

Get specific auction by ID.

**Response:**

```json
{
  "id": "auction_id",
  "title": "Champion Thunder Storm",
  "description": "Elitarny champion...",
  "category": "Champions",
  "pigeon": {
    "id": "pigeon_id",
    "name": "Thunder Storm",
    "ringNumber": "PL-2023-001",
    "bloodline": "Janssen x Van Loon"
  },
  "seller": {
    "id": "seller_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "startingPrice": 5000,
  "currentPrice": 7500,
  "buyNowPrice": 10000,
  "reservePrice": 6000,
  "startTime": "2024-01-01T00:00:00Z",
  "endTime": "2024-01-15T23:59:59Z",
  "status": "ACTIVE",
  "isApproved": true,
  "images": ["/path/to/image1.jpg"],
  "videos": ["/path/to/video1.mp4"],
  "documents": ["/path/to/pedigree.pdf"],
  "bids": [
    {
      "id": "bid_id",
      "amount": 7500,
      "bidder": {
        "id": "bidder_id",
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "createdAt": "2024-01-10T12:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### POST /api/auctions

Create new auction (requires authentication).

**Request Body:**

```json
{
  "title": "Champion Thunder Storm",
  "description": "Elitarny champion...",
  "category": "Champions",
  "pigeonId": "pigeon_id",
  "startingPrice": 5000,
  "buyNowPrice": 10000,
  "reservePrice": 6000,
  "startTime": "2024-01-01T00:00:00Z",
  "endTime": "2024-01-15T23:59:59Z",
  "images": ["/path/to/image1.jpg"],
  "videos": ["/path/to/video1.mp4"],
  "documents": ["/path/to/pedigree.pdf"]
}
```

**Response:**

```json
{
  "message": "Aukcja została utworzona i oczekuje na zatwierdzenie",
  "auctionId": "auction_id"
}
```

### Bids

#### POST /api/auctions/[id]/bids

Place a bid on an auction (requires authentication).

**Request Body:**

```json
{
  "amount": 8000
}
```

**Response:**

```json
{
  "message": "Licytacja została złożona pomyślnie",
  "bidId": "bid_id"
}
```

### Champions

#### GET /api/champions

Get all champions.

**Response:**

```json
[
  {
    "id": "champion_id",
    "name": "Thunder Storm",
    "ringNumber": "PL-2023-001",
    "bloodline": "Janssen x Van Loon",
    "pedigree": "Elitarny rodowód mistrzów",
    "images": ["/champions/thunder-storm/gallery/1.jpg"],
    "achievements": [
      "1. miejsce - Mistrzostwa Polski 2023",
      "2. miejsce - Puchar Europy 2023"
    ]
  }
]
```

#### GET /api/champions/[id]

Get specific champion by ID.

**Response:**

```json
{
  "id": "champion_id",
  "name": "Thunder Storm",
  "ringNumber": "PL-2023-001",
  "bloodline": "Janssen x Van Loon",
  "gender": "MALE",
  "birthDate": "2023-01-15T00:00:00Z",
  "color": "Blue",
  "weight": 450.5,
  "breeder": "Pałka MTM",
  "description": "Elitarny champion z doskonałymi wynikami",
  "images": ["/champions/thunder-storm/gallery/1.jpg"],
  "videos": ["/champions/thunder-storm/videos/1.mp4"],
  "pedigree": {
    "father": "Storm King",
    "mother": "Lightning Queen",
    "grandfather": "Thunder Bolt",
    "grandmother": "Storm Princess"
  },
  "achievements": [
    "1. miejsce - Mistrzostwa Polski 2023",
    "2. miejsce - Puchar Europy 2023"
  ],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### References

#### GET /api/references

Get all approved references.

**Response:**

```json
[
  {
    "id": "reference_id",
    "breeder": {
      "name": "Jan Kowalski",
      "location": "Warszawa, Polska",
      "experience": "Hodowca z 20-letnim doświadczeniem",
      "avatar": "/api/placeholder/100/100"
    },
    "testimonial": "Doskonała współpraca, gołębie w świetnej kondycji. Polecam!",
    "achievements": [
      {
        "pigeon": "Storm King",
        "ringNumber": "PL-2022-001",
        "results": [
          {
            "competition": "Mistrzostwa Polski 2022",
            "place": 1,
            "date": "2022-08-15"
          }
        ]
      }
    ],
    "rating": 5,
    "date": "2024-01-01"
  }
]
```

#### POST /api/references

Create new reference (requires authentication).

**Request Body:**

```json
{
  "breederName": "Jan Kowalski",
  "location": "Warszawa, Polska",
  "experience": "Hodowca z 20-letnim doświadczeniem",
  "testimonial": "Doskonała współpraca!",
  "rating": 5,
  "achievements": [
    {
      "pigeon": "Storm King",
      "ringNumber": "PL-2022-001",
      "results": [
        {
          "competition": "Mistrzostwa Polski 2022",
          "place": 1,
          "date": "2022-08-15"
        }
      ]
    }
  ]
}
```

**Response:**

```json
{
  "message": "Referencja została dodana i oczekuje na zatwierdzenie",
  "id": "reference_id"
}
```

### Breeder Meetings

#### GET /api/breeder-meetings

Get all approved breeder meetings.

**Response:**

```json
[
  {
    "id": "meeting_id",
    "title": "Spotkanie z Janem Kowalskim",
    "description": "Wymiana doświadczeń...",
    "location": "Warszawa",
    "meetingDate": "2024-01-15T18:00:00Z",
    "breederName": "Jan Kowalski",
    "images": ["/breeder-meetings/jan-kowalski/1.jpg"],
    "uploaderName": "Admin System",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/breeder-meetings/upload

Upload breeder meeting photos (requires authentication).

**Request Body:** (multipart/form-data)

- `title`: Meeting title
- `description`: Meeting description (optional)
- `location`: Meeting location (optional)
- `meetingDate`: Meeting date (optional)
- `breederName`: Breeder name
- `images`: Array of image files

**Response:**

```json
{
  "success": true,
  "meeting": {
    "id": "meeting_id",
    "title": "Spotkanie z Janem Kowalskim",
    "breederName": "Jan Kowalski",
    "isApproved": false
  },
  "message": "Zdjęcia zostały przesłane i oczekują na zatwierdzenie"
}
```

### Payments

#### POST /api/payments/create-intent

Create Stripe payment intent (requires authentication).

**Request Body:**

```json
{
  "amount": 10000,
  "auctionId": "auction_id",
  "metadata": {
    "description": "Payment for auction"
  }
}
```

**Response:**

```json
{
  "clientSecret": "pi_xxx_secret_xxx"
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common Error Codes

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource not found)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Pagination

Some endpoints support pagination using query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

**Response with pagination:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Webhooks

The API supports webhooks for real-time updates:

- `auction.ended` - When an auction ends
- `bid.placed` - When a new bid is placed
- `payment.completed` - When a payment is completed
- `user.registered` - When a new user registers

Webhook payloads include the event type and relevant data.

## Phone Verification

### POST /api/phone/send-verification

Send SMS verification code to user's phone number.

**Authentication:** Required

**Request Body:** None (uses phone number from user profile)

**Response:**

```json
{
  "success": true,
  "message": "Kod weryfikacyjny został wysłany."
}
```

**Error Responses:**

```json
{
  "error": "Brak numeru telefonu w profilu."
}
```

### POST /api/phone/check-verification

Verify SMS code entered by user.

**Authentication:** Required

**Request Body:**

```json
{
  "code": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Numer telefonu został pomyślnie zweryfikowany."
}
```

**Error Responses:**

```json
{
  "error": "Nieprawidłowy kod weryfikacyjny."
}
```

**Notes:**

- Verification code is valid for 10 minutes
- Code is 6 digits long
- SMS is sent via SMSAPI service
- User must have phone number in profile to receive verification
