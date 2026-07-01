from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.models import *
from config import config
engine = create_engine(
    config.database_url,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autoflush=False,
    bind=engine
)

try:
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")
    
