from pydantic import BaseModel

class MesaCreate(BaseModel):
    numero:int

class ItemPedidoCreate(BaseModel):
    produto_id: int
    quantidade: int

class PedidoCreate(BaseModel):
    itens: list[ItemPedidoCreate]
    
class CardapioCreate(BaseModel):
    nome: str
    descricao: str
    preco: float
    categoria: str
    
class MesaStatusUpdate(BaseModel):
    status: str

class LoginRequest(BaseModel):
    mesa_id: int
    nome_cliente: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str