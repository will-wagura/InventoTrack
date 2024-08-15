import pytest
from flask_socketio import SocketIOTestClient
from app import create_app, socketio, db
from app.models import User

@pytest.fixture(scope='module')
def app():
    app = create_app()
    with app.app_context():
        yield app

@pytest.fixture(scope='module')
def test_client(app):
    return app.test_client()

@pytest.fixture(scope='module')
def socket_client(app):
    client = SocketIOTestClient(app, socketio)
    return client

@pytest.fixture(scope='module')
def init_database(app):
    with app.app_context():
        db.create_all()

        user = User(name='Test User', email='test@example.com', password='password')
        db.session.add(user)
        db.session.commit()

        yield db

        db.session.remove()
        db.drop_all()

def test_connect(socket_client):
    socket_client.connect()
    assert socket_client.is_connected()

def test_message_event(socket_client, init_database):
    socket_client.emit('message', {'message': 'Hello, world!'})
    received = socket_client.get_received()
    assert len(received) > 0
    assert received[0]['name'] == 'message_response'
    assert received[0]['args'][0]['message'] == 'Hello, world!'
