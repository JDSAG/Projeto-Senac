import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PedidoBar({ pedido, onPress }) {

    if (!pedido || pedido.itens.length === 0)
        return null;

    const quantidade = pedido.itens.reduce(
        (acc, item) => acc + item.quantidade,
        0
    );

    return (

        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >

            <View>

                <Text style={styles.titulo}>
                    🛒 Ver Pedido
                </Text>

                <Text style={styles.itens}>
                    {quantidade} itens
                </Text>

            </View>

            <Text style={styles.total}>
                R$ {Number(pedido.total).toFixed(2)}
            </Text>

        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({

    container:{
        backgroundColor:"#111",
        margin:15,
        marginTop:0,
        borderRadius:15,
        padding:18,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },

    titulo:{
        color:"#FFF",
        fontSize:18,
        fontWeight:"bold"
    },

    itens:{
        color:"#DDD"
    },

    total:{
        color:"#FFF",
        fontWeight:"bold",
        fontSize:18
    }

});