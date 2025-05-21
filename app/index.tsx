"use client"

import { useState, useEffect, useRef } from "react"
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import RoomDetailModal from "../components/RoomDetailModal"
import FilterPanel from "../components/FilterPanel"
import { fetchRooms } from "../lib/api"
import type { Room } from "../lib/types"

// Coordenadas del campus UC San Joaquín
const INITIAL_REGION: Region = {
  latitude: -33.4985,
  longitude: -70.6119,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
}

// Límites del mapa (campus)
const MAP_BOUNDARIES = {
  northEast: {
    latitude: -33.4965,
    longitude: -70.6099,
  },
  southWest: {
    latitude: -33.5005,
    longitude: -70.6139,
  },
}

export default function HomeScreen() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isDetailVisible, setIsDetailVisible] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    occupancy: "all", // 'available', 'medium', 'full', 'all'
    silence: "all", // 'high', 'medium', 'low', 'all'
    size: "all", // 'small', 'medium', 'large', 'all'
    outlets: "all", // 'yes', 'no', 'all'
  })

  const mapRef = useRef<MapView>(null)

  // Función para obtener datos de las salas
  const loadRooms = async () => {
    try {
      const data = await fetchRooms()
      setRooms(data)
      setFilteredRooms(data)
      setLoading(false)
    } catch (error) {
      console.error("Error loading rooms:", error)
      setLoading(false)
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    loadRooms()

    // Configurar actualización automática cada 10 segundos
    const interval = setInterval(() => {
      loadRooms()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Aplicar filtros y búsqueda
  useEffect(() => {
    let result = rooms

    // Aplicar búsqueda
    if (searchQuery) {
      result = result.filter(
        (room) =>
          room.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Aplicar filtros
    if (filters.occupancy !== "all") {
      result = result.filter((room) => {
        const occupancyRate = (room.ocupacion / room.capacidad) * 100
        if (filters.occupancy === "available") return occupancyRate < 50
        if (filters.occupancy === "medium") return occupancyRate >= 50 && occupancyRate <= 80
        if (filters.occupancy === "full") return occupancyRate > 80
        return true
      })
    }

    if (filters.silence !== "all") {
      result = result.filter((room) => room.nivelSilencio === filters.silence)
    }

    if (filters.size !== "all") {
      result = result.filter((room) => room.tamano === filters.size)
    }

    if (filters.outlets !== "all") {
      result = result.filter(
        (room) => (filters.outlets === "yes" && room.enchufes) || (filters.outlets === "no" && !room.enchufes),
      )
    }

    setFilteredRooms(result)
  }, [rooms, searchQuery, filters])

  // Determinar el color del marcador según la ocupación
  const getMarkerColor = (ocupacion: number, capacidad: number) => {
    const rate = (ocupacion / capacidad) * 100
    if (rate < 50) return "green"
    if (rate <= 80) return "yellow"
    return "red"
  }

  // Mostrar detalles de la sala
  const handleMarkerPress = (room: Room) => {
    setSelectedRoom(room)
    setIsDetailVisible(true)
  }

  // Refrescar datos manualmente
  const handleRefresh = () => {
    setLoading(true)
    loadRooms()
  }

  // Aplicar nuevos filtros
  const applyFilters = (newFilters: any) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>Cargando salas...</Text>
        </View>
      ) : (
        <>
          {/* Mapa */}
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            minZoomLevel={17}
            maxZoomLevel={20}
            rotateEnabled={false}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            showsScale={true}
          >
            {filteredRooms.map((room) => (
              <Marker
                key={room.id}
                coordinate={{ latitude: room.lat, longitude: room.lng }}
                title={room.nombre}
                description={`${room.ocupacion}/${room.capacidad} personas`}
                onPress={() => handleMarkerPress(room)}
                pinColor={getMarkerColor(room.ocupacion, room.capacidad)}
              />
            ))}
          </MapView>

          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar sala..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterVisible(true)}>
              <Ionicons name="options" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Leyenda */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "green" }]} />
              <Text style={styles.legendText}>Disponible</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "yellow" }]} />
              <Text style={styles.legendText}>Medio</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "red" }]} />
              <Text style={styles.legendText}>Lleno</Text>
            </View>
          </View>

          {/* Botón de recarga */}
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>

          {/* Contador de resultados */}
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>
              {filteredRooms.length} {filteredRooms.length === 1 ? "sala" : "salas"} encontradas
            </Text>
          </View>
        </>
      )}

      {/* Modal de detalles */}
      <RoomDetailModal visible={isDetailVisible} room={selectedRoom} onClose={() => setIsDetailVisible(false)} />

      {/* Panel de filtros */}
      <FilterPanel
        visible={isFilterVisible}
        initialFilters={filters}
        onApply={applyFilters}
        onClose={() => setIsFilterVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#0066CC",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  refreshButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#0066CC",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  legendContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
  resultsContainer: {
    position: "absolute",
    top: 110,
    left: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultsText: {
    fontSize: 12,
    fontWeight: "500",
  },
})
