from flask_security import UserMixin, RoleMixin
from datetime import datetime
import pytz
from flask_bcrypt import Bcrypt
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# from sqlalchemy import Metadata

bcrypt = Bcrypt()
# Set the EAT timezone
EAT = pytz.timezone("Africa/Nairobi")

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)


# Define the Role model
class Role(db.Model, RoleMixin):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "description": self.description}


# Association table for many-to-many relationship between User and Role
user_roles = db.Table(
    "user_roles",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("role_id", db.Integer, db.ForeignKey("roles.id"), primary_key=True),
)


# Define the User model
class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    fs_uniquifier = db.Column(
        db.String(255), unique=True, nullable=False, default=lambda: str(uuid4())
    )
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean(), default=True)
    confirmed_at = db.Column(db.DateTime(), nullable=True)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    roles = db.relationship(
        "Role", secondary=user_roles, backref=db.backref("users", lazy="dynamic")
    )
    images = db.relationship("Image", back_populates="uploader", lazy="dynamic")
    groups = db.relationship(
        "ChatGroup", secondary="group_members", back_populates="members"
    )

    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "active": self.active,
            "confirmed_at": self.confirmed_at,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "roles": [role.to_dict() for role in self.roles],
        }


# Define the Product model
class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    expiry_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(EAT))
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    user = db.relationship("User", backref=db.backref("products", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "expiry_date": (
                self.expiry_date.strftime("%Y-%m-%d") if self.expiry_date else None
            ),
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "created_by": self.created_by,
            "user": self.user.to_dict() if self.user else None,
        }


# Define the Stock model
class Stock(db.Model):
    __tablename__ = "stocks"
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    product = db.relationship("Product", backref=db.backref("stocks", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "product": self.product.to_dict(),
        }


# Define the Supply Request model
class SupplyRequest(db.Model):
    __tablename__ = "supply_requests"
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), default="pending")
    requested_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    approved_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    product = db.relationship(
        "Product", backref=db.backref("supply_requests", lazy=True)
    )
    requested_user = db.relationship(
        "User",
        foreign_keys=[requested_by],
        backref=db.backref("supply_requests", lazy=True),
    )
    approved_user = db.relationship(
        "User",
        foreign_keys=[approved_by],
        backref=db.backref("approved_supply_requests", lazy=True),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "status": self.status,
            "requested_by": self.requested_by,
            "approved_by": self.approved_by,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "product": self.product.to_dict(),
            "requested_user": (
                self.requested_user.to_dict() if self.requested_user else None
            ),
            "approved_user": (
                self.approved_user.to_dict() if self.approved_user else None
            ),
        }


# Define the Payment model
class Payment(db.Model):
    __tablename__ = "payments"
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    user = db.relationship("User", backref=db.backref("payments", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "status": self.status,
            "user_id": self.user_id,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "user": self.user.to_dict(),
        }


# Define the Image model
class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    uploader_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    uploaded_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    uploader = db.relationship("User", back_populates="images")

    def __repr__(self):
        return f"Image('{self.filename}', '{self.uploader_id}')"

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "filepath": self.filepath,
            "uploader_id": self.uploader_id,
            "uploaded_at": self.uploaded_at.strftime("%Y-%m-%d %H:%M:%S"),
            "uploader": self.uploader.to_dict() if self.uploader else None,
        }


# Define the Message model
ENCRYPTION_KEY = os.urandom(16)


class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(
        db.DateTime, default=lambda: datetime.now(pytz.timezone("EAT"))
    )
    is_read = db.Column(db.Boolean, default=False)

    # Relationships
    sender = db.relationship(
        "User", foreign_keys=[sender_id], backref=db.backref("sent_messages", lazy=True)
    )
    receiver = db.relationship(
        "User",
        foreign_keys=[receiver_id],
        backref=db.backref("received_messages", lazy=True),
    )

    def encrypt_content(self, content):
        # Create an AES-GCM cipher object
        cipher = Cipher(
            algorithms.AES(ENCRYPTION_KEY),
            modes.GCM(iv=os.urandom(12)),
            backend=default_backend(),
        )
        encryptor = cipher.encryptor()

        # Encrypt the content
        encrypted_content = encryptor.update(content.encode()) + encryptor.finalize()

        # Store the encrypted content
        self.encrypted_content = encrypted_content

    def decrypt_content(self):
        # Create an AES-GCM cipher object
        cipher = Cipher(
            algorithms.AES(ENCRYPTION_KEY),
            modes.GCM(iv=self.iv),
            backend=default_backend(),
        )
        decryptor = cipher.decryptor()

        # Decrypt the encrypted content
        decrypted_content = (
            decryptor.update(self.encrypted_content) + decryptor.finalize()
        )

        return decrypted_content.decode()

    def to_dict(self):
        decrypted_content = self.decrypt_content()
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": decrypted_content,
            "timestamp": self.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "is_read": self.is_read,
        }


# Define the ChatGroup model
class ChatGroup(db.Model):
    __tablename__ = "chat_groups"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(
        db.DateTime, nullable=False, default=lambda: datetime.now(pytz.timezone("EAT"))
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=lambda: datetime.now(pytz.timezone("EAT"))
    )

    # Relationship to link users to groups
    members = db.relationship(
        "User", secondary="group_members", back_populates="groups"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "members": [user.to_dict() for user in self.members],
        }


# Association table for many-to-many relationship between User and ChatGroup
group_members = db.Table(
    "group_members",
    db.Column("group_id", db.Integer, db.ForeignKey("chat_groups.id")),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
)


