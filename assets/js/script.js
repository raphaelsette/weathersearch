// variáveis e seleção de elementos
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
        sweetAlertToast('warning', 'Oops...', 'Informe uma cidade para continuar.');
    } else {
        e.preventDefault()
        const cidade = cidadeInput.value;
        showWeatherData(cidade);
    }
});

// evento que chama a função showWeatherData quando pressiona no teclado o "enter"
cidadeInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        if (!cidadeInput.value) {
            sweetAlertToast('warning', 'Oops...', 'Informe uma cidade para continuar.');
        } else {
            const cidade = e.target.value;
            showWeatherData(cidade);
        }
    }
})

// função dos alertas
function sweetAlertToast(tipoAlerta, tituloAlerta, mensagemAlerta) {
    Swal.fire({
        icon: tipoAlerta,
        title: tituloAlerta,
        text: mensagemAlerta
    });
};

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
        if (codigo_erro == 400 || codigo_erro == 404) {
            sweetAlertToast('warning', 'Oops...', 'A cidade informada não foi encontrada, tente novamente.');
        } else {
            sweetAlertToast('error', 'Oops...', 'Ocorreu um erro interno no servidor, tente novamente.');
        }

    }
};

// função que busca as informação da cidade no servidor nodejs
const getWeatherData = async (cidade) => {
    const apiURL = `http://localhost:3000/api/weather?city=${cidade}`;

    const res = await fetch(apiURL)
    const data = await res.json();
    if (!res.ok) {
        codigo_erro = `${res.status}`;
    }

    return data;
};