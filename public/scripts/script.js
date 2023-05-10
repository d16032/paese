//VARS
const infoBlock = document.getElementById('info');
const submit = document.getElementById('submit');
const country = document.getElementById('country');
const altname = document.getElementById('altname');
const capital = document.getElementById('capital');
const continent = document.getElementById('continent');
const language = document.getElementById('lang');
const currency = document.getElementById('currency');
const area = document.getElementById('area');
const population = document.getElementById('population');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('error');

infoBlock.style.display = 'none';
loader.style.display = 'none';
errorMsg.style.display = 'none';

async function getData() {
    try {
        infoBlock.style.display = 'none';
        errorMsg.style.display = 'none';
        const inputValue = submit.value; // INPUT VALUE
        loader.style.display = 'block';        
        const url = `/country/${inputValue}`; // API endpoint
        const resp = await fetch(url);
        const data = await resp.json();
        country.textContent = data[0]['name']['common']; // Country NAME
        country.textContent += " " + data[0]['flag']; // ADD A FLAG
        altname.textContent = data[0]['altSpellings'][1]; // ALTERNATIVE NAME
        capital.textContent = data[0]['capital']; // CAPITAL
        continent.textContent = data[0]['continents'][0]; // CAPITAL
        area.textContent = data[0]['area'].toLocaleString('us-US'); // AREA
        currency.textContent = Object.values(data[0].currencies)[0].name; // CURRENCY
        currency.textContent += " " + Object.values(data[0].currencies)[0].symbol; // ADD SYMBOL
        population.textContent = data[0]['population'].toLocaleString('us-US'); // POPULATION
        language.textContent = Object.values(data[0].languages)[0]; // LANGUGAE
        infoBlock.style.display = 'block';
        loader.style.display = 'none';        
        //console.log(data[0]);
        //console.log(data[0]['name']['common']);
    } catch (error) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'Ошибка, введите заново';
        loader.style.display = 'none';        
    }
}

submit.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter') {
        getData();
        submit.value = '';
    }
});
