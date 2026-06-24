from fastapi import *
from services.pedido_service import PedidoService

router = APIRouter(prefix="/pedido", tags=["Pedido"])

@router.get("/")
def listar_pedido():
    return PedidoService.find_pedido()

@router.post("/")
def create_pedido(pedido:dict):
    try:
        result = PedidoService.create(pedido)
        if not result:
            raise HTTPException(status_code=404, detail="Item não encontrado")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

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