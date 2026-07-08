import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SCAN_SIZE = 260;
const CORNER_SIZE = 40;
const CORNER_THICKNESS = 4;

// Posição do quadrado de scan, calculada manualmente (sem view full-screen)
const FRAME_TOP = Math.round(SCREEN_HEIGHT / 2 - SCAN_SIZE / 2);
const FRAME_LEFT = Math.round(SCREEN_WIDTH / 2 - SCAN_SIZE / 2);
const FRAME_RIGHT = Math.round(SCREEN_WIDTH / 2 - SCAN_SIZE / 2);
const FRAME_BOTTOM_FROM_TOP = FRAME_TOP + SCAN_SIZE;

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Carregando câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Precisamos da permissão da câmera.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Permitir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleScan({ data }) {
    if (scanned) return;

    setScanned(true);

    let mesaId = null;

    // QR: mesa=5
    if (data.startsWith("mesa=")) {
      mesaId = data.replace("mesa=", "");
    }

    // QR: http://localhost:8000/mesa/5
    else if (data.includes("/mesa/")) {
      mesaId = data.split("/mesa/").pop();
    }

    // QR: apenas "5"
    else if (!isNaN(data)) {
      mesaId = data;
    }

    if (!mesaId || isNaN(Number(mesaId))) {
      Alert.alert(
        "QR Code inválido",
        "Este QR Code não pertence a uma mesa.",
        [
          {
            text: "Escanear novamente",
            onPress: () => setScanned(false),
          },
        ]
      );
      return;
    }

    navigation.replace("Login", {
      mesaId: Number(mesaId),
    });
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/*
        IMPORTANTE: nada de view "full screen" (absoluteFillObject) cobrindo
        a câmera inteira — isso causa tela preta em alguns Android por
        conflito com o SurfaceView. Cada peça do overlay é posicionada
        individualmente com coordenadas fixas, igual ao teste que funcionou.
      */}
      <View style={[styles.corner, styles.cornerTopLeft]} />
      <View style={[styles.corner, styles.cornerTopRight]} />
      <View style={[styles.corner, styles.cornerBottomLeft]} />
      <View style={[styles.corner, styles.cornerBottomRight]} />

      <Text style={styles.text}>
        Aponte a câmera para o QR Code da mesa
      </Text>

      {scanned && (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>
              Escanear novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: "#FFF",
  },

  cornerTopLeft: {
    top: FRAME_TOP,
    left: FRAME_LEFT,
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderTopLeftRadius: 16,
  },

  cornerTopRight: {
    top: FRAME_TOP,
    right: FRAME_RIGHT,
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderTopRightRadius: 16,
  },

  cornerBottomLeft: {
    top: FRAME_BOTTOM_FROM_TOP - CORNER_SIZE,
    left: FRAME_LEFT,
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderBottomLeftRadius: 16,
  },

  cornerBottomRight: {
    top: FRAME_BOTTOM_FROM_TOP - CORNER_SIZE,
    right: FRAME_RIGHT,
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderBottomRightRadius: 16,
  },

  text: {
    position: "absolute",
    top: FRAME_BOTTOM_FROM_TOP + 25,
    left: 20,
    right: 20,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonWrapper: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  button: {
    backgroundColor: "#0A84FF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
