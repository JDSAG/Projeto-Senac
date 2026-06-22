const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario){
    window.location.href="../login.html";
}

const fotoPerfil = document.getElementById("fotoPerfil");
const nomeUsuario = document.getElementById("nomeUsuario");
const emailUsuario = document.getElementById("emailUsuario");
const trocarFoto = document.getElementById("trocarFoto");
const inputFoto = document.getElementById("inputFoto");

nomeUsuario.textContent = usuario.nome || "Usuário";
emailUsuario.textContent = usuario.email;
fotoPerfil.src = usuario.foto || "../img/user.png";

// trocar foto
trocarFoto.onclick = ()=>{
    inputFoto.click();
}

inputFoto.onchange = ()=>{
    const arquivo = inputFoto.files[0];
    
    if(!arquivo) return;
    const leitor = new FileReader();
    
    leitor.onload = ()=>{
        fotoPerfil.src = leitor.result;
        usuario.foto = leitor.result;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }
    
    leitor.readAsDataURL(arquivo);
}


// sair
document.getElementById("sair").onclick = ()=>{
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuario");
    localStorage.removeItem("logado");
    
    window.location.href="../login.html";
}

// CONFIGURAÇÕES

const avisos = document.getElementById("avisos");
const temabtn = document.getElementById("tema");

// salva preferência
avisos.checked = localStorage.getItem("avisos") === "true";
tema.checked = localStorage.getItem("tema") === "dark";

// avisos
avisos.onchange = ()=>{
    localStorage.setItem("avisos", avisos.checked);
}

// modo escuro
tema.onchange = ()=>{
    if(tema.checked){
        document.body.classList.add("bg-gray-900");
        localStorage.setItem("tema","dark");
    }else{
        document.body.classList.remove("bg-gray-900");
        localStorage.setItem("tema","light");
    }
}


// excluir conta
document.getElementById("excluirConta").onclick = ()=>{
    const confirmar = confirm("Tem certeza que deseja excluir sua conta?");
    
    if(!confirmar) return;
    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    usuarios = usuarios.filter(u => u.email !== usuario.email);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuario");
    localStorage.removeItem("cart");
    
    alert("Conta excluída");
    
    window.location.href="../cadastro.html";
}