import pytest
from app import create_app, db
from app.models import User, Role

@pytest.fixture(scope='module')
def app():
    app = create_app()
    with app.app_context():
        yield app

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

def test_user_creation(init_database):
    user = User.query.filter_by(email='test@example.com').first()
    assert user is not None
    assert user.name == 'Test User'
    assert user.email == 'test@example.com'

def test_role_creation(init_database):
    role = Role.query.filter_by(name='admin').first()
    assert role is not None
    assert role.description == 'Administrator'
