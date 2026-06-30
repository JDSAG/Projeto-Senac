import React, { useState } from "react";
import {Modal,View,Text,TextInput,Pressable, StyleSheet,} from "react-native";

export default function NovaMesaModal({ visible, onClose, onCriar, criando }) {
  const [numero, setNumero] = useState("");

  async function handleCriar() {
    const numeroInt = parseInt(numero, 10);
    if (isNaN(numeroInt) || numeroInt <= 0) return;

    const sucesso = await onCriar(numeroInt);
    if (sucesso) setNumero("");
  }

  function handleClose() {
    setNumero("");
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <Text style={styles.modalTitulo}>Nova Mesa</Text>

          <TextInput
            style={styles.input}
            placeholder="Número da mesa"
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
          />

          <View style={styles.botoesRow}>
            <Pressable style={[styles.botao, styles.cancelarBotao]} onPress={handleClose}>
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.botao, styles.confirmarBotao]}
              onPress={handleCriar}
              disabled={criando}
            >
              <Text style={styles.botaoTexto}>{criando ? "Criando..." : "Criar"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  modalConteudo: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  botoesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botao: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelarBotao: {
    backgroundColor: "#757575",
  },
  confirmarBotao: {
    backgroundColor: "#4CAF50",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});