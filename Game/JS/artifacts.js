const artifacts = [
    { key: "hotdogShards", img: "hotdogImage", text: "hotdogProgressText", fill: "hotdogProgressFill", required: 500 },
    { key: "cookieShards", img: "cookieImage", text: "cookieProgressText", fill: "cookieProgressFill", required: 750 },
    { key: "burgerShards", img: "burgerImage", text: "burgerProgressText", fill: "burgerProgressFill", required: 1000 },
    { key: "curryShards", img: "curryImage", text: "curryProgressText", fill: "curryProgressFill", required: 300 },
    { key: "moonShards", img: "moonImage", text: "moonProgressText", fill: "moonProgressFill", required: 500 },
    { key: "earthShards", img: "earthImage", text: "earthProgressText", fill: "earthProgressFill", required: 600 },
    { key: "sunShards", img: "sunImage", text: "sunProgressText", fill: "sunProgressFill", required: 750 },
    { key: "neutronStarShards", img: "neutronStarImage", text: "neutronStarProgressText", fill: "neutronStarProgressFill", required: 750 },
    { key: "whiteDwarfShards", img: "whiteDwarfImage", text: "whiteDwarfProgressText", fill: "whiteDwarfProgressFill", required: 750 },
    { key: "grumpyCatShards", img: "grumpyCatImage", text: "grumpyCatProgressText", fill: "grumpyCatProgressFill", required: 500 },
    { key: "sunnydShards", img: "sunnydImage", text: "sunnydProgressText", fill: "sunnydProgressFill", required: 250 },
    { key: "duoShards", img: "duoImage", text: "duoProgressText", fill: "duoProgressFill", required: 800 },
    { key: "duoStreakShards", img: "duoStreakImage", text: "duoStreakProgressText", fill: "duoStreakProgressFill", required: 1000 },
    { key: "larryShards", img: "larryImage", text: "larryProgressText", fill: "larryProgressFill", required: 500 },
    { key: "ton618Shards", img: "ton618Image", text: "ton618ProgressText", fill: "ton618ProgressFill", required: 1000 },
    { key: "phoenixAShards", img: "phoenixAImage", text: "phoenixAProgressText", fill: "phoenixAProgressFill", required: 1000 },
    { key: "b2BomberShards", img: "b2BomberImage", text: "b2BomberProgressText", fill: "b2BomberProgressFill", required: 1 }
];

function updateArtifacts() {
    artifacts.forEach(a => {
        const shards = parseInt(localStorage.getItem(a.key)) || 0;
        const img = document.getElementById(a.img);
        const text = document.getElementById(a.text);
        const fill = document.getElementById(a.fill);

        text.textContent = `${shards} / ${a.required} shards`;
        fill.style.width = `${Math.min((shards / a.required) * 100, 100)}%`;

        img.classList.toggle("unlocked", shards >= a.required);
    });
}

function resetShards() {
    if (confirm("Reset ALL artifact progress?")) {
        localStorage.clear();
        updateArtifacts();
    }
}

updateArtifacts();