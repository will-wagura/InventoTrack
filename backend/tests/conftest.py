import pytest
from app import create_app, db
from app.config import TestConfig

@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app()

    # Flask provides a way to test your application by exposing the Werkzeug test Client
    # and handling the context locals for you.
    testing_client = flask_app.test_client()

    # Establish an application context before running the tests.
    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client  # this is where the testing happens!

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    # Create the database and the database table(s)
    db.create_all()

    # Insert user data
    # db.session.add(User("admin", "admin@admin.com", "admin"))
    # db.session.commit()

    yield db  # this is where the testing happens!

    db.drop_all()