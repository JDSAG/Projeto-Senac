from fastapi import *
from services.mesa_service import MesaService, MesaCreate

router = APIRouter(prefix="/mesa",tags=["Mesa"])

@router.post("/")
def create_mesa(mesa: MesaCreate):
    try:
        result = MesaService.create(mesa)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
