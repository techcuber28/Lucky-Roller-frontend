let effectInterval = null;
let canRoll = true;

// Active luck multiplier (1 = normal). Stored in localStorage as "activeLuckMultiplier" and expiry as "activeLuckExpiry" (timestamp ms)
let luckMultiplier = parseInt(localStorage.getItem("activeLuckMultiplier") || "1");
let luckExpiry = parseInt(localStorage.getItem("activeLuckExpiry") || "0");

const LUCK_RANKS = {"Common": 1, "Uncommon": 2, "Rare": 3, "Epic": 4, "Legendary": 5, "Mythic": 6, "Unreal": 7, "Godlike": 8, "Alchemy": 9, "Cosmic": 10, "Abyssal": 11};

// Track rolls & best luck
let totalRolls = parseInt(localStorage.getItem("totalRolls")) || 0;
let bestLuck = localStorage.getItem("bestLuck") || "None yet!";
document.getElementById("stats").innerHTML = `Name: ${localStorage.getItem("luckyRollerName")}<br>Total Rolls: ${totalRolls}<br>Best Luck: ${bestLuck}<br><p id="luckTimerFooter" style="color: #00ff1a;">Luck Effect: None</p>`;

function updateStats(newLuck) {
    totalRolls++;
    localStorage.setItem("totalRolls", totalRolls);

    const currentRank = LUCK_RANKS[newLuck] || 0;
    const bestRank = LUCK_RANKS[bestLuck.split(" ")[0]] || 0;

    if (currentRank > bestRank) {
        bestLuck = newLuck;
        localStorage.setItem("bestLuck", bestLuck);
    }

    document.getElementById("stats").innerHTML = `Name: ${localStorage.getItem("luckyRollerName")}<br>Total Rolls: ${totalRolls}<br>Best Luck: ${bestLuck}<br><p id="luckTimerFooter" style="color: #00ff1a;">Luck Effect: None</p>`;
}

// Artifacts by rarity
const commonArtifacts = [
    { name: "Hotdog", key: "hotdogShards" },
    { name: "Cookie", key: "cookieShards" },
    { name: "Burger", key: "burgerShards" }
];

const uncommonArtifacts = [
    { name: "Curry", key: "curryShards" },
    { name: "The Moon", key: "moonShards" }
];

const rareArtifacts = [
    { name: "Earth", key: "earthShards" }
];

const epicArtifacts = [
    { name: "The Sun", key: "sunShards" }
];

const legendaryArtifacts = [
    { name: "Neutron Star", key: "neutronStarShards" }
];

const mythicArtifacts = [
    { name: "White Dwarf Star", key: "whiteDwarfShards" }
];

const unrealArtifacts = [
    { name: "SunnyD", key: "sunnydShards" },
    { name: "Grumpy Cat", key: "grumpyCatShards" }
];

const godlikeArtifacts = [
    { name: "Larry", key: "larryShards" },
    { name: "Duo", key: "duoShards" },
    { name: "1500 Day Duolingo Streak", key: "duoStreakShards" }
];

const alchemyArtifacts = [
    { name: "TON 618", key: "ton618Shards" }
];

const cosmicArtifacts = [
    { name: "Phoenix A", key: "phoenixAShards" }
];

const abyssalArtifacts = []; // add later

function startGodlikeEffect(text) {
    const blues = ["#e0f7ff", "#b3e5ff", "#80d4ff", "#4fc3ff", "#29b6f6", "#1e88e5", "#1565c0"];
    let index = 0;
    effectInterval = setInterval(() => {
        text.style.color = blues[index];
        index = (index + 1) % blues.length;
    }, 150);
}

function startAlchemyEffect(text) {
    const greens = ["#c8facc", "#9be7a1", "#6fdc7a", "#43c653", "#2e9e3f", "#1f7a30", "#145522"];
    let index = 0;
    effectInterval = setInterval(() => {
        text.style.color = greens[index];
        index = (index + 1) % greens.length;
    }, 80);
}

function startCosmicEffect(text) {
    const oranges = ["#ff9500", "#ffaa00", "#ffc300", "#ffdd00", "#ffea00", "#fff000", "#ffcc00"];
    let index = 0;
    effectInterval = setInterval(() => {
        text.style.color = oranges[index];
        index = (index + 1) % oranges.length;
    }, 120);
}

function startAbyssalEffect(text) {
    const purples = ["#3c096c", "#5a189a", "#7b2cbf", "#9d4edd", "#bd6dd6", "#c77dff", "#7209b7"];
    let index = 0;
    effectInterval = setInterval(() => {
        text.style.color = purples[index];
        index = (index + 1) % purples.length;
    }, 140);
}

