const amountInput = document.getElementById('amount');
const toCurrency = document.getElementById('to-currency');
const convertButton = document.getElementById('convert-button');
const conversionResult = document.getElementById('conversion-result');

// Function to fetch exchange rates using an API (replace with your preferred API)
async function fetchExchangeRates() {
  const baseCurrency = 'INR'; // Set INR as the base currency
  const response = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
  const data = await response.json();
  return data.rates;
}

function convertCurrency() {
  const amount = amountInput.value;
  const to = toCurrency.value;

  fetchExchangeRates()
    .then(rates => {
      if (!rates[to]) {
        conversionResult.textContent = 'Invalid currency selection.';
        return;
      }

      const conversionRate = rates[to];
      const convertedAmount = amount * conversionRate;

      conversionResult.textContent = `${amount} ₹ is equivalent to approximately ${convertedAmount.toFixed(2)} ${to}.`;
    })
    .catch(error => {
      conversionResult.textContent = 'Error fetching exchange rates.';
      console.error(error);
    });
}

convertButton.addEventListener('click', convertCurrency);
