import { createPage } from "../page/utils.js"

export function createProductList(productos) {
    let html = ""
    
    // Menú de secciones con Navs de Bootstrap
    html += `
    <nav class="nav nav-pills nav-fill bg-white p-3 rounded shadow-sm mb-4">
        <a class="nav-link" href="/productos?categoria=smartphones">Smartphones</a>
        <a class="nav-link" href="/productos?categoria=laptops">Laptops</a>
        <a class="nav-link" href="/productos?categoria=gaming">Gaming</a>
        <a class="nav-link" href="/productos?categoria=tablets">Tablets</a>
        <a class="nav-link" href="/productos?categoria=audio">Audio</a>
        <a class="nav-link active bg-secondary" href="/productos">Todos</a>
    </nav>`

    html += '<h1 class="text-center mb-4 display-4">Listado de Productos</h1>'
    
    // Grid de Bootstrap (row)
    html += '<div class="row g-4">'

    productos.forEach(p => {
        html += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text text-muted small">${p.descripcion}</p>
                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item ps-0"><strong>Marca:</strong> ${p.marca}</li>
                        <li class="list-group-item ps-0 text-success fw-bold">Precio: $${p.precio}</li>
                    </ul>
                    <div class="mt-auto">
                        <a href="${p.link}" target="_blank" class="btn btn-primary w-100">
                            Ver Repositorio
                        </a>
                    </div>
                </div>
            </div>
        </div>`
    })

    html += "</div>" // Cierre del row
    
    return createPage(html)
}