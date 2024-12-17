const mealPrices = {
    veg: 100,
    nonveg: 150,
    special: 200
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
    const vegQuantity = parseInt(document.getElementById('veg-quantity').value);
    const nonvegQuantity = parseInt(document.getElementById('nonveg-quantity').value);
    const specialQuantity = parseInt(document.getElementById('special-quantity').value);

    const totalPrice = (vegQuantity * mealPrices.veg) +
                       (nonvegQuantity * mealPrices.nonveg) +
                       (specialQuantity * mealPrices.special);

    document.getElementById('total-price').innerText = `Total Price: ₹${totalPrice}`;
}

function showDetailsForm() {
    const vegQuantity = parseInt(document.getElementById('veg-quantity').value);
    const nonvegQuantity = parseInt(document.getElementById('nonveg-quantity').value);
    const specialQuantity = parseInt(document.getElementById('special-quantity').value);

    const totalQuantity = vegQuantity + nonvegQuantity + specialQuantity;

    if (totalQuantity > 0) {
        const totalPrice = (vegQuantity * mealPrices.veg) +
                           (nonvegQuantity * mealPrices.nonveg) +
                           (specialQuantity * mealPrices.special);

        document.getElementById('total-price-display').innerText = `₹${totalPrice}`;
        document.getElementById('tiffin-options').style.display = 'none';
        document.getElementById('student-details').style.display = 'block';
    } else {
        alert('Please select at least one meal option before proceeding.');
    }
}

function validateForm() {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const hostel = document.getElementById('hostel').value;
    const room = document.getElementById('room').value;

    if (name && mobile && hostel && room) {
        const vegQuantity = parseInt(document.getElementById('veg-quantity').value);
        const nonvegQuantity = parseInt(document.getElementById('nonveg-quantity').value);
        const specialQuantity = parseInt(document.getElementById('special-quantity').value);

        const totalPrice = (vegQuantity * mealPrices.veg) +
                           (nonvegQuantity * mealPrices.nonveg) +
                           (specialQuantity * mealPrices.special);

        alert('Order placed successfully!');
        document.getElementById('student-details').style.display = 'none';
        document.getElementById('thank-you-page').style.display = 'block';
        document.querySelector('.qr-code').style.textAlign = 'center'; // Center QR code
        document.querySelector('.qr-code').style.marginTop = '20px';

        // Display total amount in large size
        const totalAmount = document.createElement('p');
        totalAmount.textContent = `Amount to Pay: ₹${totalPrice}`;
        totalAmount.style.textAlign = 'center';
        totalAmount.style.marginTop = '20px';
        totalAmount.style.fontSize = '1.5rem';
        totalAmount.style.fontWeight = 'bold';
        document.getElementById('thank-you-page').appendChild(totalAmount);

        const note = document.createElement('p');

        note.textContent = 'Kindly put your mobile number in the remarks';
        note.style.textAlign = 'center';
        note.style.marginTop = '10px';
        note.style.fontSize = '1rem';
        note.style.fontWeight = '1rem';
        document.getElementById('thank-you-page').appendChild(note); // Add note to thank you page
        return false;
    } else {
        alert('Please fill all the details');
        return false;
    }
}


function goBack() {
    document.getElementById('student-details').style.display = 'none';
    document.getElementById('tiffin-options').style.display = 'block';
}