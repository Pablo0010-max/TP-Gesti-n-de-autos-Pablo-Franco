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
    const td_guardar = document.createElement("td");
    const boton_guardar = document.createElement("button");

    id.textContent = auto.id;

    const inputMarca = document.createElement("input");
    inputMarca.value = auto.marca;
    marca.appendChild(inputMarca);

    const inputPrecio = document.createElement("input");
    inputPrecio.type = "number";
    inputPrecio.value = auto.precio;
    precio.appendChild(inputPrecio);

    boton_guardar.textContent = "Guardar";

    const inputColor = document.createElement("input");
    inputColor.type = "color";
    inputColor.value = auto.color;

    td_guardar.appendChild(boton_guardar);
    color.appendChild(inputColor);

    fila.appendChild(id);
    fila.appendChild(marca);
    fila.appendChild(precio);
    fila.appendChild(color);
    fila.appendChild(td_guardar);

    tbody.appendChild(fila);
    boton_guardar.addEventListener("click", function () {
        modificarAutoAPI(
            auto.id,
            inputMarca.value,
            inputPrecio.value,
            inputColor.value
        );
    });
};

function modificarAutoAPI(id, marca, precio, color) {
    const h2 = document.createElement("h2");
    h2.textContent = "Automóvil modificado correctamente."
    const body = document.querySelector("body");
    fetch("https://api-autos-tgwd.onrender.com/autos/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            marca: marca,
            precio: Number(precio),
            color: color
        })
    })
    .then(response => response.json())
    .then(datos => {
        body.appendChild(h2);
    });
}