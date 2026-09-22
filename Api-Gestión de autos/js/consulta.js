fetch("https://api-autos-tgwd.onrender.com/autos")
    .then(response => response.json())
    .then(autos => {
        console.log(autos);
        generarListado(autos);
        eventoRecargaListado(autos);
    });

function generarListado(autos) {
    const tabla = document.getElementById("tablaAutos");
    const tbody = tabla.querySelector("tbody");

    autos.forEach(auto => {
        let fila = document.createElement("tr");
        const id = document.createElement("td");
        const marca = document.createElement("td");
        const precio = document.createElement("td");
        const color = document.createElement("td");

        id.textContent = auto.id;
        marca.textContent = auto.marca;
        precio.textContent = auto.precio;

        const inputColor = document.createElement("input");
        inputColor.type = "color";
        inputColor.value = auto.color;
        inputColor.disabled = true;

        color.appendChild(inputColor);

        fila.appendChild(id);
        fila.appendChild(marca);
        fila.appendChild(precio);
        fila.appendChild(color);
        tbody.appendChild(fila);
    });
};

function mostrarUnAuto (autos) {
    const id_auto = Number(document.getElementById("id").value);
    const tabla = document.getElementById("tablaAutos");
    const tbody = tabla.querySelector("tbody");

    tbody.innerHTML = "";

    autos.forEach(auto => {
        if (id_auto === auto.id) {
            let fila = document.createElement("tr");
            const id = document.createElement("td");
            const marca = document.createElement("td");
            const precio = document.createElement("td");
            const color = document.createElement("td");

            id.textContent = auto.id;
            marca.textContent = auto.marca;
            precio.textContent = auto.precio;

            const inputColor = document.createElement("input");
            inputColor.type = "color";
            inputColor.value = auto.color;
            inputColor.disabled = true;

            color.appendChild(inputColor);

            fila.appendChild(id);
            fila.appendChild(marca);
            fila.appendChild(precio);
            fila.appendChild(color);
            tbody.appendChild(fila);
        };
    });
};

function eventoRecargaListado(autos) {
    const formulario = document.getElementById("formAuto");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        mostrarUnAuto(autos);
    });
    formulario.addEventListener("reset", function () {
        generarListado(autos);
    });
};
