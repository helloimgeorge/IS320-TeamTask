"use strict";

function onReady() {
    var artichokeWt;
    var beetWt;
    var carrotWt;
    var weight;
    var vegetableCost;
    var shippingCost;

    var buttonSubmit = document.getElementById('orderButton');
    console.log("Working");

    // when you click order
    buttonSubmit.addEventListener('click', function() {
        artichokeWt = parseFloat(document.getElementById('artichokeWeight').value); // how to make it a number?
        beetWt =  parseFloat(document.getElementById('beetWeight').value); // how to make it a number?
        carrotWt =  parseFloat(document.getElementById('carrotWeight').value); // how to make it a number?

        console.log(artichokeWt);
        console.log(beetWt);
        console.log(carrotWt);
        calculateRawCost();
        weight = calculateWeight();
        calculateShippingCost();

        //console.log(shippingCost);

    });

    var calculateRawCost = function() {
        vegetableCost = (artichokeWt * 2.67) + (beetWt * 1.49) + (carrotWt * .67); // how to properly convert
        console.log(vegetableCost);
    };

    var calculateWeight = function() {
        weight = artichokeWt + beetWt + carrotWt;
    };

    var calculateShippingCost = function() {
        if (weight <= 5) {
            shippingCost = 3.50;
        } else if (weight <= 20) {
            shippingCost = 10;
        } else {
            shippingCost = 9.5 + weight * 0.10;
        }

        // convert shippingCost to a number

    }
}



document.addEventListener('DOMContentLoaded', onReady);