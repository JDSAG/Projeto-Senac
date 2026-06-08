import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { OrderCards } from "../components/adminCards";

const pedidos = [
  { id: 1, nome: "João", pedido: "X-Burguer", total: "25.00", mesa: 3 },
  { id: 2, nome: "Maria", pedido: "Frango Grelhado", total: "32.00", mesa: 5 },
];

export default function PedidosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pedidos dos Clientes</Text>
      {pedidos.map((item) => (
        <OrderCards key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
