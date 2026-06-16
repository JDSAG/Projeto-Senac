from fastapi import FastAPI
from routes.route_cardapio import router as cardapio_router

app = FastAPI()
app.include_router(cardapio_router)

@app.get("/")
def root():
    return {"mensagem": "API funcionando!"}