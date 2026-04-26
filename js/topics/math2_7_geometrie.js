const prismViews = {
    box: {
        title: "Schuhkarton als Prisma",
        desc: "Ein Quader mit markierter Grundfläche, Deckfläche, Seitenfläche und Höhe.",
        feedback: "Schuhkarton: vorne und hinten sind gleiche Rechtecke. Die Seitenflächen verbinden diese beiden Flächen."
    },
    tri: {
        title: "Dreiecksprisma",
        desc: "Ein Dreiecksprisma mit zwei gleichen Dreiecken und drei Seitenflächen.",
        feedback: "Dreiecksprisma: vorne und hinten sind gleiche Dreiecke. So kann zum Beispiel eine dreieckige Verpackung aufgebaut sein."
    },
    pent: {
        title: "Fünfeckprisma",
        desc: "Ein Fünfeckprisma mit zwei gleichen Fünfecken und mehreren Seitenflächen.",
        feedback: "Fünfeckprisma: Auch ein Fünfeck kann Grundfläche und Deckfläche sein. Wichtig ist: beide Flächen sind gleich und parallel."
    },
    net: {
        title: "Netz eines Dreiecksprismas",
        desc: "Das aufgeklappte Netz zeigt zwei gleiche Dreiecke und drei Seitenflächen.",
        feedback: "Netz: Klappt man das Prisma auf, sieht man die zwei gleichen Flächen und die Seitenflächen flach nebeneinander."
    }
};

function topicInit() {
    initPrismExplorer();
}

function initPrismExplorer() {
    const lab = document.querySelector("[data-prism-lab]");
    if (!lab) return;

    const buttons = lab.querySelectorAll("[data-prism-view]");
    const scenes = lab.querySelectorAll("[data-prism-scene]");
    const title = document.getElementById("prismSceneTitle");
    const desc = document.getElementById("prismSceneDesc");
    const feedback = document.getElementById("prismFeedback");

    function setView(view) {
        const data = prismViews[view] || prismViews.box;

        buttons.forEach((button) => {
            const active = button.dataset.prismView === view;
            button.classList.toggle("selected", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        scenes.forEach((scene) => {
            const active = scene.dataset.prismScene === view;
            scene.style.display = active ? "" : "none";
            scene.setAttribute("aria-hidden", active ? "false" : "true");
        });

        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;
        if (feedback) feedback.textContent = data.feedback;
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => setView(button.dataset.prismView));
    });

    setView("box");
}
