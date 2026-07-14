from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import cloudinary

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

cloudinary_config = cloudinary.config(
    cloud_name=config.cloudinary_cloud_name,
    api_key=config.cloudinary_api_key,
    api_secret=config.cloudinary_api_secret
)

try:
    if cloudinary_config:
        print("Configuração cloudinary bem sucedida!")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")
    
