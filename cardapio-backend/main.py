from fastapi import FastAPI
from routes.route_cardapio import router as cardapio_router
from routes.route_pedido import router as pedido_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # em dev pode liberar tudo; em produção, restrinja
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cardapio_router)
app.include_router(pedido_router)

@app.get("/")
def root():
    return {"mensagem": "API funcionando!"}