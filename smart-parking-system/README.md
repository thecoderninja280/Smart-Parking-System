# Smart Parking System

This is a full-stack web application for a smart parking system, featuring a Java Spring Boot backend and a modern vanilla JavaScript frontend with TailwindCSS.

## Features

-   **User Portal**: Real-time visualization of parking slots, online reservation, and payment simulation.
-   **Admin Portal**: Dashboard with system analytics, real-time slot monitoring, and manual slot management (e.g., for maintenance).
-   **Secure Authentication**: JWT-based authentication with role-based access control (USER/ADMIN).
-   **RESTful API**: A well-defined API for all frontend-backend interactions.
-   **Self-Contained**: Uses an embedded SQLite database, requiring no external database setup.

## Tech Stack

-   **Backend**: Java 17, Spring Boot 3, Spring Security, Spring Data JPA, Hibernate
-   **Database**: SQLite
-   **Frontend**: HTML5, CSS3, JavaScript (ES6 Modules), TailwindCSS (via CDN)
-   **Build Tool**: Apache Maven

## Prerequisites

-   JDK 17 or newer
-   Apache Maven 3.6+
-   A modern web browser

## Setup and Usage

1.  **Download and Unzip**:
    Download or clone the project and unzip it to a local directory.

2.  **Navigate to the Backend Directory**:
    Open a terminal or command prompt and change to the backend directory.
    ```bash
    cd path/to/smart-parking-system/smart-parking-backend
    ```

3.  **Build and Run the Application**:
    Use Maven to build and run the Spring Boot application. The command will download all necessary dependencies and start the server.

    ```bash
    # On macOS/Linux
    ./mvnw spring-boot:run

    # On Windows
    .\mvnw.cmd spring-boot:run
    ```

    The application will start on `http://localhost:8080`. When you run it for the first time, a `parking.db` file (the SQLite database) will be created in the `smart-parking-backend` directory and populated with initial data from `import.sql`.

4.  **Access the Application**:
    Open your web browser and navigate to:
    **`http://localhost:8080`**

5.  **Default Credentials**:
    The system is pre-populated with two users for testing:
    -   **Admin User**:
        -   Email: `admin@admin.com`
        -   Password: `adminadmin`
    -   **Regular User**:
        -   Email: `user@test.com`
        -   Password: `password`

    You can also register new users through the registration form.

## API Endpoints Overview

All endpoints are prefixed with `/api`.

-   `POST /auth/login`: User login.
-   `POST /auth/register`: New user registration.
-   `GET /parking/slots`: (USER/ADMIN) Get status of all parking slots.
-   `POST /user/reservations`: (USER) Create a new reservation.
-   `GET /user/reservations/me`: (USER) Get current user's reservations.
-   `GET /admin/stats`: (ADMIN) Get dashboard analytics.
-   `GET /admin/slots`: (ADMIN) Get all slots for management view.
-   `PUT /admin/slots/{id}`: (ADMIN) Update the status of a specific slot.