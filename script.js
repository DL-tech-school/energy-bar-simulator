// ===== script.js =====

// Зберігаємо поточний крок
let currentStep = 0;

// Зберігаємо дані користувача
const gameData = {
  bar: null,
  components: {
    raw: 0,
    packaging: 0,
    design: 0,
    marketing: 0
  },
  cost: 0,
  markup: 0,
  price: 0,
  profit: 0
};

// Масив всіх кроків
const screens = document.querySelectorAll('.screen');

// ===== Перехід між екранами =====
function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  screens[index].classList.add('active');
  currentStep = index;
}

// ===== Крок 0: Старт =====
document.getElementById('start-btn').addEventListener('click', () => {
  showScreen(1);
});

// ===== Крок 1: Вибір батончика =====
document.querySelectorAll('#choose-bar .card').forEach(card => {
  card.addEventListener('click', () => {
    // Зберігаємо вибір
    gameData.bar = card.dataset.bar;
    // Підсвітка обраного
    document.querySelectorAll('#choose-bar .card').forEach(c => c.style.borderColor = '#333');
    card.style.borderColor = '#A3FF00';
  });
});

document.getElementById('bar-next-btn').addEventListener('click', () => {
  if (!gameData.bar) {
    alert('Оберіть батончик щоб продовжити');
    return;
  }
  showScreen(2);
});

// ===== Крок 2: Створи свій продукт =====
document.querySelectorAll('#create-product .option-column button').forEach(button => {
  button.addEventListener('click', () => {
    const column = button.parentElement.querySelector('h3').innerText.toLowerCase();
    // Записуємо значення у відповідну компоненту
    if (column.includes('сировина')) gameData.components.raw = parseFloat(button.dataset.value);
    if (column.includes('упаковка')) gameData.components.packaging = parseFloat(button.dataset.value);
    if (column.includes('дизайн')) gameData.components.design = parseFloat(button.dataset.value);
    if (column.includes('реклама')) gameData.components.marketing = parseFloat(button.dataset.value);
    // Підсвітка кнопки
    button.parentElement.querySelectorAll('button').forEach(b => b.style.borderColor = '#333');
    button.style.borderColor = '#A3FF00';
  });
});

document.getElementById('product-next-btn').addEventListener('click', () => {
  showScreen(3);
});

// ===== Крок 3: Введення собівартості =====
document.getElementById('check-cost-btn').addEventListener('click', () => {
  const userCost = parseFloat(document.getElementById('cost-input').value);
  const correctCost = gameData.components.raw + gameData.components.packaging + gameData.components.design + gameData.components.marketing;

  if (userCost === correctCost) {
    gameData.cost = userCost;
    document.getElementById('cost-feedback').innerText = 'Чудово! Вірно.';
    showScreen(4);
  } else {
    document.getElementById('cost-feedback').innerText = 'Не вірно, спробуй ще раз.';
  }
});

// ===== Крок 4: Вибір націнки =====
document.querySelectorAll('#markup .markup-options button').forEach(button => {
  button.addEventListener('click', () => {
    gameData.markup = parseFloat(button.dataset.markup);
    // Підсвітка кнопки
    document.querySelectorAll('#markup .markup-options button').forEach(b => b.style.borderColor = '#333');
    button.style.borderColor = '#A3FF00';
  });
});

document.getElementById('check-price-btn').addEventListener('click', () => {
  const userPrice = parseFloat(document.getElementById('price-input').value);
  const correctPrice = gameData.cost * (1 + gameData.markup);

  if (userPrice === correctPrice) {
    gameData.price = userPrice;
    document.getElementById('price-feedback').innerText = 'Вірно! Ринкова ціна обчислена.';
    showScreen(5);
  } else {
    document.getElementById('price-feedback').innerText = 'Невірно, обрахуй ще раз.';
  }
});

// ===== Крок 5: Події на ринку =====
const eventText = document.getElementById('event-text');
const profitInput = document.getElementById('profit-input');
const profitFeedback = document.getElementById('profit-feedback');

document.getElementById('check-profit-btn').addEventListener('click', () => {
  const userProfit = parseFloat(profitInput.value);
  const initialUnits = 1000; // кількість продажів
  const eventEffect = -0.15; // -15% продажів
  const correctProfit = ((initialUnits * (1 + eventEffect)) * gameData.price) - (initialUnits * gameData.cost);

  if (userProfit === correctProfit) {
    gameData.profit = userProfit;
    profitFeedback.innerText = 'Вірно!';
    showScreen(6); // Переходимо до підсумку
    displaySummary();
  } else {
    profitFeedback.innerText = 'Не вірно, спробуй ще раз.';
  }
});

// ===== Крок 6: Підсумок =====
function displaySummary() {
  document.getElementById('final-profit').innerText = `Фінальний прибуток: ${gameData.profit.toFixed(2)} грн`;
  document.getElementById('final-strategy').innerText = `Твоя стратегія: ${gameData.bar}`;
}

// ===== Кнопка “Пройти ще раз” =====
document.getElementById('restart-btn').addEventListener('click', () => {
  location.reload();
});
