from pydantic import BaseModel

class MesaCreate(BaseModel):
    numero:int

class ItemPedidoCreate(BaseModel):
    produto_id: int
    quantidade: int

class PedidoCreate(BaseModel):
    nome_cliente: str
    mesa_id: int
    itens: list[ItemPedidoCreate]
    
class CardapioCreate(BaseModel):
    nome: str
    descricao: str
    preco: float
    categoria: str
    
class MesaStatusUpdate(BaseModel):
    status: str