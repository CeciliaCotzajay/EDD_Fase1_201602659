
function inciarSesion(){
    var done=0; 
    var usuario=document.getElementById("username").value; 
    var password=document.getElementById("password").value; 
    if (usuario=="admin" && password=="1234") { 
    window.location="admin.html"; 
    } 
    else if (usuario=="USUARIO2" && password=="CONTRASEÑA2") { 
    window.location="TU_PAGINA_WEB.HTML"; 
    } 
    else{
        alert("Nombre de usuario y/o constraseña incorrectos, intentelo de nuvo.")
        window.location="Login.html"
    } 
}