function shakeScreen(intensity = 1) {
    const amp = intensity * 5;
    document.body.style.transform = `translate(${amp}px, ${amp}px)`;

    const shakeTimes = 12;
    let count = 0;
    const violentShake = setInterval(() => {
        const x = (Math.random() - 0.5) * amp * 2;
        const y = (Math.random() - 0.5) * amp * 2;
        const rot = (Math.random() - 0.5) * intensity * 2;
        document.body.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
        count++;
        if (count >= shakeTimes) {
            clearInterval(violentShake);
            document.body.style.transform = "translate(0,0) rotate(0deg)";
        }
    }, 60);
}

function lockRolls(seconds) {
    canRoll = false;
    const button = document.querySelector("button:not(#claimButton)");
    button.disabled = true;
    button.style.opacity = "0.6";
    button.style.cursor = "not-allowed";
    setTimeout(() => {
        canRoll = true;
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
    }, seconds * 1000);
}

function getRankForRollValue(rollValue) {
    if (rollValue > 0.5) return LUCK_RANKS.Common;
    if (rollValue > 0.25) return LUCK_RANKS.Uncommon;
    if (rollValue > 0.15) return LUCK_RANKS.Rare;
    if (rollValue > 0.08) return LUCK_RANKS.Epic;
    if (rollValue > 0.04) return LUCK_RANKS.Legendary;
    if (rollValue > 0.02) return LUCK_RANKS.Mythic;
    if (rollValue > 0.001) return LUCK_RANKS.Unreal;
    if (rollValue > 0.0001) return LUCK_RANKS.Godlike;
    if (rollValue > 0.00001) return LUCK_RANKS.Alchemy;
    if (rollValue > 0.000001) return LUCK_RANKS.Cosmic;
    return LUCK_RANKS.Abyssal;
}

function roll(forcedRollValue) {
    if (!canRoll) return;

    // expire luck if needed
    if (luckExpiry && Date.now() > luckExpiry) {
        luckMultiplier = 1;
        luckExpiry = 0;
        localStorage.removeItem("activeLuckMultiplier");
        localStorage.removeItem("activeLuckExpiry");
    }

    let rollValue;
    if (typeof forcedRollValue !== 'undefined') {
        rollValue = forcedRollValue;
    } else if (luckMultiplier > 1) {
        // sample `luckMultiplier` times and pick the best roll (highest rank)
        let bestValue = Math.random();
        let bestRank = getRankForRollValue(bestValue);
        for (let i = 1; i < luckMultiplier; i++) {
            const v = Math.random();
            const r = getRankForRollValue(v);
            if (r > bestRank) {
                bestRank = r;
                bestValue = v;
            }
        }
        rollValue = bestValue;
    } else {
        rollValue = Math.random();
    }
    let text = document.getElementById("result");
    let luckName = "Common";

    if (effectInterval) {
        clearInterval(effectInterval);
        effectInterval = null;
    }

    if (rollValue > 0.5) {
        const artifact = commonArtifacts[Math.floor(Math.random() * commonArtifacts.length)];
        text.innerHTML = `${artifact.name} (Common) 50%`;
        text.style.color = "gray";
        text.style.fontSize = "18px";

        if (Math.random() < 0.5) {
            localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        } else {
            let commonCredits = parseInt(localStorage.getItem("commonCredits") || "0") + 1;
            localStorage.setItem("commonCredits", commonCredits);
            text.innerHTML += "<br>+1 Common Credit!";
        }
        luckName = "Common";

    } else if (rollValue > 0.25) {
        const artifact = uncommonArtifacts[Math.floor(Math.random() * uncommonArtifacts.length)];
        text.innerHTML = `${artifact.name} (Uncommon) 25%`;
        text.style.color = "green";
        text.style.fontSize = "20px";

        if (Math.random() < 0.25) {
            let uncommonCredits = parseInt(localStorage.getItem("uncommonCredits") || "0") + 1;
            localStorage.setItem("uncommonCredits", uncommonCredits);
            text.innerHTML += "<br>+1 Uncommon Credit!";
        } else {
            localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        }
        luckName = "Uncommon";

    } else if (rollValue > 0.15) {
        const artifact = rareArtifacts[Math.floor(Math.random() * rareArtifacts.length)];
        text.innerHTML = `${artifact.name} (Rare) 15%`;
        text.style.color = "blue";
        text.style.fontSize = "22px";
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Rare";

    } else if (rollValue > 0.08) {
        const artifact = epicArtifacts[Math.floor(Math.random() * epicArtifacts.length)];
        text.innerHTML = `${artifact.name} (Epic) 5%`;
        text.style.color = "purple";
        text.style.fontSize = "24px";
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Epic";

    } else if (rollValue > 0.04) {
        const artifact = legendaryArtifacts[Math.floor(Math.random() * legendaryArtifacts.length)];
        text.innerHTML = `${artifact.name} (Legendary) 2.5%`;
        text.style.color = "goldenrod";
        text.style.fontSize = "28px";
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Legendary";

    } else if (rollValue > 0.02) {
        const artifact = mythicArtifacts[Math.floor(Math.random() * mythicArtifacts.length)];
        text.innerHTML = `${artifact.name} (Mythic) 1.5%`;
        text.style.color = "red";
        text.style.fontSize = "32px";
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Mythic";

    } else if (rollValue > 0.001) {
        const artifact = unrealArtifacts[Math.floor(Math.random() * unrealArtifacts.length)];
        text.innerHTML = `${artifact.name} (Unreal) 0.9%`;
        text.style.color = "white";
        text.style.fontSize = "36px";
        lockRolls(0.25);
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Unreal";


    } else if (rollValue > 0.0001) {
        const artifact = godlikeArtifacts[Math.floor(Math.random() * godlikeArtifacts.length)];
        text.innerHTML = `${artifact.name} (Godlike) 0.1%`;
        text.style.fontSize = "40px";
        startGodlikeEffect(text);
        lockRolls(1);
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Godlike";
        confetti({ particleCount: 400, spread: 100, origin: { y: 0.6 } });

    } else if (rollValue > 0.00001) {
        const artifact = alchemyArtifacts[Math.floor(Math.random() * alchemyArtifacts.length)];
        text.innerHTML = `${artifact.name} (Alchemy) 0.01%`;
        text.style.fontSize = "44px";
        startAlchemyEffect(text);
        lockRolls(3);
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Alchemy";
        confetti({ particleCount: 1000, spread: 150, origin: { y: 0.6 } });

    } else if (rollValue > 0.000001) {
        const artifact = cosmicArtifacts[Math.floor(Math.random() * cosmicArtifacts.length)];
        text.innerHTML = `${artifact.name} (Cosmic) 0.001%`;
        text.style.fontSize = "50px";
        startCosmicEffect(text);
        lockRolls(5);
        shakeScreen(5);
        localStorage.setItem(artifact.key, (parseInt(localStorage.getItem(artifact.key)) || 0) + 1);
        luckName = "Cosmic";
        confetti({ particleCount: 2000, spread: 120, origin: { y: 0.6 } });

    } else {
        text.innerHTML = "Abyssal 0.0001%";
        text.style.fontSize = "54px";
        startAbyssalEffect(text);
        lockRolls(5);
        shakeScreen(15);
        luckName = "Abyssal";
        confetti({ particleCount: 2000, spread: 140, origin: { y: 0.6 } });
    }

    updateStats(luckName);
}

