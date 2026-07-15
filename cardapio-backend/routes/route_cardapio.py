from fastapi import *
import cloudinary.uploader as cloudinary
from services.cardapio_service import CardapioService
from schemas.schemas import CardapioCreate
from database.database import SessionLocal
from models.models import Cardapio

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
    
@router.post("/{item_id}/imagem")
def upload_img(item_id: int, file: UploadFile = File(...)):
    session = SessionLocal()

    try:
        item = session.query(Cardapio).filter(Cardapio.id == item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Item não encontrado")

        img = cloudinary.upload(
            file.file,
            public_id=str(item_id),
            folder="cardapio_imgs",
            overwrite=True,
            resource_type="image",
        )

        
        item.imagem = img["secure_url"]
        session.commit()
        session.refresh(item)
        
        return {
            "success": True,
            "imagem": item.imagem,
            "version": img["version"],
            "public_id": img["public_id"],
        }
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()

@router.patch("/{item_id}/disponibilidade")
def toggle_disponibilidade(item_id:int):
    item = CardapioService.toggle_disponibilidade(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    return {"mensagem": "Status atualizado", "ativo": item.ativo}

