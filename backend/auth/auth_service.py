from database.database import SessionLocal
from models.models import Mesa
from auth.jwt import create_access_token


class AuthService:

    session = SessionLocal()

    @classmethod
    def login(cls, mesa_id: int, nome_cliente: str):

        mesa = (
            cls.session.query(Mesa)
            .filter(Mesa.id == mesa_id)
            .first()
        )

        if not mesa:
            raise ValueError("Mesa não encontrada")

        token = create_access_token(
            {
                "mesa_id": mesa.id,
                "nome_cliente": nome_cliente,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }