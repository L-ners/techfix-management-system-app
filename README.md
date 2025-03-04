## TechFix Management System

### Project Structure

```
techfix-management-system/
├── frontend/                # React frontend hosted on Amazon S3
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   └── index.js         # Main entry point
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   ├── README.md            # Frontend documentation
│   └── build/               # Production-ready frontend
├── backend/                 # Serverless backend using AWS Lambda
│   ├── lambda/
│   │   ├── registerAppointment.py  # Handles appointment creation
│   │   ├── appointmentList.py      # Retrieves scheduled appointments
│   │   └── config.json             # Configuration file
│   ├── requirements.txt      # Python dependencies
│   ├── API-GatewayConfig.json # API Gateway setup
│   ├── RDS-Schema.sql        # Database schema definition
│   ├── IAM-Policies.json     # IAM roles and policies
│   └── README.md             # Backend documentation
├── infrastructure/           # AWS Infrastructure Configuration
│   ├── S3Config.json         # S3 setup for frontend hosting
│   ├── API-GatewayConfig.json # API Gateway routes and policies
│   ├── Lambda-Roles.json     # IAM roles for Lambda execution
│   ├── CloudFormation.yaml   # Infrastructure as code setup
│   ├── EnvironmentVariables.txt # Environment-specific configurations
│   └── README.md             # Infrastructure documentation
└── README.md                 # Project Documentation

# Frontend – Hosted on Amazon S3
- Built using React.js and hosted on Amazon S3 as a static website.
- Amazon CloudFront is used for global content delivery.
- CORS policies allow frontend to communicate with API Gateway.

# Frontend Deployment Steps
```sh
cd frontend
npm install
npm run build
aws s3 sync build/ s3://tms-frontend-bucket --acl public-read
```

# S3 Bucket Policy (for public access)
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

# CORS Configuration
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

# API Gateway – Routing Requests
- Configured Amazon API Gateway to manage HTTP requests and route them to Lambda functions.

## Configured Endpoints
- `POST /registerAppointment` : Saves a new appointment to RDS.
- `GET /appointments` : Retrieves all scheduled appointments.

## Enable CORS in API Gateway
```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "*"
}
```

# Backend – AWS Lambda (Python)
- Serverless backend running on AWS Lambda with Python.

## Lambda Functions
- `registerAppointment.py` – Inserts appointment data into RDS.
- `appointmentList.py` – Retrieves appointment data from RDS.
- `lambda_function.py` – Main Lambda function handler.

# Database – Amazon RDS (PostgreSQL)
- Hosted on Amazon RDS (PostgreSQL), securely stores all appointments.

## Database Schema
```sql
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    technician_assigned VARCHAR(255)
);
```

# IAM Roles & Policies
- **Lambda Execution Role** – Grants Lambda functions permission to access RDS.
- **API Gateway Role** – Allows API Gateway to invoke Lambda.
- **S3 Read-Only Role** – Ensures frontend access from API Gateway.
