import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePcr = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let timerId = null;

startBtn.disabled = true;
startBtn.addEventListener('click', timerHandler);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
// console.log(selectedTime);
const currentTime = Date.now();
// console.log(currentTime);
if (selectedTime <= currentTime) {
  Notiflix.Notify.warning('Please choose a date in the future');
  return
}
startBtn.disabled = false;
  },
};

flatpickr (dateTimePcr, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerHandler () {
  startBtn.disabled = true;
  timerId = setInterval(() => {
const finishTime = Date.parse(dateTimePcr.value);
const currentTime = Date.now();
const intervalLength = finishTime - currentTime;
if (intervalLength <= 0) {
  clearInterval(timerId);
  return;
};
const timerData = convertMs(intervalLength);
console.log(timerData);

days.textContent = addLeadingZero(timerData.days);
hours.textContent = addLeadingZero(timerData.hours);
minutes.textContent = addLeadingZero(timerData.minutes);
seconds.textContent = addLeadingZero(timerData.seconds);
  }, 1000);
};

function addLeadingZero(value) {
return value.toString().padStart(2, '0');
}