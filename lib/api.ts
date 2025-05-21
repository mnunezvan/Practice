import type { Room } from "./types"

// URL base de la API (en un entorno real, esto vendría de una variable de entorno)
const API_BASE_URL = "https://api.example.com"

// Función para obtener todas las salas
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    // En un entorno real, esto sería una llamada a la API
    // const response = await fetch(`${API_BASE_URL}/salas`);
    // if (!response.ok) throw new Error('Error fetching rooms');
    // return await response.json();

    // Para el MVP, simulamos datos estáticos con valores aleatorios de ocupación
    return getMockRooms()
  } catch (error) {
    console.error("Error fetching rooms:", error)
    throw error
  }
}

// Función para obtener detalles de una sala específica
export const fetchRoomDetails = async (roomId: string): Promise<Room> => {
  try {
    // En un entorno real, esto sería una llamada a la API
    // const response = await fetch(`${API_BASE_URL}/salas/${roomId}`);
    // if (!response.ok) throw new Error('Error fetching room details');
    // return await response.json();

    // Para el MVP, devolvemos la sala del mock
    const rooms = getMockRooms()
    const room = rooms.find((r) => r.id === roomId)
    if (!room) throw new Error("Room not found")
    return room
  } catch (error) {
    console.error("Error fetching room details:", error)
    throw error
  }
}

// Función para generar datos de prueba
const getMockRooms = (): Room[] => {
  // Generamos ocupación aleatoria para simular cambios en tiempo real
  return [
    {
      id: "salaA101",
      nombre: "Sala A101",
      lat: -33.4985,
      lng: -70.6119,
      ocupacion: Math.floor(Math.random() * 15),
      capacidad: 20,
      nivelSilencio: "high",
      tamano: "medium",
      enchufes: true,
      iluminacion: "good",
      serviciosCercanos: ["Baños", "Cafetería"],
    },
    {
      id: "salaB203",
      nombre: "Sala B203",
      lat: -33.4982,
      lng: -70.6115,
      ocupacion: Math.floor(Math.random() * 30),
      capacidad: 30,
      nivelSilencio: "medium",
      tamano: "large",
      enchufes: true,
      iluminacion: "good",
      serviciosCercanos: ["Baños", "Fotocopiadora"],
    },
    {
      id: "salaC105",
      nombre: "Sala C105",
      lat: -33.4988,
      lng: -70.6125,
      ocupacion: Math.floor(Math.random() * 10),
      capacidad: 10,
      nivelSilencio: "low",
      tamano: "small",
      enchufes: false,
      iluminacion: "poor",
      serviciosCercanos: ["Baños"],
    },
    {
      id: "salaD302",
      nombre: "Sala D302",
      lat: -33.498,
      lng: -70.6122,
      ocupacion: Math.floor(Math.random() * 25),
      capacidad: 25,
      nivelSilencio: "high",
      tamano: "medium",
      enchufes: true,
      iluminacion: "regular",
      serviciosCercanos: ["Baños", "Cafetería", "Fotocopiadora"],
    },
    {
      id: "salaE201",
      nombre: "Sala E201",
      lat: -33.4986,
      lng: -70.611,
      ocupacion: Math.floor(Math.random() * 40),
      capacidad: 40,
      nivelSilencio: "medium",
      tamano: "large",
      enchufes: true,
      iluminacion: "good",
      serviciosCercanos: ["Baños", "Cafetería"],
    },
    {
      id: "salaF102",
      nombre: "Sala F102",
      lat: -33.499,
      lng: -70.6118,
      ocupacion: Math.floor(Math.random() * 15),
      capacidad: 15,
      nivelSilencio: "low",
      tamano: "small",
      enchufes: false,
      iluminacion: "regular",
      serviciosCercanos: ["Baños"],
    },
    {
      id: "salaG205",
      nombre: "Sala G205",
      lat: -33.4983,
      lng: -70.6128,
      ocupacion: Math.floor(Math.random() * 20),
      capacidad: 20,
      nivelSilencio: "high",
      tamano: "medium",
      enchufes: true,
      iluminacion: "good",
      serviciosCercanos: ["Baños", "Fotocopiadora"],
    },
  ]
}
