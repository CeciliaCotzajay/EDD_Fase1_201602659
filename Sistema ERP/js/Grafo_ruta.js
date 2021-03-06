//*************************************************************************************************************************************** */
//************************************************************GRAFO RUTAS**************************************************************** */
//*************************************************************************************************************************************** */
class Vertice {
    constructor(idVertice, nombre) {
        this.idVertice = idVertice;
        this.nombre = nombre;
    }
}
//*************************************************************************************************************************************** */
//*************************************************************************************************************************************** */
//*************************************************************************************************************************************** */
class NodoVertice {
    constructor(vertice) {
        this.vertice = vertice;
        this.siguiente = null;
        this.anterior = null;
        this.distancia = 0;
        this.listaAdyacentes = new ListaAdyacentes();
    }
}

class ListaAdyacentes {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertarAdyacente(vertice, dist) {
        let nuevo = new NodoVertice(vertice);
        nuevo.distancia = dist;
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            if (this.primero == this.ultimo) {
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            } else {
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo = nuevo;
            }
        }
    }
}

class Grafo {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertarVertice(vertice) {
        let nuevo = new NodoVertice(vertice);
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            if (this.primero == this.ultimo) {
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            } else {
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo = nuevo;
            }
        }

    }

    buscarVertice(idV) {
        let aux = this.primero;
        while (aux != null) {
            if (aux.vertice.idVertice == idV) {
                return aux;
            } else {
                aux = aux.siguiente;
            }
        }
        return null;
    }

    insertarAdyacenteGrafo(id_vertice, id_adyacente, distancia,nombreAdy) {
        let verticeEncontrado = this.buscarVertice(id_vertice);
        let adyacenteEncontrado = this.buscarVertice(id_adyacente);
        if (verticeEncontrado != null) {
            if (adyacenteEncontrado != null) {
                verticeEncontrado.listaAdyacentes.insertarAdyacente(adyacenteEncontrado.vertice, distancia);
            } else {
                let adyacenteNuevo = new Vertice(parseInt(id_adyacente),nombreAdy);
                this.insertarVertice(adyacenteNuevo); // TAMBIEN A??ADE LOS ADYACENTES COMO VERTICES***************
                verticeEncontrado.listaAdyacentes.insertarAdyacente(adyacenteNuevo, distancia);
            }
        } else {
            console.log("no existe el nodo origen")
        }
    }

    generarDotGrafo() {
        let cadena = "digraph Grafo_Rutas {\n rankdir=\"LR\" \n"
        let aux = this.primero;
        while (aux != null) {
            cadena += "n" + aux.vertice.idVertice + "[label= \"" + aux.vertice.idVertice + "\"];\n"
            aux = aux.siguiente;
        }
        //PUNTEROS
        aux = this.primero;
        while (aux != null) {
            let aux2 = aux.listaAdyacentes.primero;
            while (aux2 != null) {
                cadena += "n" + aux.vertice.idVertice + " -> n" + aux2.vertice.idVertice + " [label=\"" + aux2.distancia + "km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);
        this.generarImgGrafo(cadena);
        document.getElementById('textAreaRutas').value = cadena;
    }

    generarImgGrafo(cadena){
        try {
            var g = graphlibDot.read(cadena);
            var render = new dagreD3.render();
            render(d3.select("Grafo_Rut.svg"), g);
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
let grafo_rutas = new Grafo();

function cargaMasivaRutas() {
    var data = document.getElementById('archivoRutas').files;
    if (!data.length) {
        alert('No se ha seleccionado el archivo Rutas');
    } else {
        readFileRutas(data[0]);
    }
}

function readFileRutas(file) {
    const reader = new FileReader();
    reader.onload = function () {
        let contenido = reader.result;
        console.log(typeof (reader.result));
        console.log(reader.result);
        var objRut = JSON.parse(contenido);
        console.log(objRut, typeof (objRut));
        //recuperar_Estructuras();
        for (let value of objRut.rutas) {
            var idRut = parseInt(value.id);
            var nombreRut = value.nombre;
            var listaAdy = value.adyacentes;
            console.log(idRut, nombreRut);
            grafo_rutas.insertarVertice(new Vertice(idRut, nombreRut));
            for (let value2 of listaAdy) {
                var idAdy = parseInt(value2.id);
                var nombreAdy = value2.nombre;
                var distancia = value2.distancia;
                grafo_rutas.insertarAdyacenteGrafo(idRut,idAdy,distancia,nombreAdy);
                console.log("     ", idAdy, nombreAdy, distancia);
            }
            //guardar_Estructuras();
        }
    }
    reader.readAsText(file);
    alert("Archivo cargado con exito!")
}

function mostrarGraficoGrafo() {
    //recuperar_Estructuras();
    try{
        grafo_rutas.generarDotGrafo();
    }catch{
        alert("EL Grafo de Rutas esta vacio!!");
    }
}

/*let grafo_prueba = new Grafo();
grafo_prueba.insertarVertice(new Vertice(4, "ramon", "ruta"));
grafo_prueba.insertarVertice(new Vertice(6, "ramon", "ruta"));
grafo_prueba.insertarVertice(new Vertice(9, "ramon", "ruta"));
grafo_prueba.insertarVertice(new Vertice(11, "ramon", "ruta"));
grafo_prueba.insertarVertice(new Vertice(7, "ramon", "ruta"));
grafo_prueba.insertarVertice(new Vertice(10, "ramon", "ruta"));

grafo_prueba.insertarAdyacenteGrafo(4, 6, 5);
grafo_prueba.insertarAdyacenteGrafo(6, 4, 5);

grafo_prueba.insertarAdyacenteGrafo(6, 9, 2);
grafo_prueba.insertarAdyacenteGrafo(9, 6, 2);

grafo_prueba.insertarAdyacenteGrafo(7, 9, 4);
grafo_prueba.insertarAdyacenteGrafo(9, 7, 4);

grafo_prueba.insertarAdyacenteGrafo(4, 10, 4);
grafo_prueba.insertarAdyacenteGrafo(10, 4, 4);

grafo_prueba.insertarAdyacenteGrafo(9, 11, 9);
grafo_prueba.insertarAdyacenteGrafo(11, 9, 9);

grafo_prueba.insertarAdyacenteGrafo(10, 11, 1);
grafo_prueba.insertarAdyacenteGrafo(11, 10, 1);

grafo_prueba.insertarAdyacenteGrafo(7, 10, 8);
grafo_prueba.insertarAdyacenteGrafo(10, 7, 8);

grafo_prueba.insertarAdyacenteGrafo(6, 11, 6);
grafo_prueba.insertarAdyacenteGrafo(11, 6, 6);

grafo_prueba.generarDotGrafo();*/