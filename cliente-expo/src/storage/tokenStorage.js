import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "access_token";

/*Salva o token após o login.*/
export async function salvarToken(token) {
    await SecureStore.setItemAsync(
        TOKEN_KEY,
        token
    );
}

/*
    Recupera o token salvo.
*/
export async function obterToken() {
    return await SecureStore.getItemAsync(
        TOKEN_KEY
    );
}

/*
    Remove o token. Será utilizado quando a conta for encerrada.
*/
export async function removerToken() {
    await SecureStore.deleteItemAsync(
        TOKEN_KEY
    );
}