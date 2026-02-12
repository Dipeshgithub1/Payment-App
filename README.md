# 💳 Payment App

**A modern backend payment system built with scalability, security, and real-world fintech practices in mind.**

> Designed to simulate real payment flows such as authentication, balance management, and atomic money transfers.

---

## 🔥 Key Features

- Secure user authentication using JWT
- Account creation with balance management
- Atomic money transfers using MongoDB transactions
- Input validation and centralized error handling
- Clean and scalable backend architecture

---

## 🧱 Architecture Overview

```text
Client
  │
  └──▶ REST API (Express.js)
            │
            ├── Auth & Middleware
            ├── Business Logic
            ├── MongoDB Transactions
            └── Data Models (Mongoose)
