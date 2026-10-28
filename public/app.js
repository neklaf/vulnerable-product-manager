const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const productsContainer =
    document.getElementById("products");

async function loadProducts(search = "") {

    try {

        const response = await fetch(
            `/api/products?search=${encodeURIComponent(search)}`
        );

        if (!response.ok) {
            throw new Error("Error al buscar productos");
        }

        const products = await response.json();

        productsContainer.innerHTML = "";

        if (products.length === 0) {

            productsContainer.textContent =
                "No se encontraron productos";

            return;
        }

        products.forEach(product => {

            const div = document.createElement("div");

            div.className = "product";

            const title = document.createElement("h3");
            title.textContent = product.name;

            const description = document.createElement("p");
            description.textContent = product.description ?? "";

            const price = document.createElement("p");
            price.className = "price";
            price.textContent = `${product.price} €`;

            div.append(title, description, price);

            productsContainer.appendChild(div);

        });

    } catch (error) {

        productsContainer.textContent =
            "Error al cargar los productos";

        console.error(error);

    }

}

searchButton.addEventListener("click", () => {

    loadProducts(searchInput.value);

});

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        loadProducts(searchInput.value);
    }

});

loadProducts();
