//*************************************************************************************************************************************** */
//************************************************************ABB PROVEEDORES************************************************************ */
//*************************************************************************************************************************************** */
class Proveedor {
    constructor(idP, nombre, direccion, telefono, correo) {
        this.idP = idP;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }
}

class nodoProveedor {
    constructor(proveedor) {
        this.proveedor = proveedor;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ArbolBinario {
    constructor() {
        this.raizP = null;
    }

    insertar(P) {
        let nuevo = new nodoProveedor(P);
        if (this.raizP == null) {
            this.raizP = nuevo;
        } else {
            this.raizP = this.insertar2(this.raizP, nuevo);
        }
    }

    insertar2(raizP_aux, nuevo) {
        if (raizP_aux != null) {
            if (raizP_aux.proveedor.idP > nuevo.proveedor.idP) {
                raizP_aux.izquierda = this.insertar2(raizP_aux.izquierda, nuevo);
            } else if (raizP_aux.proveedor.idP < nuevo.proveedor.idP) {
                raizP_aux.derecha = this.insertar2(raizP_aux.derecha, nuevo);
            } else {
                alert("El ID del Proveedor ya existe. \nPor favor ingrese otro ID.");
                console.log("El ID del Proveedor ya existe. \nPor favor ingrese otro ID.");
            }
            return raizP_aux;
        } else {
            raizP_aux = nuevo;
            return raizP_aux;
        }
    }

    inOrden(raizP_aux) {
        if (raizP_aux != null) {
            this.inOrden(raizP_aux.izquierda);
            console.log(raizP_aux.proveedor.idP);
            this.inOrden(raizP_aux.derecha);
        }
    }

    /*preorden(raizP_aux){
        if(raizP_aux != null){
            console.log(raizP_aux.proveedor.idP);
            this.preorden(raizP_aux.izquierda);
            this.preorden(raizP_aux.derecha);
        }
    }
    postOrden(raizP_aux){
        if(raizP_aux != null){
            this.postOrden(raizP_aux.izquierda);
            this.postOrden(raizP_aux.derecha);
            console.log(raizP_aux.proveedor.idP);
        }
    }*/

    generarDOT() {
        let cadena = "digraph ABB_prov {\n";
        cadena += this.NodosDOT(this.raizP);
        cadena += "\n";
        cadena += this.enramar(this.raizP);
        cadena += "\n}";
        console.log(cadena);
        this.generarImg(cadena);
        document.getElementById('textAreaProv').value = cadena;
    }

    NodosDOT(raizP_aux) {
        let nodos = "";
        if (raizP_aux != null) {
            nodos += "p" + raizP_aux.proveedor.idP + "[label=\"" + raizP_aux.proveedor.idP + "\n" + raizP_aux.proveedor.nombre + "\n" + raizP_aux.proveedor.direccion + "\n" + raizP_aux.proveedor.telefono + "\n" + raizP_aux.proveedor.correo + "\"]\n";
            nodos += this.NodosDOT(raizP_aux.izquierda);
            nodos += this.NodosDOT(raizP_aux.derecha);
        }
        return nodos;
    }


    enramar(raizP_aux) {
        let cadena = "";
        if (raizP_aux != null) {
            cadena += this.enramar(raizP_aux.izquierda);
            cadena += this.enramar(raizP_aux.derecha);
            if (raizP_aux.izquierda != null) {
                cadena += "p" + raizP_aux.proveedor.idP + "-> p" + raizP_aux.izquierda.proveedor.idP + "\n";
            }
            if (raizP_aux.derecha != null) {
                cadena += "p" + raizP_aux.proveedor.idP + "-> p" + raizP_aux.derecha.proveedor.idP + "\n";
            }
        }
        return cadena;
    }

    generarImg(cadena) {
        try {
            var g = graphlibDot.read(cadena);
            var render = new dagreD3.render();
            render(d3.select("ABB_prov.svg"), g);
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
//***************************************************************************************************************************************
let abb_Prov = new ArbolBinario();

function registrarProveedor() {
    var idProveedor = parseInt(document.getElementById("idProveedor").value);
    var nombre = document.getElementById("nombreProveedor").value;
    var direccion = document.getElementById("direccionProveedor").value;
    var telefono = document.getElementById("telefonoProveedor").value;
    var correo = document.getElementById("correoProveedor").value;
    let proveedor = new Proveedor(idProveedor, nombre, direccion, telefono, correo);
    console.log(idProveedor, nombre, direccion, telefono, correo);
    abb_Prov.insertar(proveedor);
    document.getElementById('idProveedor').value = "";
    document.getElementById('nombreProveedor').value = "";
    document.getElementById('direccionProveedor').value = "";
    document.getElementById('telefonoProveedor').value = "";
    document.getElementById('correoProveedor').value = "";
}

function cargaMasivaProveedor(){
    var data = document.getElementById('archivoProveedores').files;
    if(!data.length){
      alert('No se ha seleccionado el archivo Proveedores');
    }else{
        var cadena = readFile(data[0]);
        console.log(cadena);
    }
}

function irGraphizOnline() {
    abb_Prov.inOrden(abb_Prov.raizP)
}

function mostrarGrafico1() {
    abb_Prov.generarDOT();
}

function imprimirABB() {
    abb_Prov.inOrden(abb_Prov.raizP)
}
//*************************************************************************************************************************************** */
//************************************************************ k ************************************************************ */
//*************************************************************************************************************************************** */

function readFile(file) {
    const reader = new FileReader();
    reader.onload = function () {
        //console.log(reader.result);
    }
    reader.readAsText(file);
    return reader.result;
}

function guardar_Estructuras() {
    if (abb_Prov.raizP != null) {
        var abb_aux = CircularJSON.stringify(abb_Prov);
        var abb_aux2 = JSON.stringify(abb_aux);
        sessionStorage.setItem("abb_Prov", abb_aux2);
        guardar_EstructuraAVL();
    }
}

function recuperar_Estructuras() {
    //actualizar
    /*if (sessionStorage['name']) { 
        console.log("There is 'name' in session storage ") 
    } */        var abb_aux0 = JSON.parse(sessionStorage.getItem("abb_Prov"));
    abb_Prov = new ArbolBinario();
    abb_aux0 = CircularJSON.parse(abb_aux0);
    Object.assign(abb_Prov, abb_aux0);
    recuperar_EstructuraAVL();

}

//*************************************************************************************************************************************** */
//************************************************************ k ************************************************************ */
//*************************************************************************************************************************************** */
