const form = document.getElementById('contactForm');
const consoleDiv = document.getElementById('console');

function logEvent(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    consoleDiv.appendChild(logEntry);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function validateName(name) {
    return name.trim().length > 0;
}

function validateIndianPhone(phone) {
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function downloadData(data) {
    const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_data.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function simulateNFCWrite(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            logEvent('NFC write signal sent');
            resolve();
        }, 1000);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    logEvent('Form submission started');

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!validateName(name)) {
        logEvent('Name validation failed');
        alert('Please enter a valid name');
        return;
    }

    if (!validateIndianPhone(phone)) {
        logEvent('Phone validation failed');
        alert('Please enter a valid Indian phone number (10 digits, starting with 6-9)');
        return;
    }

    if (!validateEmail(email)) {
        logEvent('Email validation failed');
        alert('Please enter a valid email address');
        return;
    }

    logEvent('All fields validated successfully');

    const data = { name, phone, email };
    downloadData(data);
    logEvent('Data downloaded as txt file');

    try {
        await simulateNFCWrite(data);
        logEvent('NFC write completed');
        alert('Form submitted successfully!');
    } catch (error) {
        logEvent('NFC write failed');
        alert('Error writing to NFC');
    }
});

logEvent('Form initialized');
