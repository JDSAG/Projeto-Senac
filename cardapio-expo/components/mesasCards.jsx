import React from "react";
import {Pressable,Text,StyleSheet,View,} from "react-native";

const statusColors = {
  disponivel: "#4CAF50",
  ocupado: "#D32F2F",
  reservado: "#757575",
};

const statusLabels = {
  disponivel: "Disponível",
  ocupado: "Ocupada",
  reservado: "Reservada",
};
export default function MesaCard({
    mesa,onPress,
})
 {
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor:
            statusColors[mesa.status] || "#4CAF50",
        },
      ]}
      onPress={() => onPress(mesa)}
    >
      <Text style={styles.numero}>
        {mesa.numero}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.status}>
          {statusLabels[mesa.status]}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 110,
    margin: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  numero: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 8,
  },

  status: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});