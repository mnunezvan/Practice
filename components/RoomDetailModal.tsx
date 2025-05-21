import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const RoomDetailModal = ({ visible, room, onClose }) => {
  if (!room) return null

  const occupancyRate = (room.ocupacion / room.capacidad) * 100
  const occupancyStatus =
    occupancyRate < 50
      ? { text: "Disponible", color: "green" }
      : occupancyRate <= 80
        ? { text: "Medio lleno", color: "orange" }
        : { text: "Lleno", color: "red" }

  const getSilenceText = (level) => {
    switch (level) {
      case "alto":
        return "Alto"
      case "medio":
        return "Medio"
      case "bajo":
        return "Bajo"
      default:
        return "No especificado"
    }
  }

  const getSizeText = (size) => {
    switch (size) {
      case "pequeña":
        return "Pequeña"
      case "mediana":
        return "Mediana"
      case "grande":
        return "Grande"
      default:
        return "No especificado"
    }
  }

  const getLightingText = (lighting) => {
    switch (lighting) {
      case "buena":
        return "Buena"
      case "regular":
        return "Regular"
      case "mala":
        return "Mala"
      default:
        return "No especificado"
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{room.nombre}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {/* Estado de ocupación */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Estado</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, { backgroundColor: occupancyStatus.color }]} />
                <Text style={styles.statusText}>{occupancyStatus.text}</Text>
              </View>
              <Text style={styles.occupancyText}>
                {room.ocupacion} de {room.capacidad} personas ({Math.round(occupancyRate)}%)
              </Text>
            </View>

            {/* Características */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Características</Text>

              <View style={styles.featureRow}>
                <View style={styles.featureItem}>
                  <Ionicons name="volume-mute" size={24} color="#0066CC" style={styles.featureIcon} />
                  <Text style={styles.featureLabel}>Nivel de silencio</Text>
                  <Text style={styles.featureValue}>{getSilenceText(room.nivelSilencio)}</Text>
                </View>

                <View style={styles.featureItem}>
                  <Ionicons name="resize" size={24} color="#0066CC" style={styles.featureIcon} />
                  <Text style={styles.featureLabel}>Tamaño</Text>
                  <Text style={styles.featureValue}>{getSizeText(room.tamano)}</Text>
                </View>
              </View>

              <View style={styles.featureRow}>
                <View style={styles.featureItem}>
                  <Ionicons name="flash" size={24} color="#0066CC" style={styles.featureIcon} />
                  <Text style={styles.featureLabel}>Enchufes</Text>
                  <Text style={styles.featureValue}>{room.enchufes ? "Disponibles" : "No disponibles"}</Text>
                </View>

                <View style={styles.featureItem}>
                  <Ionicons name="sunny" size={24} color="#0066CC" style={styles.featureIcon} />
                  <Text style={styles.featureLabel}>Iluminación natural</Text>
                  <Text style={styles.featureValue}>{getLightingText(room.iluminacion)}</Text>
                </View>
              </View>
            </View>

            {/* Proximidad a servicios */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Proximidad a servicios</Text>
              <View style={styles.servicesContainer}>
                {room.serviciosCercanos.map((servicio, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <Ionicons
                      name={
                        servicio === "Baños"
                          ? "water"
                          : servicio === "Cafetería"
                            ? "cafe"
                            : servicio === "Fotocopiadora"
                              ? "copy"
                              : "location"
                      }
                      size={20}
                      color="#0066CC"
                    />
                    <Text style={styles.serviceText}>{servicio}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
  },
  occupancyText: {
    fontSize: 14,
    color: "#666",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  featureItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    marginBottom: 5,
  },
  featureLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  featureValue: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceText: {
    marginLeft: 5,
    fontSize: 14,
  },
})

export default RoomDetailModal
