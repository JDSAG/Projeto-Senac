import { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export function useMesas() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criando, setCriando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const buscarMesas = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}/mesa`);
      if (!response.ok) throw new Error();

      const data = await response.json();
      setMesas(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as mesas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarMesas();
    const intervalo = setInterval(buscarMesas, 5000);
    return () => clearInterval(intervalo);
  }, [buscarMesas]);

  async function criarMesa(numeroInt) {
    setCriando(true);
    try {
      const response = await fetch(`${apiURL}/mesa/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero: numeroInt }),
      });
      if (!response.ok) throw new Error();

      await buscarMesas();
      return true;
    } catch {
      Alert.alert("Erro", "Não foi possível criar a mesa.");
      return false;
    } finally {
      setCriando(false);
    }
  }

  async function atualizarStatus(mesaId, status) {
    setAtualizando(true);
    try {
      const response = await fetch(`${apiURL}/mesa/${mesaId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error();

      await buscarMesas();
      return true;
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o status.");
      return false;
    } finally {
      setAtualizando(false);
    }
  }

  return { mesas, loading, criando, atualizando, criarMesa, atualizarStatus };
}