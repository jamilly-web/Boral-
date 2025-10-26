// Inicializa o Parse
Parse.initialize("oVNiE3runwRFXNxRat2fep8FS5TqNYdANRDk3Bto", "2x0x76pgrhSqWODjlxLGDUdUjNih2jh17zpsPN4H"); 
Parse.serverURL = "https://parseapi.back4app.com/";

// Função de validação
function validarCampos(username, email, password) {
  if (!username || !email || !password) {
    alert("⚠️ Todos os campos são obrigatórios!");
    return false;
  }

  // Validação de formato de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ E-mail inválido! Digite um e-mail no formato correto.");
    return false;
  }

  // Validação de tamanho da senha
  if (password.length < 6) {
    alert("⚠️ A senha deve ter pelo menos 6 caracteres.");
    return false;
  }

  return true; // Todos os campos válidos
}

// Função para criar novo usuário
async function createParseUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Valida antes de criar
  if (!validarCampos(username, email, password)) return;

  const user = new Parse.User();
  user.set("username", username);
  user.set("email", email);
  user.set("password", password);

  try {
    const savedUser = await user.signUp(); // signUp() é mais apropriado que save() para novos usuários
    alert(`🥳 Novo usuário criado com sucesso!\n\nObjectId: ${savedUser.id}\nUsername: ${savedUser.get("username")}`);
  } catch (error) {
    if (error.code === 202) {
      alert("⚠️ Nome de usuário já existe.");
    } else if (error.code === 203) {
      alert("⚠️ E-mail já está em uso.");
    } else {
      alert(`❗ Erro ao criar usuário: ${error.message}`);
    }
  }
}

// Adiciona o evento ao botão
document.getElementById("createButton").addEventListener("click", createParseUser);

