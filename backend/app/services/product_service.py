from models import Product, db

class ProductService:
    @staticmethod
    def add_product(data):
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            quantity=data['quantity']
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product

    @staticmethod
    def update_product(product_id, data):
        product = Product.query.get(product_id)
        if not product:
            return None
        
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.quantity = data.get('quantity', product.quantity)
        
        db.session.commit()
        return product

    @staticmethod
    def delete_product(product_id):
        product = Product.query.get(product_id)
        if not product:
            return None
        
        db.session.delete(product)
        db.session.commit()
        return product

    @staticmethod
    def get_product(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def get_all_products():
        return Product.query.all()
