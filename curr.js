const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

const dropdown = document.querySelectorAll('.currency');

for (let select of dropdown) {
  for (let currcode in countryList) {
    let noption = document.createElement('option');
    noption.innerText = currcode;
    noption.value = currcode;
    select.append(noption);
  }

  select.addEventListener('change', (e) => {
    updateflag(e.target);
  })
}


updateflag = (e) => {
  let currcode = e.value;
  let country = countryList[currcode];
  let newsrc = `https://flagsapi.com/${country}/shiny/64.png`;
  let img = e.parentElement.querySelector('img');
  img.src = newsrc;
}

let but = document.querySelector("button");


but.addEventListener("click",(e)=>{
  e.preventDefault();

  async function conversion(from,to,val){
    from = from.toLowerCase();
    to = to.toLowerCase();
  
    const url =  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

    const r = await fetch(url);
    const data = await r.json();

    const rate = data[from][to];

    const converted = rate*val;

    let op = document.querySelector('.output');
    op.innerHTML = `${val} ${from.toUpperCase()}  = ${converted} ${to.toUpperCase()}`;
  }

  let fr = document.querySelector('.from .currency');
  let toc = document.querySelector('.to .currency');

  let f = fr.value;
  let t = toc.value;
  let ip = document.querySelector('input[type="number"]');
  let amount = Number(ip.value);
  conversion(f, t, amount);
})
