import { secretKey } from "./config.js";

// Variáveis e seleção de elementos
const apiKey = secretKey;

const cidadeInput = document.querySelector("#cidade-input");
const procurarBtn = document.querySelector("#procurar");

const cidadeElement = document.querySelector("#cidade");
const tempElement = document.querySelector("#temperatura span");
const descElement = document.querySelector("#descricao");
const climaIconElement = document.querySelector("#clima-icon");
const paisElement = document.querySelector("#pais");
const umidadeElement = document.querySelector("#umidade span");
const ventoElement = document.querySelector("#vento span");

const climaContainer = document.querySelector("#clima-data");

// Funções
const getWeatherData = async(cidade) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json();

    return data;
};

const showWeatherData = async (cidade) => {
    const data = await getWeatherData(cidade);

    cidadeElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    climaIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    paisElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`);
    umidadeElement.innerText = `${data.main.humidity}%`;
    ventoElement.innerText = `${data.wind.speed}km/h`;

    climaContainer.classList.remove("hide");
};

// Eventos
procurarBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const cidade = cidadeInput.value;
    showWeatherData(cidade);
});

cidadeInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter"){
        const cidade = e.target.value;
        showWeatherData(cidade);
    }
})