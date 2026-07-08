import { obterToken } from "../storage/tokenStorage";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

/*
    Todas as requisições do aplicativo
    passarão por aqui.

    Se existir um JWT, ele será enviado
    automaticamente.
*/
export async function apiFetch(endpoint, options = {}) {

    const token = await obterToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${apiURL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    return response;
}