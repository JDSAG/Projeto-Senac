from fastapi import *
from services.cardapio_service import CardapioService

router = APIRouter(prefix="/cardapio", tags=["Cardápio"])

@router.get("/")
def listar_cardapio():
    return CardapioService.find_cardapio()


@router.patch("/{item_id}/disponibilidade")
def toggle_disponibilidade(item_id:int):
    item = CardapioService.toggle_disponibilidade(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    return {"mensagem": "Status atualizado", "ativo": item.ativo}
