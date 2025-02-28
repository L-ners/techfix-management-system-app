techfix-management-system/
├── frontend/                # React frontend hosted on Amazon S3
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── README.md
│   └── build/ (Generated after running npm build)
├── backend/                 # Serverless backend using AWS Lambda
│   ├── lambda/
│   │   ├── registerAppointment.py
│   │   ├── appointmentList.py
│   │   └── config.json
│   ├── requirements.txt
│   ├── API-GatewayConfig.json
│   ├── RDS-Schema.sql
│   ├── IAM-Policies.json
│   └── README.md
├── infrastructure/           # AWS Infrastructure Configuration
│   ├── S3Config.json
│   ├── API-GatewayConfig.json
│   ├── Lambda-Roles.json
│   ├── CloudFormation.yaml
│   ├── EnvironmentVariables.txt
│   └── README.md
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
