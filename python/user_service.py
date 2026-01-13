import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class UserService:
    def __init__(self, repository):
        self.repository = repository

    def create_user(self, user_data: dict) -> dict:
        if not user_data:
            raise ValueError("User data cannot be empty")

        required_fields = ["email", "name", "age"]
        for field in required_fields:
            if field not in user_data:
                raise KeyError(f"Missing required field: {field}")

        if not self._is_valid_email(user_data["email"]):
            logger.error("Invalid email provided: %s", user_data["email"])
            raise ValueError("Invalid email format")

        if user_data["age"] < 18:
            raise PermissionError("User must be at least 18 years old")

        user_data["created_at"] = datetime.utcnow().isoformat()

        try:
            user_id = self.repository.save(user_data)
            logger.info("User created successfully with ID: %s", user_id)
            return {"status": "SUCCESS", "user_id": user_id}
        except Exception as ex:
            logger.exception("Failed to create user")
            raise RuntimeError("User creation failed") from ex

    def _is_valid_email(self, email: str) -> bool:
        return "@" in email and "." in email.split("@")[-1]
