var apiState = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch(apiState)
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.nome}">${state.nome}</option>`;
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
  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;
  fetch(apiCiy)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemToColeta = document.querySelectorAll(".items-grid li");

for (const item of itemToColeta) {
  item.addEventListener("click", handleSelectedItem);
}
const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => {
    return item == itemId;
  });

  if (alreadySelected >= 0) {
    const filterItems = selectedItems.filter((item) => {
      return item != itemId;
    });
    selectedItems = filterItems;
  } else {
    selectedItems.push(itemId);
  }
  collectedItems.value = selectedItems;
}
