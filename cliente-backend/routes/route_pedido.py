from fastapi import APIRouter, Depends, HTTPException

from auth.dependencies import get_cliente_atual
from schemas.schemas import PedidoCreate
from services.pedido_service import PedidoService

router = APIRouter(prefix="/pedido",tags=["Pedido"])

@router.post("/")
def criar_pedido(dados: PedidoCreate,cliente=Depends(get_cliente_atual),):
    try:
        return PedidoService.create(
            mesa_id=cliente["mesa_id"],
            nome_cliente=cliente["nome_cliente"],
            itens=dados.itens,
        )
    except ValueError as e:
        raise HTTPException(status_code=400,detail=str(e),)


@router.get("/")
def listar_pedido(cliente=Depends(get_cliente_atual),):
    try:
        return PedidoService.listar(
            cliente["mesa_id"],
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete("/item/{item_id}")
def remover_item(
    item_id: int,
    cliente=Depends(get_cliente_atual),
):
    try:
        return PedidoService.remover_item(
            item_id,
            cliente["mesa_id"],
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.patch("/finalizar")
def finalizar_pedido(cliente=Depends(get_cliente_atual)):
    try:
        return PedidoService.finalizar_pedido_cliente(cliente["mesa_id"],)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )