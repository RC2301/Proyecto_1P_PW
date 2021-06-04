const csv = require('csv-parser');
const fs = require('fs');
const http = require('http');
const colors = require("colors")
let datosCSV = [];
let resultado = [];
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
const arreglar = (cod, year) => {
    var arr = datosCSV.map(item => {
        return {
            nombre_ciudad: item[0],
            codigo_ciudad: item[1],
            year: {
                '1960': item[4],
                '1961': item[5],
                '1962': item[6],
                '1963': item[7],
                '1964': item[8],
                '1965': item[9],
                '1966': item[10],
                '1967': item[11],
                '1968': item[12],
                '1969': item[13],
                '1970': item[14],
                '1971': item[15],
                '1972': item[16],
                '1973': item[17],
                '1974': item[18],
                '1975': item[19],
                '1976': item[20],
                '1977': item[21],
                '1978': item[22],
                '1979': item[23],
                '1980': item[24],
                '1981': item[25],
                '1982': item[26],
                '1983': item[27],
                '1984': item[28],
                '1985': item[29],
                '1986': item[30],
                '1987': item[31],
                '1988': item[32],
                '1989': item[33],
                '1990': item[34],
                '1991': item[35],
                '1992': item[36],
                '1993': item[37],
                '1994': item[38],
                '1995': item[39],
                '1996': item[40],
                '1997': item[41],
                '1998': item[42],
                '1999': item[43],
                '2000': item[44],
                '2001': item[45],
                '2002': item[46],
                '2003': item[47],
                '2004': item[48],
                '2005': item[49],
                '2006': item[50],
                '2007': item[51],
                '2008': item[52],
                '2009': item[53],
                '2010': item[54],
                '2011': item[55],
                '2012': item[56],
                '2013': item[57],
                '2014': item[58],
                '2015': item[59],
                '2016': item[60],
                '2017': item[61],
                '2018': item[62],
                '2019': item[63],
                '2020': item[64]
            }

        };
    });
    let countryC = require("../Datos/ISO-3166-ALPHA-3.json");
    let arreglado = [];
    for (const i in arr) {
        for (const key in countryC) {
            if (arr[i].codigo_ciudad === countryC[key].countryCode) {
                arreglado.push(arr[i]);
            }
        }
    }
    calcularMedia(arreglado, cod, year);
    let top = topCinco(arreglado, year);
    resultado.push({ top5: top });
    return arreglado;
}