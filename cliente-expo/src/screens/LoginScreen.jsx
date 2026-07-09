import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { login } from "../services/authService";

export default function LoginScreen({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [mesaId, setMesaId] = useState(null);

  // Mesa só é definida ao voltar do Scanner (não é editável manualmente)
  useEffect(() => {
    if (route.params?.mesaId) {
      setMesaId(route.params.mesaId);
    }
  }, [route.params]);

  async function entrar() {
    if (!nome.trim()) {
      Alert.alert("Aviso", "Informe seu nome.");
      return;
    }

    if (!mesaId) {
      Alert.alert("Aviso", "Escaneie o QR Code da mesa para continuar.");
      return;
    }

    try {
      await login(Number(mesaId), nome);

      navigation.reset({
        index: 0,
        routes: [{ name: "Cardapio" }],
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível realizar o login."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />

      {mesaId ? (
        <View style={styles.mesaBadge}>
          <Text style={styles.mesaBadgeText}>Mesa {mesaId}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Scanner")}>
            <Text style={styles.mesaBadgeTrocar}>Trocar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text style={styles.qrText}>📷 Escanear QR Code da mesa</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.loginButton, !mesaId && styles.loginButtonDisabled]}
        onPress={entrar}
        disabled={!mesaId}
      >
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F2F2F2",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
  },

  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  mesaBadge: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
  },

  mesaBadgeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  mesaBadgeTrocar: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "bold",
  },

  qrButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  qrText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  loginButtonDisabled: {
    backgroundColor: "#999",
  },
  
  loginText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});