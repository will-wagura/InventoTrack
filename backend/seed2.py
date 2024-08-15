if __name__ == "__main__":
    from app import create_app
    from faker import Faker
    from app.models import db, User, Role, Store, Product, Stock, SupplyRequest, Payment
    from datetime import datetime
    from pytz import timezone

    EAT = timezone("Africa/Nairobi")
    with create_app().app_context():
        # Initialize Faker
        faker = Faker()

        # Create roles
        roles = ["superadmin", "admin", "clerk"]
        for role_name in roles:
            role = Role(name=role_name, description=faker.sentence())
            db.session.add(role)

        # Commit roles
        db.session.commit()

        # Create superadmin user
        superadmin = User(
            name="Super Admin",
            email="wathika02@gmail.com",
            password="changeme",  # This will be hashed automatically
            role="superadmin",
            confirmed_at=datetime.now(EAT),
        )

        superadmin.roles.append(Role.query.filter_by(name="superadmin").first())
        db.session.add(superadmin)
        db.session.commit()

        # Create fake users
        users = []
        for i in range(4):  # 4 users + 1 superadmin makes 5
            user = User(
                name=faker.name(),
                email=faker.email(),
                password="changeme",  # This will be hashed automatically
                role=faker.random.choice(["admin", "clerk"]),
                confirmed_at=datetime.now(EAT),
            )
            user.roles.append(Role.query.filter_by(name=user.role).first())
            users.append(user)

        # Add users to session and commit
        db.session.add_all(users)
        db.session.commit()

        # Create fake stores
        stores = []
        for i in range(5):
            store = Store(
                name=faker.company(),
                location=faker.address(),
                created_by=superadmin.id,
                admin_id=faker.random.choice(users).id,
            )
            stores.append(store)

        # Add stores to session and commit
        db.session.add_all(stores)
        db.session.commit()

        # Create fake products
        products = []
        for i in range(5):
            product = Product(
                name=faker.word(),
                description=faker.sentence(),
                category=faker.word(),
                price=faker.random_number(digits=5, fix_len=True) / 100,
                expiry_date=faker.date_time_between(
                    start_date="now", end_date="+1y", tzinfo=EAT
                ),
                created_by=faker.random.choice(users).id,
                store_id=faker.random.choice(stores).id,
            )
            products.append(product)

        # Add products to session and commit
        db.session.add_all(products)
        db.session.commit()

        # Create fake stocks
        stocks = []
        for product in products:
            stock = Stock(
                product_id=product.id,
                quantity=faker.random_number(digits=3),
            )
            stocks.append(stock)

        # Add stocks to session and commit
        db.session.add_all(stocks)
        db.session.commit()

        # Create fake supply requests
        supply_requests = []
        for i in range(5):
            supply_request = SupplyRequest(
                product_id=faker.random.choice(products).id,
                quantity=faker.random_number(digits=2),
                status=faker.random.choice(["pending", "approved", "declined"]),
                requested_by=faker.random.choice(users).id,
                approved_by=faker.random.choice(users).id if faker.boolean() else None,
            )
            supply_requests.append(supply_request)

        # Add supply requests to session and commit
        db.session.add_all(supply_requests)
        db.session.commit()

        # Create fake payments
        payments = []
        for i in range(5):
            payment = Payment(
                amount=faker.random_number(digits=5),
                status=faker.random.choice(["paid", "unpaid"]),
                user_id=faker.random.choice(users).id,
            )
            payments.append(payment)

        # Add payments to session and commit
        db.session.add_all(payments)
        db.session.commit()

        print("Fake data inserted successfully!")
