import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { OrderCards } from "../components/adminCards";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    try {
      const response = await fetch(`${apiURL}/pedido/`);
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  buscarPedidos();
  
  const intervalo = setInterval(() => {
    buscarPedidos();
  }, 10000); // busca a cada 10 segundos

  return () => clearInterval(intervalo); // limpa ao desmontar a tela
}, []);

  const iniciarPedido = async (item) => {
    try {
      const response = await fetch(`${apiURL}/pedido/${item.id}/iniciar`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error();

      setPedidos((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, status: "em_andamento" } : p))
      );
    } catch {
      Alert.alert("Erro", "Não foi possível iniciar o pedido.");
    }
  };

  const concluirPedido = async (item) => {
    try {
      const response = await fetch(`${apiURL}/pedido/${item.id}/concluir`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error();

      Alert.alert(
        "Pedido concluído",
        `Pedido da mesa ${item.mesa_id} foi concluído!`,
        [{ text: "OK", onPress: () => setPedidos((prev) => prev.filter((p) => p.id !== item.id)) }]
      );
    } catch {
      Alert.alert("Erro", "Não foi possível concluir o pedido.");
    }
  };

  const excluirPedido = async (item) => {
    try {
      const response = await fetch(`${apiURL}/pedido/${item.id}/excluir`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error();

      setPedidos((prev) => prev.filter((p) => p.id !== item.id));
    } catch {
      Alert.alert("Erro", "Não foi possível excluir o pedido.");
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pedidos dos Clientes</Text>
      {pedidos.map((item) => (
        <OrderCards
          key={item.id}
          item={item}
          onIniciar={iniciarPedido}
          onConcluir={concluirPedido}
          onExcluir={excluirPedido}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f0f0f0", flexGrow: 1 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});