import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

const STATUS_OPCOES = ["disponivel", "ocupado", "reservado",];

const STATUS_LABELS = {
  disponivel: "Disponível",
  ocupado: "Ocupada",
  reservado: "Reservada",
  pedido_concluido:"Pedido Concluido"
};

export default function StatusMesaModal({
  visible,
  mesa,
  onClose,
  onAtualizar,
  atualizando,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <Text style={styles.modalTitulo}>Mesa {mesa?.numero}</Text>
          <Text style={styles.modalSubtitulo}>Selecione o novo status</Text>

          {STATUS_OPCOES.map((status) => (
            <Pressable
              key={status}
              style={[
                styles.opcaoStatus,
                mesa?.status === status && styles.opcaoStatusAtiva,
              ]}
              disabled={atualizando}
              onPress={() => onAtualizar(status)}
            >
              <Text style={styles.opcaoStatusTexto}>{STATUS_LABELS[status]}</Text>
            </Pressable>
          ))}

          <Pressable
            style={[styles.botao, styles.cancelarBotao, { marginTop: 10 }]}
            onPress={onClose}
          >
            <Text style={styles.botaoTexto}>Cancelar</Text>
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
  modalSubtitulo: {
    fontSize: 15,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  opcaoStatus: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  opcaoStatusAtiva: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  opcaoStatusTexto: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: "capitalize",
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