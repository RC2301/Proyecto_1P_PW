const csv = require('csv-parser');
const fs = require('fs');
const http = require('http');
const colors = require("colors")
let datosCSV = [];
const read = (path, cod, year, guardar) => {
    let n = 0;
    let pais;
    let data;
    fs.createReadStream(path)
        .pipe(csv({ headers: false }))
        .on('data', (row) => {
            if (n > 4) {
                datosCSV.push(row);
            } else {
                delete row;
                n++;
            }
        })
        .on('end', () => {
            pais = datosCSV.find(obj => obj[1] === cod);

            if (year > 2019 || year < 1960) {
                console.log("El año ingresado no se encuentra en el rango o es incorrecto.".bgRed);
                return 1;
            }
            if (pais) {
                data = arreglar(cod, year);
            } else {
                console.log("El pais ingresado no se encuentra o es incorrecto.".bgRed);
                return 1;
            }
            if (guardar === 1) {
                imprimirPorCon(data, cod, year);
                imprimirPorWeb(data, cod, year);
                guardar = 0;
            }
            if (guardar === undefined || guardar === true) {
                console.log("El nombre del archivo no esta correcto.".bgRed);
            } else if (guardar != 0) {
                guardarDatos(guardar);
                console.log("Se guardaron exitosamente los datos.".bgGreen);
            }
        });
}