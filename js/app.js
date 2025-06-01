import Contacto from "./classContacto.js";

// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function abrirModalContacto() {
  const modalCrearContacto = new bootstrap.Modal(
    document.getElementById("crearContacto")
  );
  //mostrar ventana modal show es un metodo
  modalCrearContacto.show();
}
function crearContacto() {
  //to do traer todos los datos del formulario validados
  //crear un objeto Contacto
  const nuevoContacto = new Contacto(
    "juan",
    "perez",
    "23423423",
    "juanperez@mail.com"
  );
  console.log(nuevoContacto);
  //almacenar el objeto en la agenda
}

//declaro variables
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const formularioCrearContacto = document.querySelector("form");
const agenda = [];

//manejadores de eventos
btnAgregarContacto.addEventListener("click", abrirModalContacto);
formularioCrearContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //el usuario completa el form y debo crear un objeto contacto
  crearContacto();
});
