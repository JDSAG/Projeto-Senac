// screens/DashboardScreen.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL; 
const screenWidth = Dimensions.get("window").width;

const CORES = {
  primaria: "#6C63FF",
  secundaria: "#FF6584",
  fundo: "#F7F7FB",
  cardFundo: "#FFFFFF",
  texto: "#1E1E2D",
  textoSecundario: "#8A8A9E",
  sucesso: "#00C48C",
  alerta: "#FFB020",
};

export default function DashboardScreen() {
    const { width } = useWindowDimensions();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);
  const intervaloRef = useRef(null);
    
  const buscarResumo = useCallback(async (mostrarLoading = false) => {
    try {
      if (mostrarLoading) setLoading(true);
      setErro(null);
      const response = await fetch(`${apiURL}/dashboard/resumo`);
      if (!response.ok) throw new Error("Erro ao buscar dashboard");
      const json = await response.json();
      setDados(json);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    buscarResumo(true); // busca inicial, mostra spinner cheio

    intervaloRef.current = setInterval(() => {
      buscarResumo(false); 
    }, 30000);

    return () => clearInterval(intervaloRef.current);
  }, [buscarResumo]);

  const onRefresh = () => {
    setRefreshing(true);
    buscarResumo(false);
  };

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={CORES.primaria} />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoErro}>{erro}</Text>
      </View>
    );
  }

  const dadosPizzaMesas = [
    {
      name: "Ocupadas",
      quantidade: dados.mesas_ocupadas,
      color: CORES.secundaria,
      legendFontColor: CORES.texto,
      legendFontSize: 13,
    },
    {
      name: "Livres",
      quantidade: dados.mesas_livres,
      color: CORES.sucesso,
      legendFontColor: CORES.texto,
      legendFontSize: 13,
    },
  ];

  const dadosBarraPedidos = {
    labels: ["Pendentes", "Concluídos hoje"],
    datasets: [
      {
        data: [dados.pedidos_pendentes, dados.pedidos_concluidos_hoje],
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.titulo}>Dashboard</Text>
      <Text style={styles.subtitulo}>Visão geral do restaurante hoje</Text>

      <View style={styles.grid}>
        <ResumoCard
          label="Faturamento hoje"
          valor={`R$ ${dados.faturamento_hoje.toFixed(2)}`}
          cor={CORES.primaria}
        />
        <ResumoCard
          label="Pedidos pendentes"
          valor={dados.pedidos_pendentes}
          cor={CORES.alerta}
        />
        <ResumoCard
          label="Concluídos hoje"
          valor={dados.pedidos_concluidos_hoje}
          cor={CORES.sucesso}
        />
        <ResumoCard
          label="Mesas ocupadas"
          valor={dados.mesas_ocupadas}
          cor={CORES.secundaria}
        />
      </View>

      <View style={styles.cardGrafico}>
        <Text style={styles.tituloGrafico}>Mesas: ocupadas x livres</Text>
        <PieChart
          data={dadosPizzaMesas}
          width={screenWidth - 64}
          height={180}
          chartConfig={chartConfig}
          accessor="quantidade"
          backgroundColor="transparent"
          paddingLeft="8"
        />
      </View>

      <View style={styles.cardGrafico}>
        <Text style={styles.tituloGrafico}>Pedidos: pendentes x concluídos</Text>
        <BarChart
          data={dadosBarraPedidos}
          width={screenWidth - 64}
          height={220}
          fromZero
          showValuesOnTopOfBars
          chartConfig={chartConfig}
          style={{ borderRadius: 12 }}
        />
      </View>
    </ScrollView>
  );
}

function ResumoCard({ label, valor, cor }) {
  return (
    <View style={styles.card}>
      <View style={[styles.barraCor, { backgroundColor: cor }]} />
      <Text style={styles.cardValor}>{valor}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: CORES.cardFundo,
  backgroundGradientTo: CORES.cardFundo,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
  labelColor: (opacity = 1) => CORES.texto,
  barPercentage: 0.6,
  propsForBackgroundLines: { stroke: "#EAEAF2" },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CORES.fundo, padding: 16 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 26, fontWeight: "700", color: CORES.texto },
  subtitulo: {
    fontSize: 14,
    color: CORES.textoSecundario,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: CORES.cardFundo,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  barraCor: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardValor: { fontSize: 22, fontWeight: "700", color: CORES.texto },
  cardLabel: { fontSize: 13, color: CORES.textoSecundario, marginTop: 4 },
  cardGrafico: {
    backgroundColor: CORES.cardFundo,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  tituloGrafico: {
    fontSize: 15,
    fontWeight: "600",
    color: CORES.texto,
    marginBottom: 8,
  },
  textoErro: { color: "red" },
});