// Cosmic pulsing orange
function startCosmicEffect(text) {
    const oranges = ["#ff9500", "#ffaa00", "#ffc300", "#ffdd00", "#ffea00", "#fff000", "#ffcc00"];
    let index = 0;
    effectInterval = setInterval(() => {
        text.style.color = oranges[index];
        index = (index + 1) % oranges.length;
    }, 120);
}

// Abyssal pulsing dark purple
function startAbyssalEffect(text) {
    const purples = ["#3c096c", "#5a189a", "#7b2cbf", "#9d4edd", "#bd6dd6", "#c77dff", "#7209b7"];
    let index = 0;
    effectInterval = setInterval(() => {
        text.style.color = purples[index];
        index = (index + 1) % purples.length;
    }, 140);
}

// Violent screen shake
function shakeScreen(intensity = 1) {
    const amp = intensity * 5;
    document.body.style.transform = `translate(${amp}px, ${amp}px)`;

    const shakeTimes = 12;
    let count = 0;
    const violentShake = setInterval(() => {
        const x = (Math.random() - 0.5) * amp * 2;
        const y = (Math.random() - 0.5) * amp * 2;
        const rot = (Math.random() - 0.5) * intensity * 2;
        document.body.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
        count++;
        if (count >= shakeTimes) {
            clearInterval(violentShake);
            document.body.style.transform = "translate(0,0) rotate(0deg)";
        }
    }, 60);
}

// Limited time event claim
function claimLimitedTime() {
    const claimButton = document.getElementById("claimButton");
    const now = Date.now();
    const lastClaimTime = parseInt(localStorage.getItem("lastLimitedTimeClaimTime")) || 0;

    localStorage.setItem("duoShards", (parseInt(localStorage.getItem("duoShards")) || 0) + 2);
    localStorage.setItem("lastLimitedTimeClaimTime", now);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    alert("Duo shards claimed! 🦉");

    startCountdown(claimButton, now + 24 * 60 * 60 * 1000);
}

