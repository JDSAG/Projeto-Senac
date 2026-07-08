import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function PedidoCard({

  item,

  onRemove,

}) {

  return (

    <View style={styles.card}>

      <Text style={styles.nome}>

        {item.nome_produto}

      </Text>

      <Text>

        Quantidade: {item.quantidade}

      </Text>

      <Text style={styles.preco}>

        R$ {Number(item.subtotal).toFixed(2)}

      </Text>

      <TouchableOpacity

        style={styles.botao}

        onPress={onRemove}

      >

        <Text style={styles.botaoTexto}>

          Remover

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFF",

    marginBottom: 15,

    borderRadius: 15,

    padding: 18,

  },

  nome: {

    fontWeight: "bold",

    fontSize: 18,

  },

  preco: {

    marginTop: 8,

    fontWeight: "bold",

    fontSize: 17,

  },

  botao: {

    marginTop: 15,

    backgroundColor: "#EF4444",

    borderRadius: 10,

    padding: 10,

    alignItems: "center",

  },

  botaoTexto: {

    color: "#FFF",

    fontWeight: "bold",

  },

});