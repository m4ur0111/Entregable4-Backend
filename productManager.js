const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
        // Calculo el ID más alto actualmente en el arreglo de productos
        const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
        ProductManager.nextId = maxId + 1;
        } catch (error) {
        this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    addProduct(product) {
        // Verifico si el código del producto ya existe
        const isCodeDuplicate = this.products.some((existingProduct) => existingProduct.code === product.code);
        if (isCodeDuplicate) {
        console.log(`Error: El código ${product.code} ya existe en otro producto.`);
        return;
        }

        product.id = ProductManager.nextId++;
        this.products.unshift(product);

        this.saveProducts();
        console.log(`Producto agregado correctamente - ID: ${product.id}`);
    }

    getProducts() {
        console.log(`Productos Obtenidos:`);
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find((product) => product.id === productId);
        return product; 
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts();
        console.log(`El producto con ID ${productId} fue actualizado correctamente`);
        return true;
        } else {
        console.log(`Hubo un error al actualizar el producto con ID: ${productId}`);
        return false;
        }
    }

    deleteProduct(productId) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            console.log(`Producto con ID ${productId} eliminado correctamente.`);
        } else {
            console.log(`Error: Producto con ID ${productId} no encontrado. No se pudo eliminar.`);
        }
    }
}

// Inicializo el ID base como propiedad estática de la clase
ProductManager.nextId = 1;

const productManager = new ProductManager('datos.txt');

////////// Agregar productos //////////
const productsToAdd = [
    {
        title: "Iphone 14",
        description: "El iPhone 14 es la última incorporación a la reconocida línea de teléfonos inteligentes de Apple.",
        price: 1500,
        thumbnail: "https://techcrunch.com/wp-content/uploads/2022/09/Apple-iphone-14-Pro-review-1.jpeg?w=1024",
        code: 5445,
        stock: 20,
    },
    {
        title: "S23 Ultra",
        description: "El S23 Ultra es el último buque insignia de la reconocida serie de teléfonos Samsung Galaxy.",
        price: 1300,
        thumbnail: "https://static.hendel.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/4/9/49604_be-min.jpg",
        code: 5685,
        stock: 26,
    },
    {
        title: "Xiaomi Mi 12 Lite",
        description: "Xiaomi Mi 12 Lite es un teléfono inteligente de gama media-alta lanzado por la reconocida marca Xiaomi.",
        price: 1560,
        thumbnail: "https://d2r9epyceweg5n.cloudfront.net/stores/001/388/250/products/mi-12-lite1-c0c6bec92eaa5c47b416644075792536-640-0.jpg",
        code: 2725,
        stock: 74,
    },
    {
        title: "Nokia G50",
        description: "Nokia G50 es un teléfono inteligente de gama media con un enfoque en la conectividad y la durabilidad.",
        price: 1800,
        thumbnail: "https://images.ctfassets.net/wcfotm6rrl7u/76fSPXUoCY4M6TVXVK1ofr/582329d4c4bdb6e79b9a9fbdf1f5e371/nokia-G50-ocean_blue-front_back-int.png?h=1000&fm=png&fl=png8",
        code: 5285,
        stock: 56,
    },
    {
        title: "Teclado Gamer Redragon K599",
        description: "El teclado gamer Redragon K599 es un dispositivo diseñado especialmente para satisfacer las necesidades de los entusiastas de los videojuegos.",
        price: 1530,
        thumbnail: "https://www.innovartech.com.ar/storage/2022/03/K599-DEIMOS.jpg",
        code: 3285,
        stock: 24,
    },
    {
        title: "Mouse Gamer Redragon M908",
        description: "El mouse gamer Redragon M908 es un dispositivo diseñado específicamente para satisfacer las necesidades de los entusiastas de los videojuegos.",
        price: 530,
        thumbnail: "https://smarts.com.ar/media/catalog/product/cache/e2fffb2b85fe85187f9dedbb6434d061/m/9/m908-impact_ok.jpg",
        code: 2225,
        stock: 34,
    },
    {
        title: "Mouse Gamer Razer Basilisk V3",
        description: "El mouse gamer Razer Basilisk V3 es un dispositivo de alto rendimiento diseñado para jugadores exigentes que buscan precisión y control durante sus sesiones de juego.",
        price: 640,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_794445-MLA48220999401_112021-O.webp",
        code: 1225,
        stock: 64,
    },
    {
        title: "Auriculares Razer Kraken Ultimate",
        description: "Los auriculares Razer Kraken Ultimate son una opción destacada para los amantes de los juegos y los entusiastas de la música.",
        price: 610,
        thumbnail: "https://www.megatone.net/images/Articulos/zoom2x/1/01/MKT2472MEM.jpg",
        code: 7425,
        stock: 14,
    },
    {
        title: "Galaxy Watch4 Bluetooth",
        description: "El Galaxy Watch4 Bluetooth es un reloj inteligente de Samsung que combina estilo y funcionalidad en un elegante dispositivo portátil.",
        price: 1410,
        thumbnail: "https://images.samsung.com/is/image/samsung/p6pim/ar/2108/gallery/ar-galaxy-watch4-sm-r860nzdaaro-481110913?$650_519_PNG$",
        code: 6323,
        stock: 20,
    },
    {
        title: "Apple Watch SE",
        description: "El Apple Watch SE es un reloj inteligente de la reconocida marca Apple que ofrece un equilibrio perfecto entre funcionalidad y precio.",
        price: 1810,
        thumbnail: "https://images.fravega.com/f1000/9621db3cb192b5e486a680a1a4e4496e.jpg",
        code: 5275,
        stock: 30,
    },
];
for (const product of productsToAdd) {
    productManager.addProduct(product);
}

////////// Obtener y mostrar todos los productos //////////
// const allProducts = productManager.getProducts();
// console.log(allProducts);

////////// Obtener un producto por su ID //////////
// const productId = 3;
// const foundProduct = productManager.getProductById(productId);
// if (foundProduct) {
//     console.log(`Producto encontrado - ID: ${productId}`);
//     console.log(foundProduct);
// } else {
//     console.log(`Producto no encontrado - ID: ${productId}`);
// }

////////// Modificar un producto por su ID //////////
// const updatedFields = { price: 1300, stock: 35 };
// const updated = productManager.updateProduct(3, updatedFields);

////////// Eliminar un producto por su ID //////////
// const productIdToDelete = 2;
// productManager.deleteProduct(productIdToDelete); 

module.exports = ProductManager;