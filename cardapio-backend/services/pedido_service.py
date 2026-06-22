from models.models import *
from database.database import SessionLocal


class PedidoService():
    session = SessionLocal()
    
    @classmethod
    def create(cls, pedido:dict):
        new_pedido = Pedido(**pedido)
        cls.session.add(new_pedido)
        cls.session.commit()
        return 'Pedido Feito com sucesso!'
    
    @classmethod 
    def find_pedido(cls):
        itens = cls.session.query(Pedido).filter(
            Pedido.status.in_(["pendente", "em_andamento"])
        ).all()
        result = []
        for e in itens:
            result.append(e.to_dict())
        return result
    
    @classmethod
    def iniciar(cls,id:int):
        try:
            pedido = cls.session.query(Pedido).where(Pedido.id == id).one()
            pedido.status = "em_andamento"
            cls.session.commit()
            cls.session.refresh(pedido)
            return pedido 
        except Exception as e:
            print(f"Erro ao iniciar pedido {id}: {e}")
            return None
    
    @classmethod
    def find_by_id(cls, id:int):
        pedido = cls.session.query(Pedido).where(Pedido.id == id).one()
        return pedido.to_dict()
    
    @classmethod
    def concluir(cls,id:int):
        try:
            pedido = cls.session.query(Pedido).where(Pedido.id == id).one()
            pedido.status = "Concluido"
            cls.session.commit()
            return pedido
        except Exception as e:
            print(f"Erro ao concluir pedido {id}: {e}")
            cls.session.rollback()
            return None
        
    @classmethod
    def excluir(cls, id: int):
        try:
            pedido = cls.session.query(Pedido).filter(Pedido.id == id).one()
            
            cls.session.query(ItemPedido).filter(ItemPedido.pedido_id == id).delete()
            
            cls.session.delete(pedido)
            cls.session.commit()
            return "Pedido Removido."
        except Exception as e:
            print(f"Erro ao remover pedido {id}: {e}")
            cls.session.rollback()
            return None