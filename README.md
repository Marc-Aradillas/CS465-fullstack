# Travlr Getaways Full Stack Application

Welcome to the **Travlr Getaways** full stack travel booking application, developed as part of the CS 465 course using the MEAN stack (MongoDB, Express, Angular, Node.js). This application serves both **customer-facing** and **admin-only** functionality, including secure login authentication, dynamic trip management, and seamless API interaction.

---

## 🌐 Architecture

This application uses a combination of two frontend development types:

- **Express-based HTML views with Handlebars** for rendering the initial customer-facing site, leveraging static templating and server-side rendering for early development.
- **Angular SPA** (Single Page Application) to create a richer admin interface. Angular allows modular components, service-based data interaction, routing, and conditional UI behavior for logged-in users.

Using **MongoDB (NoSQL)** on the backend allowed for a flexible schema design, ideal for storing trip data with variable fields like itineraries, images, and pricing without enforcing a rigid relational structure. Mongoose was used to define schemas, manage validation, and simplify database interaction.

---

## ⚙️ Functionality

**JSON (JavaScript Object Notation)** plays a key role in tying the frontend and backend together. While JavaScript is the language that runs logic in the browser, JSON is a lightweight format used to exchange data between Angular (frontend) and Express (backend). It enabled seamless communication with the RESTful API for fetching, creating, and updating trip records.

Throughout development, I **refactored** several modules for better structure and reusability:
- Abstracted HTTP logic into an Angular `TripDataService` for maintainability
- Created reusable UI components like `<app-trip-card>` to display trips across views
- Used Angular’s routing and component lifecycle to simplify navigation and data binding

These refactors made the application more modular, scalable, and easier to debug and maintain.

---

## 🧪 Testing

Testing RESTful endpoints involved using:
- **Postman** to test `GET`, `POST`, and `PUT` requests for `/api/trips`, `/api/login`, and `/api/register`
- **DevTools Network tab** to confirm frontend requests matched expected payloads

Adding JWT authentication added complexity to testing, as protected routes like `/api/trips/:tripCode` required a valid token. Angular services were enhanced to store, retrieve, and include the token in secure requests. Conditional rendering in the SPA ensured users could only access admin features after successful login.

---

## 🪞 Reflection

This course has significantly advanced my ability to work across the full stack using professional tools. I’ve learned to:

- Build RESTful APIs and secure them with JWT
- Use Angular for rich, client-side UI experiences
- Integrate MongoDB with Express using Mongoose
- Implement and debug real-world authentication flows

These skills are directly aligned with my career goals in **software engineering and web application development**, and have helped build a portfolio-ready, functional application I can confidently showcase to employers.

---

## 🔗 Repository

**GitHub Repo:** [https://github.com/Marc-Aradillas/CS465-fullstack/tree/module7](https://github.com/Marc-Aradillas/CS465-fullstack/tree/module7)
