# 💊 MediMart – Full Stack Pharmacy Management System

A complete end-to-end digital pharmacy solution with inventory, billing, and invoice management designed for real-world POS systems.

A full-stack Pharmacy / Medical Store Management System built using Angular (Frontend) and Spring Boot (Backend). It supports medicine inventory management, cashier billing, invoice generation, and role-based access control.

---

## 🚀 Features

### 👨‍⚕️ Admin Module
- Add / Edit / Delete medicines
- View complete inventory
- Search & sort medicines
- Stock status (In Stock / Low Stock)

### 💰 Cashier Module
- Billing dashboard (POS-style UI)
- Add medicines to cart
- Quantity increase/decrease (+ / -)
- Optional discount toggle system
- Invoice generation
- Real-time bill calculation

### 🧾 Invoice System
- Professional invoice layout
- Printable bill format
- Invoice number support (future upgrade ready)
- GST-ready structure (future enhancement)

### 👤 Authentication
- Login & Register system
- Role-based access (Admin / Cashier / Customer)
- Secure backend APIs

---

## 🏗️ Tech Stack

### Frontend
- Angular (Standalone Components)
- TypeScript
- HTML5 + CSS3
- Angular Router
- FormsModule
- HttpClient

### Backend
- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- REST APIs

### Database
- MySQL

---

## 📂 Project Structure

MediMart/
│
├── client/                 # Angular Frontend
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── guards/
│
├── server/                 # Spring Boot Backend
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── security/
│
└── README.md

---

## ⚙️ Setup Instructions

### 🔹 Frontend (Angular)

cd client  
npm install  
ng serve  

Runs on:
http://localhost:4200

---

### 🔹 Backend (Spring Boot)

cd server  
mvn spring-boot:run  

Runs on:
http://localhost:8080

---

### 🔹 Database Setup

CREATE DATABASE medimart;

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/medimart  
spring.datasource.username=root  
spring.datasource.password=your_password  

---

## 🔌 API Endpoints

### Medicine APIs
- GET /api/medicines
- GET /api/medicines/{id}
- POST /api/medicines
- PUT /api/medicines/{id}
- DELETE /api/medicines/{id}

---

## 🧾 Invoice Flow

1. Select medicines from list  
2. Add to cart  
3. Adjust quantity (+ / -)  
4. Apply discount (optional)  
5. Generate invoice  
6. Print bill  

---

## 🎯 Future Enhancements

- GST billing (CGST + SGST)
- Invoice history tracking
- PDF invoice download
- Barcode scanning support
- Stock auto deduction after billing

---

## 📌 Project Status

✔ Core modules completed  
🚧 Invoice + Billing enhancements in progress  
🚀 Deployment planned after final improvements  

---

## 👨‍💻 Author

Suchitra

---

## ⭐ Support

If you like this project, give a ⭐ on the repository to support development.
