from fastapi import APIRouter, HTTPException
from schemas.schemas import LoginRequest
from schemas.schemas import TokenResponse
from auth.auth_service import AuthService

router = APIRouter(prefix="/auth",tags=["auth"],)


@router.post("/login",response_model=TokenResponse,)

def login(login: LoginRequest):

    try:

        return AuthService.login(
            login.mesa_id,
            login.nome_cliente,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )