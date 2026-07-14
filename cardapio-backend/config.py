from pydantic_settings import BaseSettings, SettingsConfigDict

class Config(BaseSettings):
    db_user: str
    db_password: str
    db_host: str
    db_port: int
    db_name: str
    
    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str
    
    model_config = SettingsConfigDict(env_file='.env')

    @property
    def database_url(self):
        return (
            f"postgresql+psycopg2://"
            f"{self.db_user}:{self.db_password}"
            f"@{self.db_host}:{self.db_port}/{self.db_name}"
            f"?sslmode=require"
        )
config = Config()
