import jwt
from datetime import datetime, timedelta
from flask import current_app

def generate_invitation_token(email, role, expires_in=3600):
    if not isinstance(email, str) or not isinstance(role, str):
        raise ValueError("Email and role must be strings")
    if role not in ["admin", "user"]:  # Add allowed roles here
        raise ValueError("Invalid role")
    payload = {
        'email': email,
        'role': role,
        'exp': datetime.utcnow() + timedelta(seconds=expires_in)
    }
    try:
        return jwt.encode(payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    except Exception as e:
        current_app.logger.error(f"Error generating invitation token: {e}")
        return None

def verify_invitation_token(token):
    try:
        decoded_token = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        if 'email' not in decoded_token or 'role' not in decoded_token:
            return {"error": "Invalid token"}
        if decoded_token['role'] not in ["admin", "user"]:  # Add allowed roles here
            return {"error": "Invalid role"}
        return decoded_token
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}
    except Exception as e:
        current_app.logger.error(f"Error verifying invitation token: {e}")
        return {"error": "Unknown error"}