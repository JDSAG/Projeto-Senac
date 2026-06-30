import React from "react";
import { Modal, View, Text, Image, Pressable, StyleSheet } from "react-native";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function QrCodeModal({ visible, mesa, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <Text style={styles.modalTitulo}>QR Code - Mesa {mesa?.numero}</Text>

          {mesa && (
            <Image
              source={{ uri: `${apiURL}/mesa/${mesa.id}/qrcode` }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          )}

          <Pressable style={[styles.botao, styles.cancelarBotao]} onPress={onClose}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </Pressable>
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
  qrImage: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginVertical: 15,
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
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});