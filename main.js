
const questions = [
  { category: "Matemática", q: "¿Cuánto es 7 x 8?", a: ["56", "48", "64"], c: "56" },
  { category: "Comunicación", q: "¿Cuál es un sinónimo de 'feliz'?", a: ["Contento", "Triste", "Furioso"], c: "Contento" },
  { category: "Ciencia", q: "¿Qué planeta es el tercero desde el Sol?", a: ["Marte", "Tierra", "Venus"], c: "Tierra" },
  { category: "Tecnología", q: "¿Qué significa 'HTML'?", a: ["Lenguaje de marcado", "Hipertexto", "Ambos"], c: "Ambos" },
  { category: "DPCC", q: "¿Qué valor representa la honestidad?", a: ["Decir la verdad", "Mentir", "Ignorar"], c: "Decir la verdad" },
  { category: "Arte", q: "¿Qué mezcla da el color verde?", a: ["Azul + Amarillo", "Rojo + Azul", "Amarillo + Rojo"], c: "Azul + Amarillo" },
  { category: "Educación Física", q: "¿Qué ejercicio mejora el corazón?", a: ["Correr", "Leer", "Dormir"], c: "Correr" }
];

let timer = 60;
let score = 0;
let asked = [];
let currentQuestion = null;
let interval = null;

function startGame() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Escribe tu nombre");
  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("scoreBoard").style.display = "none";
  document.getElementById("username").style.display = "none";
  loadMusic();
  nextQuestion();
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = "Tiempo restante: " + timer;
    if (timer <= 0) endGame(name);
  }, 1000);
}

function nextQuestion() {
  const pool = questions.filter(q => !asked.includes(q.q));
  if (pool.length === 0) return endGame();
  const q = pool[Math.floor(Math.random() * pool.length)];
  asked.push(q.q);
  currentQuestion = q;
  document.getElementById("question").innerText = `${q.category}: ${q.q}`;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.a.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      if (ans === q.c) score++;
      nextQuestion();
    };
    answers.appendChild(btn);
  });
}

function endGame(name) {
  clearInterval(interval);
  const list = JSON.parse(localStorage.getItem("scores") || "[]");
  list.push({ name, score });
  list.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(list.slice(0, 5)));
  showScores();
}

function showScores() {
  document.getElementById("questionContainer").style.display = "none";
  document.getElementById("scoreBoard").style.display = "block";
  const ul = document.getElementById("scoreList");
  ul.innerHTML = "";
  const list = JSON.parse(localStorage.getItem("scores") || "[]");
  list.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name}: ${p.score}`;
    ul.appendChild(li);
  });
}

function loadMusic() {
  const music = document.getElementById("music");
  const tracks = [
    "assets/track1.mp3",
    "assets/track2.mp3",
    "assets/track3.mp3"
  ];
  const track = tracks[Math.floor(Math.random() * tracks.length)];
  music.src = track;
  music.play();
}
