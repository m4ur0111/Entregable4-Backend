const express = require('express')

const PORT = 8080
const bodyParser = require('body-parser')
const ProductManager = require('./productManager')

const app = express()
const productManager = new ProductManager('datos.txt')

app.use(bodyParser.json());

//////// Ruta para obtener todos los productos ////////
app.get('/products', (req, res) => {
    const allProducts = productManager.getProducts();

    const limit = req.query.limit;
    if (limit) {
        const parsedLimit = parseInt(limit);
        if (!isNaN(parsedLimit) && parsedLimit >= 0) {
            const limitedProducts = allProducts.slice(0, parsedLimit);
            return renderProducts(res, limitedProducts);
        }
    }

    renderProducts(res, allProducts);
});

//////// Ruta para obtener el producto por ID ////////
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);

    if (!isNaN(productId)) {
        const product = productManager.getProductById(productId);
        if (product) {
            renderProducts(res, [product]);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } else {
        res.status(400).send({ error: 'El ID del producto debe ser un número válido' });
    }
});

//////// Escucha al servidor ////////
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//////// Función para renderizar los productos ////////
function renderProducts(res, products) {
    let htmlResponse = '<html><head><title>Lista de Productos</title>';
    htmlResponse += '<style>';
    htmlResponse += 'table { border-collapse: collapse; width: 100%; }';
    htmlResponse += 'th, td { border: 1px solid black; padding: 8px; text-align: center; }';
    htmlResponse += '</style>';
    htmlResponse += '</head><body>';
    htmlResponse += '<h1>Lista de Productos</h1>';
    htmlResponse += '<table>';
    htmlResponse += '<tr><th>ID</th><th>Título</th><th>Descripción</th><th>Precio</th><th>Thumbnail</th><th>Código</th><th>Stock</th></tr>';

    products.forEach((product) => {
        htmlResponse += `<tr>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td><img src="${product.thumbnail}" alt="Thumbnail" height="100"></td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
        </tr>`;
    });

    htmlResponse += '</table></body></html>';
    res.send(htmlResponse);
}