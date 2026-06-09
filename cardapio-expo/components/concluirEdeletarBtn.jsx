import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function DelAndConcluirBtn({ onConcluir, onExcluir }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn, styles.concluir]} onPress={onConcluir}>
        <Text style={styles.texto}>Concluir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.excluir]} onPress={onExcluir}>
        <Text style={styles.texto}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  concluir: {
    backgroundColor: "#28a745",
  },
  excluir: {
    backgroundColor: "#dc3545",
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
