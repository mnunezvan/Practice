// Este archivo simularía un endpoint de API para obtener detalles de una sala específica

export async function GET(request, { params }) {
  // Obtenemos el ID de la sala de los parámetros de la ruta
  const { id } = params

  // Simulamos un pequeño retraso para imitar una llamada a la API real
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Datos de ejemplo para las salas
  const rooms = [
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

  // Buscamos la sala por ID
  const room = rooms.find((r) => r.id === id)

  if (!room) {
    return new Response(JSON.stringify({ error: "Sala no encontrada" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return new Response(JSON.stringify(room), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
