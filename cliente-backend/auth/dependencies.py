from jose import jwt, JWTError, ExpiredSignatureError

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from config import config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_cliente_atual(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            config.jwt_secret_key,
            algorithms=[config.algorithm],
        )
        return payload

    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Token expirado",)

    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Token inválido",)