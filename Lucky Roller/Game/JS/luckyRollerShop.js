function updateCreditsDisplay() {
    const common = parseInt(localStorage.getItem("commonCredits") || "0");
    const uncommon = parseInt(localStorage.getItem("uncommonCredits") || "0");
    const rare = parseInt(localStorage.getItem("rareCredits") || "0");
    const amulets = parseInt(localStorage.getItem("amulets") || "0");

    document.getElementById("creditsDisplay").innerHTML =
        `Common Credits ⚪: ${common}<br>` +
        `Uncommon Credits 🟢: ${uncommon}<br>` +
        `Rare Credits 🔵: ${rare}<br>` +
        `Amulets 🧿: ${amulets}`;
}

function trade(fromType, fromAmount, toType, toAmount, isShard = false) {
    // Always use "Credits" suffix for cost (from), unless it's a shard trade (but we don't have shard costs yet)
    let fromKey = fromType + "Credits";  // ← This line fixes it! We always want rareCredits here

    let current = parseInt(localStorage.getItem(fromKey) || "0");

    if (current < fromAmount) {
        alert(`Not enough ${fromType} credits! Need ${fromAmount}, you have ${current}.`);
        return;
    }

    // Subtract cost
    localStorage.setItem(fromKey, current - fromAmount);

    // Add reward
    let toKey = toType;
    if (!isShard) toKey += "Credits";  // Only add "Credits" if buying another credit type

    let toCurrent = parseInt(localStorage.getItem(toKey) || "0");
    localStorage.setItem(toKey, toCurrent + toAmount);

    // Confetti + success message
    confetti({ particleCount: 10, spread: 70, origin: { y: 0.6 } });

    const msgId = `msg-${fromType.toLowerCase()}`;
    document.getElementById(msgId).innerHTML = `Success! +${toAmount} ${toType} ${isShard ? "shard" : "credit"}! 🎉`;

    updateCreditsDisplay();

    // Clear message after 4 seconds
    setTimeout(() => {
        document.getElementById(msgId).innerHTML = "";
    }, 4000);
}

// Load credits when shop opens
window.addEventListener("load", updateCreditsDisplay);

function setActiveLuck(multiplier, minutes) {
    const expiry = Date.now() + minutes * 60 * 1000;
    localStorage.setItem("activeLuckMultiplier", String(multiplier));
    localStorage.setItem("activeLuckExpiry", String(expiry));
}

// Buy a luck potion with configurable multiplier and duration
function buyLuckPotion(multiplier, minutes, cost, key) {
    if (key === "rareCredits") {
        let rare = parseInt(localStorage.getItem("rareCredits") || "0");
        if (rare < cost) {
            alert(`Not enough Rare Credits! Need ${cost}, you have ${rare}.`);
            return;
        }
    } else if (key === "amulets") {
        let amulets = parseInt(localStorage.getItem("amulets") || "0");
        if (amulets < cost) {
            alert(`Not enough Amulets! Need ${cost}, you have ${amulets}.`);
            return;
        }
    }


    if (key === "rareCredits") {
        let rare = parseInt(localStorage.getItem("rareCredits") || "0");
        rare -= cost;
        localStorage.setItem("rareCredits", rare);
    } else if (key === "amulets") {
        let amulets = parseInt(localStorage.getItem("amulets") || "0");
        amulets -= cost;
        localStorage.setItem("amulets", amulets);
    }
    updateCreditsDisplay();

    // Apply the effect
    setActiveLuck(multiplier, minutes);

    confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    document.getElementById("msg-potion").innerText = `Potion activated: ${multiplier}x for ${minutes}m! 🎉`;
}