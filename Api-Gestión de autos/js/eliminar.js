fetch("https://api-autos-tgwd.onrender.com/autos")
    .then(response => response.json())
    .then(autos => {
        console.log(autos);
        const formulario = document.getElementById("formBuscarId");

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            buscarAuto(autos);
        });
    });

function buscarAuto (autos) {
    const id_auto = document.getElementById("id").value;

    autos.forEach(auto => {
        if (id_auto == auto.id) {
            generarFilaAuto(auto);
        };
    });
};

function generarFilaAuto(auto) {
    const tabla = document.getElementById("tablaAutos");
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML = "";

    let fila = document.createElement("tr");

    const id = document.createElement("td");
    const marca = document.createElement("td");
    const precio = document.createElement("td");
    const color = document.createElement("td");
    const td_eliminar = document.createElement("td");
    const boton_eliminar = document.createElement("button");

    id.textContent = auto.id;
    marca.textContent = auto.marca;
    precio.textContent = auto.precio;

    const inputColor = document.createElement("input");
    inputColor.type = "color";
    inputColor.value = auto.color;
    inputColor.disabled = true;

    color.appendChild(inputColor);

    boton_eliminar.textContent = "Eliminar";

    td_eliminar.appendChild(boton_eliminar);

    fila.appendChild(id);
    fila.appendChild(marca);
    fila.appendChild(precio);
    fila.appendChild(color);
    fila.appendChild(td_eliminar);

    tbody.appendChild(fila);
    boton_eliminar.addEventListener("click", function () {
        const confirmar = confirm("¿Está seguro de que desea eliminar este automóvil?");

        if (confirmar) {
            eliminarAuto(auto.id);
        }
    });
};

function eliminarAuto (id_auto) {
    const h2 = document.createElement("h2");
    h2.textContent = "Automóvil eliminado correctamente."
    const body = document.querySelector("body");
    fetch("https://api-autos-tgwd.onrender.com/autos/" + id_auto, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(datos => {
                console.log("Auto eliminado:", datos);
                body.appendChild(h2);
            });
}