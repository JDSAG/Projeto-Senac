// BARRA FIXA
const banner = document.getElementById("banner");
const stickyBar = document.getElementById("stickyBar");

window.addEventListener("scroll", () => {
    const bannerBottom = banner.offsetTop + banner.offsetHeight;

    if (window.scrollY > bannerBottom) {
        stickyBar.classList.remove("-translate-y-full");
        stickyBar.classList.add("translate-y-0");
    } else {
        stickyBar.classList.remove("translate-y-0");
        stickyBar.classList.add("-translate-y-full");
    }
});

// SINCRONIZAÇÃO DOS MENUS
const categorias = document.querySelectorAll(".categoria");

categorias.forEach(categoria => {
    categoria.addEventListener("click", () => {

        const href = categoria.getAttribute("href");

        categorias.forEach(item => item.classList.remove("ativa"));

        document.querySelectorAll(`.categoria[href="${href}"]`)
            .forEach(item => item.classList.add("ativa"));
    });
});

// DETECÇÃO DE SEÇÃO (SCROLL)
const secoes = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const id = entry.target.id;

            categorias.forEach(item => item.classList.remove("ativa"));

            document.querySelectorAll(`.categoria[href="#${id}"]`)
                .forEach(item => item.classList.add("ativa"));
        }
    });
}, {
    threshold: 0.3
});

secoes.forEach(secao => observer.observe(secao));

// MODAL
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalImage = document.getElementById("modalImage");

document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {

        quantidade = 1;
        quantity.textContent = 1;

        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        modalPrice.textContent = card.dataset.price;
        modalImage.src = card.dataset.image;

        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });
});

function fecharModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

closeModal.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});

// QUANTIDADE
let quantidade = 1;

const quantity = document.getElementById("quantity");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

plus.addEventListener("click", () => {
    quantidade++;

    quantity.textContent = quantidade;

});

minus.addEventListener("click", () => {
    if(quantidade > 1){
        quantidade--;
        quantity.textContent = quantidade;
    }
});

/// BOTÃO COMPRAR AGORA 
const buyNow = document.getElementById("buyNow");

buyNow.addEventListener("click", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
        window.location.href = "login.html";

        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
        title: modalTitle.textContent,
        description: modalDescription.textContent,
        price: modalPrice.textContent,
        image: modalImage.src,
        quantity: quantidade,
        usuario: usuario.email
    };

    const produtoExistente = cart.find(produto => produto.title === item.title);

    if(produtoExistente){
        produtoExistente.quantity += item.quantity;
    }else{
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // fecha modal
    fecharModal();

    // DESKTOP
    if(window.innerWidth >= 1024){
        carregarPedidoDesktop();

        const pedido = document.querySelector("aside");

        pedido.scrollIntoView({
            behavior:"smooth"
        });
    }else{
        // APP
        window.location.href = "pages/pedidos.html";
    }
});

function carregarPedidoDesktop(){
    const area = document.getElementById("pedidoDesktop");
    if(!area) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    area.innerHTML = "";

    if(cart.length === 0){
        area.innerHTML =
        `<p class="text-gray-500 text-center">
            Nenhum pedido
        </p>`;

        return;
    }

    cart.forEach((item,index)=>{
        area.innerHTML += 
        `<div class="bg-white rounded-xl p-3 mb-3 shadow">
            <img src="${item.image}" class="w-20 h-20 object-cover rounded-lg">

            <h3 class="font-bold">
                ${item.title}
            </h3>

            <p>
                Quantidade: ${item.quantity}
            </p>

            <p class="font-bold">
                ${item.price}
            </p>

            <div class="flex gap-2 mt-3">
                <button onclick="removerPedido(${index})"  class="bg-red-500 text-white px-3 py-2 rounded-lg">
                    Remover
                </button>

                <button onclick="finalizarPedido()" class="bg-black text-white px-3 py-2 rounded-lg">
                    Finalizar
                </button>
            </div>
        </div>`;
    });
}

function removerPedido(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));

    carregarPedidoDesktop();
}

function finalizarPedido(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length === 0){
        alert("Pedido vazio!");

        return;
    }

    alert("Pedido enviado!");

    localStorage.removeItem("cart");

    carregarPedidoDesktop();
}

// PROTEÇÃO DE LOGIN
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html";
}