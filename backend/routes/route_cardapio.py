from fastapi import *
from services.cardapio_service import CardapioService
from schemas.schemas import CardapioCreate

router = APIRouter(prefix="/cardapio", tags=["Cardápio"])

@router.get("/")
def listar_cardapio():
    return CardapioService.find_by_active()


