from fastapi import *
from services.cardapio_service import CardapioService
from schemas.schemas import CardapioCreate

router = APIRouter(prefix="/cardapio", tags=["Cardápio"])

@router.get("/")
def listar_cardapio():
    return CardapioService.find_cardapio()

@router.post("/")
def criar_cardapio(cardapio:CardapioCreate):
    try:
        result = CardapioService.create(cardapio)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{item_id}/disponibilidade")
def toggle_disponibilidade(item_id:int):
    item = CardapioService.toggle_disponibilidade(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    return {"mensagem": "Status atualizado", "ativo": item.ativo}
