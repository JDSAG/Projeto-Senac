#Fazer um botão de disponibilidade onde qnd pressionado, desativa o item do cardápio 
#Fazer CRUD pq vai que precisa né 
from models.models import *
from database.database import SessionLocal
from schemas.schemas import CardapioCreate


class CardapioService():

    @classmethod
    def create(cls, cardapio: CardapioCreate):
        session = SessionLocal()
        try:
            new_item = Cardapio(
                nome=cardapio.nome,
                descricao=cardapio.descricao,
                preco=cardapio.preco,
                categoria=cardapio.categoria,
            )
            session.add(new_item)
            session.commit()
            session.refresh(new_item)
            return new_item.to_dict()
        except Exception as e:
            session.rollback()
            print(f"Erro ao adicionar item ao cardapio. Error: {e}")
            return None
        finally:
            session.close()

    @classmethod
    def find_cardapio(cls):
        session = SessionLocal()
        try:
            itens = session.query(Cardapio).all()
            result = []
            for e in itens:
                result.append(e.to_dict())
            return result
        finally:
            session.close()

    @classmethod
    def find_by_active(cls):
        session = SessionLocal()
        try:
            itens = session.query(Cardapio).all()
            result = []
            for e in itens:
                if e.ativo == True:
                    result.append(e.to_dict())
            return result

        except Exception as e:
            session.rollback()
            print(f"Erro ao localizar mesa. Error: {e}")
            return None
        finally:
            session.close()

    @classmethod
    def toggle_disponibilidade(cls, item_id: int):
        session = SessionLocal()
        try:
            item = (
                session.query(Cardapio)
                .filter(Cardapio.id == item_id)
                .first()
            )
            if not item:
                return None
            item.ativo = not item.ativo  # toggle: True vira False e vice-versa
            session.commit()
            session.refresh(item)
            return item.to_dict()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()