main_js = """const questions = [
  { category: "Matemática", q: "¿Cuál es la raíz cuadrada de 64?", a: ["8", "6", "7"], c: "8" },
  { category: "Comunicación", q: "¿Cuál es el sujeto en 'María canta una canción'?", a: ["María", "canta", "una canción"], c: "María" },
  { category: "Ciencia", q: "¿Qué gas necesitamos para respirar?", a: ["Oxígeno", "Nitrógeno", "Hidrógeno"], c: "Oxígeno" },
  { category: "Tecnología", q: "¿Cuál es un lenguaje de programación?", a: ["Python", "Píxel", "Vector"], c: "Python" },
  { category: "DPCC", q: "¿Qué valor es fundamental para convivir en paz?", a: ["Respeto", "Desorden", "Mentira"], c: "Respeto" },
  { category: "Arte", q: "¿Qué instrumento tiene cuerdas?", a: ["Violín", "Flauta", "Trompeta"], c: "Violín" },
  { category: "Educación Física", q: "¿Qué ejercicio ayuda a mejorar la resistencia?", a: ["Trotar", "Dormir", "Comer"], c: "Trotar" },
  { category: "Sociales", q: "¿En qué continente está Perú?", a: ["América", "Asia", "Europa"], c: "América" },
  { category: "Matemática", q: "¿Cuánto es 9 x 6?", a: ["54", "63", "45"], c: "54" },
  { category: "Comunicación", q: "¿Qué tipo de palabra es 'rápidamente'?", a: ["Adverbio", "Verbo", "Sustantivo"], c: "Adverbio" }
];

let timer = 60;
let score = 0;
let asked = [];
let interval;

function startGame() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Escribe tu nombre");
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("username").style.display = "none";
  document.querySelector("button").style.display = "none";
  loadMusic();
  nextQuestion();
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = "Tiempo: " + timer + "s";
    if (timer <= 0) endGame(name);
  }, 1000);
}

function nextQuestion() {
  const pool = questions.filter(q => !asked.includes(q.q));
  if (pool.length === 0) return endGame(document.getElementById("username").value.trim());
  const q = pool[Math.floor(Math.random() * pool.length)];
  asked.push(q.q);
  document.getElementById("questionTitle").innerText = `${q.category}: ${q.q}`;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  q.a.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      if (ans === q.c) score++;
      nextQuestion();
    };
    answersDiv.appendChild(btn);
  });
}

function endGame(name) {
  clearInterval(interval);
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("finalScore").innerText = `Puntaje: ${score}`;
  const list = JSON.parse(localStorage.getItem("scores") || "[]");
  list.push({ name, score });
  list.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(list.slice(0, 10)));
}

function loadMusic() {
  const tracks = ["assets/music1.mp3", "assets/music2.mp3", "assets/music3.mp3"];
  const music = document.getElementById("music");
  music.src = tracks[Math.floor(Math.random() * tracks.length)];
  music.play();
}
"""
