import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ReceiptCards, OrderCards, AddCardapioModal } from "./adminCards";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function Containers({
  cardapio = [],
  pedidos = [],
  onItemAdicionado,
}) {
  const [modalVisible, setModalVisible] = useState(false);

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
      onItemAdicionado?.();
    } catch (error) {
      console.log("Erro ao criar item:", error);
      Alert.alert("Erro", "Não foi possível adicionar o item.");
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.receiptContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitulo}>Cardápio</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addBtnTexto}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {cardapio.map((item) => (
          <ReceiptCards key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.ordersContainer}>
        {pedidos.map((item) => (
          <OrderCards key={item.id} item={item} />
        ))}
      </View>

      <AddCardapioModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={criarItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    padding: 20,
  },

  receiptContainer: {
    flex: 1,
  },

  ordersContainer: {
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  headerTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  addBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  addBtnTexto: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
  },
});