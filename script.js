// Matrix effect script
const canvas = document.querySelector('.matrix');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = Array(256).join("DS").split("");
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(0);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00f376';
  ctx.font = fontSize + 'px monospace';

  drops.forEach((y, x) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    if (y * fontSize > height && Math.random() > 0.975) {
      drops[x] = 0;
    } else {
      drops[x]++;
    }
  });
}

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

setInterval(drawMatrix, 33);

// Variables for elements
const dsLetter = document.getElementById('central-ds');
const mainContent = document.getElementById('main-content');
const scrollDownArrow = document.querySelector('.scroll-down');
let dsScale = 1;
let rotationX = 0;
let rotationY = 0;

// Function to update DS letters transform
function updateDSTransform() {
  dsLetter.style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${dsScale})`;
}

// Rotate central DS letters according to cursor position
document.addEventListener('mousemove', function (e) {
  const x = e.clientX;
  const y = e.clientY;

  // Calculate rotation based on cursor position
  rotationX = (window.innerHeight / 2 - y) / 20;
  rotationY = (x - window.innerWidth / 2) / 20;

  updateDSTransform();
});

// Transform DS and scroll-down arrow on scroll
window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const triggerPoint = windowHeight * 0.5; // Adjust trigger point as needed

  // Calculate scale for DS letters
  const maxScale = 1;
  const minScale = 0.5;
  dsScale = Math.max(minScale, maxScale - (scrollY / (windowHeight * 2)));

  updateDSTransform();

  // Fade out DS letters
  const dsOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.8)));
  dsLetter.style.opacity = dsOpacity;

  // Adjust scroll-down arrow size and opacity
  const arrowMaxScale = 1;
  const arrowMinScale = 0.2;
  const arrowScale = Math.max(arrowMinScale, arrowMaxScale - (scrollY / (windowHeight * 1.5)));
  const arrowOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.7)));

  scrollDownArrow.style.transform = `translateX(-50%) scale(${arrowScale})`;
  scrollDownArrow.style.opacity = arrowOpacity;

  // Hide arrow completely when opacity reaches 0
  if (arrowOpacity <= 0) {
    scrollDownArrow.style.display = 'none';
  } else {
    scrollDownArrow.style.display = 'block';
  }

  // Show main content when scrolled past trigger point
  if (scrollY > triggerPoint) {
    mainContent.classList.add('visible');
  } else {
    mainContent.classList.remove('visible');
  }
});

// Invert colors on central DS periodically
setInterval(() => {
  dsLetter.classList.toggle('invert');
}, 1000);

// Interface selector functionality
const swapSelector = document.getElementById('swap-selector');
const buySelector = document.getElementById('buy-selector');
const swapSection = document.getElementById('swap-section');
const buySection = document.getElementById('buy-section');

swapSelector.addEventListener('click', function () {
  swapSelector.classList.add('active');
  buySelector.classList.remove('active');
  swapSection.style.display = 'block';
  buySection.style.display = 'none';
});

buySelector.addEventListener('click', function () {
  buySelector.classList.add('active');
  swapSelector.classList.remove('active');
  swapSection.style.display = 'none';
  buySection.style.display = 'block';
});