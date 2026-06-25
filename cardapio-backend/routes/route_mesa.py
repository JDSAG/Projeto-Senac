from fastapi import *
from fastapi.responses import StreamingResponse
from services.mesa_service import MesaService, MesaCreate
from io import BytesIO
import qrcode

router = APIRouter(prefix="/mesa",tags=["Mesa"])

@router.get("/")
def listar_mesa():
    try:
        return MesaService.find_all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/")
def create_mesa(mesa: MesaCreate):
    try:
        result = MesaService.create(mesa)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/{mesa_id}",name="find_id_mesa")
def find_id_mesa(mesa_id:int):
    try:
        return MesaService.find_by_id(mesa_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/{mesa_id}/qrcode")
def visualizar_qrcode(mesa_id: int,request: Request):
    try:
        url = MesaService.gerar_url_qrcode(mesa_id,request)
        qr = qrcode.make(url)
        buffer = BytesIO()
        qr.save(buffer, format="PNG")
        buffer.seek(0)
        return StreamingResponse(buffer,media_type="image/png")
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))