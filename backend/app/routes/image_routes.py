import os
from app import db
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from PIL import Image as PILImage
from app.models import Image, User

# Define the Blueprint
bp = Blueprint("image_routes", __name__)

UPLOAD_FOLDER = "uploads/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@bp.route("/images/upload", methods=["POST"])
@jwt_required()
def upload_image():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # Resize image
        image = PILImage.open(file)
        image = image.resize((300, 300))  # Resize to 300x300
        image.save(file_path)

        # Save image metadata to database
        image_record = Image(
            filename=filename, filepath=file_path, uploader_id=current_user_id
        )
        db.session.add(image_record)
        db.session.commit()

        return (
            jsonify({"message": "Image uploaded successfully", "filename": filename}),
            200,
        )

    return jsonify({"error": "Invalid file type"}), 400


@bp.route("/images/<int:image_id>", methods=["DELETE"])
@jwt_required()
def delete_image(image_id):
    image = Image.query.get(image_id)

    if not image:
        return jsonify({"error": "Image not found"}), 404

    file_path = image.filepath

    if os.path.exists(file_path):
        os.remove(file_path)
        db.session.delete(image)
        db.session.commit()
        return jsonify({"message": "Image deleted successfully"}), 200
    else:
        return jsonify({"error": "File not found"}), 404
