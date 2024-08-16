# InventoTrack

## Overview

InventoTrack is a comprehensive inventory management application designed to streamline stock taking and record keeping for businesses. The app allows users to efficiently track inventory, generate automated reports, and maintain accurate records, ultimately aiding in informed decision-making.

## Features

- **Role-Based Access Control**: Secure access based on user roles (Superuser, Admin, Clerk).
- **Stock Management**: Add, update, and track inventory items.
- **Automated Reports**: Generate weekly, monthly, and annual reports.
- **User Management**: Superuser-initiated admin registration and admin-managed clerk registration.
- **Chat Feature**: Real-time communication between users with notifications, emojis, and link sharing.
- **Security**: Implemented with Flask-Security-Too for robust authentication and authorization.

LIVE API: https://inventotrack-dv5n.onrender.com/test

Logins:
{
"email": "wathika02@gmail.com",
"password": "changeme"
}

## Tech Stack

- **Backend**: Flask

  - Flask-Security-Too for authentication and authorization
  - SQLAlchemy for database management
  - Pillow for image processing
  - Marshmallow for data serialization
  - Flask SocketIO for socket creation
  - Database: PostgreSQL

- **Frontend**: React (with Vite and TypeScript)

  - Axios for API requests
  - Redux for state management
  - Tailwind CSS for styling

- **Database**: PostgreSQL

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- PostgreSQL

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/will-wagura/InventoTrack.git --depth 1 && cd InventoTrack/backend
   ```

2. Create and activate a virtual environment and install dependencies
   ```bash
   pipenv install && pipenv shell
   ```
3. You can also use virtualenv if you don't have pipenv installed

   ```
   virtualenv .venv
   ```

   ```
   source .venv/bin/activate
   ```

   ```
   pip install -r requirements.txt
   ```

   \*\* cd to the backend directory

   ```bash
   cd backend/
   ```

4. Set-up environment variables in .env file
   ```bash
   FLASK_APP=app
   FLASK_ENV=development
   SECRET_KEY=your_secret_key
   SECURITY_PASSWORD_SALT=your_salt
   DATABASE_URL=postgresql://username:password@localhost/InventoTrack_db
   ```
   OR:
   ```bash
   cp .env.example .env
   ```
5. Initialize the database
   ```bash
   flask db init
   flask db migrate -m "Initial Migration"
   flask db upgrade head
   python server.py/seed.py # to populate the database with initial data
   ```
6. Run backend server
   ```bash
   flask run
   ```
   or
   ```bash
   gunicorn -w 4 -b server:app
   ```

### Frontend Setup

1. Navigate to frontend directory
   ```bash
   cd frontend
   ```
2. Install required npm packages
   ```bash
   npm install
   ```
3. start the development server
   ```bash
   npm run dev
   ```

## Running the App

Ensure both the backend and frontend servers are running.
Open your browser and go to http://localhost:5173 to access the application.

## Usage

Superuser (or superadmin): Can initiate admin registration and oversee the entire application, including monitoring chat activity.
Admin: Manages inventory and oversees clerks.
Clerk: Handles data entry and stock management.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact:

Group 5
