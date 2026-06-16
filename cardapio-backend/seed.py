from database.database import SessionLocal
from models.models import Cardapio

session = SessionLocal()

itens = [
    Cardapio(nome="X-Burguer", descricao="Hambúrguer com queijo", preco=25.00, categoria="Lanches", ativo=True),
    Cardapio(nome="Frango Grelhado", descricao="Prato do dia", preco=32.00, categoria="Pratos", ativo=True),
    Cardapio(nome="Suco de Laranja", descricao="Natural 500ml", preco=10.00, categoria="Bebidas", ativo=True),
]

session.add_all(itens)
session.commit()
session.close()

print("Cardápio populado com sucesso!")