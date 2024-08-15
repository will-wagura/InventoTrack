from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_security import Security, SQLAlchemyUserDatastore
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO

# Initialize Flask extensions
db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()
migrate = Migrate()
cors = CORS()
bcrypt = Bcrypt()
socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Initialize database and migration
    db.init_app(app)
    migrate = Migrate(app, db)

    #Initialize Bcrypt
    bcrypt.init_app(app)

    # Setup Flask-Mail
    mail.init_app(app)

    # Setup JWT
    jwt.init_app(app)

    # Setup Cors
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize SocketIO
    socketio.init_app(app, cors_allowed_origins="*")

    #Import Models
    from .models import User, Role

    # Setup Flask-Security
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, user_datastore)

    # Register blueprints
    with app.app_context():
        from app.routes import auth_routes, email_routes, image_routes, payment_routes, product_routes, report_routes, supplies_routes, users_routes, chat_routes

        app.register_blueprint(auth_routes.bp)
        app.register_blueprint(email_routes.bp)
        app.register_blueprint(image_routes.bp)
        app.register_blueprint(payment_routes.payments)
        app.register_blueprint(product_routes.products)
        app.register_blueprint(report_routes.reports)
        app.register_blueprint(supplies_routes.supplies)
        app.register_blueprint(users_routes.users_routes)
        app.register_blueprint(chat_routes.chat_bp)

        #Create database tables
        db.create_all()

    return app