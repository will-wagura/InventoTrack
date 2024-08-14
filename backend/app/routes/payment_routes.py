from flask import Blueprint, request, jsonify
from app import db
from app.models import Payment
from flask_jwt_extended import jwt_required, get_jwt_identity

# Define the Blueprint
payments = Blueprint('payment_routes', __name__)

@payments.route('/payment', methods=['GET'])
@jwt_required()
def get_payments():
    user_id = get_jwt_identity()
    payments = Payment.query.filter_by(user_id=user_id).all()
    payment_list = [payment.to_dict() for payment in payments]
    return jsonify(payment_list), 200

@payments.route('/payment/<int:id>', methods=['PUT'])
@jwt_required()
def update_payment(id):
    data = request.get_json()
    payment = Payment.query.get_or_404(id)
    
    # Verify if the user has permission to update the payment
    if payment.user_id != get_jwt_identity():
        return jsonify({"msg": "Permission denied"}), 403

    payment.status = data.get('status', payment.status)
    db.session.commit()
    return jsonify(payment.to_dict()), 200