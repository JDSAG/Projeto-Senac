from models.models import *
from database.database import SessionLocal
from schemas.schemas import PedidoCreate


class PedidoService():
    @classmethod
    def create(cls, mesa_id: int, nome_cliente: str, itens: list):
        session = SessionLocal()
        try:
            mesa = (
                session.query(Mesa)
                .filter(Mesa.id == mesa_id)
                .first()
            )

            if not mesa:
                raise ValueError("Mesa não encontrada")
            if mesa.status in ["ocupado", "reservado"]:
                raise ValueError(f"Mesa {mesa.numero} não pode receber pedidos")

            # Reaproveita o pedido em aberto da mesa, se existir.
            pedido = (
                session.query(Pedido)
                .filter(Pedido.mesa_id == mesa_id, Pedido.status == "em_aberto")
                .first()
            )

            if not pedido:
                pedido = Pedido(nome_cliente=nome_cliente, mesa_id=mesa_id)
                session.add(pedido)
                session.flush()

            for item in itens:
                produto = (
                    session.query(Cardapio)
                    .filter(Cardapio.id == item.produto_id)
                    .first()
                )
                if not produto:
                    raise ValueError(
                        f"Produto {item.produto_id} não encontrado"
                    )
                if not produto.ativo:
                    raise ValueError(
                        f"Produto '{produto.nome}' está indisponível"
                    )

                # Se o produto já está no pedido, soma a quantidade em vez
                # de criar uma segunda linha pro mesmo item.
                item_existente = (
                    session.query(ItemPedido)
                    .filter(
                        ItemPedido.pedido_id == pedido.id,
                        ItemPedido.produto_id == produto.id,
                    )
                    .first()
                )

                if item_existente:
                    item_existente.quantidade += item.quantidade
                    item_existente.subtotal = produto.preco * item_existente.quantidade
                else:
                    subtotal = produto.preco * item.quantidade
                    session.add(
                        ItemPedido(
                            pedido_id=pedido.id,
                            produto_id=produto.id,
                            quantidade=item.quantidade,
                            subtotal=subtotal,
                        )
                    )

            session.commit()
            session.refresh(pedido)
            return pedido.to_dict()

        except Exception as e:
            session.rollback()
            print(f"Erro ao criar pedido: {e}")
            raise
        finally:
            session.close()

    @classmethod
    def listar(cls, mesa_id: int):
        session = SessionLocal()
        try:
            pedido = (
                session.query(Pedido)
                .filter(Pedido.mesa_id == mesa_id, Pedido.status == "em_aberto")
                .first()
            )
            if not pedido:
                return {"itens": [], "total": 0}
            return pedido.to_dict()
        except Exception as e:
            session.rollback()
            print(f"Erro ao listar pedido: {e}")
            raise
        finally:
            session.close()

    @classmethod
    def find_by_id(cls, id: int):
        session = SessionLocal()
        try:
            pedido = session.query(Pedido).where(Pedido.id == id).one()
            return pedido.to_dict()
        finally:
            session.close()

    @classmethod
    def finalizar_pedido_cliente(cls, mesa_id: int):
        session = SessionLocal()
        try:
            pedido = (
                session.query(Pedido)
                .filter(Pedido.mesa_id == mesa_id, Pedido.status == "em_aberto")
                .first()
            )
            if not pedido:
                raise ValueError("Nenhum pedido aberto")
            pedido.status = "pendente"
            session.commit()
            return {"message": "Pedido finalizado"}
        except Exception as e:
            session.rollback()
            print(f"Erro ao finalizar pedido: {e}")
            raise
        finally:
            session.close()

    @classmethod
    def remover_item(cls, item_id: int, mesa_id: int):
        session = SessionLocal()
        try:
            item = (
                session.query(ItemPedido)
                .join(Pedido)
                .filter(
                    ItemPedido.id == item_id,
                    Pedido.mesa_id == mesa_id,
                    Pedido.status == "em_aberto",
                )
                .first()
            )
            if not item:
                raise ValueError("Item não encontrado")

            pedido = item.pedido
            session.delete(item)
            session.commit()

            # Se não sobrou nenhum item, remove o pedido também
            session.refresh(pedido)
            if len(pedido.itens) == 0:
                session.delete(pedido)
                session.commit()
                return {"message": "Pedido removido"}

            return {"message": "Item removido"}
        except Exception as e:
            session.rollback()
            print(f"Erro ao remover item: {e}")
            raise
        finally:
            session.close()