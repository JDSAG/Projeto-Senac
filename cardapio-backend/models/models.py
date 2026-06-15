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

class Cardapio(Base):
    __tablename__ = "cardapio"
    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    descricao = Column(String,nullable=False)
    preco = Column(Float,nullable=False)
    categoria = Column(String,nullable=False) 
    ativo = Column(Boolean,default=True)

class Pedido(Base):
    __tablename__ = "pedidos"
    id = Column(Integer, primary_key=True)
    nome_cliente = Column(String,nullable=False)
    mesa_id = Column(Integer,ForeignKey("mesas.id"))
    status = Column(String,nullable=False)
    
    mesa = relationship("Mesa",back_populates="pedidos")
    itens = relationship("ItemPedido",back_populates="pedido")
    
class ItemPedido(Base):
    __tablename__ = "itens_pedido"
    id = Column(Integer, primary_key=True)
    pedido_id = Column(Integer,ForeignKey("pedidos.id"),nullable=False)
    produto_id = Column(Integer,ForeignKey("cardapio.id"),nullable=False)
    quantidade = Column(Integer,nullable=False)
    subtotal = Column(Float,nullable=False)
    
    pedido = relationship("Pedido",back_populates="itens")
    produto = relationship("Cardapio")