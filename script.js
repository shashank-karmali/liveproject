const mealPrices = {
    veg: 130,
    nonveg: 130,
    special: 130
};

function updateQuantity(inputId, operation, mealType) {
    const input = document.getElementById(inputId);
    let currentValue = parseInt(input.value);

    if (operation === 'increment' && currentValue < 9) {
        input.value = currentValue + 1;
    } else if (operation === 'decrement' && currentValue > 0) {
        input.value = currentValue - 1;
    }

    updateTotalPrice();
}

function updateTotalPrice() {
    const quantities = ['veg', 'nonveg', 'special'].map(type => ({
        type,
        quantity: parseInt(document.getElementById(`${type}-quantity`).value)
    }));

    const totalPrice = quantities.reduce((total, item) => total + (item.quantity * mealPrices[item.type]), 0);

    document.getElementById('total-price').innerText = `Total Price: ₹${totalPrice}`;
    document.getElementById('total-price-display').innerText = `₹${totalPrice}`;
    
    const amountToPayElement = document.getElementById('amount-to-pay');
    if (amountToPayElement) {
        amountToPayElement.innerText = `₹${totalPrice}`;
    }
}

function showDetailsForm() {
    const totalQuantity = ['veg', 'nonveg', 'special'].reduce((total, type) =>
        total + parseInt(document.getElementById(`${type}-quantity`).value), 0);

    if (totalQuantity > 0) {
        updateTotalPrice();
        document.getElementById('tiffin-options').style.display = 'none';
        document.getElementById('student-details').style.display = 'block';
    } else {
        alert('Please select at least one meal option before proceeding.');
    }
}

function validateForm() {
    const fields = ['name', 'mobile', 'hostel', 'room'];
    const missingField = fields.find(field => !document.getElementById(field).value);

    if (missingField) {
        alert(`Please fill the ${missingField} field.`);
        return false;
    }

    const mobile = document.getElementById('mobile').value;
    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return false;
    }

    sendToGoogleSheets();
    return false;
}

function sendToGoogleSheets() {
    const data = {
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        hostel: document.getElementById('hostel').value,
        room: document.getElementById('room').value,
        vegQuantity: parseInt(document.getElementById('veg-quantity').value),
        nonvegQuantity: parseInt(document.getElementById('nonveg-quantity').value),
        specialQuantity: parseInt(document.getElementById('special-quantity').value),
        totalPrice: parseInt(document.getElementById('total-price-display').innerText.replace('₹', ''))
    };

    fetch("https://script.google.com/macros/s/AKfycbw1TyUWA5hKGOJCwquZsLgEXimblXZk84yG3mkHBJPbAsZtDrf73Tc_ojUkq_xxMWmgfw/exec", {
        method: "POST",
        body: new URLSearchParams(data)
    })
        .then(response => response.text())
        .then(result => console.log("Success:", result))
        .catch(error => console.error("Error:", error));

    document.getElementById('student-details').style.display = 'none';
    document.getElementById('thank-you-page').style.display = 'block';
}

// Set the deadline time to today's 8:00 PM
const deadline = new Date();
deadline.setHours(09, 00, 0, 0); // 20:00 is 8 PM

// Update timer every second
function updateTimer() {
    const now = new Date();
    const timeRemaining = Math.max(0, deadline - now); // Calculate time left in milliseconds

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    const timerElement = document.getElementById('timer');
    const nextButton = document.querySelector("button[onclick='showDetailsForm()']");
    const orderMessage = timerElement.parentElement;

    if (timeRemaining > 0) {
        // Update timer display (hours, minutes, seconds)
        timerElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        // Time's up: Disable the button and update the message
        timerElement.textContent = "00:00:00";
        nextButton.disabled = true;
        nextButton.classList.add('disabled'); // Add the CSS class
        orderMessage.innerHTML = `<h4>Kitchen Closed</h4>`;
    }
}

// Start the timer update loop
setInterval(updateTimer, 1000);



function goBack() {
    // Hide the student details section
    document.getElementById('student-details').style.display = 'none';
    
    // Show the tiffin options section
    document.getElementById('tiffin-options').style.display = 'block';
}

