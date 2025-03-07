document.addEventListener("DOMContentLoaded", function () {
    let allVerses = [];  // Store all verses from JSON
    let usedVerses = []; // Store already shown verses

    fetch("verses.json")
        .then(response => response.json())
        .then(data => {
            allVerses = [...data];
            resetVersesIfNeeded();
            showRandomVerse();
            setTimeout(attachEventListeners, 500); // ✅ Delay attaching event listeners
        })
        .catch(error => {
            console.error("Error loading verses:", error);
            document.getElementById("verse-container").innerHTML = "<p>Error loading verses. Please try again.</p>";
        });

    function resetVersesIfNeeded() {
        if (usedVerses.length === 0) {
            usedVerses = [...allVerses]; // Reset when all are used
        }
    }

    function showRandomVerse() {
        resetVersesIfNeeded();
        if (usedVerses.length > 0) {
            let randomIndex = Math.floor(Math.random() * usedVerses.length);
            let verse = usedVerses.splice(randomIndex, 1)[0];

            document.getElementById("sanskrit").textContent = verse.sanskrit;
            document.getElementById("translation").textContent = verse.translation;
        }
    }

    function playSanskritAudio() {
        let verse = document.getElementById("sanskrit").textContent;
        speakText(verse, "hi-IN"); // Use Hindi (closest to Sanskrit)
    }

    function playEnglishAudio() {
        let translation = document.getElementById("translation").textContent;
        speakText(translation, "en-US");
    }

    function speakText(text, lang) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    }

    function attachEventListeners() {
        // ✅ Ensure all elements exist before adding event listeners
        let playSanskritBtn = document.getElementById("play-sanskrit");
        let playEnglishBtn = document.getElementById("play-english");
        let newVerseBtn = document.getElementById("new-verse");

        if (playSanskritBtn) {
            playSanskritBtn.addEventListener("click", playSanskritAudio);
        } else {
            console.error("❌ play-sanskrit button not found.");
        }

        if (playEnglishBtn) {
            playEnglishBtn.addEventListener("click", playEnglishAudio);
        } else {
            console.error("❌ play-english button not found.");
        }

        if (newVerseBtn) {
            newVerseBtn.addEventListener("click", showRandomVerse);
        } else {
            console.error("❌ new-verse button not found.");
        }
    }
});
