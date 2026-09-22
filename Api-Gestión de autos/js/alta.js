function dataAuto () {
    const id = document.getElementById("id").value;
    const marca = document.getElementById("marca").value;
    const precio = document.getElementById("precio").value;
    const color = document.getElementById("color").value;

    const auto = {
        marca: marca,
        precio: Number(precio),
        color: color
    };

    if (id !== "" && Number(id) <= 0) {
        alert("El ID debe ser un número positivo.");
        return;
    }
    if (id !== "") {
        auto.id = Number(id);
    }

    console.log(auto);
    altaAuto(auto);
};

function altaAuto (auto) {
    const h2 = document.createElement("h2");
    h2.textContent = "Automóvil agregado correctamente."
    const body = document.querySelector("body");
    fetch("https://api-autos-tgwd.onrender.com/autos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(auto)
    })
    .then(response => {
        console.log("Status:", response.status);
        return response.json();
    })
    .then(datos => {
        console.log("Respuesta:", datos);
        body.appendChild(h2);
    });
}

const formulario = document.getElementById("formAgregar");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    dataAuto();
});