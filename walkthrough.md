# Spring Boot Backend Added Successfully

A robust Java Spring Boot backend has been added to your project. It is located in the `backend` directory and uses Spring Data JPA, Spring Security, JWT, and MySQL.

## Key Features Implemented

1.  **Robust Error Handling**: A `GlobalExceptionHandler` ensures that all errors (Validation, Not Found, Unexpected) return a consistent `ApiResponse` format, preventing standard HTML error pages or unhandled stack traces.
2.  **Authentication**: Full Spring Security setup with stateless JWT tokens.
3.  **Registration & Login API**: Endpoints `/api/auth/signup` and `/api/auth/login` handle user creation, duplicate email checks, and password hashing (using `BCrypt`).
4.  **MySQL Ready**: Configuration via `application.properties` allows dynamic properties. It falls back to defaults for local development but reads environment variables natively, making it ready for Railway deployment.

> [!IMPORTANT]
> **Next Steps for Local Testing:**
> 
> 1.  **Start MySQL**: Open your local MySQL app and ensure it's running.
> 2.  **Create Database**: Connect to MySQL as `root` and run: `CREATE DATABASE codexx;` (By default, the app is configured to use `codexx` with username `root` and password `password`. You can adjust these in `backend/src/main/resources/application.properties` or set `MYSQLUSER` and `MYSQLPASSWORD` environment variables).
> 3.  **Run Backend**: Open a terminal in the `backend` directory and run: `mvn spring-boot:run` (Requires Maven installed locally). The app will start on port `8080` and automatically create the `users` table.

> [!TIP]
> **Deploying to Railway:**
> 
> 1. Create a New Project on Railway.
> 2. Provision a **MySQL** Database service inside Railway.
> 3. Connect your GitHub repository to Railway to create a Web Service.
> 4. Railway will automatically detect the `pom.xml` in the `backend` directory (ensure your root directory configuration in Railway points to `backend` if you deploy from a monorepo).
> 5. In your Railway Web Service, add the environment variable: `SPRING_DATASOURCE_URL` and set its value to reference the MySQL connection string (e.g., `${{MySQL.MYSQL_URL}}`).

The backend is fully prepared to handle failures and robustly manage user authentication.
