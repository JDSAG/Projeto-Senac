import { apiFetch } from "./api";

/*
=========================
BUSCAR PEDIDO EM ABERTO
=========================
*/
export async function buscarPedido() {

    const response = await apiFetch("/pedido/");

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

/*
=========================
ADICIONAR PRODUTOS
=========================
*/
export async function adicionarProduto(produtoId, quantidade = 1) {

    const response = await apiFetch("/pedido/", {
        method: "POST",
        body: JSON.stringify({
            itens: [
                {
                    produto_id: produtoId,
                    quantidade,
                },
            ],
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

/*
=========================
REMOVER ITEM
=========================
*/
export async function removerItem(itemId) {

    const response = await apiFetch(
        `/pedido/item/${itemId}`,
        {method: "DELETE",}
    );

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail);
    }
    return data;
}

/*
=========================
FINALIZAR PEDIDO
=========================
*/
export async function finalizarPedido() {
    const response = await apiFetch(
        "/pedido/finalizar",
        {
            method: "PATCH",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}