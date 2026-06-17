import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ReceiptCards } from "../components/adminCards";
import DisponivelBtn from "../components/disponivelBtn";
import BASE_URL from "../services/api";
//Mudar o cardápio no backend, qnd apertar o botão de indisponivel n poder fazer o pedido do item.

export default function CardapioScreen() {
  const [cardapio,setCardapio] = useState([])
  const [loading, setLoading] = useState(true)
  const [disponivel, setDisponivel] = useState({});
  useEffect(() => {
  fetch(`${BASE_URL}/cardapio`)
    .then(res => res.json())
    .then(data => {
      setCardapio(data);

      const estados = Object.fromEntries(
        data.map(item => [item.id, item.ativo])
      );

      setDisponivel(estados);
      setLoading(false);
    });
}, []);
  


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
      itemId={item.id}
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
