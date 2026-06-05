import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function OrderCards({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.pedido}</Text>
      <Text style={styles.preco}>R$ {item.total}</Text>
      <Text>Mesa: {item.mesa}</Text>
    </View>
  );
}

export function ReceiptCards({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.preco}>R$ {item.preco}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descricao: {
    marginTop: 5,
  },
  preco: {
    marginTop: 5,
    fontWeight: "bold",
  },
});