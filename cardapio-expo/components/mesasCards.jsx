import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

export default function MesaCard({ mesa, onPress, onStatusPress, onQrPress }) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: statusColors[mesa.status] || "#4CAF50" },
      ]}
    >
      {/* Botão de QR Code - canto superior direito */}
      <Pressable
        style={styles.qrBotao}
        hitSlop={8}
        onPress={() => onQrPress(mesa)}
      >
        <Ionicons name="qr-code-outline" size={18} color="#fff" />
      </Pressable>

      {/* Área principal */}
      <Pressable style={styles.area} onPress={() => onPress(mesa)}>
        <Text style={styles.numero}>{mesa.numero}</Text>
      </Pressable>

      {/* Botão de alterar status */}
      <Pressable style={styles.statusBotao} onPress={() => onStatusPress(mesa)}>
        <Text style={styles.status}>{statusLabels[mesa.status]}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 140,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  qrBotao: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  area: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  numero: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  statusBotao: {
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  status: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});