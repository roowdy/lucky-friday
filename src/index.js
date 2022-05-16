import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

import './sass/main.scss';

const refs = {
  formEl: document.querySelector('.contacts-form'),
  textEl: document.querySelector('[name="text"]'),
  numberEl: document.querySelector('[name="number"]'),
};

const STORAGE_KEY = 'feedback-form-state';

initForm();

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();

  refs.numberEl.classList.remove('invalid');

  if (refs.textEl.value === '' || refs.numberEl.value === '') {
    Notiflix.Notify.failure('You missed the line');
    return;
  }

  if (refs.numberEl.value.length < 10) {
    Notiflix.Notify.info('Must be at least 10 digits');
    refs.numberEl.classList.add('invalid');
    return;
  }

  Notiflix.Notify.success('Form submitted successfully');
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
});

refs.formEl.addEventListener(
  'input',
  throttle(e => {
    let selectedForm = localStorage.getItem(STORAGE_KEY);
    selectedForm = selectedForm ? JSON.parse(selectedForm) : {};

    selectedForm[e.target.name] = e.target.value;
    let formCurrentTurget = JSON.stringify(selectedForm);
    localStorage.setItem(STORAGE_KEY, formCurrentTurget);
  }),
  1000,
);

function initForm() {
  let saveSelectedForm = localStorage.getItem(STORAGE_KEY);
  if (saveSelectedForm) {
    saveSelectedForm = JSON.parse(saveSelectedForm);
    Object.entries(saveSelectedForm).forEach(([name, value]) => {
      //   selectedForm[name] = value;
      refs.formEl.elements[name].value = value;
    });
  }
}
