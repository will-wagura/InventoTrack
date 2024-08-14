from marshmallow import Schema, fields
from typing import Optional

class UserSchema(Schema):
    """
    Schema for user data.
    """
    id: int = fields.Int(dump_only=True)
    email: str = fields.Email(required=True)
    password: str = fields.Str(load_only=True, required=True)
    role: str = fields.Str(dump_only=True)
    created_at: Optional[str] = fields.DateTime(dump_only=True)