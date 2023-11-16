
const getWeather = document.querySelector("#getWeather")
const temperature = document.querySelector("#temperature")
const locacont = document.querySelector("#location")
const forecastcont = document.querySelector("#forecast")
const conditioncont = document.querySelector("#condition")
const input = document.querySelector("#cityName")
const inp = document.querySelector('.inp')
const err = document.querySelector(".err")
const threedays = document.querySelector(".threedays")


function getCityName() {
    const cityName = input.value;
    return cityName
}
async function getforecast() {
    const cityName = getCityName()
    try{
    const weatherresponce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=de514e80fdd843f89a2175852230811&q=${cityName}&days=3`, {
        mode: 'cors'
      });
      document.getElementById('loading').style.display = 'none';
    const weatherdata = await weatherresponce.json();
    console.log(weatherdata)
    if (weatherdata.current){
      const currTemp = weatherdata.current.temp_c
      const currFeels = weatherdata.current.feelslike_c
      const currHumidity = weatherdata.current.humidity
      const currentCondition = weatherdata.current.condition.text
      const iconImage = weatherdata.current.condition.icon
      const country = weatherdata.location.country
      const name = weatherdata.location.name
      const region = weatherdata.location.region
      const threedayForecast = weatherdata.forecast.forecastday
      displayForecast(
        country,
        name,
        region,
        iconImage,
        currentCondition,
        currTemp,currFeels,
        currHumidity)
        displayThreeDays(threedayForecast)
    }else if
    (weatherdata.error.code === 1006){
        const msg = document.createElement("P")
        err.innerHTML=''
        locacont.innerHTML=""
        forecastcont.innerHTML=""
        conditioncont.innerHTML=""
        msg.innerText=weatherdata.error.message
        err.appendChild(msg)

    console.log(weatherdata.error.message)
}
}catch(error){
        console.log(error)
    }
}

function handleClickOrEnter(event) {
    if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
        try {
            getforecast()
            threedays.innerHTML=''
            err.innerHTML=''
    input.value=""
    locacont.innerHTML=""
    forecastcont.innerHTML=""
    conditioncont.innerHTML=""
            document.getElementById('loading').style.display = 'block';
        }catch(error){
            console.log(error)
        }
    }
}

getWeather.addEventListener('click', handleClickOrEnter);
input.addEventListener('keypress', handleClickOrEnter);
input.addEventListener("input", ()=>{
    err.innerHTML=''
}
)


const displayForecast = (country,name,region,ico,condi,temp,feels,humid) => {
    
    const loca = document.createElement("p")
    loca.innerText=`${name}, ${country}`
    loca.setAttribute("id","location")
    locacont.appendChild(loca)
    const icon = document.createElement('img')
    icon.src=ico
    conditioncont.appendChild(icon)
    const temper = document.createElement("p")
    temper.innerText= `${temp}°`
    conditioncont.appendChild(temper)
    const condit = document.createElement("p")
    condit.innerText = `${condi}`
    forecastcont.appendChild(condit)
  
    const feel = document.createElement("p")
    feel.innerText=`Feels like ${feels}°`
    forecastcont.appendChild(feel)
    const humidit = document.createElement("p")
    humidit.innerText= `Humidity ${humid}%`
    forecastcont.appendChild(humidit)

}

const displayThreeDays = (data) => {
    console.log(data)
    threedays.innerHTML=''
    for(let i=0; i<3; i++){
        const ico = document.createElement("img")
        ico.src=data[i].day.condition.icon
        const cont = document.createElement("div")
        cont.setAttribute("class","threedayscont")
        threedays.appendChild(cont)
        cont.appendChild(ico)
        const temp = document.createElement("p")
        const min = Math.round(data[i].day.mintemp_c)
        const max = Math.round(data[i].day.maxtemp_c)
        temp.style.whiteSpace = "pre";
        temp.innerText=`${min}°   ${max}°`
        cont.appendChild(temp)
        const humdata = data[i].day.avghumidity
        const hum = document.createElement("p")
        hum.innerHTML=`Humidity   ${humdata}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Humidity</title><path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" /></svg>`
        cont.appendChild(hum)
        const rainchance = data[i].day.daily_chance_of_rain
        const rain = document.createElement("p")
        rain.innerHTML = `Chance of rain   ${rainchance} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cloud-percent</title><path d="M21.86 12.5C21.1 11.63 20.15 11.13 19 11C19 9.05 18.32 7.4 16.96 6.04C15.6 4.68 13.95 4 12 4C10.42 4 9 4.47 7.75 5.43S5.67 7.62 5.25 9.15C4 9.43 2.96 10.08 2.17 11.1S1 13.28 1 14.58C1 16.09 1.54 17.38 2.61 18.43C3.69 19.5 5 20 6.5 20H18.5C19.75 20 20.81 19.56 21.69 18.69C22.56 17.81 23 16.75 23 15.5C23 14.35 22.62 13.35 21.86 12.5M9.45 9.03C10.23 9.03 10.87 9.67 10.87 10.45C10.87 11.23 10.23 11.87 9.45 11.87C8.67 11.87 8.03 11.23 8.03 10.45C8.03 9.67 8.67 9.03 9.45 9.03M14.55 16.97C13.77 16.97 13.13 16.33 13.13 15.55C13.13 14.77 13.77 14.13 14.55 14.13C15.33 14.13 15.97 14.77 15.97 15.55C15.97 16.33 15.33 16.97 14.55 16.97M9.2 17L8 15.8L14.8 9L16 10.2L9.2 17Z" /></svg>`
        cont.appendChild(rain)
    }
    
  
}

