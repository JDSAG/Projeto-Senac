from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.database import SessionLocal  # ajuste pro nome real do seu arquivo/função de sessão
from auth.dependencies import get_cliente_atual
from schemas.schemas import PedidoCreate
from services.pedido_service import PedidoService

router = APIRouter(prefix="/pedido", tags=["pedido"])


@router.post("/")
def criar_pedido(dados: PedidoCreate, cliente = Depends(get_cliente_atual)):
    return PedidoService.create(
        mesa_id=cliente["mesa_id"],
        nome_cliente=cliente["nome_cliente"],
        itens=dados.itens
    )
#@router.get("/")