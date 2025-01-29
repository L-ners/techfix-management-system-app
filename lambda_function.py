import json
import psycopg2
import os

def lambda_handler(event, context):
    print("Iniciando la función Lambda")
    conn = None
    cursor = None
    try:
        print("Intentando conectar a la base de datos...")
        # Connect to the database using environment variables
        conn = psycopg2.connect(
            host=os.environ["DB_HOST"],
            database=os.environ["DB_NAME"],
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"],
            connect_timeout=10
        )
        cursor = conn.cursor()
        print("Conexión exitosa a la base de datos")

        # Determine the HTTP method
        http_method = event["requestContext"]["http"]["method"]
        
        if http_method == "GET":
            # Handle GET request: Fetch appointments from the database
            cursor.execute("SELECT id, customer_name, appointment_date, technician_assigned FROM appointments")
            appointments = cursor.fetchall()

            result = []
            for row in appointments:
                result.append({
                    "id": row[0],
                    "customer_name": row[1],
                    "appointment_date": str(row[2]),
                    "technician_assigned": row[3]
                })

            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                },
                "body": json.dumps(result)
            }

        elif http_method == "POST":
            # Handle POST request: Insert data into the database
            if "body" not in event or not event["body"]:
                raise ValueError("Missing or empty 'body' in event")

            data = json.loads(event["body"])
            customer_name = data.get("customer_name")
            appointment_date = data.get("appointment_date")
            technician_assigned = data.get("technician_assigned")

            if not customer_name or not appointment_date or not technician_assigned:
                raise ValueError("Missing required fields")

            query = """
                INSERT INTO appointments (customer_name, appointment_date, technician_assigned)
                VALUES (%s, %s, %s)
            """
            cursor.execute(query, (customer_name, appointment_date, technician_assigned))
            conn.commit()
            print("Datos insertados correctamente")

            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                },
                "body": json.dumps({"message": "Appointment registered successfully!"})
            }

        else:
            # Handle unsupported HTTP methods
            return {
                "statusCode": 405,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                },
                "body": json.dumps({"error": "Method not allowed"})
            }

    except psycopg2.Error as db_error:
        print(f"Error de conexión a la base de datos: {str(db_error)}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                },
                "body": json.dumps({"error": f"Database error: {str(db_error)}"})
            }
    except Exception as e:
        print(f"Error inesperado: {str(e)}")
        print(f"Event data: {event}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps({"error": f"Unexpected error: {str(e)}"})
        }
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()







