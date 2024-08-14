from marshmallow import Schema, fields
from typing import Optional

class ReportSchema(Schema):
    """
    Schema for report data.
    """
    id: int = fields.Int(dump_only=True)
    title: str = fields.Str(required=True)
    content: str = fields.Str(required=True)
    created_at: Optional[str] = fields.DateTime(dump_only=True)
    generated_by: int = fields.Int(required=True)