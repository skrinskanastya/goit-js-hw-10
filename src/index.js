import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => {
    console.log(data);

    const option = data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    );
    breedSelect.innerHTML = option;
    Loading.remove();
  })
  .catch(() => {
    Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
  });

breedSelect.addEventListener('change', e => {
  e.preventDefault();
  Loading.standard('Loading data, please wait...');
  const breedSelectId = breedSelect.value;
  fetchCatByBreed(breedSelectId)
    .then(cat => {
      Loading.remove();
      const info = `
		<div class='thumb-pic'><img src="${cat.url}" alt="${cat.id}" width=400></div>
		<div class='thumb'>
		<h2>${cat.breeds[0].name}</h2>
		<p>${cat.breeds[0].description}</p>
		<p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
		</div>`;
      catInfo.innerHTML = info;
    })
    .catch(() => {
      Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    });
});
