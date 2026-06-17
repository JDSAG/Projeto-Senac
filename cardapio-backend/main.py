from fastapi import FastAPI
from routes.route_cardapio import router as cardapio_router
from routes.route_pedido import router as pedido_router

app = FastAPI()
app.include_router(cardapio_router)
app.include_router(pedido_router)

@app.get("/")
def root():
    return {"mensagem": "API funcionando!"}