function startCountdown(button, endTime) {
    function updateTimer() {
        const remaining = endTime - Date.now();
        if (remaining <= 0) {
            button.disabled = false;
            button.textContent = "Claim Now!";
            return;
        }
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        button.textContent = `Next claim: ${hours}h ${minutes}m ${seconds}s`;
        button.disabled = true;
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Chest System
const chestData = {
    simple: { cooldown: 10 * 60 * 1000, loot() { let r = Math.floor(Math.random() * 100) + 1; localStorage.setItem("commonCredits", (parseInt(localStorage.getItem("commonCredits")) || 0) + r); return `+${r} Common Credit ⚪`; } },
    normal: { cooldown: 4 * 60 * 60 * 1000, loot() { let r = Math.floor(Math.random() * 100) + 1; localStorage.setItem("uncommonCredits", (parseInt(localStorage.getItem("uncommonCredits")) || 0) + r); return `+${r} Uncommon Credit 🟢`; } },
    good: { cooldown: 24 * 60 * 60 * 1000, loot() { let r = Math.floor(Math.random() * 100) + 1; if (Math.random() <= 0.5) { localStorage.setItem("rareCredits", (parseInt(localStorage.getItem("rareCredits")) || 0) + r); return `+${r} Rare Credit 🔵`; } else { localStorage.setItem("sunnydShards", (parseInt(localStorage.getItem("sunnydShards")) || 0) + Math.ceil(r / 30)); return `+${Math.ceil(r / 30)} SunnyD Shards 🌞🥤`; } } }
};

function claimChest(type) {
    const now = Date.now();
    const last = parseInt(localStorage.getItem(`last_${type}_chest`)) || 0;
    const chest = chestData[type];

    if (now - last < chest.cooldown) return;

    const reward = chest.loot();
    localStorage.setItem(`last_${type}_chest`, now);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    alert(`Chest opened! 🎁\n${reward}`);
    updateChestButtons();
}

function updateChestButtons() {
    ["simple", "normal", "good"].forEach(type => {
        const btn = document.getElementById(`${type}ChestBtn`);
        if (!btn) return;
        const last = parseInt(localStorage.getItem(`last_${type}_chest`)) || 0;
        const remaining = chestData[type].cooldown - (Date.now() - last);
        if (remaining <= 0) {
            btn.disabled = false;
            btn.textContent = type === "simple" ? "Simple Chest (10m)" : type === "normal" ? "Normal Chest (4h)" : "Good Chest (24h)";
        } else {
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const mins = Math.floor((remaining % (1000 * 60 * 60)) / 60000);
            const secs = Math.floor((remaining % 60000) / 1000);
            btn.disabled = true;
            btn.textContent = `Ready in ${hours}h ${mins}m ${secs}s`;
        }
    });
}

// Update the luck timer footer (reads active luck from localStorage)
function updateLuckFooter() {
    const el = document.getElementById("luckTimerFooter");
    if (!el) return;

    const expiry = parseInt(localStorage.getItem("activeLuckExpiry") || "0");
    const multiplier = parseInt(localStorage.getItem("activeLuckMultiplier") || "1");

    if (expiry && Date.now() < expiry && multiplier > 1) {
        const remaining = expiry - Date.now();
        const hrs = Math.floor(remaining / (1000 * 60 * 60));
        const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((remaining % (1000 * 60)) / 1000);
        const timeStr = (hrs > 0 ? `${hrs}h ` : "") + `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
        el.textContent = `Luck Effect: ${multiplier}x — ${timeStr}`;

        // keep globals in sync
        luckMultiplier = multiplier;
        luckExpiry = expiry;
    } else {
        el.textContent = `Luck Effect: None`;
        // clear expired values
        if (expiry && Date.now() >= expiry) {
            localStorage.removeItem("activeLuckMultiplier");
            localStorage.removeItem("activeLuckExpiry");
            luckMultiplier = 1;
            luckExpiry = 0;
        }
    }
}

// Load everything
window.addEventListener("load", () => {
    const claimButton = document.getElementById("claimButton");
    const lastClaimTime = parseInt(localStorage.getItem("lastLimitedTimeClaimTime")) || 0;
    const now = Date.now();

    if (now - lastClaimTime < 24 * 60 * 60 * 1000) {
        startCountdown(claimButton, lastClaimTime + 24 * 60 * 60 * 1000);
    } else {
        claimButton.disabled = false;
        claimButton.textContent = "Claim Now!";
    }
    updateChestButtons();
    updateLuckFooter();
    setInterval(updateLuckFooter, 1000);
});

setInterval(updateChestButtons, 1000);