function toggleMode(mode) {
    if (mode === 'auto') {
        document.getElementById('auto-mode').style.display = 'block';
        document.getElementById('manual-mode').style.display = 'none';
    } else {
        document.getElementById('auto-mode').style.display = 'none';
        document.getElementById('manual-mode').style.display = 'block';
        generateManualInputs('attacker');
        generateManualInputs('defender');
    }
    document.getElementById('result').innerHTML = '';
}

function generateManualInputs(player) {
    const diceCount = parseInt(document.getElementById(`${player}-dice-manual`).value);
    const container = document.getElementById(`${player}-inputs`);
    container.innerHTML = '';

    for (let i = 1; i <= diceCount; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 6;
        input.placeholder = `Dado ${i}`;
        input.id = `${player}-die-${i}`;
        container.appendChild(input);
    }
}

function rollDice(times) {
    const rolls = [];
    for (let i = 0; i < times; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    return rolls.sort((a, b) => b - a);
}

function simulateBattle() {
    const attackerDice = Math.min(3, Math.max(1, parseInt(document.getElementById('attacker-dice').value)));
    const defenderDice = Math.min(2, Math.max(1, parseInt(document.getElementById('defender-dice').value)));

    const attackerRolls = rollDice(attackerDice);
    const defenderRolls = rollDice(defenderDice);

    displayResult(attackerRolls, defenderRolls);
}

function manualBattle() {
    const attackerDice = parseInt(document.getElementById('attacker-dice-manual').value);
    const defenderDice = parseInt(document.getElementById('defender-dice-manual').value);

    const attackerRolls = [];
    const defenderRolls = [];

    for (let i = 1; i <= attackerDice; i++) {
        const val = parseInt(document.getElementById(`attacker-die-${i}`).value);
        if (isNaN(val) || val < 1 || val > 6) {
            alert(`Atacante: Ingresa un valor válido (1-6) para el dado ${i}.`);
            return;
        }
        attackerRolls.push(val);
    }

    for (let i = 1; i <= defenderDice; i++) {
        const val = parseInt(document.getElementById(`defender-die-${i}`).value);
        if (isNaN(val) || val < 1 || val > 6) {
            alert(`Defensor: Ingresa un valor válido (1-6) para el dado ${i}.`);
            return;
        }
        defenderRolls.push(val);
    }

    attackerRolls.sort((a, b) => b - a);
    defenderRolls.sort((a, b) => b - a);

    displayResult(attackerRolls, defenderRolls);
}

function displayResult(attackerRolls, defenderRolls) {
    let attackerLosses = 0;
    let defenderLosses = 0;

    for (let i = 0; i < Math.min(attackerRolls.length, defenderRolls.length); i++) {
        if (attackerRolls[i] > defenderRolls[i]) {
            defenderLosses++;
        } else {
            attackerLosses++;
        }
    }

    document.getElementById('result').innerHTML = `
        <p><strong>Atacante:</strong> ${attackerRolls.join(', ')}</p>
        <p><strong>Defensor:</strong> ${defenderRolls.join(', ')}</p>
        <p><strong>Resultado:</strong> Atacante pierde ${attackerLosses} tropa(s), Defensor pierde ${defenderLosses} tropa(s).</p>
    `;
}

function reset() {
    document.getElementById('attacker-dice').value = 3;
    document.getElementById('defender-dice').value = 2;
    document.getElementById('attacker-dice-manual').value = 3;
    document.getElementById('defender-dice-manual').value = 2;
    document.getElementById('attacker-inputs').innerHTML = '';
    document.getElementById('defender-inputs').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    toggleMode('auto');
}
