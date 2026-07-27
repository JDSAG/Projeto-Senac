import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function CardapioCard({ item, onAdicionar }) {
  const [quantidade, setQuantidade] = useState(1);

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade((q) => q - 1);
    }
  }

  function aumentar() {
    setQuantidade((q) => q + 1);
  }

  function adicionar() {
    onAdicionar(quantidade);
    setQuantidade(1);
  }

  return (
    <View style={styles.card}>
      {item.imagem ? (
        <Image
          source={{ uri: item.imagem }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.semImagem}>
          <Text style={styles.semImagemTexto}>Sem{"\n"}imagem</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {item.nome}
        </Text>

        <Text style={styles.descricao} numberOfLines={2}>
          {item.descricao}
        </Text>

        <Text style={styles.preco}>
          R$ {Number(item.preco).toFixed(2)}
        </Text>

        <View style={styles.acoes}>
          <View style={styles.quantidadeContainer}>
            <TouchableOpacity style={styles.quantidadeBotao} onPress={diminuir}>
              <Text style={styles.quantidadeBotaoTexto}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantidade}>{quantidade}</Text>

            <TouchableOpacity style={styles.quantidadeBotao} onPress={aumentar}>
              <Text style={styles.quantidadeBotaoTexto}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botao} onPress={adicionar}>
            <Text style={styles.botaoTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const IMAGE_SIZE = 92;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
  },

  semImagem: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  semImagemTexto: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  descricao: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 2,
    lineHeight: 17,
  },

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
    marginTop: 6,
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  quantidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },

  quantidadeBotao: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  quantidadeBotaoTexto: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantidade: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },

  botao: {
    backgroundColor: "#16A34A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
  },
});