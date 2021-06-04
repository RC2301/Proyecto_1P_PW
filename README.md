# Proyecto_1P_PW
Este es el proyecto del primer parcial en la materia de Plataformas Web, del Itinerario de Software, desarrollado por Richard Camacho.
### Pre-requisitos 📋
Para la realización y prueba del código mostrado en el repositorio se utilizó:
<ol>
  <li>Visual Studio Code</li>
  <li>Node JS  v14.16.1</li>
  <li>NPM 6.14.12</li>
  <h5> Librerías NPM </h5>
<ul><li> [<a href="https://www.npmjs.com/package/yargs">yargs</a>] - Ayuda a crear herramientas de línea de comandos interactivas, analizando argumentos y generando una elegante interfaz de usuario.</li>
<li> [<a href="https://www.npmjs.com/package/colors">colors</a>] - Dar color y estilo la impresiones por consola node.js</li>
<li> [<a href="https://www.npmjs.com/package/neat-csv">neat-csv</a>] - Analizador CSV rápido</li></ul>
  <h5>Diseño</h5>
<ul><li>[<a href="https://getbootstrap.com/">Bootstrap</a>] - Bootstrap es una biblioteca multiplataforma o conjunto de herramientas de código abierto para diseño de sitios y aplicaciones web.</li>
</ul><h5> Dataset </h5><ul>
  <li> <a href="https://datos.bancomundial.org/indicador/IT.CEL.SETS">Dataset de Suscripciones a telefonía celular móvil </a></li></ul></ol><br/>
### Instalación 🔧
<h4>Instalación del IDE Visual Studio Code</h4>
<p>Para trabajar con Javascript y NodeJS se debe utilizar el IDE de su preferecia,<br>
en esa ocacion se trabajo con el IDE Visual Studio Code</p><ol>
<li>Debemos descargar e instalar el IDE de desarrollo <a href="https://code.visualstudio.com/Download">Visual Studio Code</a>. </li>
<li>Con el Visual Studio Code instalado y ejecutado, se procede a instalar ciertos plugins necesarios para su buen funcionamiento, y ayuda a la hora de programar</li>
<ul><li>HTML CSS Support: Sirve para lograr autocompletar HTML como CSS para lograr un diseño más rápido de la página web. </li>
<li>VS Code JavaScript (ES6) snippets: Para lograr una construcción más rápida de código un poco más avanzado de JS, tales como funciones, objetos, constructores, entre otros. </li>
<li>VS Code JS, CSS, HTML Formatting: Brinda atajos de teclado para varias acciones dentro del IDE, además de que agrega una librería que muestra con colores según el uso o la funcionalidad del código para que se vea una forma más bonita y entendible</li>
<li>Terminal for Visual Studio Code: Se agrega un terminal dentro del mismo Visual Studio Code, que permite abrir ciertos archivos en el terminal, además de generar código directamente en el terminal</li>
<li>TypeScript Importer: Se da un autocompletado o atajos para ciertas funciones de Typescript. </li></ul>
<li>Finalmente se está listo para poder trabajar.</li></ol>
<h4>Instalación del IDE Visual Studio Code</h4>
<ol><li>Debemos descargar e instalar el <a href="https://nodejs.org/es/download/">Node js</a>. </li></ol>
<h3>Comandos para poder instalar las dependencias del proyecto.</h3>
```
npm install yargs
```
```
npm install colors --save
```
## Despliegue 📦
<h3>Proyecto</h3><br>
  <h5>El programa dispone de dos comandos: </h5>
  <ol>
        <li><b>Publicar:</b> Este comando publicará las estadísticas en una página web básica. Se requieren de tres parámetros:<ul>
         <li>--file -f: Permite establecer el path del archivo CSV que contiene los datos a analizar</li>
         <li>--country -c: Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3</li>
         <li>--year -y: Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 2018.</li></ul></li>
    <li> <b> Guardar: </b> Este comando almacenará los resultados de las estadísticas en un archivo json. Recibe los mismos parámetros que el comando anterior, y se adiciona la siguiente opción:
    <ul><li>--out -o: Establece el nombre del archivo donde se almacenará los resultados</li></ul></li></ol>
<h3>Comandos para ejecutar</h3> 
<ul><li>Publicar</li></ul>
```
node app.js Publicar -f "PATH" -c COD -y AÑO 
```
<ul><li>Guardar</li></ul> 

```
node app.js Guardar -f "PATH" -c COD -y AÑO -o Nombre_Documento 
```
## Tag - Release 📌
Al culminar el proyecto, quedaron marcadas en GitHub 2 versiones del proyecto, el cual puede ser revisado [aquí](https://github.com/RC2301/Proyecto_1P_PW/releases).
## Autor ✒️
- **Richard Camacho** - _Estudiante. Ingeniería en Ciencias de la Computación_ - [RC2301](https://github.com/RC2301)
## Licencia 📄
Este proyecto tiene la Licencia ISC.