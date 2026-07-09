from fastapi import *
from services.pedido_service import PedidoService
from schemas.schemas import *

router = APIRouter(prefix="/pedido", tags=["Pedido"])

@router.get("/")
def listar_pedido():
    return PedidoService.find_pedido()

@router.post("/")
def create_pedido(pedido:PedidoCreate):
    try:
        result = PedidoService.create(pedido)
        if not result:
            raise HTTPException(status_code=400,detail="Não foi possível criar o pedido")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{item_id}")
def buscar_pedido(item_id: int):
    pedido = PedidoService.find_by_id(item_id)
    if not pedido:
        raise HTTPException(status_code=404,detail="Pedido não encontrado")
    return pedido

@router.patch("/{item_id}/iniciar")
def iniciar_pedido(item_id:int):
    pedido = PedidoService.iniciar(item_id)
    if not pedido:
        raise HTTPException(status_code=404, detail="Item não encontrado")    
    return {"mensagem": "Status atualizado", "Pedido": pedido.status}

@router.patch("/{item_id}/concluir")
def concluir_pedido(item_id:int):
    pedido = PedidoService.concluir(item_id)
    if not pedido:
        raise HTTPException(status_code=404, detail="Item não encontrado")    
    return {"mensagem": "Status atualizado", "Pedido": pedido.status}

@router.patch("/{item_id}/excluir")
def excluir_pedido(item_id:int):
    pedido = PedidoService.excluir(item_id)
    if not pedido:
        raise HTTPException(status_code=404, detail="Item não encontrado")  
    return pedido