# Define the GroupMessage model
class GroupMessage(db.Model):
    __tablename__ = "group_messages"
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey("chat_groups.id"), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(
        db.DateTime, nullable=False, default=lambda: datetime.now(pytz.timezone("EAT"))
    )

    # Relationships
    group = db.relationship("ChatGroup", backref=db.backref("messages", lazy=True))
    sender = db.relationship("User", backref=db.backref("group_messages", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "group_id": self.group_id,
            "sender_id": self.sender_id,
            "content": self.content,
            "timestamp": self.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        }
from flask_security import UserMixin, RoleMixin
from datetime import datetime
import pytz
from app import db, bcrypt
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from uuid import uuid4

# Set the EAT timezone
EAT = pytz.timezone('Africa/Nairobi')

# Define the Role model
class Role(db.Model, RoleMixin):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }

# Association table for many-to-many relationship between User and Role
user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id'), primary_key=True)
)

# Define the User model
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False, default=lambda: str(uuid4()))
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean(), default=True)
    confirmed_at = db.Column(db.DateTime(), nullable=True)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    roles = db.relationship('Role', secondary=user_roles, backref=db.backref('users', lazy='dynamic'))
    images = db.relationship('Image', back_populates='uploader', lazy='dynamic')
    groups = db.relationship('ChatGroup', secondary='group_members', back_populates='members')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "active": self.active,
            "confirmed_at": self.confirmed_at,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "roles": [role.to_dict() for role in self.roles]
        }

# Define the Product model
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    expiry_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(EAT))
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    user = db.relationship('User', backref=db.backref('products', lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "expiry_date": self.expiry_date.strftime('%Y-%m-%d') if self.expiry_date else None,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "created_by": self.created_by,
            "user": self.user.to_dict() if self.user else None
        }

# Define the Stock model
class Stock(db.Model):
    __tablename__ = 'stocks'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    product = db.relationship('Product', backref=db.backref('stocks', lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "product": self.product.to_dict()
        }

# Define the Supply Request model
class SupplyRequest(db.Model):
    __tablename__ = 'supply_requests'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), default='pending')
    requested_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    approved_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    product = db.relationship('Product', backref=db.backref('supply_requests', lazy=True))
    requested_user = db.relationship('User', foreign_keys=[requested_by], backref=db.backref('supply_requests', lazy=True))
    approved_user = db.relationship('User', foreign_keys=[approved_by], backref=db.backref('approved_supply_requests', lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "status": self.status,
            "requested_by": self.requested_by,
            "approved_by": self.approved_by,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "product": self.product.to_dict(),
            "requested_user": self.requested_user.to_dict() if self.requested_user else None,
            "approved_user": self.approved_user.to_dict() if self.approved_user else None
        }

# Define the Payment model
class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))
    updated_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    user = db.relationship('User', backref=db.backref('payments', lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "status": self.status,
            "user_id": self.user_id,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "user": self.user.to_dict()
        }

# Define the Image model
class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    uploader_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    uploaded_at = db.Column(db.DateTime(), default=lambda: datetime.now(EAT))

    # Relationships
    uploader = db.relationship('User', back_populates='images')

    def __repr__(self):
        return f"Image('{self.filename}', '{self.uploader_id}')"

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "filepath": self.filepath,
            "uploader_id": self.uploader_id,
            "uploaded_at": self.uploaded_at.strftime('%Y-%m-%d %H:%M:%S'),
            "uploader": self.uploader.to_dict() if self.uploader else None
        }
  
# Define the Message model
ENCRYPTION_KEY = os.urandom(16)  

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(pytz.timezone('EAT')))
    is_read = db.Column(db.Boolean, default=False)
    
    #Relationships
    sender = db.relationship('User', foreign_keys=[sender_id], backref=db.backref('sent_messages', lazy=True))
    receiver = db.relationship('User', foreign_keys=[receiver_id], backref=db.backref('received_messages', lazy=True))

    def encrypt_content(self, content):
        # Create an AES-GCM cipher object
        cipher = Cipher(algorithms.AES(ENCRYPTION_KEY), modes.GCM(iv=os.urandom(12)), backend=default_backend())
        encryptor = cipher.encryptor()

        # Encrypt the content
        encrypted_content = encryptor.update(content.encode()) + encryptor.finalize()

        # Store the encrypted content
        self.encrypted_content = encrypted_content

    def decrypt_content(self):
        # Create an AES-GCM cipher object 
        cipher = Cipher(algorithms.AES(ENCRYPTION_KEY), modes.GCM(iv=self.iv), backend=default_backend())
        decryptor = cipher.decryptor()

        # Decrypt the encrypted content
        decrypted_content = decryptor.update(self.encrypted_content) + decryptor.finalize()

        return decrypted_content.decode()

    def to_dict(self):
        decrypted_content = self.decrypt_content()
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'content': decrypted_content,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'is_read': self.is_read,
        }

# Define the ChatGroup model
class ChatGroup(db.Model):
    __tablename__ = 'chat_groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(pytz.timezone('EAT')))
    updated_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(pytz.timezone('EAT')))
    
    # Relationship to link users to groups
    members = db.relationship('User', secondary='group_members', back_populates='groups')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "members": [user.to_dict() for user in self.members]
        }

# Association table for many-to-many relationship between User and ChatGroup
group_members = db.Table('group_members',
    db.Column('group_id', db.Integer, db.ForeignKey('chat_groups.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

# Define the GroupMessage model
class GroupMessage(db.Model):
    __tablename__ = 'group_messages'
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('chat_groups.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(pytz.timezone('EAT')))
    
    #Relationships
    group = db.relationship('ChatGroup', backref=db.backref('messages', lazy=True))
    sender = db.relationship('User', backref=db.backref('group_messages', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'group_id': self.group_id,
            'sender_id': self.sender_id,
            'content': self.content,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
        }