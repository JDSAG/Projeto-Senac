import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase.js";

/* == GOOGLE LOGIN == */
const provider = new GoogleAuthProvider();
const googleLogin = document.querySelector("#googleLogin");

if (googleLogin) {
    googleLogin.addEventListener("click", async () => {
        try {
            const resultado = await signInWithPopup(auth, provider);

            const usuario = {
                nome: resultado.user.displayName,
                email: resultado.user.email,
                foto: resultado.user.photoURL,
                senha: null,
                provider: "google"
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

            window.location.href = "index.html";

        } catch (error) {
            console.log(error);
            alert("Erro no login com Google: " + error.message);
        }
    });
}

// LOGIN
const form = document.querySelector("#loginForm");
    
form.addEventListener("submit", (e)=>{
    e.preventDefault();
        const email = document.querySelector("#email").value;
        const senha = document.querySelector("#senha").value;
        const erro = document.querySelector("#erro");

        //limpa mensagem
        erro.innerHTML = "";

        //valida email vazio
        if(email === ""){
            erro.innerHTML = "Digite seu email";
            erro.className = "text-red-500 mb-3";
            
            return;
        }

        //valida formato email
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailValido.test(email)){
            erro.innerHTML = "Digite um email válido";
            erro.className = "text-red-500 mb-3";
            
            return;
        }

        // valida senha
        if(senha === ""){
            erro.innerHTML = "Digite sua senha";
            erro.className = "text-red-500 mb-3";

            return;
        }

        if(senha.length < 6){
            erro.innerHTML = "A senha deve ter no mínimo 6 caracteres";
            erro.className = "text-red-500 mb-3";

            return;
        }

        //busca usuários cadastrados
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuario = usuarios.find(
            user => user.email === email && user.senha === senha
        );

        if(usuario){
            localStorage.setItem("logado", "true");
            localStorage.setItem("usuario", usuario.email);

            erro.innerHTML = "Login realizado com sucesso!";
            erro.className = "text-green-500 mb-3";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }else{
            erro.innerHTML = "Email ou senha incorretos";
            erro.className = "text-red-500 mb-3"
        }
});