import os
import secrets
from dotenv import load_dotenv

load_dotenv()


def generate_jwt_secret_key():
    jwt_secret_key = secrets.token_urlsafe(16)
    with open(".env", "a") as f:
        f.write(f"JWT_SECRET_KEY={jwt_secret_key}\n")


def load_or_generate_jwt_secret_key():
    if not os.getenv("JWT_SECRET_KEY"):
        if os.path.exists(".env"):
            with open(".env", "r") as f:
                lines = f.readlines()
                for line in lines:
                    if line.startswith("JWT_SECRET_KEY="):
                        return
        generate_jwt_secret_key()


load_or_generate_jwt_secret_key()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SECURITY_PASSWORD_SALT = os.getenv("SECURITY_PASSWORD_SALT")
    # SECURITY_PASSWORD_SALT = "your_secret_salt"
    SECURITY_PASSWORD_HASH = "bcrypt"

    # Flask-Mail settings
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = int(os.getenv("MAIL_PORT") or 25)
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS") is not None
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")

    # URL of the frontend application
    FRONTEND_URL = os.getenv("FRONTEND_URL")


# class DevelopmentConfig(Config):
#     DEBUG = True

# class TestingConfig(Config):
#     TESTING = True
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

# class ProductionConfig(Config):
#     DEBUG = False

# config_by_name = {
#     'development': DevelopmentConfig,
#     'testing': TestingConfig,
#     'production': ProductionConfig
# }


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    MAIL_SUPPRESS_SEND = True
    WTF_CSRF_ENABLED = False
