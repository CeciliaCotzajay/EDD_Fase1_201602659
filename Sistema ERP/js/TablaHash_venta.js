//*************************************************************************************************************************************** */
//************************************************************Thash VENTAS*************************************************************** */
//*************************************************************************************************************************************** */
class Prod {
    constructor(idProd, nombre, precio, cantidad) {
        this.idProd = idProd;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

class Venta {
    constructor(idVenta, nombreVendedor, nombreCliente, TotalVenta, listaProductos) {
        this.idVenta = idVenta;
        this.nombreVendedor = nombreVendedor;
        this.nombreCliente = nombreCliente;
        this.TotalVenta = TotalVenta;
        this.listaProductos = listaProductos;
    }
}

class NodoVenta {
    constructor(venta) {
        this.venta = venta;
    }
}

class TablaHash {
    constructor() {
        this.claves = this.iniciarTabla(7);
        this.clavesEnUso = 0;
        this.tam = 7;
    }

    iniciarTabla(tamanio) {
        let claves = [];
        for (var i = 0; i < tamanio, i++;) {
            claves[i] = null;
        }
        return claves;
    }

    hashing_Funcion(idVenta) {
        let indiceResultado = 0;
        indiceResultado = idVenta % this.tam;
        return indiceResultado;
    }

    solucionarColision(indice) {
        let nuevoIndice = 0;
        let i = 0;
        let enUso = false;
        while (enUso == false) {
            nuevoIndice = indice + Math.pow(i, 2);
            if (nuevoIndice >= this.tam) {
                nuevoIndice = nuevoIndice - this.tam;
            }
            //NUEVO INDICE enUso
            if (this.claves[nuevoIndice] == null) {
                enUso = true;
            }
            i++;
        }
        return nuevoIndice;
    }

    insertarVenta(venta) {
        let indice = this.hashing_Funcion(venta.idVenta);
        //DISPONIBLE
        let nuevo = new NodoVenta(venta);
        if (this.claves[indice] == null) {
            this.claves[indice] = nuevo;
            this.clavesEnUso++;
        } else {
            indice = this.solucionarColision(indice);
            this.claves[indice] = nuevo;
            this.clavesEnUso++
        }
        //PORCENTAJE DE OCUPACION
        let porcentajeUso = this.clavesEnUso / this.tam;
        if (porcentajeUso >= 0.5) {
            this.rehash();
        }
    }

    rehash() {
        //SIGUIENTE NUMERO PRIMO
        let primo = false;
        let tamNuevo = this.tam;
        while (primo == false) {
            tamNuevo++;
            let cont = 0;
            for (var i = tamNuevo; i > 0; i--) {
                if (tamNuevo % i == 0) {
                    cont++;
                }
            }
            if (cont == 2) {
                primo = true
            }
        }
        //ACTUALIZAR TAMANIO DE TABLA Y REINSERSION
        let auxClaves = this.claves;
        this.tam = tamNuevo;
        this.claves = this.iniciarTabla(tamNuevo);
        this.clavesEnUso = 0;
        for (var i = 0; i < auxClaves.length; i++) {
            if (auxClaves[i] != null) {
                this.insertarVenta(auxClaves[i].venta);
            }
        }
    }

    cadenaTablaH() {
        let cadena = "";
        for (var i = 0; i < this.tam; i++) {
            if (this.claves[i] != null) {
                cadena += "c" + i + "-->" + this.claves[i].venta.idVenta + "\n";
            } else {
                cadena += "c" + i + "------------" + "\n";
            }
        }
        return cadena;
    }
}



//*************************************************************************************************************************************** */
//*************************************************************************************************************************************** */
//*************************************************************************************************************************************** */
let th_ventas = new TablaHash();

function cargaMasivaVentas() {
    var data = document.getElementById('archivoVentas').files;
    if (!data.length) {
        alert('No se ha seleccionado el archivo Ventas');
    } else {
        readFileVentas(data[0]);
    }
}

function readFileVentas(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof (reader.result));
        console.log(reader.result);
        var objVent = JSON.parse(contenido);
        console.log(objVent, typeof (objVent));
        //recuperar_Estructuras();
        //var idAux = 1;
        for (let value of objVent.ventas) {
            var idVen = parseInt(value.id);
            var nombreVen = value.vendedor;
            var nombreClie = value.cliente;
            var totVenta = 0;
            var listaProd = value.productos;
            console.log(idVen, nombreVen, nombreClie);
            let listaprodinsertar =[];
            for (let value2 of listaProd) {
                var idProd = parseInt(value2.id);
                var nombreProd = value2.nombre;
                var precioProd = value2.precio;
                var cant = value2.cantidad;
                let subVenta = cant*precioProd;
                // SE DEBE BUSCAR EL PRODUCTO POR ID Y LUEGO OBTENER EL PRECIO Y MULTIPLICARLO POR LA CANTIDAD
                //QUE ESTA ARRIBA E INCREMENTARLO A LA VARIABLE TOTVENTA
                listaprodinsertar.push(new Prod(idProd,nombreProd,precioProd,cant));
                console.log("     ", idProd, nombreProd, precioProd, cant);
                totVenta += subVenta;
            }
            th_ventas.insertarVenta(new Venta(idVen,nombreVen,nombreClie,totVenta,listaprodinsertar));
            //guardar_Estructuras();
            //idAux++;
        }
    }
    reader.readAsText(file);
    alert("Archivo cargado con exito!")
}

function mostrarGraficoTH() {
    //recuperar_Estructuras();
    /*try {
        cadena = th_ventas.cadenaTablaH();
        console.log(cadena);
        document.getElementById('textAreaVentas').value = cadena;
    } catch {
        alert("La Tabla Hash de Ventas esta vacia!!");
    }*/
    cadena = th_ventas.cadenaTablaH();
        console.log(cadena);
        document.getElementById('textAreaVentas').value = cadena;
}


/*let tabla = new TablaHash();

tabla.insertarVenta(new Venta(10,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(8,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(2,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(9,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(81,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(12,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(90,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(181,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(112,"nomVende","nomCli",100,null));
tabla.insertarVenta(new Venta(190,"nomVende","nomCli",100,null));
tabla.imprimirTalaH();*/