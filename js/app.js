"use strict";

// checks for textbox number validation and decimal
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function onReady() {
    var artichokeTextBox = document.getElementById('artichokeWeight');
    var beetTextBox = document.getElementById('beetWeight');
    var carrotTextBox = document.getElementById('carrotWeight');

    var buttonSubmit = document.getElementById('submitButton');
    var buttonClear = document.getElementById('clearButton');
    var buttonFinish = document.getElementById('finishButton');
    var buttonReset = document.getElementById('resetButton');
    var buttonExit = document.getElementById('exitButton');
    var outputTextBox = document.getElementById('outputBox');

    var artichokeWt = 0;
    var beetWt = 0;
    var carrotWt = 0;
    var weight = 0;
    var totalRevenue = 0;
    var numberOfOrders = 0;

    // disable certain controls when app starts
    buttonClear.disabled = true;
    buttonFinish.disabled = true;
    buttonReset.disabled = true;

    // when you click submit, determines the display cost, shipping cost, and total cost
    buttonSubmit.addEventListener('click', function() {
        var line;

        artichokeWt = parseFloat(artichokeTextBox.value);
        beetWt =  parseFloat(beetTextBox.value);
        carrotWt =  parseFloat(carrotTextBox.value);

        var rawCost = calculateRawCost();
        var shippingCost = calculateShippingCost();

        if (rawCost > 100) { // if the raw cost of vegetables over $100, discount 5%
            rawCost *= 0.95;
        }
        var totalCost = rawCost + shippingCost;

        displayText("Raw Cost: $" + (rawCost).toFixed(2)); // round two 2 decimals
        displayText("Shipping Cost: $" + (shippingCost).toFixed(2)); // round two 2 decimals
        var lastLi = displayText("Total Cost: $" + (totalCost).toFixed(2)); // round two 2 decimals
        lastLi.style.marginBottom = '1em'; // creates a line break

        totalRevenue += rawCost;
        numberOfOrders++;

        enableControlGroup(); // enables clear, finish and reset
    });

    // when you click clear, clears all textboxes and sets focus to first textbox
    buttonClear.addEventListener('click', function() {
        clearInputs();
    });

    // finish button, provides summary data on total price of orders, number of orders, and avg price of orders
    buttonFinish.addEventListener('click', function() {
        var avgOrderPrice;
        if (numberOfOrders > 0) {
            avgOrderPrice = totalRevenue / numberOfOrders;
        } else {
            avgOrderPrice = 0;
        }

        displayText("Total Price of Order is: $" + (totalRevenue).toFixed(2));
        displayText("Number of Orders is: " + numberOfOrders);
        var lastLi = displayText("Average Price per Order is: $" + (avgOrderPrice).toFixed(2));
        lastLi.style.marginBottom = '1em'; // creates a line break
    });

    // reset button, sets all values back to 0 and disables certain controls as well as focuses on artichoke txtbox
    buttonReset.addEventListener('click', function() {
        artichokeWt = 0;
        beetWt = 0;
        carrotWt = 0;
        weight = 0;
        totalRevenue = 0;
        numberOfOrders = 0;

        disableControlGroup();
        clearInputs();
    });

    // exit button, confirms whether user wishes to leave and redirects to Google homepage
    buttonExit.addEventListener('click', function() {
        if (window.confirm('Are you really sure you want to leave?')) {
            window.location = 'https://www.youtube.com/watch?v=3GwjfUFyY6M';
        }
    });

    // calculates raw cost of vegetables by weight
    var calculateRawCost = function() {
        return (artichokeWt * 2.67) + (beetWt * 1.49) + (carrotWt * .67);
    };

    // calculates shipping cost
    var calculateShippingCost = function() {
        weight = artichokeWt + beetWt + carrotWt;
        var shippingCost;

        if (weight <= 5) {
            shippingCost = 3.50;
        } else if (weight <= 20) {
            shippingCost = 10;
        } else {
            shippingCost = 9.5 + weight * 0.10;
        }
        return shippingCost;
    };

    // enables clear, finish and reset button
    var enableControlGroup = function() {
        buttonClear.disabled = false;
        buttonFinish.disabled = false;
        buttonReset.disabled = false;
    };

    // disables clear, finish and reset button
    var disableControlGroup = function() {
        buttonClear.disabled = true;
        buttonFinish.disabled = true;
        buttonReset.disabled = true;
    };

    var clearInputs = function () {
        artichokeTextBox.value="";
        beetTextBox.value="";
        carrotTextBox.value="";
        artichokeTextBox.focus();
    };

    var displayText = function (line) {
        var li = document.createElement('li');
        var text = document.createTextNode(line);
        li.appendChild(text);
        outputTextBox.appendChild(li);
        return li;
    };
}

document.addEventListener('DOMContentLoaded', onReady);