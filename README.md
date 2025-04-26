POST /api/brands:
Descripción: Crea una nueva marca.
Body: { "name": "Nombre de la marca" } (campo name es requerido, máximo 20 caracteres).
Respuesta Exitosa (201): { "data": { "id": ..., "name": "..." }, "status": 201, "message": "Marca creada exitosamente" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación", "errors": [...] } (si el nombre falta o excede la longitud) o { "data": null, "status": 400, "message": "Ya existe una marca con ese nombre." } (si el nombre ya existe).
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al crear la marca" }.

GET /api/brands:
Descripción: Obtiene la lista de todas las marcas.
Respuesta Exitosa (200): { "data": [ { "id": ..., "name": "..." }, ... ], "status": 200, "message": "Marcas obtenidas correctamente" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al obtener las marcas" }.

GET /api/brands/:id:
Descripción: Obtiene una marca específica por su ID.
Parámetros de la URL: id (entero positivo requerido).
Respuesta Exitosa (200): { "data": { "id": ..., "name": "..." }, "status": 200, "message": "Marca encontrada" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación en el ID", "errors": [...] } (si el ID no es válido).
Respuesta Error (404): { "data": null, "status": 404, "message": "Marca no encontrada" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al obtener la marca" }.

PUT /api/brands/:id:
Descripción: Actualiza una marca existente por su ID.
Parámetros de la URL: id (entero positivo requerido).
Body: { "name": "Nuevo nombre de la marca" } (campo name es requerido, máximo 20 caracteres).
Respuesta Exitosa (200): { "data": { "id": ..., "name": "Nuevo nombre de la marca" }, "status": 200, "message": "Marca actualizada exitosamente" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación", "errors": [...] } (si el nombre no es válido) o { "data": null, "status": 400, "message": "Ya existe una marca con ese nombre." }.
Respuesta Error (404): { "data": null, "status": 404, "message": "Marca no encontrada" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al actualizar la marca" }.

DELETE /api/brands/:id:
Descripción: Elimina una marca existente por su ID.
Parámetros de la URL: id (entero positivo requerido).
Respuesta Exitosa (200): { "data": null, "status": 200, "message": "Marca eliminada exitosamente" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación en el ID", "errors": [...] } (si el ID no es válido).
Respuesta Error (404): { "data": null, "status": 404, "message": "Marca no encontrada" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al eliminar la marca" }.

GET /api/cars:
Descripción: Obtiene la lista paginada de automóviles.
Query Parameters: page (entero, página a mostrar, por defecto 1), limit (entero, cantidad de autos por página, por defecto 10).
Respuesta Exitosa (200): { "data": { "cars": [ ... ], "total": ..., "page": ..., "totalPages": ... }, "status": 200, "message": "Autos obtenidos correctamente" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al obtener autos" }.

GET /api/cars/:id:
Descripción: Obtiene los detalles de un automóvil específico por su ID (incluyendo la marca).
Parámetros de la URL: id (entero positivo requerido).
Respuesta Exitosa (200): { "data": { ... }, "status": 200, "message": "Auto encontrado" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación en el ID", "errors": [...] }.
Respuesta Error (404): { "data": null, "status": 404, "message": "Auto no encontrado" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al obtener el auto" }.

POST /api/cars:
Descripción: Agrega un nuevo automóvil.
Body: { "modelo": "...", "descripcion": "...", "precio": ..., "kilometraje": ..., "brandId": ... } (modelo, precio, kilometraje, brandId son requeridos).
Respuesta Exitosa (201): { "data": { ... }, "status": 201, "message": "Auto creado exitosamente" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación", "errors": [...] }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al crear el auto" }.

PUT /api/cars/:id:
Descripción: Actualiza un automóvil existente por su ID.
Parámetros de la URL: id (entero positivo requerido).
Body: { "modelo": "...", "descripcion": "...", "precio": ..., "kilometraje": ..., "brandId": ... } (todos los campos validados).
Respuesta Exitosa (200): { "data": { ... }, "status": 200, "message": "Auto actualizado exitosamente" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación", "errors": [...] }.
Respuesta Error (404): { "data": null, "status": 404, "message": "Auto no encontrado" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al actualizar el auto" }.

DELETE /api/cars/:id:
Descripción: Elimina un automóvil existente por su ID.
Parámetros de la URL: id (entero positivo requerido).
Respuesta Exitosa (200): { "data": null, "status": 200, "message": "Auto eliminado exitosamente" }.
Respuesta Error (400): { "data": null, "status": 400, "message": "Error de validación en el ID", "errors": [...] }.
Respuesta Error (404): { "data": null, "status": 404, "message": "Auto no encontrado" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al eliminar el auto" }.

GET /api/cars/filter:
Descripción: Filtra automóviles por modelo, precio y/o kilometraje.
Query Parameters: modelo (string, para buscar por modelo), precio (entero, para buscar por precio exacto), precio_min (entero, precio mínimo), precio_max (entero, precio máximo), kilometraje (entero, para buscar por kilometraje exacto), kilometraje_min (entero, kilometraje mínimo), kilometraje_max (entero, kilometraje máximo).
Respuesta Exitosa (200): { "data": [ ... ], "status": 200, "message": "Autos filtrados correctamente" }.
Respuesta Error (500): { "data": null, "status": 500, "message": "Error al filtrar los autos" }.