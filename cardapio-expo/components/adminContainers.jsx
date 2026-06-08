import React from "react";
import { View, StyleSheet } from "react-native";
import {ReceiptCards, OrderCards} from "./adminCards";

export default function Containers(){
    const pedidos = [
      { id: 1, nome: "João", pedido: "X-Burguer", total: "25.00", mesa: 3 },
      { id: 2, nome: "Maria", pedido: "Frango Grelhado", total: "32.00", mesa: 5 },
    ]
    const cardapio = [
      { id: 1, nome: "X-Burguer", descricao: "Hambúrguer com queijo", preco: "25.00" },
      { id: 2, nome: "Frango Grelhado", descricao: "Prato do dia", preco: "32.00" },
    ]
    
    return (
    <View style={styles.mainContainer}>
      <View style={styles.receiptContainer}>
        {cardapio.map((item) => (
          <ReceiptCards
            key={item.id}
            item={item}
        />
        ))}
    </View>

      <View style={styles.ordersContainer}>
        {pedidos.map((item) => (
          <OrderCards
            key={item.id}
            item={item}
        />
        ))}
      </View>
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
});