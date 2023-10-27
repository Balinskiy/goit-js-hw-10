import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const ref = {
    select: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

// ref.loader.classList.add('is-hidden');
// ref.divCatInfo.classList.add('is-hidden');
// ref.error.classList.add('is-hidden');



fetchBreeds().then(data => {

    options(data);
    ref.select.classList.remove('is-hidden');
}).catch(err => ref.error.classList.remove('is-hidden')).finally(() => ref.loader.classList.add('is-hidden'));

function options(breeds) {
    const optionsMarkup = breeds.map(({ id, name }) => `<option value="${id}">${name}</option>`).join("");
    ref.select.innerHTML = optionsMarkup;
}

ref.select.addEventListener('change', handleSelect);

function handleSelect(event) {
    ref.divCatInfo.innerHTML = "";
    ref.loader.classList.remove('is-hidden');
    ref.error.classList.add('is-hidden');
    fetchCatByBreed(event.target.value).then((data) => catInfoMarkup(data)).catch(err => ref.error.classList.remove('is-hidden')).finally(() => ref.loader.classList.add('is-hidden'));      
}

function catInfoMarkup(cat) {
    const { name, description, temperament } = cat[0].breeds[0];
    const { url } = cat[0];
    const catMarkup = `
          <img src="${url}" alt="${name}" width="300" />
      <div>
        <h1>${name}</h1>
        <p>${description}</p>
        <p><b>Temperament: </b>${temperament}</p>
      </div>
    `
    ref.divCatInfo.insertAdjacentHTML('beforeend', catMarkup);
    ref.divCatInfo.classList.remove('is-hidden');
}

// console.log(fetchCatByBreed());