let btnEnviar = document.getElementById("btnEnviar");
if (btnEnviar) {
  btnEnviar.addEventListener("click", () => {
    let respuestas = document.querySelectorAll("input[type='radio']:checked");
    let puntaje = 0;

    respuestas.forEach((r) => {
      if (r.value === "1") puntaje++;
    });

    localStorage.setItem("puntajeActual", puntaje);

    window.location.href = "resultado.html";
  });
}

let textoPuntaje = document.getElementById("textoPuntaje");
if (textoPuntaje) {
  let puntaje = localStorage.getItem("puntajeActual");
  let nombre = localStorage.getItem("jugadorActual");

  textoPuntaje.textContent = `${nombre}, tu puntaje es: ${puntaje}/10`;


  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ nombre: nombre, puntaje: parseInt(puntaje) });

  ranking.sort((a, b) => b.puntaje - a.puntaje);
  localStorage.setItem("ranking", JSON.stringify(ranking));

  
  let cuerpo = document.querySelector("#tablaRanking tbody");
  cuerpo.innerHTML = "";
  ranking.forEach((jug) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${jug.nombre}</td><td>${jug.puntaje}</td>`;
    cuerpo.appendChild(fila);
  });

  document.getElementById("btnVolver").addEventListener("click", () => {
    window.location.href = "bienvenida.html";
  });
}
