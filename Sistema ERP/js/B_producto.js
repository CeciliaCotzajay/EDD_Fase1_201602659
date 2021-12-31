class Producto{
    constructor(idProd, nombre, precio, cantidad){
        this.idProd = idProd;
        this. nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

function cargaMasivaProductos(){
    var data = document.getElementById('archivoProductos').files;
    if(!data.length){
      alert('No se ha seleccionado el archivo Productos');
    }else{
        readFileProductos(data[0]);
    }
}

function readFileProductos(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof(reader.result));
        console.log(reader.result);
        var objProd = JSON.parse(contenido);
        console.log(objProd, typeof(objProd));
        //recuperar_Estructuras();
        for (let value of objProd.productos) {
            var idProducto = parseInt(value.id);
            var nombre = value.nombre;
            var precio = value.precio;
            var cantidad = value.cantidad;
            let producto = new Producto(idProducto,nombre,precio,cantidad);
            console.log(idProducto,nombre,precio,cantidad);
            //abb_Prov.insertar(proveedor);
            //guardar_Estructuras();
          }
    }
    reader.readAsText(file);
}