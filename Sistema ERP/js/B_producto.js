//*************************************************************************************************************************************** */
//************************************************************B PRODUCTOS**************************************************************** */
//*************************************************************************************************************************************** */
class Producto {
    constructor(idProd, nombre, precio, cantidad) {
        this.idProd = idProd;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

class nodoProducto {
    constructor(producto) {
        this.producto = producto;
        //APUNTADORES TIPO NODOPRODUCTO
        this.siguiente = null;
        this.anterior = null;
        //APUNTADORES ARBOL TIPO PAGINA
        this.izquierda = null;
        this.derecha = null;
    }
}
//************************************************************LISTA VALORES**************************************************************** */
class ListaNodoProducto {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.tam = 0;
    }

    insertarListaNP(nuevo) {
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.tam++;
            return true;
        } else {
            if (this.primero == this.ultimo) {
                if (nuevo.producto.idProd < this.primero.producto.idProd) {
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    this.primero.izquierda = nuevo.derecha;
                    this.primero = nuevo;
                    this.tam++;
                    return true;
                } else if (nuevo.producto.idProd > this.ultimo.producto.idProd) {
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    this.ultimo.derecha = nuevo.izquierda;
                    this.ultimo = nuevo;
                    this.tam++;
                    return true;
                    //idProd = PRIMERO
                } else {
                    console.log("El ID del Producto ya existe, porfavor ingrese otro!.");
                    //alert("El ID del Producto ya existe, porfavor ingrese otro!.");
                    return false;
                }
            } else { //hay mas de un dato
                if (nuevo.producto.idProd < this.primero.producto.idProd) {
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izquierda = nuevo.derecha;
                    this.primero = nuevo;
                    this.tam++;
                    return true;
                } else if (nuevo.producto.idProd > this.ultimo.producto.idProd) {
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.derecha = nuevo.izquierda;
                    this.ultimo = nuevo;
                    this.tam++;
                    return true;
                } else {
                    let aux = this.primero;
                    while (aux != null) {
                        if (nuevo.producto.idProd < aux.producto.idProd) {
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            // cambiar los punteros de las paginas
                            aux.izquierda = nuevo.derecha;
                            aux.anterior.derecha = nuevo.izquierda;
                            //******************************* 
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.tam++;
                            return true;
                        } else if (nuevo.producto.idProd == aux.producto.idProd) {
                            console.log("El ID del Producto ya existe, porfavor ingrese otro!.");
                            //alert("El ID del Producto ya existe, porfavor ingrese otro!.");
                            return false;
                        } else {
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}
//************************************************************PAGINA ARBOL**************************************************************** */
class PaginaArbol {
    constructor() {
        this.estadoRaiz = false;
        this.maximoClaves = 4;
        this.minimoClaves = 2;
        this.tam = 0;
        this.listaclaves = new ListaNodoProducto();
    }

    insertarPagina(elemento) {
        if (this.listaclaves.insertarListaNP(elemento)) {
            this.tam = this.listaclaves.tam;
            if (this.tam < 5) {//TAMAÑO5-------------------------
                return this;
            } else if (this.tam == 5) {
                return this.dividirPagina(this);
            }
        }
        return null;
    }

    dividirPagina(paginaDividir) {
        let aux = paginaDividir.listaclaves.primero;
        for (var i = 0; i < 2; i++) {
            aux = aux.siguiente;
        }
        //VALORES PAGINA A NODOS INDEDPENDIENTES
        let primero = paginaDividir.listaclaves.primero;
        let segundo = paginaDividir.listaclaves.primero.siguiente;
        let tercero = aux.siguiente;
        let cuarto = paginaDividir.listaclaves.ultimo;
        primero.siguiente = null;
        primero.anterior = null;
        segundo.siguiente = null;
        segundo.anterior = null;
        tercero.siguiente = null;
        tercero.anterior = null;
        cuarto.siguiente = null;
        cuarto.anterior = null;
        aux.siguiente = null;
        aux.anterior = null;
        //NUEVAS PAGINAS
        let paginaIzquierda = new PaginaArbol();
        paginaIzquierda.insertarPagina(primero);
        paginaIzquierda.insertarPagina(segundo);
        let paginaDerecha = new PaginaArbol();
        paginaDerecha.insertarPagina(tercero);
        paginaDerecha.insertarPagina(cuarto);
        aux.izquierda = paginaIzquierda;
        aux.derecha = paginaDerecha;
        return aux;
    }

    esHoja(pagina) {
        if (pagina.listaclaves.primero.izquierda == null) {
            return true;
        } else {
            return false;
        }
    }
}
//************************************************************ARBOL**************************************************************** */
class ArbolB {
    constructor() {
        this.raiz = null;
        this.orden = 5;
        this.altura = 0;
    }

    insertarB(producto) {
        let nuevo = new nodoProducto(producto);
        if (this.raiz == null) {
            this.raiz = new PaginaArbol();
            this.raiz.estadoRaiz = true;
            this.raiz = this.raiz.insertarPagina(nuevo);
        } else {
            if (this.altura == 0) {
                let respuesta = this.raiz.insertarPagina(nuevo);
                if (respuesta instanceof PaginaArbol) {
                    this.raiz = respuesta;
                } else {
                    this.altura++;
                    this.raiz = new PaginaArbol();
                    this.raiz = this.raiz.insertarPagina(respuesta);
                }
                //+ PAGINAS
            } else {
                if (this.raiz == null) {
                    console.log("No tiene raiz")
                    return;
                }
                let respuesta = this.tipoInsersion(nuevo, this.raiz);
                if (respuesta instanceof nodoProducto) {
                    this.altura++;
                    this.raiz = new PaginaArbol();
                    this.raiz = this.raiz.insertarPagina(respuesta);
                } else if (respuesta instanceof PaginaArbol) {
                    this.raiz = respuesta;
                }
            }
        }
    }

    tipoInsersion(nuevo, paginaActual) {
        if (paginaActual.esHoja(paginaActual)) {
            let respuesta = paginaActual.insertarPagina(nuevo);
            return respuesta;
        } else {
            //IZQUIERDA
            if (nuevo.producto.idProd < paginaActual.listaclaves.primero.producto.idProd) {
                let respuesta = this.tipoInsersion(nuevo, paginaActual.listaclaves.primero.izquierda);
                if (respuesta instanceof nodoProducto) {
                    return paginaActual.insertarPagina(respuesta);
                } else if (respuesta instanceof PaginaArbol) {
                    paginaActual.listaclaves.primero.izquierda = respuesta;
                    return paginaActual;
                }
                //DERECHA
            } else if (nuevo.producto.idProd > paginaActual.listaclaves.ultimo.producto.idProd) {
                let respuesta = this.tipoInsersion(nuevo, paginaActual.listaclaves.ultimo.derecha);
                if (respuesta instanceof nodoProducto) {
                    return paginaActual.insertarPagina(respuesta);
                } else if (respuesta instanceof PaginaArbol) {
                    paginaActual.listaclaves.ultimo.derecha = respuesta;
                    return paginaActual;
                }
                //EN MEDIO
            } else {
                let aux = paginaActual.listaclaves.primero;
                while (aux != null) {
                    if (nuevo.producto.idProd < aux.producto.idProd) {
                        let respuesta = this.tipoInsersion(nuevo, aux.izquierda);
                        if (respuesta instanceof nodoProducto) {
                            return paginaActual.insertarPagina(respuesta);
                        } else if (respuesta instanceof PaginaArbol) {
                            aux.izquierda = respuesta;
                            aux.anterior.derecha = respuesta;
                            return paginaActual;
                        }
                    } else if (nuevo.producto.idProd == aux.producto.idProd) {
                        return paginaActual;
                    } else {
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    generarDotB() {
        let cadena = "digraph arbolB_Produc{\n";
        cadena += "rankr=TB;\n";
        cadena += "node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        cadena += "\n";
        cadena += this.NodosDotB(this.raiz);
        cadena += "\n";
        cadena += this.enramarB(this.raiz);
        cadena += "}\n"
        console.log(cadena);
        this.generarImgB(cadena);
        document.getElementById('textAreaProdu').value = cadena;
    }

    NodosDotB(raizP_aux) {
        let cadena = "";
        if (raizP_aux.esHoja(raizP_aux)) {
            cadena += "node[shape=record label= \"<p0>"
            let cont = 0;
            let aux = raizP_aux.listaclaves.primero;
            while (aux != null) {
                cont++;
                cadena += "|{" + aux.producto.idProd + "\n" +aux.producto.nombre + "}|<p" + cont + "> ";
                aux = aux.siguiente;
            }
            cadena += "\"]" + raizP_aux.listaclaves.primero.producto.idProd + "\n" +raizP_aux.listaclaves.primero.producto.nombre + ";\n";
            return cadena;
        } else {
            cadena += "node[shape=record label= \"<p0>"
            let cont = 0;
            let aux = raizP_aux.listaclaves.primero;
            while (aux != null) {
                cont++;
                cadena += "|{" + aux.producto.idProd + "\n" +aux.producto.nombre + "}|<p" + cont + "> ";
                aux = aux.siguiente;
            }
            cadena += "\"]" + raizP_aux.listaclaves.primero.producto.idProd + "\n" +raizP_aux.listaclaves.primero.producto.nombre + ";\n";
            //
            aux = raizP_aux.listaclaves.primero;
            while (aux != null) {
                cadena += this.NodosDotB(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena += this.NodosDotB(raizP_aux.listaclaves.ultimo.derecha);
            return cadena;
        }
    }

    enramarB(raizP_aux) {
        let cadena = "";
        if (raizP_aux.esHoja(raizP_aux)) {
            return "" + raizP_aux.listaclaves.primero.producto.idProd + ";\n";
        } else {
            let aux = raizP_aux.listaclaves.primero;
            let cont = 0;
            let raizP_aux_txt = raizP_aux.listaclaves.primero.producto.idProd;
            while (aux != null) {
                cadena += "\n" + raizP_aux_txt + ":p" + cont + "->" + this.enramarB(aux.izquierda);
                cont++;
                aux = aux.siguiente;
            }
            cadena += "\n" + raizP_aux_txt + ":p" + cont + "->" + this.enramarB(raizP_aux.listaclaves.ultimo.derecha);
            return cadena;
        }
    }

    generarImgB(cadena) {
        try {
            var g = graphlibDot.read(cadena);
            var render = new dagreD3.render();
            render(d3.select("B_produc.svg"), g);
            /*try{
                let dotPath = "C:\\Program Files (x86)\\Graphviz2.38\\bin\\dot.exe";
                let cmd = dotPath + " -Tjpg " + cadena + " -o " + "reporte1.png";
                Runtime.getRuntime().exec(cmd);*/
        } catch {
            alert("No se genero la imagen")
        }
    }
}
//*************************************************************************************************************************************** */
//*************************************************************************************************************************************** */
//*************************************************************************************************************************************** */
let aB_productos = new ArbolB();

function cargaMasivaProductos() {
    var data = document.getElementById('archivoProductos').files;
    if (!data.length) {
        //alert('No se ha seleccionado el archivo Productos');
    } else {
        readFileProductos(data[0]);
    }
}

function readFileProductos(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof (reader.result));
        console.log(reader.result);
        var objProd = JSON.parse(contenido);
        console.log(objProd, typeof (objProd));
        //recuperar_Estructuras();
        for (let value of objProd.productos) {
            var idProducto = parseInt(value.id);
            var nombre = value.nombre;
            var precio = value.precio;
            var cantidad = value.cantidad;
            let producto = new Producto(idProducto, nombre, precio, cantidad);
            console.log(idProducto, nombre, precio, cantidad);
            aB_productos.insertarB(producto);
            //guardar_Estructuras();
        }
    }
    reader.readAsText(file);
    alert("Archivo cargado con exito!")
}

function mostrarGraficoB() {
    //recuperar_Estructuras();
    try{
        aB_productos.generarDotB();
    }catch{
        alert("EL Arbol_B de Productos esta vacio!!");
    }
}

/*let arbol = new ArbolB();
arbol.insertarB(new Producto(5,"Ramón",10.25,2));
arbol.insertarB(new Producto(1,"Ramón",10.25,2));
arbol.insertarB(new Producto(7,"Ramón",10.25,2));
arbol.insertarB(new Producto(3,"Ramón",10.25,2));
arbol.insertarB(new Producto(13,"Ramón",10.25,2));
arbol.insertarB(new Producto(8,"Ramón",10.25,2));
arbol.insertarB(new Producto(35,"Ramón",10.25,2));
arbol.insertarB(new Producto(14,"Ramón",10.25,2));
arbol.insertarB(new Producto(10,"Ramón",10.25,2));
arbol.insertarB(new Producto(9,"Ramón",10.25,2));
arbol.insertarB(new Producto(12,"Ramón",10.25,2));
arbol.insertarB(new Producto(17,"Ramón",10.25,2));
arbol.insertarB(new Producto(22,"Ramón",10.25,2));
arbol.insertarB(new Producto(25,"Ramón",10.25,2));

arbol.insertarB(new Producto(100,"Ramón",10.25,2));
arbol.insertarB(new Producto(150,"Ramón",10.25,2));
arbol.insertarB(new Producto(220,"Ramón",10.25,2));
arbol.insertarB(new Producto(325,"Ramón",10.25,2));

arbol.generarDotB();*/