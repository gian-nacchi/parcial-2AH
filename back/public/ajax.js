const contenedor = document.getElementById("contenedor-productos");

async function cargarProductos(categoria = "") {
    try {
        let url = "/api/productos";

        if (categoria) {
            url += `?categoria=${categoria}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        contenedor.innerHTML = "";

        data.forEach(p => {
            contenedor.innerHTML += `
                <div class="col-md-4">
                    <div class="card h-100">
                        <img src="${p.imagen}" class="card-img-top">
                        <div class="card-body">
                            <h5>${p.nombre}</h5>
                            <p>${p.descripcion}</p>
                            <p><strong>$${p.precio}</strong></p>
                            <a href="${p.link}" target="_blank" class="btn btn-dark">Ver más</a>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = "<p>Error al cargar productos</p>";
    }
}

// carga inicial
cargarProductos();