const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
startButton.addEventListener('click', startHendler);
stopButton.addEventListener('click', stopHandler);
let timerId = null; 

function startHendler () {
startButton.disabled = true;
timerId = setInterval( () => {
  const currentColor = getRandomHexColor();
  document.body.style.backgroundColor = currentColor;
 }, 1000);
};

function stopHandler () {
  startButton.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}