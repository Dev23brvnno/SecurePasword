function generatePassword(length, useSymbols, useNumbers, useLetters) {
    let charset = "";
    const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/~";
    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (useSymbols) charset += symbols;
    if (useNumbers) charset += numbers;
    if (useLetters) charset += letters;
    
    if (charset === "") {
        alert("Por favor, selecciona al menos un tipo de carácter.");
        return "";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Asegurar que al menos un carácter de cada tipo seleccionado esté presente
    if (useSymbols && !containsAny(password, symbols)) {
        password = replaceRandomChar(password, getRandomChar(symbols));
    }
    if (useNumbers && !containsAny(password, numbers)) {
        password = replaceRandomChar(password, getRandomChar(numbers));
    }
    if (useLetters && !containsAny(password, letters)) {
        password = replaceRandomChar(password, getRandomChar(letters));
    }

    return password;
}

function containsAny(str, charset) {
    return [...charset].some(char => str.includes(char));
}

function getRandomChar(charset) {
    return charset.charAt(Math.floor(Math.random() * charset.length));
}

function replaceRandomChar(str, char) {
    const index = Math.floor(Math.random() * str.length);
    return str.substring(0, index) + char + str.substring(index + 1);
}

document.getElementById('generate').addEventListener('click', function() {
    const length = parseInt(document.getElementById('length').value);
    const useSymbols = document.getElementById('symbols').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useLetters = document.getElementById('letters').checked;
    
    const password = generatePassword(length, useSymbols, useNumbers, useLetters);
    document.getElementById('password').textContent = password;
});

document.getElementById('copyButton').addEventListener('click', function() {
    const password = document.getElementById('password').textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(function() {
            alert('Contraseña copiada al portapapeles');
        }, function(err) {
            console.error('No se pudo copiar la contraseña: ', err);
        });
    } else {
        alert('No hay contraseña para copiar. Genera una primero.');
    }
});