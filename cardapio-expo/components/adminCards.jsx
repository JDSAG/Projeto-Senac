import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DelAndConcluirBtn from "./concluirEdeletarBtn";

const corStatus = {
  pendente: "#FFA500",      // laranja
  em_andamento: "#4CAF50",  // verde
};

const labelStatus = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
};

export function OrderCards({ item, onIniciar, onConcluir, onExcluir }) {
  return (
    <View style={[orderStyles.card, { borderLeftColor: corStatus[item.status], borderLeftWidth: 5 }]}>

      {/* Cabeçalho: cliente + badge de status */}
      <View style={orderStyles.header}>
        <Text style={orderStyles.nome}>{item.nome_cliente}</Text>
        <View style={[orderStyles.badge, { backgroundColor: corStatus[item.status] }]}>
          <Text style={orderStyles.badgeTexto}>{labelStatus[item.status]}</Text>
        </View>
      </View>

      <Text style={orderStyles.mesa}>Mesa: {item.mesa_id}</Text>

      {/* Lista de itens do pedido */}
      <View style={orderStyles.listaItens}>
        {item.itens?.map((i) => (
          <Text key={i.id} style={orderStyles.itemTexto}>
            {i.quantidade}x {i.nome_produto} — R$ {Number(i.subtotal).toFixed(2)}
          </Text>
        ))}
      </View>

      <Text style={orderStyles.total}>Total: R$ {Number(item.total).toFixed(2)}</Text>

      <DelAndConcluirBtn
        status={item.status}
        onIniciar={() => onIniciar(item)}
        onConcluir={() => onConcluir(item)}
        onExcluir={() => onExcluir(item)}
      />
    </View>
  );
}

const orderStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeTexto: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  mesa: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  listaItens: {
    marginBottom: 8,
  },
  itemTexto: {
    fontSize: 14,
    color: "#333",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export function ReceiptCards({ item }) {
  return (
    <View style={receiptStyles.card}>
      <Text style={receiptStyles.nome}>{item.nome}</Text>
      <Text style={receiptStyles.descricao}>{item.descricao}</Text>
      <Text style={receiptStyles.preco}>R$ {item.preco}</Text>
    </View>
  );
}

const receiptStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descricao: {
    marginTop: 5,
  },
  preco: {
    marginTop: 5,
    fontWeight: "bold",
  },
});