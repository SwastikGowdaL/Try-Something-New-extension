
const api = 'http://www.boredapi.com/api/activity/';
const api2 = 'https://app.zenserp.com/api/v2/search?apikey=06a2ac20-7f45-11eb-af38-2d7cbc15d400';
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const newtext = document.querySelector('.new-text');
const img2=document.querySelector('.img2');

results.style.display = 'none';
loading.style.display = 'none';
errors.textContent = '';


const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const prev = [];
let nprev = 0;

const past15 = (rdata) => {
  if (prev.includes(rdata) == true) {
    return 1;
  }
  if (nprev > 7) {
    nprev = 0;
    while (prev.length) {
      prev.pop();
    }
  }
  nprev += 1;
  prev.push(rdata);
  return 0;
};



let partici;
let rdata;

const butt = document.getElementById('newtext');



const part = async (part1) => {
  loading.style.display = 'block';
  butt.innerHTML = '';
  img2.style.visibility='hidden';
  try {
    let response = await axios.get(`${api}?participants=${part1}`);
    if (response.data.message === 'Bored API') {
      throw error;
    }
    rdata = response.data.activity;
   
    let n = past15(rdata);
    console.log(n);
    while (n) {
      response = await axios.get(`${api}?participants=${part1}`);
      rdata = response.data.activity;
      console.log(rdata);
      n = past15(rdata);
      console.log(n);
      part1 = randomNumber(1, 5);
    }
    let rimg=randomNumber(0,10);
    let rdata2=rdata.replace(/ /g, "+");
    let response2 = await axios.get(`${api2}&q=${rdata2}&tbm=isch`);
    let img2data=response2.data.image_results[rimg].sourceUrl;
    // document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
    document.getElementById("img2").setAttribute("src", img2data);
    // document.getElementsByClassName("img2").src = img2data;
    console.log(response.data.activity);
    console.log(img2data);
    loading.style.display = 'none';

    img2.style.visibility='visible';
    await new Promise(resolve => setTimeout(resolve, 2000)); // 3 sec
    document.getElementById('newtext').innerHTML = response.data.activity;
    let a1=`https://www.google.com/search?q=${rdata}`;
    let a2= `https://www.youtube.com/results?search_query=${rdata}`;
    document.getElementById("a1").setAttribute("href", a1);
    document.getElementById("a2").setAttribute("href", a2);
    results.style.display = 'block';
  } catch (error) {}
};


partici = randomNumber(1, 5);
part(partici);
console.log(partici);

const x = document.getElementById('brobtn');
x.addEventListener('click', myFunction);

function myFunction() {
  partici = randomNumber(1, 5);
  part(partici);
  console.log(partici);
}

