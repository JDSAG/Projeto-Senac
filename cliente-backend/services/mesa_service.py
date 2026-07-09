from models.models import Mesa
from database.database import SessionLocal
from fastapi import Request

class MesaService():
    session = SessionLocal()

    @classmethod 
    def find_all(cls):
        try:
            itens = cls.session.query(Mesa).order_by(Mesa.numero).all()
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
    