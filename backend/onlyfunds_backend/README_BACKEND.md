# OnlyFunds Backend API

Spring Boot REST API for OnlyFunds crowdfunding platform.

## 📋 Prerequisites

- Java 17 or higher
- PostgreSQL 15+
- Maven 3.8+

## 🚀 Setup Instructions

### 1. Install PostgreSQL

Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)

### 2. Create Database

```sql
CREATE DATABASE onlyfunds_db;
```

### 3. Configure Database Connection

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/onlyfunds_db
spring.datasource.username=YOUR_POSTGRES_USERNAME
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

### 4. Build the Project

```bash
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`

## 📚 API Endpoints

### User Endpoints

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/{userId}` - Get user by ID

### Campaign Endpoints

- `POST /api/campaigns?userId={userId}` - Create campaign
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/{campaignId}` - Get campaign by ID
- `GET /api/campaigns/user/{userId}` - Get campaigns by user
- `GET /api/campaigns/category/{categoryId}` - Get campaigns by category

### Donation Endpoints

- `POST /api/donations` - Process donation

### Category Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/categories/{categoryId}` - Get category by ID
- `POST /api/categories` - Create category

## 🗄️ Database Schema

The application uses the following entities:

- **User** - User accounts
- **Campaign** - Fundraising campaigns
- **CampaignCategory** - Campaign categories
- **CampaignInfo** - Campaign details and metrics
- **CampaignUpdate** - Campaign updates/news
- **Donation** - Donation records
- **DonorInfo** - Donor information
- **CardNumber** - Payment card details
- **Receipt** - Transaction receipts

## 🔧 Tech Stack

- Spring Boot 4.0.0
- Spring Data JPA
- PostgreSQL
- Lombok
- Spring Validation
- Spring Security
- Maven

## 📝 Notes

- Database tables will be auto-created on first run (`spring.jpa.hibernate.ddl-auto=update`)
- CORS is configured for React frontend on `http://localhost:3000`
- Password hashing should be implemented before production
- Card tokenization should be implemented for security

## 🎯 Next Steps

1. Set up PostgreSQL database
2. Update `application.properties` with your credentials
3. Run `mvn spring-boot:run`
4. Test API endpoints with Postman or your frontend
5. Implement password hashing (BCrypt)
6. Implement JWT authentication
7. Add card payment tokenization
