// Replace 'YOUR_API_KEY' with your actual API key from Alpha Vantage
const apiKey = 'YOUR_API_KEY';

// Function to fetch stock data
async function fetchStockData(symbol) {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    const data = await response.json();
    return data['Global Quote'];
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

// Function to display stock data
function displayStockData(stockData) {
  const stockDataDiv = document.getElementById('stockData');
  stockDataDiv.innerHTML = '';
  if (stockData) {
    const symbol = stockData['01. symbol'];
    const price = stockData['05. price'];
    const change = stockData['09. change'];
    const changePercent = stockData['10. change percent'];

    const symbolPara = document.createElement('p');
    symbolPara.textContent = 'Symbol: ' + symbol;
    stockDataDiv.appendChild(symbolPara);

    const pricePara = document.createElement('p');
    pricePara.textContent = 'Price: ' + price;
    stockDataDiv.appendChild(pricePara);

    const changePara = document.createElement('p');
    changePara.textContent = 'Change: ' + change;
    stockDataDiv.appendChild(changePara);

    const changePercentPara = document.createElement('p');
    changePercentPara.textContent = 'Change Percent: ' + changePercent;
    stockDataDiv.appendChild(changePercentPara);
  } else {
    const errorPara = document.createElement('p');
    errorPara.textContent = 'Stock data not available';
    stockDataDiv.appendChild(errorPara);
  }
}

// Handle form submission
const stockForm = document.getElementById('stockForm');
stockForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const symbolInput = document.getElementById('symbolInput');
  const symbol = symbolInput.value;
  fetchStockData(symbol)
    .then(stockData => displayStockData(stockData));
  symbolInput.value = '';
});
