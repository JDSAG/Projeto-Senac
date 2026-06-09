import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ReceiptCards } from "../components/adminCards";
import DisponivelBtn from "../components/disponivelBtn";

//Mudar o cardápio no backend, qnd apertar o botão de indisponivel n poder fazer o pedido do item.
const cardapio = [
  { id: 1, nome: "X-Burguer", descricao: "Hambúrguer com queijo", preco: "25.00" },
  { id: 2, nome: "Frango Grelhado", descricao: "Prato do dia", preco: "32.00" },
];

export default function CardapioScreen() {
  const [disponivel, setDisponivel] = useState(
    Object.fromEntries(cardapio.map((item) => [item.id, true]))
  );

  function toggleDisponivel(id) {
    setDisponivel((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Gerenciamento do Cardápio</Text>
      {cardapio.map((item) => (
        <View key={item.id}>
      <View style={{ opacity: disponivel[item.id] ? 1 : 0.4 }}>
      <ReceiptCards item={item} />
      </View>
      <DisponivelBtn
      ativo={disponivel[item.id]}
      onToggle={() => toggleDisponivel(item.id)}
    />
</View>
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
