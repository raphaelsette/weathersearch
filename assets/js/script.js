// o arquivo da api key foi separado para não ficar público no github
import { secretKey } from "./key_openweathermap.js";

// variáveis e seleção de elementos
const apiKey = secretKey;
let codigo_erro;
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

// evento que chama a função showWeatherData quando clica no botão de buscar
procurarBtn.addEventListener("click", (e) => {
     if (!cidadeInput.value) {   
        Swal.fire({
            icon: "error",
            text: "Informe uma cidade.",
            confirmButtonColor: "#3085d6"
        });
    } else {
        e.preventDefault()
        const cidade = cidadeInput.value;
        showWeatherData(cidade);
    }
});

// evento que chama a função showWeatherData quando pressiona no teclado o "enter"
cidadeInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter"){
        if (!cidadeInput.value) {   
            Swal.fire({
                icon: "error",
                text: "Informe uma cidade.",
                confirmButtonColor: "#3085d6"
            });
        } else {
            const cidade = e.target.value;
            showWeatherData(cidade);
        }
    }
})

// função que chama a função getWeatherData e preenche as informações recebidas do json
const showWeatherData = async (cidade) => {
    try {
        const data = await getWeatherData(cidade);

        cidadeElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        climaIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        paisElement.setAttribute("src", `https://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys.country}.svg`);
        umidadeElement.innerText = `${data.main.humidity}%`;
        ventoElement.innerText = `${data.wind.speed}km/h`;

        climaContainer.classList.remove("hide");
        } catch (error) {
            if (codigo_erro == 400 || codigo_erro == 404){
                Swal.fire({
                    icon: "error",
                    text: "A cidade informada não foi encontrada, tente novamente.",
                    confirmButtonColor: "#3085d6"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Ocorreu um erro interno no servidor, tente novamente.",
                    confirmButtonColor: "#3085d6"
                });
            }    
            
    }
};

// função que busca as informação da cidade na api da openweathermap
const getWeatherData = async(cidade) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json();
    if (!res.ok) {
        codigo_erro = `${res.status}`;
    }

    return data;
};