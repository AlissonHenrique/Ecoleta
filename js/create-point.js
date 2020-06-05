var apiState = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch(apiState)
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;
  const indexOfSelectedIndex = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedIndex].text;

  const apiCiy = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  fetch(apiCiy)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
