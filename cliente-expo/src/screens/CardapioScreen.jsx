import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import CardapioCard from "../components/CardapioCard";
import PedidoBar from "../components/PedidoBar";

import {
  adicionarProduto,
  buscarPedido,
} from "../services/pedidoService";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function CardapioScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega o cardápio apenas uma vez
  useEffect(() => {
    carregarCardapio();
  }, []);

  // Atualiza o pedido sempre que voltar para a tela
  useFocusEffect(
    useCallback(() => {
      atualizarPedido();
    }, [])
  );

  async function carregarCardapio() {
    try {
      setLoading(true);

      const response = await fetch(`${apiURL}/cardapio`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setProdutos(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o cardápio.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarPedido() {
    try {
      const data = await buscarPedido();
      setPedido(data);
    } catch {
      // Caso não exista pedido aberto
      setPedido({
        itens: [],
        total: 0,
      });
    }
  }

  async function adicionar(item) {
    try {
      await adicionarProduto(item.id);

      // Atualiza somente a barra do pedido
      await atualizarPedido();
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível adicionar o produto."
      );
    }
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <CardapioCard
            item={item}
            onAdicionar={() => adicionar(item)}
          />
        )}
      />

      <PedidoBar
        pedido={pedido}
        onPress={() => navigation.navigate("Pedido")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});