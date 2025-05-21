"use client"

import { useState } from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const FilterPanel = ({ visible, initialFilters, onApply, onClose }) => {
  const [filters, setFilters] = useState(initialFilters)

  const handleReset = () => {
    setFilters({
      occupancy: "all",
      silence: "all",
      size: "all",
      outlets: "all",
    })
  }

  const handleApply = () => {
    onApply(filters)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {/* Filtro de ocupación */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Ocupación</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionButton, filters.occupancy === "all" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, occupancy: "all" })}
                >
                  <Text style={[styles.optionText, filters.occupancy === "all" && styles.optionTextSelected]}>
                    Todos
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.occupancy === "available" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, occupancy: "available" })}
                >
                  <Text style={[styles.optionText, filters.occupancy === "available" && styles.optionTextSelected]}>
                    Disponible
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.occupancy === "medium" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, occupancy: "medium" })}
                >
                  <Text style={[styles.optionText, filters.occupancy === "medium" && styles.optionTextSelected]}>
                    Medio
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.occupancy === "full" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, occupancy: "full" })}
                >
                  <Text style={[styles.optionText, filters.occupancy === "full" && styles.optionTextSelected]}>
                    Lleno
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Filtro de nivel de silencio */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Nivel de silencio</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionButton, filters.silence === "all" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, silence: "all" })}
                >
                  <Text style={[styles.optionText, filters.silence === "all" && styles.optionTextSelected]}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.silence === "alto" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, silence: "alto" })}
                >
                  <Text style={[styles.optionText, filters.silence === "alto" && styles.optionTextSelected]}>Alto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.silence === "medio" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, silence: "medio" })}
                >
                  <Text style={[styles.optionText, filters.silence === "medio" && styles.optionTextSelected]}>
                    Medio
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.silence === "bajo" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, silence: "bajo" })}
                >
                  <Text style={[styles.optionText, filters.silence === "bajo" && styles.optionTextSelected]}>Bajo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Filtro de tamaño */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Tamaño</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionButton, filters.size === "all" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, size: "all" })}
                >
                  <Text style={[styles.optionText, filters.size === "all" && styles.optionTextSelected]}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.size === "pequeña" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, size: "pequeña" })}
                >
                  <Text style={[styles.optionText, filters.size === "pequeña" && styles.optionTextSelected]}>
                    Pequeña
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.size === "mediana" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, size: "mediana" })}
                >
                  <Text style={[styles.optionText, filters.size === "mediana" && styles.optionTextSelected]}>
                    Mediana
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.size === "grande" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, size: "grande" })}
                >
                  <Text style={[styles.optionText, filters.size === "grande" && styles.optionTextSelected]}>
                    Grande
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Filtro de enchufes */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Enchufes</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionButton, filters.outlets === "all" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, outlets: "all" })}
                >
                  <Text style={[styles.optionText, filters.outlets === "all" && styles.optionTextSelected]}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.outlets === "yes" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, outlets: "yes" })}
                >
                  <Text style={[styles.optionText, filters.outlets === "yes" && styles.optionTextSelected]}>
                    Disponibles
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, filters.outlets === "no" && styles.optionButtonSelected]}
                  onPress={() => setFilters({ ...filters, outlets: "no" })}
                >
                  <Text style={[styles.optionText, filters.outlets === "no" && styles.optionTextSelected]}>
                    No disponibles
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Restablecer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
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
    height: "80%",
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
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: "#0066CC",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  optionTextSelected: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#0066CC",
    borderRadius: 8,
    padding: 15,
    marginLeft: 10,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
})

export default FilterPanel
