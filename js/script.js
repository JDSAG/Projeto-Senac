// BARRA FIXA
//-----------

// Seleciona o banner e a barra fixa
const banner = document.getElementById("banner");
const stickyBar = document.getElementById("stickyBar");

// Monitora o scroll da página
window.addEventListener("scroll", () => {
    // Calcula onde termina o banner
    const bannerBottom = banner.offsetTop + banner.offsetHeight;

    // Quando passar do banner, exibe a barra fixa
    if (window.scrollY > bannerBottom) {
        stickyBar.classList.remove("-translate-y-full");
        stickyBar.classList.add("translate-y-0");
    } else {
        stickyBar.classList.remove("translate-y-0");
        stickyBar.classList.add("-translate-y-full");
    }
});

// SINCRONIZAÇÃO DOS MENUS
//------------------------

// Seleciona todos os links de categoria
const categorias = document.querySelectorAll(".categoria");

// Adiciona evento de clique em cada categoria
categorias.forEach(categoria => {
    categoria.addEventListener("click", () => {

        // Obtém o href da categoria clicada
        const href = categoria.getAttribute("href");

        // Remove a classe ativa de todos os menus
        categorias.forEach(item => {
            item.classList.remove("ativa");
        });

        // Adiciona a classe ativa nas categorias que possuem o mesmo href
        document.querySelectorAll(`.categoria[href="${href}"]`).forEach(item => {
            item.classList.add("ativa");
        });
    });
});

// DETECÇÃO AUTOMÁTICA DA SEÇÃO VISÍVEL
//-------------------------------------

// Seleciona todas as seções do cardápio
const secoes = document.querySelectorAll("section[id]");

// Observer para detectar qual seção visível
const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            // Quando a seção estiver visível na tela
            if (entry.isIntersecting) {

                const id = entry.target.id;

                // Remove o destaque de todas as categorias
                categorias.forEach(item => {
                    item.classList.remove("ativa");
                });

                // Destaca a categoria correspondente
                document.querySelectorAll(`.categoria[href="#${id}"]`).forEach(item => {
                    item.classList.add("ativa");
                });
            }
        });
    },
    {
        // Considera visível quando 30% da seção aparece
        threshold: 0.3
    }
);
// Observa todas as seções
secoes.forEach(secao => {
    observer.observe(secao);
});

// MODAL (POPUP) DE DETALHES DO PRODUTO
//-------------------------------------

// Elementos principais do modal
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");

const addToCart = document.getElementById("addToCart");
const buyNow = document.getElementById("buyNow");

// Campos que serão preenchidos dinamicamente
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalImage = document.getElementById("modalImage");

// Seleciona todos os cards de produtos
document.querySelectorAll(".product-card").forEach(card => {
    // Evento de clique em cada card
    card.addEventListener("click", () => {
        // Atualiza o conteúdo do modal
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        modalPrice.textContent = card.dataset.price;
        modalImage.src = card.dataset.image;
    
        // Exibe o modal
        modal.classList.remove("hidden");
        // Bloqueia o scroll da página
        document.body.style.overflow = "hidden";
    });
});

// FUNÇÃO PARA FECHAR O MODAL
//---------------------------

function fecharModal() {
    // Esconde o modal
    modal.classList.add("hidden");
    // Libera novamente o scroll da página
    document.body.style.overflow = "auto";
}

// BOTÕES DE FECHAMENTO
//---------------------

// Botão X
closeModal.addEventListener("click", fecharModal);

// Adicionar ao Carrinho
addToCart.addEventListener("click", () => {

    alert(`${modalTitle.textContent} adicionado ao carrinho!`);

});

// Comprar Agora
buyNow.addEventListener("click", () => {

    alert(`Comprando: ${modalTitle.textContent}`);

});

// FECHAR AO CLICAR FORA DO MODAL
//-------------------------------

modal.addEventListener("click", e => {
    //Fecha apenas se clicar no fundo
    if (e.target === modal) {
        fecharModal();
    }
});