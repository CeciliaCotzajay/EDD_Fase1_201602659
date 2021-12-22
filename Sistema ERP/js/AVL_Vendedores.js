//*************************************************************************************************************************************** */
//************************************************************AVL VENDEDORES************************************************************* */
//*************************************************************************************************************************************** */
//import {Lista_Doble} from 'ListaDoble_Cliente.js';


class Vendedor {
    constructor(idV, nombre, edad, correo, password, listaclientes) {
        this.idV = idV;
        this.nombre = nombre;
        this.edad = edad;
        this.correo = correo;
        this.password = password;
        this.listaclientes = listaclientes;
    }
}

class nodo_Vendedor {
    constructor(vendedor) {
        this.vendedor = vendedor;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
}

class AVL_Vendedores {
    constructor() {
        this.raiz = null;
    }

    insertar(V) {
        let nuevo = new nodo_Vendedor(V);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            this.raiz = this.insertar2(this.raiz, nuevo);
        }
    }

    insertar2(raiz_aux, nuevoNodo) {
        if (raiz_aux != null) {
            if (raiz_aux.vendedor.idV > nuevoNodo.vendedor.idV) {
                raiz_aux.izquierda = this.insertar2(raiz_aux.izquierda, nuevoNodo);
                if (this.altura(raiz_aux.derecha) - this.altura(raiz_aux.izquierda) == -2) {
                    //-1 ROTACION IZQUIERDA --- IZQUIERDA
                    if (nuevoNodo.vendedor.idV < raiz_aux.izquierda.vendedor.idV) { 
                        raiz_aux = this.rotar_Izquierda(raiz_aux);
                    //1 ROTACION IZQUIERDA --- DERECHA
                    } else {
                        raiz_aux = this.rotarIzquierda_Derecha(raiz_aux);
                    }
                }
            } else if (raiz_aux.vendedor.idV < nuevoNodo.vendedor.idV) {
                raiz_aux.derecha = this.insertar2(raiz_aux.derecha, nuevoNodo);
                if (this.altura(raiz_aux.derecha) - this.altura(raiz_aux.izquierda) == 2) {
                     // 1 ROTACION DERECHA --- DERECHA
                    if (nuevoNodo.vendedor.idV > raiz_aux.derecha.vendedor.idV) {
                        raiz_aux = this.rotar_Derecha(raiz_aux);
                    //-1 ROTACION DERECHA --- IZQUIERDA
                    } else {
                        raiz_aux = this.rotarDerecha_Izquierda(raiz_aux);
                    }
                }
            } else {
                alert("El ID del Vendedor ya existe. \nPor favor ingrese otro ID.");
            }
            raiz_aux.altura = this.altura_mayor(this.altura(raiz_aux.derecha), this.altura(raiz_aux.izquierda)) + 1;
            return raiz_aux;
        } else {
            raiz_aux = nuevoNodo;
            return raiz_aux;
        }
    }

    altura(nodo) {
        if (nodo != null) {
            return nodo.altura;
        } else {
            return -1;
        }
    }

    altura_mayor(h1, h2) {
        if (h2 >= h1) {
            return h2;
        } else {
            return h1;
        }
    }

    rotar_Izquierda(nodo) {
        let aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.altura_mayor(this.altura(nodo.derecha), this.altura(nodo.izquierda)) + 1;
        aux.altura = this.altura_mayor(nodo.altura.altura, this.altura(nodo.izquierda)) + 1;
        return aux;
    }
    rotar_Derecha(nodo) {
        let aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.altura_mayor(this.altura(nodo.izquierda), this.altura(nodo.derecha)) + 1;
        aux.altura = this.altura_mayor(nodo.altura.altura, this.altura(nodo.derecha)) + 1;
        return aux;
    }

    rotarIzquierda_Derecha(nodo) {
        nodo.izquierda = this.rotar_Derecha(nodo.izquierda);
        let aux = this.rotar_Izquierda(nodo);
        return aux;
    }

    rotarDerecha_Izquierda(nodo) {
        nodo.derecha = this.rotar_Izquierda(nodo.derecha);
        let aux = this.rotar_Derecha(nodo);
        return aux;
    }

