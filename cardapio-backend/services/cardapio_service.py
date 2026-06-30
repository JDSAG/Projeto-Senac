#Fazer um botão de disponibilidade onde qnd pressionado, desativa o item do cardápio 
#Fazer CRUD pq vai que precisa né 

from models.models import *
from database.database import SessionLocal
from schemas.schemas import CardapioCreate

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
    def create(cls,cardapio:CardapioCreate):
        try:
            new_item = Cardapio(nome = cardapio.nome,
                                descricao = cardapio.descricao,
                                preco = cardapio.preco,
                                categoria = cardapio.categoria)
            cls.session.add(new_item)
            cls.session.commit()
            cls.session.refresh(new_item)
            return new_item.to_dict()
        except Exception as e:
            cls.session.rollback()
            print(f"Erro ao adicionar item ao cardapio. Error: {e}")
            return None
    
    @classmethod 
    def find_cardapio(cls):
        itens = cls.session.query(Cardapio).all()
        result = []
        for e in itens:
            result.append(e.to_dict())
        return result