from database.database import SessionLocal
from models.models import *

session = SessionLocal()

# Mesas
mesas = [
    Mesa(numero=1, status="ocupada"),
    Mesa(numero=2, status="ocupada"),
    Mesa(numero=3, status="livre"),
]
session.add_all(mesas)
session.flush()

# Pedidos com status variados pra testar o fluxo completo
pedidos = [
    Pedido(nome_cliente="João Costa",  mesa_id=mesas[0].id, status="pendente"),
    Pedido(nome_cliente="Maria Silva", mesa_id=mesas[1].id, status="em_andamento"),
]
session.add_all(pedidos)
session.flush()

# Busca os itens que já estão no banco
xburguer = session.query(Cardapio).filter(Cardapio.nome == "X-Burguer").first()
frango   = session.query(Cardapio).filter(Cardapio.nome == "Frango Grelhado").first()
suco     = session.query(Cardapio).filter(Cardapio.nome == "Suco de Laranja").first()

itens = [
    # João: 1 X-Burguer + 1 Suco
    ItemPedido(pedido_id=pedidos[0].id, produto_id=xburguer.id, quantidade=1, subtotal=xburguer.preco),
    ItemPedido(pedido_id=pedidos[0].id, produto_id=suco.id,     quantidade=1, subtotal=suco.preco),

    # Maria: 1 Frango Grelhado + 2 Sucos
    ItemPedido(pedido_id=pedidos[1].id, produto_id=frango.id,   quantidade=1, subtotal=frango.preco),
    ItemPedido(pedido_id=pedidos[1].id, produto_id=suco.id,     quantidade=2, subtotal=suco.preco * 2),
]
session.add_all(itens)

session.commit()
session.close()

print("Seed concluído!")
print(f"  Mesas criadas:   {len(mesas)}")
print(f"  Pedidos criados: {len(pedidos)}")
print(f"  Itens criados:   {len(itens)}")