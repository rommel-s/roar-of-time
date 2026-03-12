import { useState } from "react";

import dialgaCry from "/assets/cry/dialga.mp3";

import "./App.css";

export default function App() {
  //tocar o cry com o botao
  const tocarSom = () => {
    const audio = new Audio(dialgaCry);
    audio.play().catch((error) => console.error("Erro ao tocar:", error));
    //espera um segundo pra falar as horas
    setTimeout(falarHoras, 1500);
    setTimeout(toggleAttack, 2000);
    setTimeout(mostrarRelogio, 2000);
  };

  //dizer as horas em voz alta
  const falarHoras = () => {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const mensagem = `São ${horas} horas e ${minutos} minutos.`;
    const fala = new SpeechSynthesisUtterance(mensagem);
    fala.voice = window.speechSynthesis.getVoices()[1];
    window.speechSynthesis.speak(fala);
  };

  //relogio digital com as horas e minutos
  const [horaAtual, setHoraAtual] = useState("");

  setInterval(() => {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    setHoraAtual(`${horas}:${minutos}`);
  }, 1000);

  //mostrar o relogio digital e diminuir a imagem quando clicar no botao
  const mostrarRelogio = () => {
    const relogio = document.querySelector(".relogio");
    relogio.classList.remove("hidden");

    setTimeout(() => {
      relogio.classList.add("hidden");
    }, 7000);
  };

  const [attacking, setAttacking] = useState(false);

  const toggleAttack = () => {
    setAttacking(!attacking);
    setTimeout(() => {
      setAttacking(false);
    }, 7000);
  };

  return (
    <div className="App">
      <h1 className="relogio test hidden">{horaAtual}</h1>
      <img
        src="https://img.pokemondb.net/sprites/black-white/anim/normal/dialga.gif"
        alt="Dialga"
        className={`dialga ${attacking ? "dialga-attack" : " "}`}
      />

      <button onClick={tocarSom}>
        <h1>Dialga!</h1>
        <h3>Use Roar of Time!</h3>
      </button>

      <img
        src="./assets/trainer/DP_Lucas_Back.png"
        alt="Trainer"
        className="trainer test"
      />
    </div>
  );
}
