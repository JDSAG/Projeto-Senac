from models.models import Mesa
from database.database import SessionLocal
from schemas.schemas import MesaCreate

class MesaService():
    session = SessionLocal()
    
    @classmethod
    def create(cls,mesa:MesaCreate):
        try:
            new_mesa = Mesa(numero = mesa.numero)
            cls.session.add(new_mesa)
            cls.session.commit()
            cls.session.refresh()
            return new_mesa.to_dict()
        except Exception as e:
            cls.session.rollback()
            print(f"Erro ao adicionar mesa. Error: {e}")
            return None

