# API con Google Sheets

La idea de este repositorio es simplemente mostrar como se puede utilizar Google Sheets como una API para proyectos.

Tanto en el código como aquí dejo algunos comentarios con lo más importante para entender como se realiza, aprendido a partir del video de Gonzalo Pozzo (Goncy), en el cual a partir del minuto 38:45 se hace la conexión con Google Sheets: https://www.youtube.com/watch?v=DgPcpte1eoA

### Librerias utilizadas:

- https://axios-http.com/docs/intro
- https://www.papaparse.com/

### Pasos a seguir:

1. Para empezar, en el archivo de Google Sheets debemos ir a "Archivo" - "Compartir" - "Publicar en la web" y elegir "Valores separados por coma" (.csv).
   Luego de eso el link que se nos proporciona es el endpoint al que se realiza la consulta.

2. El segundo paso es instalar una libreria que nos permita hacer un request, que en este caso se uso "axios".

3. En tercer lugar, hay que instalar una libreria para parsear csv a json, que en este caso usamos PapaParse.