#Fazer um botão de disponibilidade onde qnd pressionado, desativa o item do cardápio 
from models.models import *
from database.database import SessionLocal


class CardapioService():
    session = SessionLocal()
    
    @classmethod 
    def soft_delete(cls) -> any:
        try:
            cls.session.query(Cardapio).one()
            cls.session.execute(Cardapio).values(ativo = False)
            return 'Item removido com sucesso!'
        except Exception as e:
            return f"Erro: {e}"