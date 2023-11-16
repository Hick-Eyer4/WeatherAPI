// API KEY: 8f462b048b47cccff0fb28578e475e62

const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("Minimo de 3 caracteres.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=8f462b048b47cccff0fb28578e475e62&lang=pt_br&units=metric`
    );

    const data = await response.json();

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
  } catch (erro) {
    console.log("Eroo na obtenção de dados da API.", erro);
  }
});
