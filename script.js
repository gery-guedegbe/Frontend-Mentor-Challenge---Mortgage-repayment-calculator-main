document.querySelectorAll(".form-input").forEach((formInput) => {
  formInput.addEventListener("mouseenter", () => {
    formInput.classList.add("hover");
  });
  formInput.addEventListener("mouseleave", () => {
    formInput.classList.remove("hover");
  });
});

const radioInputs = document.querySelectorAll(".radio-input");

radioInputs.forEach((input) => {
  input.addEventListener("click", () => {
    // Retirer la classe active de tous les labels
    document.querySelectorAll("label").forEach((label) => {
      label.classList.remove("check");
    });
    // Ajouter la classe active uniquement au label parent du bouton radio cliqué
    input.closest("label").classList.add("check");
  });
});

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Réinitialise les messages d'erreur
  document.querySelectorAll(".error").forEach((elem) => {
    elem.style.maxHeight = "0";
    elem.style.visibility = "hidden";
  });

  // Vérification des champs
  const amountInput = document.getElementById("amount");
  const mortgageInput = document.getElementById("mortgage");
  const interestInput = document.getElementById("interest");
  const isRepayment = document.getElementById("repay").checked;
  const isInterestOnly = document.getElementById("interestOnly").checked;

  let isValid = true;

  if (!amountInput.value.trim()) {
    document.getElementById("error").style.maxHeight = "100px";
    document.getElementById("error").style.visibility = "visible";
    isValid = false;
  }

  if (!mortgageInput.value.trim()) {
    document.getElementById("error1").style.maxHeight = "100px";
    document.getElementById("error1").style.visibility = "visible";
    isValid = false;
  }

  if (!interestInput.value.trim()) {
    document.getElementById("error2").style.maxHeight = "100px";
    document.getElementById("error2").style.visibility = "visible";
    isValid = false;
  }

  if (!isRepayment && !isInterestOnly) {
    document.getElementById("error3").style.maxHeight = "100px";
    document.getElementById("error3").style.visibility = "visible";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Calculs
  const amount = parseFloat(amountInput.value);
  const mortgageYears = parseFloat(mortgageInput.value);
  const interestRate = parseFloat(interestInput.value);
  let monthlyPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = mortgageYears * 12;

  if (isRepayment) {
    monthlyPayment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
  } else {
    monthlyPayment = amount * monthlyInterestRate;
  }

  // Affichage des résultats
  const resultsCompleted = document.createElement("div");
  resultsCompleted.className = "results-completed";

  const resultsHeader = document.createElement("h1");
  resultsHeader.textContent = "Your results";
  resultsCompleted.appendChild(resultsHeader);

  const resultsParagraph = document.createElement("p");
  resultsParagraph.textContent =
    "Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.";
  resultsCompleted.appendChild(resultsParagraph);

  const resultInfos = document.createElement("div");
  resultInfos.className = "result-infos";
  resultsCompleted.appendChild(resultInfos);

  const monthlyRepay = document.createElement("div");
  monthlyRepay.className = "monthly-repay";
  resultInfos.appendChild(monthlyRepay);

  const monthlyRepayText = document.createElement("p");
  monthlyRepayText.textContent = "Your monthly repayments";
  monthlyRepay.appendChild(monthlyRepayText);

  const monthlyPriceDiv = document.createElement("div");
  monthlyPriceDiv.className = "monthly-price";
  monthlyPriceDiv.textContent = `£${monthlyPayment.toFixed(2)}`;
  monthlyRepay.appendChild(monthlyPriceDiv);

  const hr = document.createElement("hr");
  resultInfos.appendChild(hr);

  const totalRepay = document.createElement("div");
  totalRepay.className = "total-repay";
  resultInfos.appendChild(totalRepay);

  const totalRepayText = document.createElement("p");
  totalRepayText.textContent = "Total you'll repay over the term";
  totalRepay.appendChild(totalRepayText);

  const totalPriceDiv = document.createElement("div");
  totalPriceDiv.className = "total-price";
  const totalRepayAmount = monthlyPayment * totalPayments;
  totalPriceDiv.textContent = `£${totalRepayAmount.toFixed(2)}`;
  totalRepay.appendChild(totalPriceDiv);

  // Ajout des résultats au document
  document.querySelector(".right").innerHTML = "";
  document.querySelector(".right").appendChild(resultsCompleted);
});
