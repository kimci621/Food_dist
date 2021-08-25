import {PostData} from './services/services';

function modal({
  buttonForModal,
  contentofModal,
  closeButtonInModal
}) {
  // модальное окно
  let modalBtn = buttonForModal;
  let modalContent = contentofModal;
  let modalClose = closeButtonInModal;

  // функция убирающая модальное окно
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  // активное модальное окно
  function openModal(modal = modalContent) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(TimerModal); //обнуление  таймера если модальное окно было активировано ранее
  }

  modalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  // закрытие при клике на фон, x
  modalContent.addEventListener('click', (e) => {
    if (e.target == modalContent || e.target == modalClose) {
      closeModal(modalContent);
    }
  });
  // закрытие при активном окне с Esc
  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modalContent.style.display == 'block') {
      closeModal(modalContent);
    }
  });
  //timer на модальное окно
  let TimerModal = setTimeout(openModal, 10000);
  //появление модального окна при скролле
  function showModalInEnd() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalInEnd);
    }
  }
  window.addEventListener('scroll', showModalInEnd);

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      //Сообщение для пользователя о статусе
      let statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `;
      form.insertAdjacentElement('afterend', statusMessage);
      // Запрос
      /*
      Объекты FormData позволяют вам легко конструировать наборы пар ключ-значение, 
      которые в дальнейшем можно отправить с помощью метода send().
      */
      const formData = new FormData(form);
      //Каждая formData->obj->formJSON->array->obj->JSON
      const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
      //formData() в JSON методом forEach
      // let PersonalInfo = {};
      // formData.forEach(function (value, key) {
      //   PersonalInfo[key] = value;
      // });
      // Запрос
      PostData('http://localhost:3000/requests', formJSON)
        .then(resolve => {
          console.log('POST ok');
          //модальное окно с успехом
          SuccesModal(messages.success);
          statusMessage.remove();
        }).catch(() => {
          statusMessage.textContent = messages.error;
          form.append(statusMessage);
        }).finally(() => {
          form.reset();
        });
    });
  }

  //модальное окно с успехом
  function SuccesModal(message) {
    document.querySelector('.modal__content').classList.add('hide');
    //Родитель модального окна .modal
    openModal();

    let newModal = document.createElement('div');
    newModal.classList.add('modal__content');
    newModal.innerHTML = `<div class="modal__title">${message}</div>`;
    document.querySelector('.modal__dialog').append(newModal);
    setTimeout(() => {
      newModal.remove();
      closeModal(modalContent);
      document.querySelector('.modal__content').classList.remove('hide');
    }, 3000);
  }
  // POST forms
  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро с вами свяжемся!',
    error: 'Что-то пошло не так...',
  };
  //перебор всех форм в документе
  forms.forEach((item) => {
    bindPostData(item);
  });
}

export default modal;