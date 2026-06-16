#Fazer um botão de disponibilidade onde qnd pressionado, desativa o item do cardápio 
#Fazer CRUD pq vai que precisa né 

from models.models import *
from database.database import SessionLocal


class CardapioService():
    session = SessionLocal()

    @classmethod
    def toggle_disponibilidade(cls, item_id:int):
        try:
            item = cls.session.query(Cardapio).filter(Cardapio.id == item_id).first()
            if not item:
                return None
            item.ativo = not item.ativo  # toggle: True vira False e vice-versa
            cls.session.commit()
            return item
        except Exception as e:
            cls.session.rollback()
            raise e
    
    @classmethod 
    def find_cardapio(cls):
        itens = cls.session.query(Cardapio).all()
        result = []
        for e in itens:
            result.append(e.to_dict())
        return result