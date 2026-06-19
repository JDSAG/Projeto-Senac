const form = document.querySelector("#cadastroForm");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;
    const confirmar = document.querySelector("#confirmarSenha").value;
    const mensagem = document.querySelector("#mensagem");

    //limpa mensagem

    mensagem.innerHTML = "";

    // valida email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailValido.test(email)){
            mensagem.innerHTML = "Digite um email válido";

            mensagem.className = "text-red-500";
            return;
        }

    // valida senha
    if(senha.length < 6){
        mensagem.innerHTML = "A senha precisa ter no mínimo 6 caracteres";

        mensagem.className = "text-red-500";
        return;
        }

        // compara senhas
    if(senha !== confirmar){
        mensagem.innerHTML = "As senhas não coincidem";

        mensagem.className = "text-red-500";
        return;
    }

    // pega usuários salvos
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verifica email existente
    const existe = usuarios.some(usuario => usuario.email === email);

    if(existe){
        mensagem.innerHTML = "Esse email já está cadastrado";
        mensagem.className = "text-red-500";
        return;
    }

    // cria usuário
    usuarios.push({
        email,
        senha
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagem.innerHTML = "Cadastro realizado com sucesso!";
    mensagem.className ="text-green-500";

    setTimeout(()=>{
        localStorage.setItem("logado", "true");
        window.location.href = "index.html";
    },1500);
});