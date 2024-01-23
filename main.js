
document.addEventListener('DOMContentLoaded', function () {
    const APIKEY = 'fca_live_bAbL9ecNbBTnAAeVX3c76rTtxsqLnF8JiIZ5YQK5'
    let rates;
    let selectOptions = [];
    const fromSelectElement = document.getElementById('select-from');
    const toSelectElement = document.getElementById('select-to');
    const fromInputElement = document.getElementById('amount')
    const toInputElement = document.getElementById('toAmount')
    const convertElement = document.getElementById('convert')
    const fetchExchangeRates = async () => {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${APIKEY}`);
        rates = await response.json();

        console.log("=====rates====", rates.data)
        const keys = Object.keys(rates.data);

        selectOptions = keys.map(key => ({ label: key, value: rates.data[key] }));

        console.log("======selectoptions====", selectOptions);

        let optionsString = '<option value="">Select a currency</option>';

        selectOptions.forEach(option => {
            optionsString += `<option value="${option.value}">${option.label}</option>`
        })

        console.log("====optionsString====", optionsString)

        fromSelectElement.innerHTML = optionsString;
        toSelectElement.innerHTML = optionsString;



    }
    fetchExchangeRates();

    convertElement.addEventListener('click', e => {
        e.preventDefault();

        const currencyFrom = fromSelectElement.value;
        const currencyTo = toSelectElement.value;
        const currencyFromAmount = fromInputElement.value;

        console.log("=====data", { currencyFrom, currencyTo, currencyFromAmount })

        const convertedValue = (Number(currencyFromAmount) * Number(currencyTo)) / Number(currencyFrom);

        toInputElement.value = convertedValue.toFixed(2);

    })




});

