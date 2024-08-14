from marshmallow import Schema, fields, validate
from typing import Optional

class ProductSchema(Schema):
    """
    Schema for product data.
    """
    id: int = fields.Int(dump_only=True)
    name: str = fields.Str(required=True)
    description: str = fields.Str(required=True)
    price: float = fields.Float(required=True, validate=validate.Range(min=0))
    quantity: int = fields.Int(required=True, validate=validate.Range(min=0))
    created_at: Optional[str] = fields.DateTime(dump_only=True)