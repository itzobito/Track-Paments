let totalPayments = 0;
let rewards = 0;
let paymentCount = 0;
const spendingCategories = {
    business: [],
    personal: [],
    party: [],
    food: [],
    entertainment: []
};

document.getElementById('tracker-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // Update total payments and rewards
    totalPayments += amount;
    rewards += amount * 0.01; // 1% reward
    paymentCount++;

    // Add payment to the respective category
    spendingCategories[category].push(amount);

    // Update the display
    document.getElementById('total-payments').innerText = totalPayments.toFixed(2);
    document.getElementById('rewards').innerText = rewards.toFixed(2);

    // Update spending breakdown
    updateSpendingBreakdown();

    // Show message after every 10 payments
    if (paymentCount % 10 === 0) {
        showSpendingSummary();
    }

    // Clear the input fields
    document.getElementById('amount').value = '';
});

// Function to update spending breakdown
function updateSpendingBreakdown() {
    // Clear previous lists
    for (const category in spendingCategories) {
        const list = document.getElementById(`${category}-list`);
        list.innerHTML = ''; // Clear the list
        spendingCategories[category].forEach(amount => {
            const listItem = document.createElement('li');
            listItem.innerText = `${amount.toFixed(2)} Rupees`;
            list.appendChild(listItem);
        });
    }
}

// Function to show spending summary
function showSpendingSummary() {
    let summaryMessage = 'Spending Summary:\n';
    for (const category in spendingCategories) {
        const totalSpent = spendingCategories[category].reduce((acc, curr) => acc + curr, 0);
        const percentage = (totalSpent / totalPayments) * 100 || 0; // Avoid division by zero
        summaryMessage += `${category.charAt(0).toUpperCase() + category.slice(1)}: ${totalSpent.toFixed(2)} Rupees (${percentage.toFixed(2)}%)\n`;
    }
    alert(summaryMessage);
}