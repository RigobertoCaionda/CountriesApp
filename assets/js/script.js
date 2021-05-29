let countryList = document.querySelector('.country-list');
async function loadingCountries(){
	let req = await fetch('https://restcountries.eu/rest/v2/all');
	let json = await req.json();
	montarPaises(json);
}

function montarPaises(lista){
		lista.map((item, index)=>{
			let pais = document.querySelector('.country').cloneNode(true);
			document.querySelector('.country').setAttribute('data-key',index);
			pais.querySelector('.country-img img').src = lista[index].flag;
			pais.querySelector('.country-details h3').innerHTML = lista[index].name;
			pais.querySelectorAll('.country-details p')[0].innerHTML = `Population: ${lista[index].population}`;
			pais.querySelectorAll('.country-details p')[1].innerHTML = `Region: ${lista[index].region}`;
			pais.querySelectorAll('.country-details p')[2].innerHTML = `Capital: ${lista[index].capital}`;
			countryList.append(pais);
		});
		console.log(lista);
}
loadingCountries();