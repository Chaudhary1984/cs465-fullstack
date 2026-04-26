# CS 465: Full Stack Development
# "Travlr Getaways" - A Full Stack Travel Booking Application
Travlr Getaways – Full Stack Web Application
This project is a complete full stack travel booking web application built using the MEAN stack (MongoDB, Express, Angular, Node.js). The application serves two different types of users: customers and administrators. Customers interact with a server-rendered website built with Express and Handlebars templates, while administrators manage trips, users, and reservations through an Angular single-page application (SPA). Both interfaces communicate with the same RESTful API and MongoDB database, secured with JSON Web Token (JWT) authentication.

# Architecture
In this project, I used two different types of frontend development: a traditional server-rendered Express website using Handlebars (HBS) templates and a modern Angular single-page application (SPA).

The Express/HBS frontend is used for the customer-facing website. Pages such as Home, Travel, Login, Reservations, and Checkout are rendered on the server and sent to the client as HTML. This approach is simple, fast, and effective for public-facing content where users browse travel packages.

The Angular SPA is used for the administrator interface. Instead of reloading pages, Angular dynamically updates the interface and communicates directly with the REST API using HTTP requests. This allows administrators to add, edit, and delete trips in real time without refreshing the page.

The backend uses MongoDB, a NoSQL database, because travel packages and user data fit naturally into a document-based structure. MongoDB allows flexible schemas, easy integration with JSON, and efficient storage of travel package information such as trip codes, names, dates, resorts, and pricing.

# Functionality
JSON (JavaScript Object Notation) is a lightweight data format used to transfer data between the frontend and backend. While JSON looks similar to JavaScript objects, it is purely a data format and does not contain functions or logic. In this project, JSON is the bridge between the Express server, the Angular SPA, and MongoDB. The API sends trip data as JSON to both frontends, and both frontends send JSON back when creating or updating trips.

During development, I refactored several parts of the code to improve functionality and efficiency. For example, I changed the Travel page controller from using static hard-coded trip data to dynamically retrieving trips from MongoDB. This allowed the customer-facing website to always display up-to-date data entered by the administrator through the Angular SPA.

I also benefited from reusable UI components in Angular, such as the navbar, trip card, and trip list components. These components reduced repeated code and made the interface easier to maintain and expand.

# Testing
Testing the API required verifying that each HTTP method worked correctly with the proper endpoint. I tested:
. GET requests to retrieve all trips and individual trips
. POST requests to add new trips
. PUT requests to update existing trips
. DELETE requests to remove trips

After implementing JWT authentication, testing became more complex because protected endpoints required a valid token. I verified that users could not add, update, or delete trips without logging in through the Angular application. The Angular JWT interceptor automatically attaches the token to requests, allowing secure communication with the API.

By testing both the Express customer site and the Angular admin site, I confirmed that the full stack integration worked correctly from frontend to backend to database.

# CS 465: Full Stack Development - Final Project

## About This Repository

This repository contains the complete final project for CS 465 - Full Stack Development at Southern New Hampshire University. The project is a fully functional travel booking web application called **"Travlr Getaways"** built using the full MEAN stack (MongoDB, Express.js, Angular, Node.js).

| Repository Information | |
|------------------------|---|
| **Course** | CS 465 - Full Stack Development |
| **Project Version** | Final Project (Module 7-8) |
| **Last Updated** | April 2026 |
| **Status** | Complete - Fully Functional |

---

## Table of Contents

