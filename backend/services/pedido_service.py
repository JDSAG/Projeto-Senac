from models.models import *
from database.database import SessionLocal
from schemas.schemas import PedidoCreate

class PedidoService():
    session = SessionLocal()
    
    @classmethod
    def create(cls, pedido:PedidoCreate):
        try:
            mesa = cls.session.query(Mesa).filter(Mesa.id == pedido.mesa_id).first()
            if not mesa:
                raise ValueError("Mesa não encontrada")
            
            if mesa.status in ["ocupado", "reservado"]:
                raise ValueError(f"Mesa {mesa.numero} não pode receber pedidos")
            
            new_pedido = Pedido(
                nome_cliente=pedido.nome_cliente,
                mesa_id=pedido.mesa_id
            )
            
            cls.session.add(new_pedido)
            cls.session.flush()
            
            for item in pedido.itens:
                produto = cls.session.query(Cardapio).filter(Cardapio.id == item.produto_id).first()
                if not produto:
                    raise ValueError(f"Produto {item.produto_id} não encontrado")
                
                if not produto.ativo:
                    raise ValueError(f"Produto '{produto.nome}' está indisponível")
                
                quantidade = item.quantidade
                subtotal = produto.preco * quantidade
                
                novo_item = ItemPedido(
                    pedido_id=new_pedido.id,
                    produto_id=produto.id,
                    quantidade=quantidade,
                    subtotal=subtotal
                )
                cls.session.add(novo_item)
                
            cls.session.commit()
            cls.session.refresh(new_pedido)
            return new_pedido.to_dict()
        
        except Exception as e:
            cls.session.rollback()
            print(f"Erro ao criar pedido: {e}")
            raise
    
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
            raise
    
    @classmethod
    def find_by_id(cls, id:int):
        pedido = cls.session.query(Pedido).where(Pedido.id == id).one()
        return pedido.to_dict()
    
