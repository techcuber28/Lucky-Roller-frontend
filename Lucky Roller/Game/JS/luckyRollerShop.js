function updateCreditsDisplay() {
    const common = parseInt(localStorage.getItem("commonCredits") || "0");
    const uncommon = parseInt(localStorage.getItem("uncommonCredits") || "0");
    const rare = parseInt(localStorage.getItem("rareCredits") || "0");

    document.getElementById("creditsDisplay").innerHTML =
        `Common Credits ⚪: ${common}<br>` +
        `Uncommon Credits 🟢: ${uncommon}<br>` +
        `Rare Credits 🔵: ${rare}`;
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
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

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