import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let delayValue = +delay.value;
  const stepValue = +step.value;
  const amountValue = +amount.value;
  for (let index = 1; index <= amountValue; index += 1) {
    createPromise(index, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
