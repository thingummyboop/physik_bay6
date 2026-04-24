const { execSync } = require('child_process');

const commands = [
    "py -m manim -qh manim_scripts/pythagoras_proof.py PythagorasBeweis -o pythagoras.mp4",
    "py -m manim -qh manim_scripts/galton_brett.py GaltonBrett -o galton.mp4",
    "py -m manim -qh manim_scripts/waermelehre_teilchen.py WaermelehreTeilchen -o waermelehre_teilchen.mp4",
    "py -m manim -qh manim_scripts/lorentz_kraft.py LorentzKraft -o lorentz_kraft.mp4",
    "py -m manim -qh manim_scripts/linsen_brechung.py LinsenBrechung -o linsen_brechung.mp4",
    "py -m manim -qh manim_scripts/vektor_addition.py VektorAddition -o vektor_addition.mp4",
    "py -m manim -qh manim_scripts/schallwelle.py WellenArten -o schallwelle.mp4",
    "py -m manim -qh manim_scripts/gravitation.py Gravitation -o gravitation_kepler.mp4"
];

for (const cmd of commands) {
    console.log(`Running: ${cmd}`);
    try {
        execSync(`powershell.exe -Command "$env:Path += ';C:\\Users\\Simon\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1-full_build\\bin'; ${cmd}"`, { stdio: 'inherit' });
    } catch(e) {
        console.error("Failed to execute: " + cmd);
    }
}

// Copy them to assets/videos
try {
    execSync(`powershell.exe -Command "copy media\\videos\\pythagoras_proof\\1080p60\\pythagoras.mp4 assets\\videos\\pythagoras.mp4 -Force; copy media\\videos\\galton_brett\\1080p60\\galton.mp4 assets\\videos\\galton.mp4 -Force; copy media\\videos\\waermelehre_teilchen\\1080p60\\waermelehre_teilchen.mp4 assets\\videos\\waermelehre_teilchen.mp4 -Force; copy media\\videos\\lorentz_kraft\\1080p60\\lorentz_kraft.mp4 assets\\videos\\lorentz_kraft.mp4 -Force; copy media\\videos\\linsen_brechung\\1080p60\\linsen_brechung.mp4 assets\\videos\\linsen_brechung.mp4 -Force; copy media\\videos\\vektor_addition\\1080p60\\vektor_addition.mp4 assets\\videos\\vektor_addition.mp4 -Force; copy media\\videos\\schallwelle\\1080p60\\schallwelle.mp4 assets\\videos\\schallwelle.mp4 -Force; copy media\\videos\\gravitation\\1080p60\\gravitation_kepler.mp4 assets\\videos\\gravitation_kepler.mp4 -Force"`, { stdio: 'inherit' });
    console.log("All videos copied!");
} catch(e) {
    console.error("Copy failed");
}