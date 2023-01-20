
function eliminarDiacriticos(texto) {
    return texto
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

function mostrarBoton(propiedad) {
    document.getElementById('btnCopiar').style.display = propiedad;
    document.getElementById('btnLimpiar').style.display = propiedad;
}

function ocultarLabel() {
    document.getElementById('mensajeEncriptado').style.display = 'none';

    document.getElementById('areaTextoEncriptado').style.display = 'inline';
}

const encry = document.getElementById("btnEncriptar");
encry.addEventListener("click", encriptar);

function encriptar() {
    let textoCifrado;
    let text = document.getElementById("areaEncriptar").value.toLowerCase();

    if (text.trim() != "") {
        text = text.trimStart();
        text = eliminarDiacriticos(text);

        textoCifrado = text.replace(/e/igm, "enter");
        textoCifrado = textoCifrado.replace(/o/igm, "ober");
        textoCifrado = textoCifrado.replace(/i/igm, "imes");
        textoCifrado = textoCifrado.replace(/a/igm, "ai");
        textoCifrado = textoCifrado.replace(/u/igm, "ufat");

        ocultarLabel();

        document.getElementById('areaTextoEncriptado').value = textoCifrado;
        mostrarBoton("inline-block");
    } else {
        alerteDeVacio();
    }
}

function alerteDeVacio() {
    alert("Se debe ingresar un texto!");
    borrarTextArea();
}

const desEncrip = document.getElementById("btnDesencriptar");
desEncrip.addEventListener("click", desencriptar);

function desencriptar() {
    let textoCifrado;
    let texto = document.getElementById("areaEncriptar").value;

    if (texto.trim() != "") {
        textoCifrado = texto.replace(/enter/igm, "e");
        textoCifrado = textoCifrado.replace(/ober/igm, "o");
        textoCifrado = textoCifrado.replace(/imes/igm, "i");
        textoCifrado = textoCifrado.replace(/ai/igm, "a");
        textoCifrado = textoCifrado.replace(/ufat/igm, "u");
        ocultarLabel();

        document.getElementById('areaTextoEncriptado').value = textoCifrado;

        mostrarBoton("inline-block");
    } else {
        alerteDeVacio();
    }
}

const copia = document.getElementById("btnCopiar");
copia.addEventListener("click", copiarTexto);

function copiarTexto() {
    let texto;

    texto = document.getElementById('areaTextoEncriptado').value;

    ///document.getElementById('areaEncriptar').value = texto;///

    copiarPortapales(texto);
}

function copiarPortapales(x) {
    var copyText = document.getElementById("areaTextoEncriptado");
    copyText.select();
    document.execCommand("copy");

    alert("Se copio " + "'" + x + "'");
}

const limpia = document.getElementById("btnLimpiar");
limpia.addEventListener("click", limpiarTextArea);

function limpiarTextArea() {
    document.getElementById('areaTextoEncriptado').style.display = 'none';
    document.getElementById('mensajeEncriptado').style.display = "inline";
    document.getElementById('areaEncriptar').value = "";
    mostrarBoton("none");

}

function borrarTextArea() {
    document.getElementById('areaEncriptar').value = "";
}

window.addEventListener('load', function () {
    borrarTextArea();
    console.log("Se limpo los texArea!");
});