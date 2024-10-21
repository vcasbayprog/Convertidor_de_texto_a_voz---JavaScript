// script.js
window.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const speedSelect = document.getElementById('speedSelect');
    const speakBtn = document.getElementById('speakBtn');
    
    let voices = [];

    // Cargar las voces disponibles
    function loadVoices() {
        voices = speechSynthesis.getVoices();

        // Limpiar opciones anteriores
        voiceSelect.innerHTML = '';

        // Añadir las voces al selector
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });

        // Seleccionar "Albert" si está disponible, o la primera voz como predeterminada
        const defaultVoice = voices.find(voice => voice.name === 'Albert') || voices[0];
        if (defaultVoice) {
            voiceSelect.value = defaultVoice.name;
        }
    }

    // Ejecutar cuando las voces estén cargadas
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Función para convertir texto a voz
    function textToSpeech() {
        const text = textInput.value;
        if (text.trim() === '') {
            alert("Por favor, ingresa un texto.");
            return;
        }

        const speech = new SpeechSynthesisUtterance(text);

        // Selección de la voz
        const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
        speech.voice = selectedVoice;

        // Selección de velocidad
        speech.rate = parseFloat(speedSelect.value);

        // Reproducir el texto convertido a voz
        speechSynthesis.speak(speech);
    }

    // Agregar evento al botón
    speakBtn.addEventListener('click', textToSpeech);
});
