from flask_security.utils import hash_password, verify_password
from flask_jwt_extended import create_access_token
from models import User, db

class AuthService:
    @staticmethod
    def register_user(email, password):
        hashed_password = hash_password(password)
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def authenticate_user(email, password):
        user = User.query.filter_by(email=email).first()
        if user and verify_password(password, user.password):
            token = create_access_token(identity={"id": user.id, "email": user.email, "role": user.role})
            return token
        return None
