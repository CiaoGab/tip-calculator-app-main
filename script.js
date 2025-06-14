// variables
const billInput = document.getElementById('bill-input');
const customPercentage = document.getElementById('custom-input');
const numOfPeopleInput = document.getElementById('people-Input');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total');
const buttons = document.getElementsByClassName('tipButton');
const errorLabel = document.getElementById('error');
const resetButton = document.getElementById('reset-button');

let tipPercentage = null;
let selectedButton = null; // NEW: track the selected button

// Event Listeners
billInput.addEventListener('input', updateTipAndTotal);
numOfPeopleInput.addEventListener('input', updateTipAndTotal);
resetButton.addEventListener('click', reset);

customPercentage.addEventListener('input', () => {
  tipPercentage = parseFloat(customPercentage.value) || null;
  selectedButton = null; // clear selected button if custom input is used
  updateTipAndTotal();
});

for (const button of buttons) {
  button.addEventListener('click', (e) => updatePercentage(e));
}

// Helper functions
function updatePercentage(e) {
  tipPercentage = parseFloat(e.target.id);
  customPercentage.value = '';
  selectedButton = e.target;
  updateTipAndTotal();
}

function validateInputs() {
  const bill = parseFloat(billInput.value);
  const numOfPeople = parseInt(numOfPeopleInput.value);

  if (isNaN(bill) || bill <= 0) {
    return false;
  }
  if (isNaN(numOfPeople) || numOfPeople <= 0) {
    return false;
  }
  return true;
}

function getTipPercentage() {
  if (tipPercentage !== null) {
    return tipPercentage / 100;
  }
  return 0; // default 0
}

function calculateResults() {
  const bill = parseFloat(billInput.value);
  const numOfPeople = parseInt(numOfPeopleInput.value);
  const tipPercent = getTipPercentage();

  if (numOfPeople <= 0) {
    return { tip: '0.00', total: '0.00' };
  }

  const tip = (bill * tipPercent) / numOfPeople;
  const total = (bill + bill * tipPercent) / numOfPeople;

  return {
    tip: tip.toFixed(2),
    total: total.toFixed(2)
  };
}

function updateResults() {
  const { tip, total } = calculateResults();
  tipAmount.textContent = `$${tip}`;
  totalAmount.textContent = `$${total}`;
}

// Main function
function updateTipAndTotal() {
  if (validateInputs()) {
    errorLabel.style.display = 'none';
    numOfPeopleInput.style.border = 'none';
    updateResults();
  } else {
    handleError();
  }
  // Update active button
  for (const button of buttons) {
    button.classList.remove('active');
  }
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
}
function handleError() {
  const numOfPeople = parseInt(numOfPeopleInput.value);

  if (isNaN(numOfPeople) || numOfPeople <= 0) {
    numOfPeopleInput.style.border = '2px solid #E17052';
    errorLabel.style.display = 'block';
  } else {
    numOfPeopleInput.style.border = 'none';
    errorLabel.style.display = 'none';
  }
  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
}
function reset() {
  billInput.value = '';
  customPercentage.value = '';
  numOfPeopleInput.value = '';
  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
  errorLabel.style.display = 'none';
  numOfPeopleInput.style.border = 'none';

  // Reset tip percentage and selected button
  tipPercentage = null;
  selectedButton = null;

  // Remove active class from all buttons
  for (const button of buttons) {
    button.classList.remove('active');
  }
}