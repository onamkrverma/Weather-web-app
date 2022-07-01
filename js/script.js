const form = document.querySelector('form');
const search = document.querySelector('#search');
const submitBtn = document.querySelector('#submitBtn');
const cityName = document.querySelector('#city');
const temp = document.querySelector('#temp');
const icon = document.querySelector('#icon');
const condition = document.querySelector('#condition');
const box = document.querySelector('.box');
const errorMessage = document.querySelector('.errorMessage');
const realFeal = document.querySelector('#realFeal');
const humidity = document.querySelector('#humidity');
const minTemp = document.querySelector('#minTemp');
const maxTemp = document.querySelector('#maxTemp');
const sunRise = document.querySelector('#sunRise');
const sunSet = document.querySelector('#sunSet');


const apiKey = `f42ddb35334af009304096069141dd4d`;

// const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;





const ShowWeather = async(city) =>{ 
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const resp = await fetch(api);
    const data = await resp.json();
    console.log(data)
    if(data.cod == "404"){
        errorMessage.innerHTML = 'Sorry! city not found';
        return;
    }
    errorMessage.innerHTML = ""
    


    const tempData = Math.round(data.main.temp);
    temp.innerHTML = `${tempData}<sup>℃</sup>`;
    cityName.innerHTML = data.name;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    condition.innerHTML = data.weather[0].main;
    box.style.backgroundImage = `url(https://source.unsplash.com/featured/500x300?weather=${data.weather[0].main})`



    //  box for show addition informations 
    realFeal.innerHTML = `${Math.round(data.main.feels_like)}℃`;
    humidity.innerHTML = `${data.main.humidity}%`;
    minTemp.innerHTML = `${Math.round(data.main.temp_min)}℃`;
    maxTemp.innerHTML = `${Math.round(data.main.temp_max)}℃`;
    
    // sunRise sunSet time getting
    
    let sunRiseTime = new Date(data.sys.sunrise*1000)
    let sunSetTime = new Date(data.sys.sunset*1000)
    // console.log(sunRiseTime.toLocaleString([],{hour:'2-digit',minute:'2-digit'}));
    let realTime1 = sunRiseTime.toLocaleString([],{hour:'2-digit',minute:'2-digit'});
    let realTime2 = sunSetTime.toLocaleString([],{hour:'2-digit',minute:'2-digit'});
    sunRise.innerHTML = realTime1;
    sunSet.innerHTML = realTime2;
}



form.addEventListener('submit', (event) => {
    // console.log(search.value);
    ShowWeather(search.value);
    event.preventDefault();

})
// submitBtn.addEventListener('click', (event) => {
//     //     // console.log(search.value);
//     ShowWeather(search.value);
//     event.preventDefault();
// })

ShowWeather('delhi');

