import throttle from "lodash.throttle";

const LOCAL_STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const textarea = document.querySelector('[name="message"]');

// створення пустого обєкту для передачі данних інтпутів у вигляді властивостей
let objectForm = {};

// виклик функції, що перевіряє наявність данних в localStorage 
// після перезавантаження сторінки
checkForm ();

// ставимо два слухача на форму. Один на інпут, другий на сабміт
form.addEventListener('input',throttle(onInput, 500));
form.addEventListener('submit',onSubmit);

// колбек функція як параметр прослуховування інпуту
// створюємо ключі обєкту та передаємо їх властивgitості
// записуємо обєкт з ключасми в localStorage
function onInput (eve) {
    eve.preventDefault();

    objectForm.mail = email.value;
    objectForm.msg = textarea.value;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(objectForm)); 
}

// колбек функція як параметр прослуховування сабміту
// видаляємо дані з localStorage
function onSubmit (e) {
    e.preventDefault();
    e.target.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// функція, що перевіряє наявність данних в localStorage
function checkForm () {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (savedData){
       console.log(savedData);
        email.value = savedData.mail;
        textarea.value = savedData.msg;
    }
}