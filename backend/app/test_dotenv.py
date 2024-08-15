from dotenv import load_dotenv

load_dotenv()

import os

print(os.getenv("SECRET_KEY"))
print(os.getenv("DATABASE_URL"))
print(os.getenv("JWT_SECRET_KEY"))
print(os.getenv("SECURITY_PASSWORD_SALT"))
print(os.getenv("MAIL_SERVER"))
