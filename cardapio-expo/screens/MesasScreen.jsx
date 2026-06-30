import React, { useState } from "react";
import {View,Text,FlatList,ActivityIndicator,Pressable,StyleSheet,Alert,} from "react-native";

import MesaCard from "../components/mesasCards";
import { useMesas } from "../components/useMesas";
import NovaMesaModal from "../components/modals/newMesaModal";
import StatusMesaModal from "../components/modals/statusMesaModal";
import QrCodeModal from "../components/modals/qrCodeModal";

const STATUS_LABELS = {
  disponivel: "Disponível",
  ocupado: "Ocupada",
  reservado: "Reservada",
};

export default function MesasScreen() {
  const { mesas, loading, criando, atualizando, criarMesa, atualizarStatus } = useMesas();

  const [criarVisivel, setCriarVisivel] = useState(false);
  const [statusVisivel, setStatusVisivel] = useState(false);
  const [qrVisivel, setQrVisivel] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const [mesaQr, setMesaQr] = useState(null);

  function abrirMesa(mesa) {
    Alert.alert(`Mesa ${mesa.numero}`, `Status: ${STATUS_LABELS[mesa.status]}`);
  }

  function abrirStatus(mesa) {
    setMesaSelecionada(mesa);
    setStatusVisivel(true);
  }

  function fecharStatus() {
    setStatusVisivel(false);
    setMesaSelecionada(null);
  }

  function abrirQr(mesa) {
    setMesaQr(mesa);
    setQrVisivel(true);
  }

  function fecharQr() {
    setQrVisivel(false);
    setMesaQr(null);
  }

  async function handleAtualizarStatus(status) {
    if (!mesaSelecionada) return;
    const sucesso = await atualizarStatus(mesaSelecionada.id, status);
    if (sucesso) fecharStatus();
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Controle de Mesas</Text>
        <Pressable style={styles.novaBotao} onPress={() => setCriarVisivel(true)}>
          <Text style={styles.novaBotaoTexto}>+ Mesa</Text>
        </Pressable>
      </View>

      <FlatList
        data={mesas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MesaCard
            mesa={item}
            onPress={abrirMesa}
            onStatusPress={abrirStatus}
            onQrPress={abrirQr}
          />
        )}
      />

      <QrCodeModal visible={qrVisivel} mesa={mesaQr} onClose={fecharQr} />

      <NovaMesaModal
        visible={criarVisivel}
        onClose={() => setCriarVisivel(false)}
        onCriar={criarMesa}
        criando={criando}
      />

      <StatusMesaModal
        visible={statusVisivel}
        mesa={mesaSelecionada}
        onClose={fecharStatus}
        onAtualizar={handleAtualizarStatus}
        atualizando={atualizando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  novaBotao: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  novaBotaoTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});