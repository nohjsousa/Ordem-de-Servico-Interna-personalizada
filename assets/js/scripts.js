// Aplicar máscaras nos campos com VanillaMasker
function aplicarMascaras() {
  document
    .querySelectorAll(".cpf")
    .forEach((el) => VMasker(el).maskPattern("999.999.999-99"));
  document
    .querySelectorAll(".rg")
    .forEach((el) => VMasker(el).maskPattern("99.999.999-9  "));
  document
    .querySelectorAll(".cep")
    .forEach((el) => VMasker(el).maskPattern("99999-999"));
  document
    .querySelectorAll(".telefone")
    .forEach((el) => VMasker(el).maskPattern("(99) 9999-9999"));
  document
    .querySelectorAll(".whatsapp")
    .forEach((el) => VMasker(el).maskPattern("(99) 99999-9999"));
}

// Buscar endereço com base no CEP
function buscarEndereco(cepValor) {
  const cep = cepValor.replace(/\D/g, "");
  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.erro) {
        document
          .querySelectorAll(".rua")
          .forEach((el) => (el.value = data.logradouro || ""));
        document
          .querySelectorAll(".cidade")
          .forEach((el) => (el.value = data.localidade || ""));
        document
          .querySelectorAll(".uf")
          .forEach((el) => (el.value = data.uf || ""));
      }
    })
    .catch((err) => console.error("Erro ao buscar CEP:", err));
}

// Sincronizar valores entre campos com mesma classe
function sincronizarCamposPorClasse(classe) {
  const campos = document.querySelectorAll(`.${classe}`);
  campos.forEach((campo) => {
    campo.addEventListener("input", () => {
      campos.forEach((outroCampo) => {
        if (outroCampo !== campo) {
          outroCampo.value = campo.value;
        }
      });
    });
  });
}

// Aplicar sincronização em todas as classes relevantes
function sincronizarTodos() {
  const classes = [
    "numero_os",
    "data_os",
    "hora_os",
    "nome",
    "cpf",
    "rg",
    "cep",
    "rua",
    "numero",
    "cidade",
    "uf",
    "telefone",
    "whatsapp",
    "tipoContato",
    "deAcordo",
    "retirado",
    // Dados do Produto
    "produto",
    "marca",
    "cor",
    "modelo",
    "serie",
    "referencia",
    "defeito",
    "acessorios",
    "obs",
  ];
  classes.forEach(sincronizarCamposPorClasse);
}

// Ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  aplicarMascaras();
  sincronizarTodos();

  // CEP - sincroniza e busca endereço automaticamente
  document.querySelectorAll(".cep").forEach((input) => {
    input.addEventListener("blur", (e) => {
      const valor = e.target.value;
      document.querySelectorAll(".cep").forEach((el) => (el.value = valor)); // sincronizar manual
      buscarEndereco(valor);
    });
  });
});

//Ação para SALVAR e EDITAR

document.querySelector(".btn-salvar").addEventListener("click", () => {
  alert("Dados salvos com sucesso!");
  // Aqui você pode adicionar o código para salvar os dados (ex: enviar via fetch ou salvar em localStorage)
});

document.querySelector(".btn-editar").addEventListener("click", () => {
  alert("Modo de edição ativado!");
  // Aqui você pode habilitar edição de campos, caso estejam desabilitados
});
