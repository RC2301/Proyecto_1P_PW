const colors = require("colors")
const { argv } = require("./Config/Yargs");
const { read } = require("./Controlador/Read")

let cOP = argv._[0];

switch (cOP) {
    case "Publicar":
        read(argv.file, argv.country, argv.year, 1);
        break;
    case "Guardar":
        read(argv.file, argv.country, argv.year, argv.out)
        break;
    default:
        console.log("El comando ingresado es Incorrecto".red);
        break;
}