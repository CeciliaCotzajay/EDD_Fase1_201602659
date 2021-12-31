class Ruta{
    constructor(idRuta, nombre, listaAdyacentes){
        this.idRuta = idRuta;
        this.nombre = nombre;
        this.listaAdyacentes = listaAdyacentes;
    }
}

class Adyacente{
    constructor(idAdyacente, nombre, distancia){
        this.idAdyacente = idAdyacente;
        this.nombre = nombre;
        this.distancia = distancia;
    }
}

function cargaMasivaRutas(){
    var data = document.getElementById('archivoRutas').files;
    if(!data.length){
      alert('No se ha seleccionado el archivo Rutas');
    }else{
        readFileRutas(data[0]);
    }
}

function readFileRutas(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof(reader.result));
        console.log(reader.result);
        var objRut = JSON.parse(contenido);
        console.log(objRut, typeof(objRut));
        //recuperar_Estructuras();
        for (let value of objRut.rutas) {
            var idRut = parseInt(value.id);
            var nombreRut = value.nombre;
            var listaAdy = value.adyacentes;
            console.log(idRut,nombreRut);
            for (let value2 of listaAdy){
                var idAdy = parseInt(value2.id);
                var nombreAdy = value2.nombre;
                var distancia = value2.distancia;
                //let producto = new Producto(idProducto,nombre,precio,cantidad);
                console.log("     ",idAdy,nombreAdy,distancia);
                //abb_Prov.insertar(proveedor);
            }
            //let producto = new Producto(idProducto,nombre,precio,cantidad);
            //abb_Prov.insertar(proveedor);
            //guardar_Estructuras();
          }
    }
    reader.readAsText(file);
}