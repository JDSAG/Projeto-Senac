// BARRA FIXA
const banner = document.getElementById("banner");
const stickyBar = document.getElementById("stickyBar");

if(banner && stickyBar){
    window.addEventListener("scroll", () => {
        const bannerBottom = banner.offsetTop + banner.offsetHeight;

        if(window.scrollY > bannerBottom){
            stickyBar.classList.remove("-translate-y-full");
            stickyBar.classList.add("translate-y-0");
        }else{
            stickyBar.classList.remove("translate-y-0");
            stickyBar.classList.add("-translate-y-full");
        }
    });

}

// BUSCA NO CARDÁPIO
const searchInputs = document.querySelectorAll('input[placeholder="Buscar no cardápio"]');
const products = document.querySelectorAll(".product-card");

searchInputs.forEach(input => {

    input.addEventListener("input", () => {
        const text = input.value.toLowerCase();

        products.forEach(product => {
            const title = product.dataset.title.toLowerCase();
            const description = product.dataset.description.toLowerCase();

            if(
                title.includes(text) ||
                description.includes(text)
            ){
                product.style.display = "flex";
            }else{
                product.style.display = "none";
            }
        });
    });
});

// MENU
const categorias = document.querySelectorAll(".categoria");

categorias.forEach(categoria => {
    categoria.addEventListener("click",()=>{
        const href = categoria.getAttribute("href");

        categorias.forEach(item=>{
            item.classList.remove("ativa");
        });

        document.querySelectorAll(`.categoria[href="${href}"]`).forEach(item=>{
            item.classList.add("ativa");
        });
    });
});

// MODAL
const modal = document.getElementById("productModal");

if(modal){
    const closeModal = document.getElementById("closeModal");

    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const modalImage = document.getElementById("modalImage");


    let quantidade = 1;

    const quantity = document.getElementById("quantity");
    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");



    document.querySelectorAll(".product-card").forEach(card=>{
        card.addEventListener("click",()=>{
            quantidade = 1;
            quantity.textContent = 1;

            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            modalPrice.textContent = card.dataset.price;
            modalImage.src = card.dataset.image;

            modal.classList.remove("hidden");
        });
    });

    closeModal.onclick = fecharModal;

    function fecharModal(){
        modal.classList.add("hidden");
    }

    plus.onclick = ()=>{
        quantidade++;
        quantity.textContent = quantidade;
    }

    minus.onclick = ()=>{
        if(quantidade > 1){
            quantidade--;

            quantity.textContent = quantidade;
        }
    };

    // COMPRAR
    document.getElementById("buyNow").onclick = ()=>{
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let item = {
            title: modalTitle.textContent,
            description: modalDescription.textContent,
            price: modalPrice.textContent,
            image: modalImage.src,
            quantity: quantidade

        };

        // procura produto igual
        let existe =cart.find(produto => produto.title === item.title);

        if(existe){
            existe.quantity += item.quantity;
        }else{
            cart.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        fecharModal();

        carregarPedidoDesktop();

        if(window.innerWidth < 1024){
            window.location.href="pages/pedidos.html";
        }
    };
}


// PEDIDO DESKTOP

function carregarPedidoDesktop(){
    const area = document.getElementById("pedidoDesktop");

    if(!area) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    area.innerHTML="";

    if(cart.length===0){
        area.innerHTML=
        `<p class="text-gray-500 text-center">
            Nenhum pedido
        </p>`;
        return;
    }else{
        cart.forEach((item,index)=>{
            let valor = Number(
                item.price.replace("R$","")
                .replace(".","")
                .replace(",",".")
            );

            total += valor * item.quantity;

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
                    R$ ${(valor * item.quantity)
                    .toFixed(2)
                    .replace(".",",")}
                </p>

                <button onclick="removerPedido(${index})" class="bg-red-500 text-white px-3 py-2 rounded-lg mt-3">
                    Remover
                </button>
            </div>`;
        });

        const totalDesktop = document.getElementById("totalDesktop");

        if(totalDesktop){
            totalDesktop.textContent =
            "R$ " + total.toFixed(2).replace(".",",");
        }
    }
}

function removerPedido(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    carregarPedidoDesktop();
}

function limparPedido(){
    localStorage.removeItem("cart");

    carregarPedidoDesktop();

    const totalDesktop = document.getElementById("totalDesktop");

    if(totalDesktop){
        totalDesktop.textContent = "R$ 0,00";
    }

    location.reload();
}

function finalizarPedido(){
    if(cart.length === 0){
        alert("Seu pedido está vazio!");

        return;
    }

    alert("Pedido enviado com sucesso!");

    localStorage.removeItem("cart");

    carregarPedidoDesktop();
}

window.onload = ()=>{
    carregarPedidoDesktop();
};

// SINCRONIZA QUANDO OUTRA ABA/PÁGINA ALTERAR O CART
window.addEventListener("storage", (event)=>{

    if(event.key === "cart"){

        carregarPedidoDesktop();

    }

});