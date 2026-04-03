window.onload = function() {
    const rollLocks = localStorage.getItem('rollLocks') === 'true';
    document.getElementById('rollLocks').checked = rollLocks;
};

function applySettings() {
    const rollLocks = document.getElementById('rollLocks').checked;
    localStorage.setItem('rollLocks', rollLocks);
    alert('Settings applied!');

}