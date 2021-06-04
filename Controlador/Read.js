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
const calcularMedia = (datos, cod, year) => {
    let cont = 0;
    let len = 0;
    for (let i = 0; i < datos.length; i++) {
        datoy = Number(datos[i].year[year]);
        if (datoy && datoy != 0) {
            cont += datoy;
            len++;
        }
    }
    media = cont / len;
    mediaR = media.toFixed(2);
    if (mediaR > 0) {
        resultado.push({ mediaMundial: mediaR });
    } else {
        resultado.push({ mediaMundial: "No existen datos." });
    }

    let result = valorSPais(datos, mediaR, cod, year);
    resultado.push({ MayorOMenor: result });

}
const valorSPais = (datos, media, cod, year) => {
    let pais = datos.find(obj => obj.codigo_ciudad === cod);

    let datoPais = pais.year[year];

    datoPaises(datos, datoPais, year);
    if (datoPais > media) {
        return `                         Suscripciones del pais ${cod} - ${pais.nombre_ciudad} en el año ${year}, con: ${datoPais}. Es mayor a la Media Mundial`;
    } else {
        return `                         Media Mundial en el año ${year} es mayor a las Suscripciones del país ${pais.nombre_ciudad}: ${datoPais}`;
    }

}
const datoPaises = (datos, sumaP, year) => {
    let vec = [];
    for (const i in datos) {
        if (datos[i].year[year] && datos[i].year[year] != 0) {
            nombre = datos[i].nombre_ciudad;
            suma = Number(datos[i].year[year]);
            vec.push({ nombre, suma });
        }
    }

    let porE = porEncima(vec, sumaP);
    let porD = porDebajo(vec, sumaP);
    resultado.push({ PorEncima: porE });
    resultado.push({ PorDebajo: porD });

}
const porEncima = (vec, sumaP) => {
    vec.sort(function(a1, b2) {
        if (a1.suma > b2.suma) {
            return 1;
        } else if (a1.suma < b2.suma) {
            return -1;
        }
        return 0;
    });
    let porE = [];
    for (const key in vec) {
        if (vec[key].suma > sumaP) {
            porE.push(vec[key]);
        }
    }
    if (porE < 1) {
        return false;
    }
    let result = [];
    for (let i = 0; i < 5; i++) {
        result.push(porE[i]);
    }
    return result;
}
const porDebajo = (vec, sumaP) => {
    vec.sort(function(a1, b2) {
        if (a1.suma > b2.suma) {
            return -1;
        } else if (a1.suma < b2.suma) {
            return 1;
        }
        return 0;
    });
    let porE = [];
    for (const key in vec) {
        if (vec[key].suma < sumaP) {
            porE.push(vec[key]);
        }
    }
    if (porE < 1) {
        return false;
    }
    let result = []
    for (let i = 0; i < 5; i++) {
        result.push(porE[i]);
    }
    return result;
}
const topCinco = (datos, year) => {
    let vec = [];
    for (const i in datos) {
        dato = Number(datos[i].year[year]);
        nombre = datos[i].nombre_ciudad;
        datosC = { nombre, dato };
        vec.push(datosC);
    }
    vec.sort(function(a1, b2) {
        if (a1.dato > b2.dato) {
            return -1;
        } else if (a1.dato < b2.dato) {
            return +1;
        }
        return 0;
    });
    let result = []
    for (let i = 0; i < 5; i++) {
        result.push(vec[i]);
    }
    return result;
}
const guardarDatos = (out) => {
    let data = JSON.stringify(resultado);
    let name = `./Data/${out}.json`;
    fs.writeFile(name, data, (err) => {
        if (err) {
            console.log("No se ha podido guardar el archivo".bgRed, err);
        }
    })
    return true;
}
const imprimirPorCon = (datos, cod, year) => {
    let pais = datos.find(obj => obj.codigo_ciudad === cod);
    MoM = resultado[3].MayorOMenor;
    me = resultado[0].mediaMundial;
    top = resultado[4].top5;
    porD = resultado[2].PorDebajo;
    porE = resultado[1].PorEncima;
    console.log();
    console.log("                    SUSCRIPCIONES DE TELEFONÍA CELULAR MOVÍL                    .".black.bgWhite);
    console.log();
    console.log(`                         Media de suscripciones de todos los países del año ${year} es: ${me}`.yellow);
    console.log();
    console.log(MoM.yellow);
    console.log();
    console.log(`                    Países arriba del país ${cod} - ${pais.nombre_ciudad}, Año ${year}                    .`.bgGreen.black);
    if (porE == false) {
        console.log("No existe ningun dato".red);
    } else {
        for (const key in porE) {
            if (porE[key] == undefined || porE[key].suma == 0) {} else {
                console.log("");
                console.log(`                         Codigo: ${porE[key].cod}`.random);
                console.log(`                         País: ${porE[key].nombre.green}`);
                console.log(`                         Suscripciones: ${porE[key].suma}`.yellow);
                console.log("");
            }
        }
    }
    console.log();
    console.log(`                    Países debajo del país ${cod} - ${pais.nombre_ciudad}, Año ${year}                    .`.bgWhite.black);
    if (porD == false) {
        console.log("No existe ningun dato".red);
    } else {
        for (const key in porD) {
            if (porD[key] == undefined || porD[key].suma == 0) {

            } else {
                console.log("");
                console.log(`                         Codigo: ${porE[key].cod}`.random);
                console.log(`                         País: ${porD[key].nombre.green}`);
                console.log(`                         Suscripciones: ${porD[key].suma}`.yellow);
                console.log("");
            }

        }
    }

    console.log();
    console.log(`                    Top 5 países del año ${year}                    .`.bgGreen.black);
    console.log();
    if (top[0].dato == 0) {
        console.log("No existe ningun dato".red);
    } else {
        for (const key in top) {
            if (top[key] == undefined || top[key].dato == 0) {} else {
                console.log("");
                console.log(`                         Codigo: ${porE[key].cod}`.random);
                console.log(`                         País: ${top[key].nombre.green}`);
                console.log(`                         Suscripciones: ${top[key].dato}`.yellow);
                console.log("");
            }
        }
    }
}
const imprimirPorWeb = (datos, cod, year) => {
    let pais = datos.find(obj => obj.codigo_ciudad === cod);
    const hostname = '127.0.0.2';
    const port = 3000;
    MoM = resultado[3].MayorOMenor;
    me = resultado[0].mediaMundial;
    top = resultado[4].top5;
    porD = resultado[2].PorDebajo;
    porE = resultado[1].PorEncima;

    top5 = [];
    porEn = [];
    porDe = [];
    if (porE == false) {
        porEn.push(`<tr class="table-danger"><td>No hay dato</td><td>No hay dato</td></tr>`);
    } else {
        for (const i in porE) {
            if (porE[i] == undefined || porE[i].suma == 0) {} else {
                porEn.push(`<tr class="table-success"><td>${porE[i].nombre}</td><td>${porE[i].suma}</td></tr>`);
            }

        }
    }
    if (top[0].dato == 0) {
        top5.push(`<tr class="table-danger"><td>No hay dato</td><td>No hay dato</td></tr>`);
    } else {
        for (const i in top) {
            if (top[i] == undefined || top[i].dato == 0) {} else {
                top5.push(`<tr class="table-secondary"><td>${top[i].nombre}</td><td>${top[i].dato}</td></tr>`);
            }

        }
    }
    if (porD == false) {
        porDe.push(`<tr class="table-danger"><td>No hay dato</td><td>No hay dato</td></tr>`);
    } else {
        for (const i in porD) {
            if (porD[i] == undefined || porD[i].suma == 0) {} else {
                porDe.push(`<tr class="table-dark"><td>${porD[i].nombre}</td><td>${porD[i].suma}</td></tr>`);
            }

        }
    }
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <title>Proyecto</title>
                <meta name='viewport' content='width=device-width, initial-scale=1'>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
                <link rel="stylesheet" type="text/css" href="../Bootstrap/css/bootstrap.min.css">
                <script type="text/javascript" src="../Bootstrap/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="../Bootstrap/js/jquery-3.6.0.min.js"></script>
                <style type="text/css">
                /* The old syntax, deprecated, but still needed, prefixed, for Opera and WebKit-based browsers */
                
                * {
                    /* Background colors */
                    background: -webkit-linear-gradient(90deg, #e74d6b 10%, #8cc8ac 90%);
                    background: -moz-linear-gradient(90deg, #e74d6b 10%, #8cc8ac 90%);
                    background: -ms-linear-gradient(90deg, #e74d6b 10%, #8cc8ac 90%);
                    background: -o-linear-gradient(90deg, #e74d6b 10%, #8cc8ac 90%);
                    background: linear-gradient(90deg, #e74d6b 10%, #8cc8ac 90%);
                    background: -webkit-linear-gradient(90deg, #65997d 10%, #fccb6e 90%);
                    background: -moz-linear-gradient(90deg, #65997d 10%, #fccb6e 90%);
                    background: -ms-linear-gradient(90deg, #65997d 10%, #fccb6e 90%);
                    background: -o-linear-gradient(90deg, #65997d 10%, #fccb6e 90%);
                    background: linear-gradient(90deg, #65997d 10%, #fccb6e 90%);
                }
            </style>
            </head>
            <body background: linear-gradient(left, rgba(255,255,255,0), rgba(255,255,255,1)), url(http://foo.com/image.jpg);>
                <center>
                <h1 class="font-weight-bold">Suscripciones de telefonía celular movíl</h1>
                    <h5 class="pb-3">La media de suscripciones de todos los países en el año ${year} es: ${me}</h5>
                    <h5>${MoM}</h5>
                <hr/>
                <br>
                <h1 class="font-weight-bold">RICHARD CAMACHO</h1>
                <br>
                            <h1 class="font-weight-bold">Países por Encima del país ${cod} - ${pais.nombre_ciudad}, Año ${year}</h1>
                            <table class="table table-sm">
                                <thead class="text-center">
                                <tr class="table-info">
                                        <th scope="col">País</th>
                                        <th scope="col">Suscripciones de telefonía celular movíl</th>
                                    </tr>
                                </thead>
                                <tbody class="text-white text-center">
                                    ${porEn}
                                </tbody>
                            </table>
                            <h1 class="font-weight-bold">Países por Debajo del país ${cod} - ${pais.nombre_ciudad}, , Año ${year}</h1>
                            <table class="table table-striped">
                                <thead class="text-center">
                                    <tr>
                                        <th scope="col">País</th>
                                        <th scope="col">Suscripciones de telefonía celular movíl</th>
                                    </tr>
                                </thead>
                                <tbody class="text-white text-center">
                                    ${porDe}
                                </tbody>
                            </table>
                <hr/>
                    <h1 class="font-weight-bold">Top 5 países del año ${year}</h1>
                        <table class="table table-dark table-borderless">
                            <thead class="text-center">
                                <tr>
                                    <th scope="col">País</th>
                                    <th scope="col">Suscripciones de telefonía celular movíl</th>
                                </tr>
                            </thead>
                            <tbody class="text-white text-center">
                                ${top5}
                            </tbody>
                        </table>
            </center>
            </body>
            </html>`);
    });

    server.listen(port, hostname, () => {
        console.log(`                    Servidor corriendo en http://${hostname}:${port}/                    .`.black.bgGreen);
    });
}
module.exports = { read }