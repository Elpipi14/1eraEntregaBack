const socketClient = io()

socketClient.on('saludo desde back', (msg) => {
    console.log(msg);
})


const form = document.getElementById('form');

const inputId = document.getElementById('id');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputImage = document.getElementById('image');

const listenProducts = document.getElementById('Products');

form.onsubmit = (e) => {
    e.preventDefault()
    const id = inputId.value;
    const title = inputTitle.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const image = inputImage.value;
    const product = { id, title, price, stock, image };
    socketClient.emit('newProducts', product);
}


socketClient.on('arrayProducts', (productsArrays) => {
    let infoProducts = ``;
    productsArrays.forEach(e => {
        infoProducts +=
            ` 
            <div class="card" style="width: 18rem;">
                <img src="${e.image}" class="card-img-top" alt="${e.title}">
                <div class="card-body">
                    <h2 class="card-text">${e.title}</h2>
                    <p class="card-text">${e.id}</p>
                    <p class="card-text">$${e.price}<</p>
                    <p class="card-text">Stock:${e.stock}</p>
                </div>
            </div>
            `
    });
    products.innerHTML = infoProducts;
});





