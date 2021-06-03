const file = {
    flag: true,
    alias: "f",
    descripcion: "Permite establecer el path del archivo CSV que contiene los datos a analizar."
}
const country = {
    flag: true,
    alias: "c",
    descripcion: "Permite determinar el país a analizar a través de su código ISO 3166 ALPHA - 3. "
}

const year = {
    alias: "y",
    descripcion: "Permite especificar el año para el cual se requiere las estadísticas. Por defecto 2018. ",
    default: 2018
}
const out = {
    flag: true,
    alias: "o",
    descripcion: "Establece el nombre del archivo donde se almacenará los resultados."

}

const argv = require("yargs")
    .command("Publicar", "Este comando publicará las estadísticas en una página web básica.", {
        file,
        country,
        year
    })
    .command("Guardar", "Este comando almacenará los resultados de las estadísticas en un archivo json.", {
        file,
        country,
        year,
        out
    })
    .help()
    .argv;

module.exports = { argv }