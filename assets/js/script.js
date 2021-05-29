let countryList = document.querySelector('.country-list');
let searchInput = document.querySelector('#searchInput');
let countryCategory = document.querySelector('#country-category');
let selectedCountry;
async function loadingCountries(){
	let req = await fetch('https://restcountries.eu/rest/v2/all');
	let json = await req.json();
	montarPaises(json);
}

async function loadingRegion(){
	let req = await fetch(`https://restcountries.eu/rest/v2/region/${selectedCountry}`);
	let json = await req.json();
	montarRegiao(json);
}
function montarRegiao(lista){
	countryList.innerHTML = '';
	for(let i in lista){
		countryList.innerHTML += `
		<div class='country'>
			<div class='country-img'>
				<img src='${lista[i].flag}'>
			</div>
		<div class='country-details'>
			<h3>${lista[i].name}</h3>
			<p>Population: ${lista[i].population}</p>
			<p>Region: ${lista[i].region}</p>
			<p>Capital: ${lista[i].capital}</p>
			</div>
		</div>`; 
		document.querySelectorAll('.country')[i].setAttribute('data-key',i);
	}

}
function montarPaises(lista){
		countryList.innerHTML = '';
	for(let i in lista){
		countryList.innerHTML += `
		<div class='country'>
			<div class='country-img'>
				<img src='${lista[i].flag}'>
			</div>
		<div class='country-details'>
			<h3>${lista[i].name}</h3>
			<p>Population: ${lista[i].population}</p>
			<p>Region: ${lista[i].region}</p>
			<p>Capital: ${lista[i].capital}</p>
			</div>
		</div>`; 
		document.querySelectorAll('.country')[i].setAttribute('data-key',i);
	}
}
countryCategory.addEventListener('change',()=>{
	selectedCountry = countryCategory.options[countryCategory.selectedIndex].value;
	switch(selectedCountry){
		case 'All':
		loadingCountries();
		break;
		case 'Africa':
		loadingRegion();
		break;
		case 'Americas':
		loadingRegion();
		break;
		case 'Asia':
		loadingRegion();
		break;
		case 'Europe':
		loadingRegion();
		break;
		case 'Oceania':
		loadingRegion();
		break;
		default:
		alert('escolheu algo valido!');
	}
});
loadingCountries();