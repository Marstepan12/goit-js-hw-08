import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';


const saveFormState = throttle(() => {
  const formData = {
    email: form.email.value,
    message: form.message.value,
  };

  localStorage.setItem(storageKey, JSON.stringify(formData));
}, 500);


const fillFormFields = () => {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    const formData = JSON.parse(storedData);
    form.email.value = formData.email;
    form.message.value = formData.message;
  }
};

form.addEventListener('input', saveFormState);
window.addEventListener('DOMContentLoaded', fillFormFields);


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    email: form.email.value,
    message: form.message.value,
  };

  localStorage.removeItem(storageKey);
  form.email.value = '';
  form.message.value = '';

  console.log('Form submitted:', formData);
});