1. [About The Course](#about-the-course)
2. [About The Project](#about-the-project)
3. [Built With](#built-with)
4. [Architecture Overview](#architecture-overview)
5. [How I Developed The Project](#how-i-developed-the-project)
6. [Features](#features)
7. [Security Implementation](#security-implementation)
8. [Testing](#testing)
9. [Getting Started](#getting-started)
10. [Installation](#installation)
11. [Reflection](#reflection)
12. [Links](#links)

---

## About The Course

### Course Prerequisites
- 108 credits including CS 340

### Course Description
Students will design and develop a full stack application through the utilization of programming language frameworks. In creating a full stack application, students will also be responsible for developing a database as well as the code that interfaces applications to the database.

### Competencies Covered

| Competency | Description |
|------------|-------------|
| **CS-0347** | Design the architecture of a web application |
| **CS-0348** | Build a web application using frameworks |
| **CS-0349** | Develop and integrate a database using frameworks |

---

## About The Project

**"Travlr Getaways" - A Full Stack Travel Booking Application**

This class focused on the development of a single web application using the MEAN stack process (MongoDB, Express.js framework, Angular frontend framework, and Node.js backend server framework). The entire project was designed as a travel website, "Travlr Getaways," and can be found in this repository.

This was a very challenging, very interesting, and very fun project for me to work on. I enjoy web development more than any other type of project, so this class and application being so colorful and engaging was just perfect. This is a great example of how to build a full stack project from scratch and a great way to learn the complete development lifecycle.

To get a better idea of what this whole project was about, check out the GitHub repository for this directory.

---

## Built With

This project used the following frameworks and technologies:

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Backend JavaScript runtime | v20.x |
| **Express.js** | Web framework for API and server | 4.18.x |
| **MongoDB** | NoSQL database | 7.x |
| **Mongoose** | ODM for MongoDB | 8.x |
| **Angular** | Frontend SPA framework | 17.x |
| **Handlebars (HBS)** | Templating engine for customer site | 4.x |
| **Bootstrap** | CSS framework for responsive design | 5.3.x |
| **JWT** | Authentication tokens | 9.x |
| **Passport.js** | Authentication middleware | 0.7.x |

---

## Architecture Overview

### Frontend Development: Two Approaches

This project implements two distinct frontend architectures to serve different user needs:

| Aspect | Customer Website (Port 3000) | Admin SPA (Port 4200) |
|--------|-----------------------------|----------------------|
| **Technology** | Express + Handlebars | Angular |
| **Rendering** | Server-side (SSR) | Client-side (CSR) |
| **Page Navigation** | Full page reloads | Dynamic, no reloads |
| **Best For** | Public browsing, SEO | Interactive dashboards |
| **Development Complexity** | Lower | Higher |

**Why Two Different Approaches?**

The customer website prioritizes simplicity, fast initial load times, and SEO. Server-side rendering ensures that search engines can crawl all content. The admin SPA prioritizes interactivity and user experience, allowing administrators to manage trips without page reloads.

### Backend Database: Why MongoDB (NoSQL)?

The backend uses MongoDB for several strategic reasons:

1. **Flexible Schema:** Travel packages have varying attributes. MongoDB's document-based structure allows storing trips with different fields without rigid table schemas.

2. **JSON Integration:** MongoDB stores data in BSON format, which directly mirrors the JSON data used throughout the application. This creates natural alignment between the database, API responses, and frontend data structures.

3. **Scalability:** Travel booking applications experience traffic spikes during holiday seasons. MongoDB's horizontal scaling capabilities handle increased load seamlessly.

4. **Rapid Iteration:** The schema-less design allowed adding new fields to trips without complex migrations.

5. **Mongoose ODM:** Using Mongoose provided schema-based structure and validation while maintaining MongoDB's flexibility.

### API Endpoints

| Method | Endpoint | Authentication | Purpose |
|--------|----------|----------------|---------|
| GET | `/api/trips` | None | Retrieve all trips |
| GET | `/api/trips/:code` | None | Retrieve single trip |
| POST | `/api/trips` | JWT Required | Add new trip |
| PUT | `/api/trips/:code` | JWT Required | Update trip |
| DELETE | `/api/trips/:code` | JWT Required | Delete trip |
| POST | `/api/register` | None | Create user account |
| POST | `/api/login` | None | Authenticate user |

### JSON as the Bridge Between Frontend and Backend

**JSON vs JavaScript - Key Differences:**

| Feature | JavaScript Object | JSON |
|---------|-------------------|------|
| **Purpose** | Programming language data structure | Data interchange format |
| **Keys** | Quotes optional | Must be double-quoted |
| **Values** | Can include functions | Strings, numbers, booleans, arrays, objects, null |
| **Comments** | Allowed | Not allowed |

**How JSON Ties the Application Together:**
- API responses send trip data as JSON from backend to frontend
- Request payloads send JSON from frontend to backend when creating or updating trips
- JWT tokens are JSON strings containing encoded user information
- Initial trip data is stored in `trips.json` files for seeding

---

## How I Developed The Project

### The Development Process

While the project had a guide to follow during development (the CS 465 Full Stack Guide), the guide was far from perfect, and there were many instances where refactoring was necessary. Some of the challenges that occurred were not only due to the code we wrote but also because of changes in dependencies and best practices over time.

### My Approach to Problem Solving

My approach to solving problems is methodical and logical. I typically assess the limitations and capabilities of the tools I am using, and I avoid using a one-size-fits-all template methodology. Instead, I focus on using the best practices in each specific part of the system. My goal is to create a product that is fast, efficient, and easy to use.

### Instances of Refactoring for Efficiency

**Instance 1: Static Data to Dynamic API Calls**

*Before Refactor:* The Travel page controller initially read trip data from a static JSON file using `fs.readFileSync()`. This meant the customer website only displayed data that was hard-coded during development.

*After Refactor:* I refactored the controller to use the Fetch API to call `GET /api/trips`, retrieving the latest trip data from MongoDB in real-time.

*Benefits:* The customer website always displays up-to-date data entered by administrators, with no need to restart the server when trip data changes.

**Instance 2: Reusable Angular Components**

*Before Refactor:* Trip display logic was duplicated across multiple templates. Each trip card was hard-coded HTML repeated for every trip.

*After Refactor:* I created reusable Angular components: `TripCardComponent`, `NavbarComponent`, and `TripListComponent`.

*Benefits of Reusable UI Components:*
- **DRY Principle:** Logic written once, used everywhere
- **Maintainability:** Changes only need to be made in one file
- **Consistency:** All cards look and behave identically
- **Testability:** Components can be tested in isolation

**Instance 3: Centralizing Authentication with JWT Interceptor**

*Before Refactor:* Every API call that required authentication had to manually add the JWT token to headers, leading to code duplication.

*After Refactor:* I created an Angular HTTP Interceptor that automatically attaches the token to all outgoing requests.

*Benefits:*
- Authentication logic isolated in one location
- Reduced code duplication (50+ lines eliminated)
- No risk of forgetting to add authentication to new API calls
- Easier maintenance

**Instance 4: Handlebars Partials for Customer Website**

*Before Refactor:* Header and footer HTML was duplicated across every page template.

*After Refactor:* I created partial templates (`header.hbs` and `footer.hbs`) and included them in the layout.

*Benefits:* Navigation bar updates automatically across all pages, consistent user experience, reduced file sizes.

---

## Features

### Customer Website (Port 3000)

| Feature | Description | Status |
|---------|-------------|--------|
| Homepage | Hero section with background images and destination cards | ✅ |
| Travel Page | Table view with ID, Name, Length, Start, Resort, Per Person | ✅ |
| Category Tabs | Beaches, Cruises, Mountains with dynamic trip counts | ✅ |
| Search Field | Real-time filtering of trips by name, resort, or code | ✅ |
| User Registration | Sign up with name, email, password, and terms checkbox | ✅ |
| User Login | Email and password authentication | ✅ |
| News Page | Travel news articles with subscribe card | ✅ |
| Reservations | View reservations (logged in only) | ✅ |
| Checkout | Shopping cart with order summary | ✅ |

### Admin SPA (Port 4200)

| Feature | Description | Status |
|---------|-------------|--------|
| Authentication | Login required to access admin functions | ✅ |
| Trip Listing | View all trips with edit and delete buttons | ✅ |
| Add Trip | Form to create new trips with all fields | ✅ |
| Edit Trip | Pre-populated form to update existing trips | ✅ |
| Delete Trip | Remove trips with confirmation dialog | ✅ |
| JWT Interceptor | Automatic token attachment to API requests | ✅ |

---

## Security Implementation

| Security Feature | Implementation | Status |
|------------------|----------------|--------|
| Password Hashing | pbkdf2 with 1000 iterations and 16-byte salt | ✅ |
| JWT Tokens | 1-hour expiration, signed with secret from .env | ✅ |
| Protected Routes | POST, PUT, DELETE to `/api/trips` require JWT | ✅ |
| Session Management | Express-session for customer site | ✅ |
| CORS Configuration | Cross-origin requests properly configured | ✅ |
| Environment Variables | JWT secret stored in `.env`, excluded from git | ✅ |

### How JWT Authentication Works

1. User registers or logs in with email and password
2. Server validates credentials, hashes password comparison
3. Server generates JWT token containing user ID, email, and name
4. Token returned to client and stored in localStorage
5. Angular HTTP interceptor attaches token to all API requests
6. Server verifies token on protected endpoints
7. Token expires after 1 hour, requiring re-authentication

---

## Testing

### API Testing with Postman

I used Postman to test each endpoint individually:

| Test Case | Method | Endpoint | Expected Result |
|-----------|--------|----------|-----------------|
| Get all trips | GET | `/api/trips` | 200 OK, array of trips |
| Get single trip | GET | `/api/trips/GALR210214` | 200 OK, single trip |
| Register user | POST | `/api/register` | 200 OK, JWT token |
| Login user | POST | `/api/login` | 200 OK, JWT token |
| Add trip (no auth) | POST | `/api/trips` | 401 Unauthorized |
| Add trip (with auth) | POST | `/api/trips` | 201 Created |
| Update trip (with auth) | PUT | `/api/trips/:code` | 200 OK |
| Delete trip (with auth) | DELETE | `/api/trips/:code` | 204 No Content |

### Tools Used for Testing

| Tool | Purpose |
|------|---------|
| **Postman** | Manual API endpoint testing with authentication scenarios |
| **Browser DevTools** | Debugging frontend-backend communication, inspecting network requests |
| **MongoDB Compass** | Verifying database changes after API operations |
| **Angular Console** | Troubleshooting CORS and authentication issues |

### Security Testing Challenges

After implementing JWT authentication, testing became more complex:

1. **Token Requirement:** Protected endpoints require a valid JWT from `/api/login` before they can be tested
2. **Token Expiration:** JWT tokens expire after 1 hour, requiring re-authentication for long test sessions
3. **Invalid Token Handling:** Malformed or tampered tokens correctly return 401 Unauthorized
4. **Missing Headers:** Requests without `Authorization: Bearer <token>` are properly rejected

### Integration Testing Results

| Test Scenario | Result |
|---------------|--------|
| Customer site displays trips retrieved from MongoDB | ✅ PASS |
| Admin site adds trip, instantly visible on customer site | ✅ PASS |
| Admin site edits trip, changes reflected on customer site | ✅ PASS |
| Admin site deletes trip, removed from customer site | ✅ PASS |
| Unauthenticated users cannot add, edit, or delete trips | ✅ PASS |
| Login and registration work end-to-end | ✅ PASS |
| JWT tokens properly expire after 1 hour | ✅ PASS |

---

## Getting Started

To install and run this application on your own machine, you will need to install the frameworks listed above, as well as an IDE such as Visual Studio Code or similar.

### Prerequisites

Start by ensuring you have the following installed on your machine:

```bash
# Check Node.js version (v14 or higher)
node --version

# Check npm version
npm --version

# Check MongoDB is running
mongod --version

# Install Angular CLI globally
npm install -g @angular/cli
