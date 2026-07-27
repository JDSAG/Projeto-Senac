from sqlalchemy import *
from sqlalchemy.orm import declarative_base, relationship,validates

Base = declarative_base()

class Mesa(Base):
    __tablename__ = "mesas"
    id = Column(Integer, primary_key=True)
    numero = Column(Integer, nullable=False,unique=True)
    status = Column(String, default="disponivel") #Caso ocupado, tals
    
    pedidos = relationship("Pedido", back_populates="mesa")
    
    @validates("numero")
    def validate_numero(self, key, value):
        if value <= 0:
            raise ValueError("Número da mesa deve ser maior que zero")
        return value
    
    @validates("status")
    def validade_status(self, key, value):
        status_validos = ["disponivel","ocupado","reservado","pedido_concluido"]
        if value not in status_validos:
            raise ValueError(f"Status inválido. Deve ser um dos seguintes: {status_validos}")
        return value
    
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
    imagem = Column(String,nullable=True)
    
    def to_dict(self):
        return{
            "id":self.id,
            "nome":self.nome,
            "descricao":self.descricao,
            "preco":self.preco,
            "categoria":self.categoria,
            "ativo":self.ativo,
            "imagem":self.imagem
        }
    
class Pedido(Base):
    __tablename__ = "pedidos"
    id = Column(Integer, primary_key=True)
    nome_cliente = Column(String,nullable=False)
    mesa_id = Column(Integer,ForeignKey("mesas.id"),nullable=False)
    status = Column(String,default="em_aberto")
    
    @validates("status")
    def validade_status(self, key, value):
        status_validos = ["em_aberto","pendente","em_andamento","concluido"]
        if value not in status_validos:
            raise ValueError(f"Status inválido. Deve ser um dos seguintes: {status_validos}")
        return value
    
    mesa = relationship("Mesa",back_populates="pedidos")
    itens = relationship("ItemPedido",back_populates="pedido")
    
    def to_dict(self):
        return {
        "id": self.id,
        "nome_cliente": self.nome_cliente,
        "mesa_id": self.mesa_id,
        "status": self.status,
        "itens": [item.to_dict() for item in self.itens],
        "total": sum(item.subtotal for item in self.itens),
    }

class ItemPedido(Base):
    __tablename__ = "itens_pedido"
    id = Column(Integer, primary_key=True)
    pedido_id = Column(Integer,ForeignKey("pedidos.id"),nullable=False)
    produto_id = Column(Integer,ForeignKey("cardapio.id"),nullable=False)
    quantidade = Column(Integer,nullable=False)
    subtotal = Column(Float,nullable=False)
    
    @validates("quantidade")
    def validate_quantidade(self, key, value):
        if value <= 0:
            raise ValueError("Quantidade deve ser maior que zero")
        return value
    
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