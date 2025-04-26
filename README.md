Esta es una API fue construida con Node.js y Express.js, PostgreSQL, Jest y Docker
El objetivo principal de esta API es gestionar un catálogo de automóviles y sus respectivas marcas. 
Permite realizar operaciones CRUD.

Para ejecutar pruebas unitarias: npm test

Para Dockerizar: docker build -t backend-cars-api .
Para correr Docker: docker run -p 8020:8020 backend-cars-api

EndPoints de la API:
Marcas:
POST /api/brands: Crea una nueva marca
Body: { 
    "name": "Nombre de la marca"
     }
Respuesta Exitosa (201): "Marca creada exitosamente"
Respuesta Error (400): "Error de validación", "Ya existe una marca con ese nombre."
Respuesta Error (500): "Error al crear la marca"

GET /api/brands: Obtiene la lista de todas las marcas
Respuesta Exitosa (200): "Marcas obtenidas correctamente"
Respuesta Error (500): "Error al obtener las marcas"

GET /api/brands/(id): Obtiene una marca específica por su ID. Requiere un numero entero positivo
Respuesta Exitosa (200): "Marca encontrada"
Respuesta Error (400): "Error de validación en el ID"
Respuesta Error (404): "Marca no encontrada"
Respuesta Error (500): "Error al obtener la marca"

PUT /api/brands/(id): Actualiza una marca existente por ID. Requiere un numero entero positivo
Body: {
    "name": "Nuevo nombre de la marca"
     }
Respuesta Exitosa (200): "Marca actualizada exitosamente"
Respuesta Error (400): "Error de validación", "Ya existe una marca con ese nombre."
Respuesta Error (404): "Marca no encontrada"
Respuesta Error (500): "Error al actualizar la marca"

DELETE /api/brands/(id): Elimina una marca existente por ID. Requiere numero entero positivo
Respuesta Exitosa (200): "Marca eliminada exitosamente"
Respuesta Error (400): "Error de validación en el ID"
Respuesta Error (404): "Marca no encontrada"
Respuesta Error (500): "Error al eliminar la marca"

Carros:
GET /api/cars: Obtiene la lista de carros
Respuesta Exitosa (200): "Autos obtenidos correctamente"
Respuesta Error (500): "Error al obtener autos"

GET /api/cars/(id): Obtiene los detalles de un carro en específico por ID. Requiere numero entero positivo
Respuesta Exitosa (200): "Auto encontrado"
Respuesta Error (400): "Error de validación en el ID"
Respuesta Error (404): "Auto no encontrado"
Respuesta Error (500): "Error al obtener el auto"

POST /api/cars: Agrega un nuevo automóvil.
Body: { 
    "modelo": "string", (Requerido) 
    "descripcion": "string", (No Req)
    "precio": entero, (Req)
    "kilometraje": entero, (Req)
    "brandId": entero (Req)
     } 
Respuesta Exitosa (201): "Auto creado exitosamente"
Respuesta Error (400): "Error de validación"
Respuesta Error (500): "Error al crear el auto"

PUT /api/cars/(id): Actualiza un carro existente por ID. Requiere numero entero positivo
Body: { 
    "modelo": "", 
    "descripcion": "", 
    "precio": , 
    "kilometraje": , 
    "brandId": 
     }
Respuesta Exitosa (200): "Auto actualizado exitosamente"
Respuesta Error (400): "Error de validación"
Respuesta Error (404): "Auto no encontrado"
Respuesta Error (500): "Error al actualizar el auto"

DELETE /api/cars/(id): Elimina uncarro existente por ID.
Respuesta Exitosa (200): "Auto eliminado exitosamente" 
Respuesta Error (400): "Error de validación en el ID"
Respuesta Error (404): "Auto no encontrado"
Respuesta Error (500): "Error al eliminar el auto"

GET /api/cars/filter: Filtra carros por modelo, precio y kilometraje
Respuesta Exitosa (200): "Autos filtrados correctamente"
Respuesta Error (500): "Error al filtrar los autos"

Autor: Sebastian Zuluaga Sosa