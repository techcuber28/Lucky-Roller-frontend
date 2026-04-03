const codes = ['Z2ltbWVhbXVsZXQ=', 'YXdhc3Rlb2Z0aW1l', 'ZG9udGJvbWJteWhvdXNlcGxlYXNl'];

function _addToStorageNumber(key, amount) {
    const current = parseInt(localStorage.getItem(key)) || 0;
    localStorage.setItem(key, String(current + amount));
}

function redeemCode() {
    const codeInput = prompt("Enter your code:");
    if (codeInput === null) return;
    const code = codeInput.trim();

    let handled = false;

    switch (code) {
        case atob(codes[0]):
            handled = true;
            if (localStorage.getItem("code0redeemed") === "true") {
                alert("This code has already been redeemed.");
            } else {
                localStorage.setItem("code0redeemed", "true");
                _addToStorageNumber("amulets", 1);
                alert("Code redeemed! You've received 1 amulet 🧿.");
            }
            break;
        case atob(codes[1]):
            handled = true;
            if (localStorage.getItem("code1redeemed") === "true") {
                alert("This code has already been redeemed.");
            } else {
                localStorage.setItem("code1redeemed", "true");
                _addToStorageNumber("commonCredits", 1);
                alert("Code redeemed! You've received 1 common credit ⚪. Time successfully wasted! :)");
            }
            break;
        case atob(codes[2]):
            handled = true;
            if (localStorage.getItem("code2redeemed") === "true") {
                alert("This code has already been redeemed.");
            } else {
                localStorage.setItem("code2redeemed", "true");
                _addToStorageNumber("b2BomberShards", 1);
                alert("Code redeemed! You've unlocked the B2 Bomber artifact! 🛩️💣");
            }
            break;
    }

    if (!handled) {
        alert("Invalid code. Please try again.");
    }
}