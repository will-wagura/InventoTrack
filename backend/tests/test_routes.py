import pytest
from flask import json
from app import create_app, db
from app.models import User, Role
import jwt

@pytest.fixture(scope='module')
def app():
    app = create_app()
    with app.app_context():
        yield app

@pytest.fixture(scope='module')
def client(app):
    return app.test_client()

@pytest.fixture(scope='module')
def init_database(app):
    with app.app_context():
        db.create_all()

        # Create roles and users
        role = Role(name='admin', description='Administrator')
        user = User(name='Test User', email='test@example.com', password='password')

        db.session.add(role)
        db.session.add(user)
        db.session.commit()

        yield db

        db.session.remove()
        db.drop_all()

def generate_invitation_token(app, email, role):
    print("Generating token with email:", email, "and role:", role)
    token = jwt.encode({
        'email': email,
        'role': role
    }, app.config['SECRET_KEY'], algorithm='HS256')
    print("Generated token:", token)
    return token

def test_user_creation_route(client, init_database, app):
    # Generate a valid token
    token = generate_invitation_token(app, 'test@example.com', 'admin')

    # Verify the token to ensure it's valid
    decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    assert decoded_token['email'] == 'test@example.com'
    assert decoded_token['role'] == 'admin'

    # Send a POST request to the user creation endpoint with the valid token
    response = client.post('/register', json={
        'token': token,
        'fullname': 'Test User',
        'email': 'test@example.com',
        'contact': '1234567890',
        'password': 'newpassword',
        'confirm_password': 'newpassword'
    })

    # Check that the response was successful
    assert response.status_code == 201
    assert 'error' not in response.json

    # Check that the user was created
    user = User.query.filter_by(email='test@example.com').first()
    assert user is not None
    assert user.email == 'test@example.com'
    assert user.active == True
    assert user.fullname == 'Test User'
    assert user.contact == '1234567890'

    # Check that the user has the correct role
    role = Role.query.filter_by(name='admin').first()
    assert role in user.roles

def test_user_creation_route_expired_token(client, init_database, app):
    # Generate a token that has expired
    token = generate_invitation_token(app, 'test@example.com', 'admin', expires_in=-3600)

    # Send a POST request to the user creation endpoint with the expired token
    response = client.post('/register', json={
        'token': token,
        'password': 'newpassword'
    })

    # Check that the response is an error
    assert response.status_code == 400

def test_get_users_route(client, init_database):
    response = client.get('/api/users')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0

def test_get_user_route(client, init_database):
    response = client.get('/api/users/1')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['email'] == 'test@example.com'

def test_role_creation_route(client, init_database):
    response = client.post('/api/roles', json={
        'name': 'manager',
        'description': 'Manager Role'
    })
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'manager'
    assert data['description'] == 'Manager Role'