    inOrden(raiz_aux) {
        if (raiz_aux != null) {
            this.inOrden(raiz_aux.izquierda);
            console.log(raiz_aux.vendedor.idV);
            //console.log("altura = " + (this.altura(raiz_aux.derecha) - this.altura(raiz_aux.iz)))
            this.inOrden(raiz_aux.derecha);
        }
    }
    
    /*preorden(raiz_aux) {
        if (raiz_aux != null) {
            console.log(raiz_aux.vendedor.idV + " " + raiz_aux.vendedor.nombre);
            this.preorden(raiz_aux.izquierda);
            this.preorden(raiz_aux.derecha);
        }
    }

    postOrden(raiz_aux) {
        if (raiz_aux != null) {
            this.postOrden(raiz_aux.izquierda);
            this.postOrden(raiz_aux.derecha);
            console.log(raiz_aux.vendedor.idV + " " + raiz_aux.vendedor.nombre);
        }
    }*/

    generarDOT_AVL() {
        let cadena = "digraph arbol_ven {\n";
        cadena += this.NodosDOT(this.raiz);
        cadena += "\n";
        cadena += this.enramar(this.raiz);
        cadena += "\n}";
        console.log(cadena);
        this.generarImg(cadena);
        document.getElementById('textAreaVen').value = cadena;
    }

    NodosDOT(raiz_aux) {
        let nodos = "";
        if (raiz_aux != null) {
            nodos += "n" + raiz_aux.vendedor.idV + "[label=\"" + raiz_aux.vendedor.idV + "\"]\n";//ñññññññññññññ
            nodos += this.NodosDOT(raiz_aux.izquierda);
            nodos += this.NodosDOT(raiz_aux.derecha);
        }
        return nodos;
    }

    enramar(raiz_aux) {
        let cadena = "";
        if (raiz_aux != null) {
            cadena += this.enramar(raiz_aux.izquierda);
            cadena += this.enramar(raiz_aux.derecha);
            if (raiz_aux.izquierda != null) {
                cadena += "n" + raiz_aux.vendedor.idV + "-> n" + raiz_aux.izquierda.vendedor.idV + "\n";
            }
            if (raiz_aux.derecha != null) {
                cadena += "n" + raiz_aux.vendedor.idV + "-> n" + raiz_aux.derecha.vendedor.idV + "\n";
            }


        }
        return cadena;
    }

    generarImg(cadena) {
        try {
            var g = graphlibDot.read(cadena);
            var render = new dagreD3.render();
            render(d3.select("arbol_ven.svg"), g);
        } catch {
            alert("No se genero la imagen")
        }
    }
}
//*************************************************************************************************************************************** */
//************************************************************LISTA-DOBLE_CLIENTES******************************************************* */
//*************************************************************************************************************************************** */
class Cliente {
    constructor(idC, nombre, correo){
        this.idC = idC;
        this.nombre = nombre;
        this.correo = correo;
    }
}

class Nodo_Cliente{
    constructor(cliente){
        this.cliente = cliente;
        this.siguiente = null;
        this.anterior = null;
    }
}

class Lista_Doble{
    constructor(){
        this.primero=null;
        this.tam = 0;
    }

    insertar(cliente){
        let nuevo = new Nodo_Cliente(cliente);
        if(this.primero == null){
            this.primero = nuevo;
            this.tam++;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                if(aux.cliente.idC == cliente.idC){
                    alert("El ID del Cliente ya existe. \nPor favor ingrese otro ID.");
                    return;
                }
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
            this.tam++;
        }
    }

    imprimirClientes() {
        if (this.primero != null) {
            let aux = this.primero;
            console.log("***** Lista Clientes *****");
            while (aux != null) {
                console.log(aux.cliente.idC + " " + aux.cliente.nombre);
                aux = aux.siguiente;
            }
        }
        else {
            alert("La lista de Clientes esta vacía!");
        }
    }

