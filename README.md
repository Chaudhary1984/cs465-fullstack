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

## How to Run

```bash
# Install backend
npm install

# Install Angular
cd angular-client && npm install

# Seed database
node app_api/models/seed.js

# Start backend (Terminal 1)
node ./bin/www

# Start Angular (Terminal 2)
cd angular-client && ng serve

Access: http://localhost:3000 (customer) | http://localhost:4200 (admin)

Test Login: test@test.com / test123
