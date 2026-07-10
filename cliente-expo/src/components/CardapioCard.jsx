import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useState } from "react";

export default function CardapioCard({

  item,

  onAdicionar,

}) {

  const [quantidade, setQuantidade] = useState(1);

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  function aumentar() {
    setQuantidade(quantidade + 1);
  }

  return (

    <View style={styles.card}>

      {
        item.imagem && (

          <Image

            source={{ uri: item.imagem }}

            style={styles.image}

          />

        )
      }

      <Text style={styles.nome}>

        {item.nome}

      </Text>

      <Text style={styles.descricao}>

        {item.descricao}

      </Text>

      <Text style={styles.preco}>

        R$ {Number(item.preco).toFixed(2)}

      </Text>

      <View style={styles.quantidadeContainer}>

        <TouchableOpacity
          style={styles.quantidadeBotao}
          onPress={diminuir}
        >
          <Text style={styles.quantidadeTexto}>
            -
          </Text>
        </TouchableOpacity>

        <Text style={styles.quantidade}>
          {quantidade}
        </Text>

        <TouchableOpacity
          style={styles.quantidadeBotao}
          onPress={aumentar}
        >
          <Text style={styles.quantidadeTexto}>
            +
          </Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity

        style={styles.botao}

        onPress={() => onAdicionar(quantidade)}

      >

        <Text style={styles.textoBotao}>

          Adicionar

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFF",

    marginBottom: 15,

    padding: 15,

    borderRadius: 15,

    elevation: 2,

  },

  image: {

    width: "100%",

    height: 180,

    borderRadius: 10,

    marginBottom: 10,

  },

  nome: {

    fontWeight: "bold",

    fontSize: 20,

  },

  descricao: {

    color: "#666",

    marginVertical: 8,

  },

  preco: {

    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 15,

  },

  quantidadeContainer: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 15,

  },

  quantidadeBotao: {

    backgroundColor: "#111",

    width: 40,

    height: 40,

    borderRadius: 10,

    alignItems: "center",

    justifyContent: "center",

  },

  quantidadeTexto: {

    color: "#FFF",

    fontSize: 25,

    fontWeight: "bold",

  },

  quantidade: {

    fontSize: 20,

    fontWeight: "bold",

    marginHorizontal: 20,

  },

  botao: {

    backgroundColor: "#111",

    padding: 14,

    borderRadius: 10,

    alignItems: "center",

  },

  textoBotao: {

    color: "#FFF",

    fontWeight: "bold",

    fontSize: 16,

  },

});