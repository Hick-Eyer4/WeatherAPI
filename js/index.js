"use strict";
// API KEY: 8f462b048b47cccff0fb28578e475e62
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("Minimo de 3 caracteres.");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=8f462b048b47cccff0fb28578e475e62&lang=pt_br&units=metric`);
        const data = yield response.json();
        const infos = {
            temperatura: Math.round(data.main.temp),
            Local: data.name,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        sectionTempoInfo.innerHTML = ` 
    <div class="tempo-dados">
      <h2>${infos.Local}</h2>

      <span>${infos.temperatura}°</span>
    </div>
    <img src="${infos.icone}" alt="">`;
    }
    catch (erro) {
        console.log("Eroo na obtenção de dados da API.", erro);
    }
}));
