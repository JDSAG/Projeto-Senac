import { salvarToken } from "../storage/tokenStorage";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export async function login(mesaId, nome) {
  const response = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mesa_id: mesaId,
      nome_cliente: nome,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  // Salva o JWT
  await salvarToken(data.access_token);

  return data;
}