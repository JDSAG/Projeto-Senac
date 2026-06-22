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