import React from "react";
import { View, StyleSheet } from "react-native";
import {ReceiptCards, OrderCards} from "./Cards";

export default function Containers(){
    const pedidos = []
    const cardapio = []
    
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