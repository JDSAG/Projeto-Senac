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
        
    @classmethod 
    def find_all(cls):
        try:
            itens = cls.session.query(Mesa).all()
            result = []
            for e in itens:
                result.append(e.to_dict())
            return result
            
        except Exception as e:
            cls.session.rollback()
            print(f"Erro ao localizar mesa. Error: {e}")
            return None
        
    @classmethod
    def find_by_id(cls,id:int):
        try:
            result = cls.session.query(Mesa).where(Mesa.id == id).one()
            return result
        except Exception as e:
            cls.session.rollback()
            print(f"Erro ao localizar mesa. Error: {e}")
            return None
    
    @classmethod
    def change_status(cls, id:int,status:str):
        try:
            mesa = cls.session.query(Mesa).where(Mesa.id == id).one()
            mesa.status(status)
            cls.session.commit()
            cls.session.refresh(mesa)
            
        except Exception as e:
            cls.session.rollback()
            print(f"Erro ao localizar mesa. Error: {e}")
            return None
