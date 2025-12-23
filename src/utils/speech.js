
let currentAudio = null;

export const speak = (audioPaths) => {
    if (!audioPaths || audioPaths.length === 0) return;

    // Stop currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    let index = 0;

    const playNext = () => {
        if (index >= audioPaths.length) return;

        const path = audioPaths[index];
        const audio = new Audio(path);
        currentAudio = audio;

        audio.addEventListener('ended', () => {
            index++;
            playNext();
        });

        audio.play().catch(e => console.error("Audio play error:", e));
    };

    playNext();
};
