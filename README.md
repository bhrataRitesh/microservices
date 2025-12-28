# Microservices Architecture Project 🚀

This repository contains a microservices-based backend system built using Node.js, MongoDB, RabbitMQ, and Docker Compose. Each service is independent, containerized, and communicates via REST APIs and asynchronous messaging.

---

## Architecture Overview

The system follows a microservices architecture where services are loosely coupled and scalable.

User Service  -->  MongoDB  
Task Service  -->  MongoDB  
Task Service  -->  RabbitMQ  -->  Notification Service  

---

## Services and Their Purpose

### User Service
**Port:** 3000

**Purpose:**
- Manages user-related operations
- Handles user creation and retrieval
- Stores user data in MongoDB

**Technology Stack:**
- Node.js
- Express
- MongoDB

---

### Task Service
**Port:** 4000

**Purpose:**
- Manages task creation and retrieval
- Stores tasks in MongoDB
- Publishes task creation events to RabbitMQ

**Technology Stack:**
- Node.js
- Express
- MongoDB
- RabbitMQ (Producer)

---

### Notification Service
**Port:** 2000

**Purpose:**
- Listens to RabbitMQ messages
- Consumes task creation events
- Processes and logs notifications for new tasks

**Technology Stack:**
- Node.js
- RabbitMQ (Consumer)

---

### MongoDB
**Port:** 27017

**Purpose:**
- Persistent data storage for all services
- Each service maintains its own database or collection

---

### RabbitMQ
**Ports:**
- 5672 (AMQP)
- 15672 (Management UI)

**Purpose:**
- Message broker for asynchronous communication
- Decouples services for better scalability and reliability

**Default Credentials:**   
Username: guest  
Password: guest  

---

## Running the Application with Docker

Build and start all services:   

```
docker compose up --build
```


Stop all services:


```
docker compose down
```


Stop services and remove volumes:


```
docker compose down -v
```


---


## Useful Docker Commands

View logs:
```
docker compose logs -f
```

Check running containers:
```
docker compose ps
```

Access RabbitMQ Management UI:
http://localhost:15672



---

## Key Concepts Used

- Microservices Architecture
- Docker and Docker Compose
- Asynchronous Messaging with RabbitMQ
- Service-to-Service Communication
- Fault Tolerance and Retry Logic

---

## Best Practices Followed

- No localhost usage inside containers
- Loose coupling via message queues
- Independent service deployment
- Clean containerized setup

---

## Future Enhancements

- API Gateway (Nginx)
- Authentication and Authorization (JWT)
- RabbitMQ Exchanges and Routing Keys
- Dead Letter Queues (DLQ)
- Kubernetes Deployment
- Monitoring and Logging
- CI/CD Pipeline

---

## Author

Ritesh  
Backend | DevOps | Microservices Enthusiast  


