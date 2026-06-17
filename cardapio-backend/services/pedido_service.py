from models.models import *
from database.database import SessionLocal


class PedidoService():
    session = SessionLocal()
    
    @classmethod 
    def find_pedido(cls):
        itens = cls.session.query(Pedido).all()
        result = []
        for e in itens:
            result.append(e.to_dict())
        return result
    
    @classmethod
    def find_by_id(cls, id:int):
        pedido = cls.session.query(Pedido).where(Pedido.id == id).one()
        return pedido.to_dict()
    
    @classmethod
    def concluir(cls,id:int):
        try:
            pedido = cls.session.query(Pedido).where(Pedido.id == id).one()
            if not pedido:
                return None
            pedido.status = "Concluido"
            cls.session.commit()
            return pedido
            
        except Exception as e:
            cls.session.rollback()
            return e
        
    @classmethod
    def excluir(cls, id:int):
        try:
            cls.session.query(Pedido).where(Pedido.id == id).one()
            cls.session.execute(delete(Pedido).where(Pedido.id == id))
            cls.session.commit()
            return f"Pedido Removido."
        except Exception as e:
            return e
        
    