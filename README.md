# 🌤️ Weather Search App

Uma aplicação interativa de busca de clima em tempo real que utiliza a API do OpenWeatherMap para fornecer detalhes meteorológicos de cidades ao redor do mundo.

![Status do Projeto](https://img.shields.io/badge/status-andamento-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Sobre o Projeto

O Weather Search permite que os usuários digitem o nome de qualquer cidade para obter informações instantâneas como:
* Temperatura atual em graus Celsius.
* Condições climáticas (ex: céu limpo, chuva leve).
* Umidade relativa do ar.
* Velocidade do vento.
* Identificação visual através da bandeira do país.

O projeto foi construído com foco em **Clean Code** e **Experiência do Usuário (UX)**, utilizando alertas personalizados e manipulação dinâmica do DOM.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **HTML5:** Estruturação semântica.
* **CSS3:** Estilização moderna com gradientes e layouts flexíveis.
* **JavaScript (ES6+):** Lógica assíncrona, Fetch API e módulos.
* **[OpenWeatherMap API](https://openweathermap.org/api):** Fonte de dados meteorológicos.
* **[SweetAlert2](https://sweetalert2.github.io/):** Pop-ups de erro e validação elegantes.
* **[Font Awesome](https://fontawesome.com/):** Ícones vetoriais.
* **[Country Flag Icons](https://purecatamphetamine.github.io/country-flag-icons/):** Exibição de bandeiras via SVG.

---

## ⚙️ Como Executar o Projeto

Como o projeto utiliza **Módulos JavaScript** (o arquivo de chave de API é importado), você precisará rodar a aplicação através de um servidor local (como a extensão *Live Server* do VS Code).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/raphaelsette/weathersearch.git](https://github.com/raphaelsette/weathersearch.git)
    ```

2.  **Configure sua chave de API:**
    * Crie uma conta no [OpenWeatherMap](https://openweathermap.org/).
    * Crie um arquivo chamado `assets/js/key_openweathermap.js`.
    * Dentro dele, adicione:
        ```javascript
        export const secretKey = "SUA_CHAVE_AQUI";
        ```

3.  **Abra o projeto:**
    * Abra o arquivo `index.html` com o **Live Server**.

---

## 🛠️ Funcionalidades Detalhadas

* **Validação de Input:** O sistema impede buscas vazias com alertas visuais.
* **Tratamento de Erros:** Caso a cidade não exista (Erro 404) ou ocorra um problema no servidor, o usuário é notificado via SweetAlert.
* **Suporte ao Teclado:** É possível realizar a busca pressionando a tecla `Enter`.
* **Interface Dinâmica:** O cartão de informações só aparece após a primeira busca bem-sucedida.
