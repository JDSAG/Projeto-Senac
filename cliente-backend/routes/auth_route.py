from fastapi import APIRouter, HTTPException, Depends

from schemas.schemas import LoginRequest, TokenResponse
from auth.auth_service import AuthService
from auth.dependencies import get_cliente_atual

router = APIRouter(prefix="/auth",tags=["auth"],)

@router.post("/login",response_model=TokenResponse,)
def login(login: LoginRequest):
    try:
        return AuthService.login(login.mesa_id,login.nome_cliente)

    except ValueError as e:
        raise HTTPException(status_code=404,detail=str(e),)


@router.get("/me")
def me(cliente=Depends(get_cliente_atual)):
    return cliente