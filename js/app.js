import Contacto from "./classContacto.js";

// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function abrirModalContacto() {
  
  limpiarFormulario();
  //mostrar ventana modal show es un metodo
  modalCrearContacto.show();
  creandoContacto = true;
}
function crearContacto() {
  //to do traer todos los datos del formulario validados
  if (validaciones()) {
    //crear un objeto Contacto
    const nuevoContacto = new Contacto(
      inputNombre.value,
      inputApellido.value,
      inputTelefono.value,
      inputEmail.value,
      inputImagen.value,
      inputNotas.value
    );
    console.log(nuevoContacto);
    //almacenar el objeto en la agenda
    agenda.push(nuevoContacto);
    console.log(agenda);
    guardarEnElLocalStorage();
    //limpia el form
    limpiarFormulario();
    //queremos dibujar una fila
    dibujarFila(nuevoContacto, agenda.length);
    //agregamos un mensaje al usuario
    Swal.fire({
      title: "Contacto creado",
      text: `El contacto ${nuevoContacto.nombre} fue creado correctamente`,
      icon: "success",
    });
  }
}

//limpiar el form
function limpiarFormulario() {
  formularioCrearContacto.reset();
  const inputs = formularioCrearContacto.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
}

function guardarEnElLocalStorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}
function cargaDatosContacto() {
  //verificar en localstorage si hay datos para mostrar en la tabla
  if (agenda.length !== 0) {
    //dibujar cada fila con su respectivos datos
    agenda.map((contacto, index) => dibujarFila(contacto, index + 1));
  }
  //mostrar un mensaje al usuario, no hay datos para mostrar
}
function dibujarFila(contacto, index) {
  //aqui voy a dibujar una sola fila con sus datos, tengo que buscal el padre del tr se pone += para que no se sobreescriba
  tablaContacto.innerHTML += `<tr> 
              <th scope="row">${index} </th>
              <td>${contacto.nombre}</td>
              <td>${contacto.apellido}</td>
              <td>${contacto.telefono}</td>
              <td>${contacto.email}</td>
              <td>
                <button class="btn btn-warning" onclick="prepararContacto('${contacto.id}')">
                  <i class="bi bi-pen"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarContacto('${contacto.id}')">
                  <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-info" onclick="verContacto('${contacto.id}')"><i class="bi bi-eye"></i></button>
              </td>
            </tr>`;
}
//funciones de validaciones
function validarCantidadCaracteres(input, min, max) {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validarEmail() {
  const regExp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regExp.test(inputEmail.value)) {
    inputEmail.classList.add("is-valid");
    inputEmail.classList.remove("is-invalid");
    return true;
  } else {
    inputEmail.classList.add("is-invalid");
    inputEmail.classList.remove("is-valid");
    return false;
  }
}

function validaciones() {
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputNombre, 2, 50) === true) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(inputApellido, 2, 50) === true) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(inputNotas, 0, 250) === true) {
    datosValidos = false;
  }
  if (!validarEmail()) {
    datosValidos = false;
  }

  return datosValidos;
}

window.eliminarContacto = (id) => {
  Swal.fire({
    title: "Estás por eliminar un contacto",
    text: "Si decides eliminar, no puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#78c2ad",
    cancelButtonColor: "#ff7851",
    confirmButtonText: "Borrar",
    cancelButtonText: "Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui agrego el codigo de qué quiero borrar
      //obtener el id del contacto a borrar
      //buscar en la agenda cual es el contacto que tiene tal id
      const posicionContacto = agenda.findIndex(
        (contacto) => contacto.id === id
      );
      //borrar de la agenda el contacto con id X
      agenda.splice(posicionContacto, 1);
      //actualizar los datos del localstorage
      guardarEnElLocalStorage();
      //actualizar la tabla de contactos
      tablaContacto.removeChild(tablaContacto.children[posicionContacto]);
      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto se borro correctamente",
        icon: "success",
      });
    }
  });
};

function editarContacto() {
  //primero verificar que los datos son validos
  if (validaciones()) {
    //tomar los datos del formulario
    console.log(idContacto);
    //buscar en el array donde esta el contacto que estoy editando para actualizar sus propiedades
    const posicionContactoActualizar = agenda.findIndex(
      (contacto) => contacto.id === idContacto
    );
    agenda[posicionContactoActualizar].nombre = inputNombre.value;
    agenda[posicionContactoActualizar].apellido = inputApellido.value;
    agenda[posicionContactoActualizar].telefono = inputTelefono.value;
    agenda[posicionContactoActualizar].email = inputEmail.value;
    agenda[posicionContactoActualizar].imagen = inputImagen.value;
    agenda[posicionContactoActualizar].notas = inputNotas.value;

    //actualizar localstorage
    guardarEnElLocalStorage();
    limpiarFormulario()
    //mostrar un mje al usuario indicando que se actualizo el contacto
    Swal.fire({
      title: "Contacto modificado",
      text: `El contacto ${agenda[posicionContactoActualizar].nombre} fue modificado correctamente`,
      icon: "success",
    });
    //actualizar la tabla de contactos
    //traer la fila de la tabla que coincide con la variable posicionContactoActualizar y modificar sus datos
    modalCrearContacto.hide()
  }
}

window.prepararContacto = (id) => {
  //buscar la informacion del usuario para agregar al modal
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  //modificar el titulo de la ventana modal
  const tituloModal = document.querySelector(".modal-title");
  tituloModal.textContent = "Modificar Contacto";
  abrirModalContacto();
  //cargar datos en el formulario
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputTelefono.value = contactoBuscado.telefono;
  inputImagen.value = contactoBuscado.imagen;
  inputNotas.value = contactoBuscado.notas;
  //cambiamos la variable para editar
  creandoContacto = false;
  //guardar el id del contacto que quiero modificar
  idContacto = id;
};

window.verContacto = (id) => {
  console.log(id);
  console.log(window.location);
  window.location.href = "/pages/detalleContacto.html?id=" + id;
};

//declaro variables
const modalCrearContacto = new bootstrap.Modal(
    document.getElementById("crearContacto")
  );
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const formularioCrearContacto = document.querySelector("form");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || []; //asi me aseguro que agenda siempre sea un array
//traigo todos los input
const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#email");
const inputTelefono = document.querySelector("#telefono");
const inputNotas = document.querySelector("#notas");
const inputImagen = document.querySelector("#imagen");
//padre de tr
const tablaContacto = document.getElementById("tablaContacto");
//variable booleana
let creandoContacto = true; //elsubmit me cree un contacto, pero si la pongo el false que el submit sea editar contacto
//variable para poder editar un contacto es especifico
let idContacto = null;

//manejadores de eventos
btnAgregarContacto.addEventListener("click", abrirModalContacto);
formularioCrearContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoContacto === true) {
    //el usuario completa el form y debo crear un objeto contacto
    crearContacto();
  } else {
    editarContacto();
  }
});

cargaDatosContacto(); //hago que apenas se abra la pagina se carguen los contactos
