from fastapi import *
from services.dashboard_service import DashboardService


router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/resumo")
def listar_dashboards():
    return DashboardService.get_resume()    