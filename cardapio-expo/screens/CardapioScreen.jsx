import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { ReceiptCards, AddCardapioModal } from "../components/adminCards";
import DisponivelBtn from "../components/disponivelBtn";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function CardapioScreen() {
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  async function carregarCardapio(showLoading = false) {
    try {
      if (showLoading) setLoading(true);

      const response = await fetch(`${apiURL}/cardapio`);
      const data = await response.json();

      setCardapio(data);
    } catch (error) {
      console.log("Erro ao carregar cardápio:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function criarItem(novoItem) {
    try {
      const response = await fetch(`${apiURL}/cardapio/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoItem),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro);
      }

      setModalVisible(false);
      carregarCardapio();
    } catch (error) {
      console.log("Erro ao criar item:", error);
      Alert.alert("Erro", "Não foi possível adicionar o item.");
    }
  }

  function atualizarEstado(id, ativo) {
    setCardapio((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ativo,
            }
          : item
      )
    );
  }

  function atualizarImagem(id, imagem) {
    setCardapio((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              imagem,
            }
          : item
      )
    );
  }

  function onRefresh() {
    setRefreshing(true);
    carregarCardapio();
  }

  useEffect(() => {
    carregarCardapio(true);

    const intervalo = setInterval(() => {
      carregarCardapio();
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarCardapio();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text>Carregando cardápio...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titulo}>🍔 Gerenciamento do Cardápio</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addBtnTexto}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cardapio}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum item cadastrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View
              style={{
                opacity: item.ativo ? 1 : 0.45,
              }}
            >
              <ReceiptCards
                item={item}
                onImageChanged={atualizarImagem}
              />
            </View>

            <View style={styles.btnArea}>
              <DisponivelBtn
                itemId={item.id}
                ativo={item.ativo}
                onToggle={(novoEstado) =>
                  atualizarEstado(item.id, novoEstado)
                }
              />
            </View>
          </View>
        )}
      />

      <AddCardapioModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={criarItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    flexShrink: 1,
  },

  addBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  addBtnTexto: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },

  lista: {
    paddingBottom: 30,
  },

  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  btnArea: {
    marginTop: 10,
    alignItems: "flex-end",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  empty: {
    marginTop: 50,
    textAlign: "center",
    color: "#777",
    fontSize: 18,
  },
});