from datetime import datetime, timedelta
from jose import jwt

from config import config


def create_access_token(data: dict):
    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=config.access_token_expire_minutes
    )

    payload.update({"exp": expire})

    return jwt.encode(
        payload,
        config.jwt_secret_key,
        algorithm=config.algorithm,
    )