    eliminarCliente(idElim){
        if (this.primero != null) {
            let aux = this.primero;
            let ant = null;
            while (aux.siguiente != null) {
                if (aux.cliente.idC == idElim) {
                    if (ant == null) {
                        this.primero.siguiente = this.primero;
                        aux.siguiente = null;
                        aux = this.primero;
                        this.tam--;
                        alert("Cliente eliminado!");
                        return;
                    } else {
                        ant = aux;
                        aux.siguiente = null;
                        ant.siguiente = aux;
                        aux.anterior = ant;
                        this.tam--;
                        alert("Cliente eliminado!");
                        return;
                    }
                } else {
                    ant = aux;
                    aux.anterior = aux;
                }
            }
            if (aux.cliente.idC == idElim) {
                ant.siguiente = null;
                aux = null;
                this.tam--;
                alert("Cliente eliminado!");
            }
        } else {
            alert("No hay clientes en lista!");
        }
    }
}
//*************************************************************************************************************************************** */
//***************************************************************************************************************************************
let arbol_ven = new AVL_Vendedores();

function registrarVendedor() {
    recuperar_EstructuraAVL();
    var idVendedor = parseInt(document.getElementById("idVendedor").value);
    var nombre = document.getElementById("nombreVendedor").value;
    var correo = document.getElementById("correoVendedor").value;
    var edad = document.getElementById("edadVendedor").value;
    var password = document.getElementById("passwordVendedor").value;
    console.log(idVendedor,nombre,edad,correo,password);
    arbol_ven.insertar(new Vendedor(idVendedor,nombre,edad,correo,password,new Lista_Doble()));
    document.getElementById('idVendedor').value = "";
    document.getElementById('nombreVendedor').value = "";
    document.getElementById('correoVendedor').value = "";
    document.getElementById('edadVendedor').value = "";
    document.getElementById('passwordVendedor').value = "";
}

function cargaMasivaVendedor(){
    var data = document.getElementById('archivoUsuarios').files;
    if(!data.length){
      alert('No se ha seleccionado el archivo Vendedores');
    }else{
        var cadena = readFileavl(data[0]);
        console.log(cadena);
    }
}

function readFileavl(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof(reader.result));
        console.log(reader.result);
        var objvend = JSON.parse(contenido);
        console.log(objvend, typeof(objvend));
        for (let value of objvend.vendedores) {
            console.log(value);
            var idVendedor = parseInt(value.id);
            var nombre = value.nombre;
            var edad = value.edad;
            var correo = value.correo;
            var password = value.password;            
            arbol_ven.insertar(new Vendedor(idVendedor,nombre,edad,correo,password,new Lista_Doble()));
            console.log(idVendedor,nombre,edad,correo,password);
          }
    }
    reader.readAsText(file);
}

function mostrarGrafico2() {
    recuperar_EstructuraAVL();
    arbol_ven.generarDOT_AVL();
}

function imprimiraAVL() {
    arbol_ven.inOrden(arbol_ven.raiz);
}
//*************************************************************************************************************************************** */
//************************************************************ k ************************************************************ */
//*************************************************************************************************************************************** */

function guardar_EstructuraAVL() {
    imprimiraAVL();
    if (arbol_ven.raiz != null) {
        var avl_aux = CircularJSON.stringify(arbol_ven);
        var avl_aux2 = JSON.stringify(avl_aux);
        sessionStorage.setItem("arbol_ven", avl_aux2)
    }
}

function recuperar_EstructuraAVL() {
    imprimiraAVL();
    var avl_aux0 = JSON.parse(sessionStorage.getItem("arbol_ven"));
    arbol_ven = new AVL_Vendedores();
    avl_aux0 = CircularJSON.parse(avl_aux0);
    Object.assign(arbol_ven, avl_aux0);
}

function deshabProv() {
    frm = document.forms['FORMPROV'];
    for(i=0; ele=frm.elements[i]; i++)
      ele.disabled=true;
}



/*arbol = new AVL_Vendedores();

arbol.insertar(new Vendedor(30,"jose",25,"correo","4561",new Lista_Doble()));
arbol.insertar(new Vendedor(40,"jose",25,"correo","4561",null));
arbol.insertar(new Vendedor(20,"jose",25,"correo","4561",null));
arbol.insertar(new Vendedor(10,"jose",25,"correo","4561",null));
arbol.insertar(new Vendedor(5,"jose",25,"correo","4561",null));
arbol.insertar(new Vendedor(70,"jose",25,"correo","4561",null));
arbol.insertar(new Vendedor(7,"jose",25,"correo","4561",null));
arbol.insertar(new Vendedor(100,"jose",25,"correo","4561",null));


arbol.inOrden(arbol.raiz);*/

//arbol.generarDot();


