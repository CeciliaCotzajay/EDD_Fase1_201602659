class Venta{
    constructor(idVenta, nombreVendedor, nombreCliente, TotalVenta,listaProductos){
        this.idVenta = idVenta;
        this.nombreVendedor = nombreVendedor;
        this.nombreCliente = nombreCliente;
        this.TotalVenta = TotalVenta;
        this.listaProductos = listaProductos;
    }
}

function cargaMasivaVentas(){
    var data = document.getElementById('archivoVentas').files;
    if(!data.length){
      alert('No se ha seleccionado el archivo Ventas');
    }else{
        readFileVentas(data[0]);
    }
}

function readFileVentas(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof(reader.result));
        console.log(reader.result);
        var objVent = JSON.parse(contenido);
        console.log(objVent, typeof(objVent));
        //recuperar_Estructuras();
        var idAux = 1;
        for (let value of objVent.ventas) {
            var idVen = idAux;
            var nombreVen = value.vendedor;
            var nombreClie = value.cliente;
            var totVenta = 0;
            var listaProd = value.productos;
            console.log(idVen,nombreVen,nombreClie);
            for (let value2 of listaProd){
                var idProd = parseInt(value2.id);
                var cant = value2.cantidad;
                // SE DEBE BUSCAR EL PRODUCTO POR ID Y LUEGO OBTENER EL PRECIO Y MULTIPLICARLO POR LA CANTIDAD
                //QUE ESTA ARRIBA E INCREMENTARLO A LA VARIABLE TOTVENTA
                console.log("     ",idProd,cant);
            }
            //let producto = new Producto(idProducto,nombre,precio,cantidad);
            //console.log(idVen,nombreVen,nombreClie);
            //abb_Prov.insertar(proveedor);
            //guardar_Estructuras();
            idAux++;
          }
    }
    reader.readAsText(file);
}