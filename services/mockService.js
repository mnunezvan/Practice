// Datos iniciales de salas
const salas = [
  {
    id: "A101",
    nombre: "Sala A101",
    lat: -33.4985,
    lng: -70.6119,
    ocupacion: 0, // Se actualizará dinámicamente
    capacidad: 20,
    nivelSilencio: "alto", // alto, medio, bajo
    tamano: "mediana", // pequeña, mediana, grande
    enchufes: true,
    iluminacion: "buena", // buena, regular, mala
    serviciosCercanos: ["Baños", "Cafetería"],
  },
  {
    id: "B203",
    nombre: "Sala B203",
    lat: -33.4982,
    lng: -70.6115,
    ocupacion: 0,
    capacidad: 30,
    nivelSilencio: "medio",
    tamano: "grande",
    enchufes: true,
    iluminacion: "buena",
    serviciosCercanos: ["Baños", "Fotocopiadora"],
  },
  {
    id: "C105",
    nombre: "Sala C105",
    lat: -33.4988,
    lng: -70.6125,
    ocupacion: 0,
    capacidad: 10,
    nivelSilencio: "bajo",
    tamano: "pequeña",
    enchufes: false,
    iluminacion: "mala",
    serviciosCercanos: ["Baños"],
  },
  {
    id: "D302",
    nombre: "Sala D302",
    lat: -33.498,
    lng: -70.6122,
    ocupacion: 0,
    capacidad: 25,
    nivelSilencio: "alto",
    tamano: "mediana",
    enchufes: true,
    iluminacion: "regular",
    serviciosCercanos: ["Baños", "Cafetería", "Fotocopiadora"],
  },
  {
    id: "E201",
    nombre: "Sala E201",
    lat: -33.4986,
    lng: -70.611,
    ocupacion: 0,
    capacidad: 40,
    nivelSilencio: "medio",
    tamano: "grande",
    enchufes: true,
    iluminacion: "buena",
    serviciosCercanos: ["Baños", "Cafetería"],
  },
  {
    id: "F102",
    nombre: "Sala F102",
    lat: -33.499,
    lng: -70.6118,
    ocupacion: 0,
    capacidad: 15,
    nivelSilencio: "bajo",
    tamano: "pequeña",
    enchufes: false,
    iluminacion: "regular",
    serviciosCercanos: ["Baños"],
  },
  {
    id: "G205",
    nombre: "Sala G205",
    lat: -33.4983,
    lng: -70.6128,
    ocupacion: 0,
    capacidad: 20,
    nivelSilencio: "alto",
    tamano: "mediana",
    enchufes: true,
    iluminacion: "buena",
    serviciosCercanos: ["Baños", "Fotocopiadora"],
  },
]

// Función para obtener todas las salas
export const getSalas = () => {
  // Inicializar ocupación aleatoria al inicio
  return salas.map((sala) => ({
    ...sala,
    ocupacion: Math.floor(Math.random() * (sala.capacidad + 1)),
  }))
}

// Función para actualizar la ocupación de las salas aleatoriamente
export const actualizarOcupacion = (salasActuales) => {
  return salasActuales.map((sala) => ({
    ...sala,
    ocupacion: Math.floor(Math.random() * (sala.capacidad + 1)),
  }))
}

// Función para obtener una sala por ID
export const getSalaPorId = (id, salasActuales) => {
  return salasActuales.find((sala) => sala.id === id)
}
