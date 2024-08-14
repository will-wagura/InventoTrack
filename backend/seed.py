from datetime import datetime
import pytz
from app.models import db, bcrypt
from app.models import (
    Role,
    User,
    Store,
    Product,
    Stock,
    SupplyRequest,
    Payment,
    Image,
    ChatGroup,
    Message,
    GroupMessage,
)

EAT = pytz.timezone("Africa/Nairobi")


def seed_data(db, bcrypt):
    # Create a SuperAdmin role
    role_superadmin = Role(name="superadmin", description="Super Admin with all rights")

    # Create additional roles
    role_admin = Role(name="admin", description="Admin with limited rights")
    role_clerk = Role(
        name="clerk", description="Clerk with inventory management rights"
    )
    role_merchant = Role(name="Merchant", description="Merchant with sales rights")

    # Add roles to the session
    db.session.add_all([role_superadmin, role_admin, role_clerk, role_merchant])
    db.session.commit()

    # Create a SuperAdmin user
    superadmin_user = User(
        name="Super Admin",
        email="wathika02@gmail.com",
        password="changeme",
        confirmed_at=datetime.now(EAT),
        role="superadmin",
    )
    superadmin_user.roles.append(role_superadmin)

    # Create additional users
    user1 = User(
        name="Admin User",
        email="admin@example.com",
        password="adminpass",
        confirmed_at=datetime.now(EAT),
        role="admin",
    )
    user1.roles.append(role_admin)

    user2 = User(
        name="Clerk User",
        email="clerk@example.com",
        password="clerkpass",
        confirmed_at=datetime.now(EAT),
        role="clerk",
    )
    user2.roles.append(role_clerk)

    # user2 = User(
    #     name="Regular User",
    #     email="user@example.com",
    #     password="userpass",
    #     confirmed_at=datetime.now(EAT),
    #     role="user",
    # )
    # user2.roles.append(role_user)

    # Add users to the session and commit to get their IDs
    db.session.add_all([superadmin_user, user1, user2])
    db.session.commit()

    # Create products
    product1 = Product(
        name="Product 1",
        description="Description for Product 1",
        price=100.0,
        created_by=superadmin_user.id,
    )
    product2 = Product(
        name="Product 2",
        description="Description for Product 2",
        price=200.0,
        created_by=user1.id,
    )
    product3 = Product(
        name="Product 3",
        description="Description for Product 3",
        price=300.0,
        created_by=user2.id,
    )
    product4 = Product(
        name="Product 4",
        description="Description for Product 4",
        price=400.0,
        created_by=user2.id,
    )

    # Add products to the session and commit to get their IDs
    db.session.add_all([product1, product2, product3, product4])
    db.session.commit()

    # Create stock entries
    stock1 = Stock(product_id=product1.id, quantity=10)
    stock2 = Stock(product_id=product2.id, quantity=20)
    stock3 = Stock(product_id=product3.id, quantity=30)
    stock4 = Stock(product_id=product4.id, quantity=40)

    # Add stocks to the session
    db.session.add_all([stock1, stock2, stock3, stock4])

    # Create supply requests
    supply_request1 = SupplyRequest(
        product_id=product1.id,
        quantity=5,
        status="approved",
        requested_by=user1.id,
        approved_by=superadmin_user.id,
    )
    supply_request2 = SupplyRequest(
        product_id=product2.id, quantity=15, status="pending", requested_by=user2.id
    )
    supply_request3 = SupplyRequest(
        product_id=product3.id,
        quantity=25,
        status="rejected",
        requested_by=user2.id,
        approved_by=user1.id,
    )
    supply_request4 = SupplyRequest(
        product_id=product4.id,
        quantity=35,
        status="approved",
        requested_by=superadmin_user.id,
        approved_by=user2.id,
    )

    # Add supply requests to the session
    db.session.add_all(
        [supply_request1, supply_request2, supply_request3, supply_request4]
    )

    # Create payments
    payment1 = Payment(amount=1000.0, status="completed", user_id=superadmin_user.id)
    payment2 = Payment(amount=2000.0, status="pending", user_id=user1.id)
    payment3 = Payment(amount=3000.0, status="failed", user_id=user2.id)
    payment4 = Payment(amount=4000.0, status="completed", user_id=user2.id)

    # Add payments to the session
    db.session.add_all([payment1, payment2, payment3, payment4])

    # Create images
    image1 = Image(
        filename="image1.png",
        filepath="/path/to/image1.png",
        uploader_id=superadmin_user.id,
    )
    image2 = Image(
        filename="image2.png", filepath="/path/to/image2.png", uploader_id=user1.id
    )
    image3 = Image(
        filename="image3.png", filepath="/path/to/image3.png", uploader_id=user2.id
    )
    image4 = Image(
        filename="image4.png", filepath="/path/to/image4.png", uploader_id=user2.id
    )

    # Add images to the session
    db.session.add_all([image1, image2, image3, image4])

    # Create chat groups
    group1 = ChatGroup(name="Group 1")
    group2 = ChatGroup(name="Group 2")
    group3 = ChatGroup(name="Group 3")
    group4 = ChatGroup(name="Group 4")

    # Add members to groups
    group1.members.append(superadmin_user)
    group1.members.append(user1)
    group2.members.append(user2)
    group3.members.append(user2)
    group4.members.append(superadmin_user)

    # Add chat groups to the session and commit to get their IDs
    db.session.add_all([group1, group2, group3, group4])
    db.session.commit()

    # Create group messages
    group_message1 = GroupMessage(
        group_id=group1.id,
        sender_id=superadmin_user.id,
        content="Group message from Super Admin",
    )
    group_message2 = GroupMessage(
        group_id=group2.id, sender_id=user1.id, content="Group message from Admin"
    )
    group_message3 = GroupMessage(
        group_id=group3.id, sender_id=user2.id, content="Group message from Clerk"
    )
    group_message4 = GroupMessage(
        group_id=group4.id, sender_id=user2.id, content="Group message from User"
    )

    # Add group messages to the session
    db.session.add_all([group_message1, group_message2, group_message3, group_message4])

    # Commit all the changes
    db.session.commit()


if __name__ == "__main__":
    from app import create_app

    with create_app().app_context():
        seed_data(db, bcrypt)
        print("Data seeded successfully.")
