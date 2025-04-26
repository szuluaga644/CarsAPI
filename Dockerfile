# Usa una imagen base de Node.js (elige la versión que estés usando)
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install --production

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación escucha (por defecto 8020)
EXPOSE 8020

# Define el comando para ejecutar tu aplicación
CMD [ "node", "src/index.js" ]