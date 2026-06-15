from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.models import *
from config import config

engine = create_engine(config.database_url)

SessionLocal = sessionmaker(bind=engine)

try:
    Base.metadata.create_all(engine)
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(e)