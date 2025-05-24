//To add all countries to the select options.
let liSelect = document.querySelectorAll(".list select");

for (let item of liSelect) {
    for (let code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        newoption.style.color = "black";
        item.append(newoption);
    }

    item.addEventListener("change", (e) => {
        newFlag(e.target)
    })
}

//To update the country flag based on the selected option.
function newFlag(ele) {
    let code = ele.value;
    let countryCode = countryList[code];
    let img = ele.parentElement.querySelector("img");
    let nSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    img.src = nSrc;
}

//To add the feature that can exchange both the country when we click on the exchage icon.
let exchange = document.querySelector("#exchange");

exchange.addEventListener("click", () => {
    let fCountry = document.querySelector(".from select");
    let tCountry = document.querySelector(".to select");

    //Swap selected values.
    let temp = fCountry.value;
    fCountry.value = tCountry.value;
    tCountry.value = temp;

    //Update flags.
    newFlag(fCountry);
    newFlag(tCountry);
    main();
})

//Main function that convert the currency from one country to another.
let button = document.querySelector("button");
button.addEventListener("click", main);

function main() {
    let result = document.querySelector("#result");
    let fCountry = document.querySelector(".from select").value;
    let tCountry = document.querySelector(".to select").value;

    //Fetch Exchange rates from API.
    fetch("https://api.exchangeratesapi.io/v1/latest?access_key=5eb792f90bb5d842fef92d810f54c0cb&format=1")

        .then(response => {
            console.log(response.status)
            return response.json()
        })
        .then(data => {
            let input = document.querySelector("input");
            let amount = input.value;

            if (amount == "" || amount < 1) {
                result.innerText = " Please enter the valid number.";
            }
            else {
                const rate = data.rates[tCountry] / data.rates[fCountry];
                let fValue = amount * rate;
                result.innerText = `${fValue} ${tCountry}`;
            }

        })
        .catch(err => {
            result.innerText = "Failed to fetch currency data.";
            console.error(err);
        });
}
