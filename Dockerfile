# Especifica la imagen base
FROM node:16

RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de la aplicación
COPY package*.json tsconfig.json ./

# Instala las dependencias de la aplicación

RUN npm install

# Copia los archivos de la aplicación
COPY . .

# Compila el código TypeScript en JavaScript
RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8080

# Ejecuta la aplicación
CMD [ "npm", "start" ]