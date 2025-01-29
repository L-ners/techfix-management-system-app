# TechFix Management System App

## Overview
The **TechFix Management System App** is a solution designed to manage service appointments leveraging Amazon Web Services (AWS). This project includes a frontend for user interaction, a backend implemented using AWS Lambda, and a database hosted on Amazon RDS.

---

## Project Structure

```
techfix-management-system-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── lambda/
│   │   ├── registerAppointment.py
│   │   ├── appointmentList.py
│   │   └── config.json
│   └── requirements.txt
├── infrastructure/
│   ├── S3Config.json
│   ├── API-GatewayConfig.json
│   └── EnvironmentVariables.txt
└── README.md
```

---

## Configured AWS Services

### 1. **Amazon S3**
- **Bucket Name:** `tms-frontend-bucket`
- **Description:** Used to host the frontend for the project, including files like `index.html`, images, and JavaScript required for the user interface.
- **Bucket Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::tms-frontend-bucket/*"
        }
    ]
}
```
- **CORS Configuration:**
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": ["http://tms-frontend-bucket.s3-website-us-east-1.amazonaws.com"],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

---

### 2. **Amazon API Gateway**
- **Configured Endpoints: Routes**
  - **POST** `/registerAppointmentV2`
  - **GET, POST** `/appointments`
- **CORS:** Enabled for requests from the S3 bucket.
- **Route Configuration:**
  - `/appointments`: Integrated with Lambda functions for appointment data management.

---

### 3. **AWS Lambda**
- **Lambda Functions:**
  - **registerAppointmentV2**
    - **Description:** Inserts appointment data into the database.
    - **File:** `registerAppointment.py`
  - **appointmentList**
    - **Description:** Retrieves and returns all registered appointments.
    - **File:** `appointmentList.py`
- **Environment Variables:**
  - `DB_HOST`: (RDS endpoint)
  - `DB_NAME`: `tms-database`
  - `DB_USER`: AWS User
  - `DB_PASSWORD`: AWS Password

---

# TechFix Management System App

## Overview
The **TechFix Management System App** is a solution designed to manage service appointments leveraging Amazon Web Services (AWS). This project includes a frontend for user interaction, a backend implemented using AWS Lambda, and a database hosted on Amazon RDS.

---

## Project Structure

```
techfix-management-system-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── lambda/
│   │   ├── registerAppointment.py
│   │   ├── appointmentList.py
│   │   └── config.json
│   └── requirements.txt
├── infrastructure/
│   ├── S3Config.json
│   ├── API-GatewayConfig.json
│   └── EnvironmentVariables.txt
└── README.md
```

---

## Configured AWS Services

### 1. **Amazon S3**
- **Bucket Name:** `tms-frontend-bucket`
- **Description:** Used to host the frontend for the project, including files like `index.html`, images, and JavaScript required for the user interface.
- **Bucket Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::tms-frontend-bucket/*"
        }
    ]
}
```
- **CORS Configuration:**
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": ["http://tms-frontend-bucket.s3-website-us-east-1.amazonaws.com"],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

---

### 2. **Amazon API Gateway**
- **Configured Endpoints: Routes**
  - **POST** `/registerAppointmentV2`
  - **GET, POST** `/appointments`
- **CORS:** Enabled for requests from the S3 bucket.
- **Route Configuration:**
  - `/appointments`: Integrated with Lambda functions for appointment data management.

---

### 3. **AWS Lambda**
- **Lambda Functions:**
  - **registerAppointmentV2**
    - **Description:** Inserts appointment data into the database.
    - **File:** `registerAppointment.py`
  - **appointmentList**
    - **Description:** Retrieves and returns all registered appointments.
    - **File:** `appointmentList.py`
- **Environment Variables:**
  - `DB_HOST`: (RDS endpoint)
  - `DB_NAME`: `tms-database`
  - `DB_USER`: AWS User
  - `DB_PASSWORD`: AWS Password

---

### 4. **Amazon RDS**
- **Database Type:** PostgreSQL
- **Database Schema:**
```sql
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    technician_assigned VARCHAR(255)
);
```
- **Security Configuration:**
  - **Security Groups:** Configured to allow connections from specific services and authorized IP addresses.

---

### 5. **IAM Roles**
- **Configured Roles:**
  - **Lambdas3FullAccess:** Grants Lambda functions access to the S3 bucket.
  - **RDS-ExecutionRole:** Provides execution and monitoring permissions for RDS.
  - **registerAppointment-role:** Allows Lambda functions to connect with RDS to insert and retrieve data.

---

## Local Setup

### 2. Install Dependencies
- **Backend:**
```bash
cd backend/
pip install -r requirements.txt
```
- **Frontend:**
```bash
cd frontend/
npm install
```

### 3. Run Frontend Locally
```bash
npm start
```

---

## Deployment

### Upload Frontend to Amazon S3
1. Configure the bucket as a static website.
2. Upload frontend files to the S3 bucket using the AWS console or CLI.

### Integrate API Gateway and Lambda
1. Configure routes in API Gateway.
2. Link routes to the corresponding Lambda functions.

### Connect Lambda to RDS
1. Set up environment variables in Lambda.
2. Test connectivity and execution of queries from Lambda.

---

## Screenshots

1. **S3 Bucket Configuration:**
   ![S3 Configuration](path/to/screenshot1.png)

2. **API Gateway Routes:**
   ![API Gateway Routes](path/to/screenshot2.png)

3. **IAM Roles Configuration:**
   ![IAM Roles](path/to/screenshot3.png)

4. **Environment Variables in Lambda:**
   ![Lambda Env Variables](path/to/screenshot4.png)

---

This README provides a comprehensive overview of the TechFix Management System App, allowing for replication and understanding of its implementation on AWS.

```
- **Security Configuration:**
  - **Security Groups:** Configured to allow connections from specific services and authorized IP addresses.

---

### 5. **IAM Roles**
- **Configured Roles:**
  - **Lambdas3FullAccess:** Grants Lambda functions access to the S3 bucket.
  - **RDS-ExecutionRole:** Provides execution and monitoring permissions for RDS.
  - **registerAppointment-role:** Allows Lambda functions to connect with RDS to insert and retrieve data.

---

## Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<user>/techfix-management-system-app.git
```

### 2. Install Dependencies
- **Backend:**
```bash
cd backend/
pip install -r requirements.txt
```
- **Frontend:**
```bash
cd frontend/
npm install
```

### 3. Run Frontend Locally
```bash
npm start
```

---

## Deployment

### Upload Frontend to Amazon S3
1. Configure the bucket as a static website.
2. Upload frontend files to the S3 bucket using the AWS console or CLI.

### Integrate API Gateway and Lambda
1. Configure routes in API Gateway.
2. Link routes to the corresponding Lambda functions.

### Connect Lambda to RDS
1. Set up environment variables in Lambda.
2. Test connectivity and execution of queries from Lambda.

---

## Screenshots

1. **S3 Bucket Configuration:**
   ![S3 Configuration](path/to/screenshot1.png)

2. **API Gateway Routes:**
   ![API Gateway Routes](path/to/screenshot2.png)

3. **IAM Roles Configuration:**
   ![IAM Roles](path/to/screenshot3.png)

4. **Environment Variables in Lambda:**
   ![Lambda Env Variables](path/to/screenshot4.png)

---

This README provides a comprehensive overview of the TechFix Management System App, allowing for replication and understanding of its implementation on AWS.

