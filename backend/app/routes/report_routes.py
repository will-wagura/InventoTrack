from flask import Blueprint, request, jsonify
from app import db
from app.models import Product, Stock, Payment
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta

# Define the Blueprint
reports = Blueprint('report_routes', __name__)

@reports.route('/reports/weekly', methods=['GET'])
@jwt_required()
def get_weekly_report():
    user_id = get_jwt_identity()
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)
    
    report_data = fetch_report_data(user_id, start_date, end_date)
    return jsonify(report_data), 200

@reports.route('/reports/monthly', methods=['GET'])
@jwt_required()
def get_monthly_report():
    user_id = get_jwt_identity()
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    report_data = fetch_report_data(user_id, start_date, end_date)
    return jsonify(report_data), 200

@reports.route('/reports/annual', methods=['GET'])
@jwt_required()
def get_annual_report():
    user_id = get_jwt_identity()
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)
    
    report_data = fetch_report_data(user_id, start_date, end_date)
    return jsonify(report_data), 200

@reports.route('/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    user_id = get_jwt_identity()
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)
    
    analytics_data = fetch_analytics_data(user_id, start_date, end_date)
    return jsonify(analytics_data), 200

def fetch_report_data(user_id, start_date, end_date):
    products = Product.query.filter(Product.user_id == user_id, Product.created_at.between(start_date, end_date)).all()
    stocks = Stock.query.filter(Stock.user_id == user_id, Stock.created_at.between(start_date, end_date)).all()
    payments = Payment.query.filter(Payment.user_id == user_id, Payment.created_at.between(start_date, end_date)).all()

    report_data = {
        "products": [product.to_dict() for product in products],
        "stocks": [stock.to_dict() for stock in stocks],
        "payments": [payment.to_dict() for payment in payments]
    }
    return report_data

def fetch_analytics_data(user_id, start_date, end_date):
    products = Product.query.filter(Product.user_id == user_id, Product.created_at.between(start_date, end_date)).all()
    total_revenue = sum(product.price for product in products)

    analytics_data = {
        "total_revenue": total_revenue,
        "total_products": len(products),
        "time_period": f"{start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}"
    }
    return analytics_data