const app = document.getElementById("root");
const container = document.createElement("div");

container.setAttribute("class", "container__grid");
app.appendChild(container);

var request = new XMLHttpRequest();

request.open("GET", "http://apis.io/api/apis", true);

request.onload = function () {
  let { data } = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach((item) => {
      // Criando elemento  de card
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      // Criando elemento para imagem
      const containerImg = document.createElement("div");
      containerImg.setAttribute("class", "container__image");

      let flag_has_img = false;
      const format_imgs = [".svg", ".png", ".jpg"];

      // tratamento para verificação se há uma imagem válida
      format_imgs.forEach((format) => {
        if (item.image.includes(format)) {
          flag_has_img = true;
        }
      });

      const url_img = flag_has_img
        ? item.image
        : "https://top10webdesignsites.com/wp-content/themes/poseidon-b/assets/img/not-found.png";

      // TRATAMENTO - verificando caso a imagem for SVG, a inserção no HTML é diferente
      if (item.image.includes(".svg")) {
        var img = document.createElement("object");
        img.setAttribute("class", "svg__img");
        img.data = url_img;
        img.type = "image/svg+xml";
      } else {
        var img = new Image();
        img.src = url_img;
      }

      // Adicionando imagem dentro do elemento container__image
      containerImg.appendChild(img);

      // Criando elemento para Texto principal
      const h1 = document.createElement("h1");
      h1.textContent = item.name;

      // Criando Elemento para descrição
      const p = document.createElement("p");
      item.description = item.description.substring(0, 100);
      p.textContent = `${item.description}...`;

      // Manipulando DOM para inserção dos itens
      container.appendChild(card);
      card.appendChild(containerImg);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Ops! Algo deu errado`;
    app.appendChild(errorMessage);
  }
};

request.send();
