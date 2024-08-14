import jwt
from flask import current_app
from jwt import ExpiredSignatureError, InvalidTokenError

def verify_token(token, app):
    try:
        decoded_token = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        return decoded_token
    except ExpiredSignatureError:
        return {"error": "token_expired", "message": "Token has expired"}
    except InvalidTokenError:
        return {"error": "invalid_token", "message": "Invalid token"}
    return None