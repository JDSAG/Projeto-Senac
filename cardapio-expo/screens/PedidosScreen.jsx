import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, Alert } from "react-native";
import { OrderCards } from "../components/adminCards";

//Isso aqui é só um dado estático, vai ser tirado no futuro
const pedidosIniciais = [
  { id: 1, nome: "João", pedido: "X-Burguer", total: "25.00", mesa: 3 },
  { id: 2, nome: "Maria", pedido: "Frango Grelhado", total: "32.00", mesa: 5 },
];

export default function PedidosScreen() {
  //Em um projeto real isso aqui seria useState([])
  const [pedidos, setPedidos] = useState(pedidosIniciais);
  
  const concluirPedido = (item) => {
    Alert.alert(
      "Pedido concluído",
      `Pedido da mesa ${item.mesa} foi concluído!`,
      [
        {
          text: "OK",
          onPress: () =>
            setPedidos((prev) => prev.filter((p) => p.id !== item.id)),
        },
      ]
    );
  };

  const excluirPedido = (item) => {
    setPedidos((prev) => prev.filter((p) => p.id !== item.id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pedidos dos Clientes</Text>
      {pedidos.map((item) => (
        <OrderCards
          key={item.id}
          item={item}
          onConcluir={concluirPedido}
          onExcluir={excluirPedido}
        />
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
