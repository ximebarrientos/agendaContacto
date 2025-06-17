//1-buscar el parametro de la url
console.log(window.location.search)

const parametroURL=new URLSearchParams(window.location.search)
const id=parametroURL.get("id")


//2-traer la agenda de contactos dle localstorage

//-3 buscar en la agenda cuales son los datos del contacto que tiene el id recibido en la URL

//4- dibujar el objeto en mi maquetado