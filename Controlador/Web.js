const ww = {
    web: `<!DOCTYPE html>
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

</html>`
}