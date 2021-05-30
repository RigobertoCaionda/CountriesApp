let countryList = document.querySelector('.country-list');
let searchInput = document.querySelector('#searchInput');
let countryCategory = document.querySelector('#country-category');
let selectedCountry;
let country = document.querySelectorAll('.country');
let loadingBar = document.querySelector('.loadingBar');
let seekableArea = document.querySelector('.seekable-area');
let modalImage = document.querySelector('.modal-image');
let modal = document.querySelector('.modal');
let firstH2 = document.querySelector('.first h2');
let firstP = document.querySelectorAll('.first p span');
let secondP = document.querySelectorAll('.second p span');
let textSecondGroup = document.querySelector('.text-second-group');
let backButton = document.querySelector('.back-button');
let clickedItemParentAttribute;
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
async function matchedCountries(){
	let req = await fetch(`https://restcountries.eu/rest/v2/name/${searchInput.value}`);
	let json = await req.json();
	montarPais(json);
}
async function loadingModal(){
	let req = await fetch(`https://restcountries.eu/rest/v2/alpha/${clickedItemParentAttribute}`);
	let json = await req.json();
	montarModal(json);
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
		document.querySelectorAll('.country')[i].setAttribute('data-key', lista[i].alpha2Code);
	}
	country = document.querySelectorAll('.country');
	country.forEach((item)=>{
		item.addEventListener('click',(e)=>{
			clickedItemParentAttribute = e.target.closest('.country').getAttribute('data-key');
			seekableArea.style.display = 'none';
			countryList.style.display = 'none';
			loadingBar.style.display = 'block';
			loadingModal();
		});
	});

}
function montarModal(lista){
	loadingBar.style.display = 'none';
	modal.style.display = 'block';
	modalImage.querySelector('img').src = lista.flag;
	firstH2.innerHTML = lista.name;
	firstP[0].innerHTML = lista.population;
	firstP[1].innerHTML = lista.nativeName;
	firstP[2].innerHTML = lista.region;
	firstP[3].innerHTML = lista.subregion;
	firstP[4].innerHTML = lista.capital;
	secondP[0].innerHTML = lista.topLevelDomain;
	secondP[1].innerHTML = lista.currencies[0].name;
	secondP[2].innerHTML = lista.languages[0].name;
	for(let i = 0; i < lista.borders.length;i++){
		let mod = document.querySelector('.border-country').cloneNode(true);
		mod.innerHTML = lista.borders[i];
		textSecondGroup.append(mod);
	}
	backButton.addEventListener('click',()=>{
		modal.style.display = 'none';
		seekableArea.style.display = 'flex';
		countryList.style.display = 'flex';
		loadingCountries();
	});
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
		//document.querySelectorAll('.country')[i].setAttribute('data-key',i);
		document.querySelectorAll('.country')[i].setAttribute('data-key', lista[i].alpha2Code);
	}
	country = document.querySelectorAll('.country');
	country.forEach((item)=>{
		item.addEventListener('click',(e)=>{
			clickedItemParentAttribute = e.target.closest('.country').getAttribute('data-key');
			seekableArea.style.display = 'none';
			countryList.style.display = 'none';
			loadingBar.style.display = 'block';
			loadingModal();
		});
	});
}

function montarPais(lista){
	countryList.innerHTML = '';
	for(let i in lista){
		if(lista[i].name !== undefined){
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
		</div>
		`;
		document.querySelectorAll('.country')[i].setAttribute('data-key', lista[i].alpha2Code);
	}else{
		countryList.innerHTML = '';
	}
	}
	country = document.querySelectorAll('.country');
	country.forEach((item)=>{
		item.addEventListener('click',(e)=>{
			clickedItemParentAttribute = e.target.closest('.country').getAttribute('data-key');
			seekableArea.style.display = 'none';
			countryList.style.display = 'none';
			loadingBar.style.display = 'block';
			searchInput.value = '';
			loadingModal();
		});
	});
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
searchInput.addEventListener('keyup',(event)=>{
	if(searchInput.value !== ''){
		matchedCountries();
	}else{
		loadingCountries();
	}
});
loadingCountries();