import throttle from 'lodash.throttle';

//const formEl = document.querySelector(`.feedback-form`);

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('input[name=email]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
let localValue;

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

onCheckForm();

function onFormInput(e) {
  //console.log(e.target.value);
  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({
      email: refs.form.elements.email.value,
      message: refs.form.elements.message.value,
    })
  );
}

function onFormSubmit(e) {
  e.preventDefault();
  localValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  //console.log(localValue);
  const {
    elements: { email, message }
  } = e.currentTarget;
  //console.log("email: " + email.value, "message: " + message.value);
  console.log(localValue);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  e.target.reset();
}

function onCheckForm() {
  localValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  //console.log(localValue);
  if (localValue) {
    refs.form.elements.email.value = localValue.email;
    refs.form.elements.message.value = localValue.message;
  }
}
