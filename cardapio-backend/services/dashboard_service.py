from models.models import Pedido, ItemPedido, Mesa
from database.database import SessionLocal
from sqlalchemy import func
from datetime import date


class DashboardService:
    @classmethod
    def get_resume(cls):
        session = SessionLocal()
        try:
            hoje = date.today()

            faturamento_hoje = (
                session.query(func.sum(ItemPedido.subtotal))
                .join(Pedido, Pedido.id == ItemPedido.pedido_id)
                .filter(func.date(Pedido.created_at) == hoje)
                .filter(Pedido.status == "concluido")
                .scalar() or 0
            )

            pedidos_pendentes = (
                session.query(func.count(Pedido.id))
                .filter(Pedido.status.in_(["pendente", "em_andamento"]))
                .scalar()
            )

            pedidos_concluidos_hoje = (
                session.query(func.count(Pedido.id))
                .filter(func.date(Pedido.created_at) == hoje)
                .filter(Pedido.status == "concluido")
                .scalar()
            )

            mesas_ocupadas = (
                session.query(func.count(Mesa.id))
                .filter(Mesa.status.in_(["ocupado", "reservado"]))
                .scalar()
            )

            mesas_livres = (
                session.query(func.count(Mesa.id))
                .filter(Mesa.status == "disponivel")
                .scalar()
            )

            return {
                "faturamento_hoje": float(faturamento_hoje),
                "pedidos_pendentes": pedidos_pendentes,
                "pedidos_concluidos_hoje": pedidos_concluidos_hoje,
                "mesas_ocupadas": mesas_ocupadas,
                "mesas_livres": mesas_livres,
            }
        finally:
            session.close()