from sqlalchemy import *
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Mesa(Base):
    __tablename__ = "mesas"
    id = Column(Integer, primary_key=True)
    numero = Column(Integer, nullable=False)
    qrcode = Column(String,nullable=True) #O proprio Dev que irá mudar ou colocar o link para a mesa, isso aqui é um registro do restaurante
    status = Column(String, nullable=False) #Caso ocupado, tals
    
    pedidos = relationship("Pedido", back_populates="mesa")
    
    def to_dict(self):
        return{
            "id":self.id,
            "numero":self.numero,
            "status":self.status
        }

class Cardapio(Base):
    __tablename__ = "cardapio"
    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    descricao = Column(String,nullable=False)
    preco = Column(Float,nullable=False)
    categoria = Column(String,nullable=False)  
    ativo = Column(Boolean,default=True)
    
    def to_dict(self):
        return{
            "id":self.id,
            "nome":self.nome,
            "descricao":self.descricao,
            "preco":self.preco,
            "categoria":self.categoria,
            "ativo":self.ativo
        }
    
    
class Pedido(Base):
    __tablename__ = "pedidos"
    id = Column(Integer, primary_key=True)
    nome_cliente = Column(String,nullable=False)
    mesa_id = Column(Integer,ForeignKey("mesas.id"))
    status = Column(String,nullable=False)
    
    mesa = relationship("Mesa",back_populates="pedidos")
    itens = relationship("ItemPedido",back_populates="pedido")
    
    def to_dict(self):
        return {
        "id": self.id,
        "nome_cliente": self.nome_cliente,
        "mesa_id": self.mesa_id,
        "status": self.status,
        "itens": [item.to_dict() for item in self.itens],
        "total": sum(item.subtotal for item in self.itens)
    }
    
class ItemPedido(Base):
    __tablename__ = "itens_pedido"
    id = Column(Integer, primary_key=True)
    pedido_id = Column(Integer,ForeignKey("pedidos.id"),nullable=False)
    produto_id = Column(Integer,ForeignKey("cardapio.id"),nullable=False)
    quantidade = Column(Integer,nullable=False)
    subtotal = Column(Float,nullable=False)
    
    pedido = relationship("Pedido",back_populates="itens")
    produto = relationship("Cardapio")
    
    def to_dict(self):
        return {
        "id": self.id,
        "pedido_id": self.pedido_id,
        "produto_id": self.produto_id,
        "nome_produto": self.produto.nome,
        "quantidade": self.quantidade,
        "subtotal": self.subtotal
    }