const emptyCalculate = document.getElementById("empty-calculate");
const resultCalculate = document.getElementById("result-calculate");
const radiop = document.getElementById("radio-p");
const radio = document.getElementsByName("paytype");
const array = ["amount", "terms", "rate"];

function getElementsByIdAndSelectors(id) {
  const div = document.getElementById(id + "-div");
  const p = div.querySelector("p");
  const spanElement = div.querySelector("span");
  const inputElement = div.querySelector("input");
  return { div, spanElement, inputElement, p };
}

array.forEach((i) => {
  const { div, spanElement, inputElement, p } = getElementsByIdAndSelectors(i);
  inputElement.addEventListener("input", () => {
    const hasValue = inputElement.value;
    if (spanElement.classList.contains("needfield")) {
        spanElement.classList.toggle("danger-bg",!hasValue);
        inputElement.classList.toggle("danger-border",!hasValue);
        p.classList.toggle("d-none",hasValue);
    }
  });
  inputElement.addEventListener("blur", () => {
    const hasValue = inputElement.value;
      spanElement.classList.toggle("needfield",!hasValue);
  });
});

radio.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    document.querySelectorAll(".type-div").forEach((div) => {
      div.classList.replace("bg-border-lime","border-black");
    });
    if (radioButton.checked) {
      const parentDiv = radioButton.closest(".type-div");
      parentDiv.classList.replace("border-black","bg-border-lime");
      radiop.classList.add("d-none");
    }
  });
});

function calculate() {
  array.forEach((i) => {
    const { div, spanElement, inputElement, p } = getElementsByIdAndSelectors(i);

    const hasValue = inputElement.value;
    p.innerHTML = !hasValue ? "This field is required" : "" ;
    p.classList.toggle("d-none",hasValue);
    inputElement.classList.toggle("danger-border",!hasValue);
    spanElement.classList.toggle("danger-bg",!hasValue);
    spanElement.classList.toggle("needfield",!hasValue);
  });

  let selectedvalue;
  for (let x = 0; x < radio.length; x++) {
    if (radio[x].checked) {
        selectedvalue = radio[x].value;
    }

    radiop.classList.toggle("d-none",!!selectedvalue);
    if (!selectedvalue) {
      radiop.innerHTML = "This field is required";
    }
  }

  function getInputValue(divId) {
    return parseFloat(
      document.getElementById(divId).querySelector("input").value
    );
  }

  const [amountValue, termsValue, rateValue] = ["amount-div", "terms-div", "rate-div",
  ].map(getInputValue);
  if (amountValue && termsValue && rateValue && selectedvalue) {
    const resultSection = document.getElementById("resultsec");
    const bigTitleResult = document.getElementById("big-title-result");
    const overPayDiv = document.getElementById("over-pay-div");
    function addResultRmEmptycal() {
      emptyCalculate.classList.replace("d-flex","d-none");
      resultCalculate.classList.remove("d-none");
    }
    if (selectedvalue == "Repayment") {
      bigTitleResult.style.color = "hsl(61, 70%, 52%)";
      resultSection.style.borderColor = "hsl(61, 70%, 52%)";
      resultSection.querySelector("p").innerHTML = "Your monthly repayments";
      bigTitleResult.innerHTML =
        "$" +
        Number(
          (
            amountValue *
            (((termsValue * rateValue) / 100 + 1) / (termsValue * 12))
          ).toFixed(2)
        ).toLocaleString();
      overPayDiv.querySelector("h2").innerHTML =
        "$" +
        Number(
          (amountValue * ((termsValue * rateValue) / 100 + 1)).toFixed(2)
        ).toLocaleString();
        overPayDiv.classList.remove("d-none");

      addResultRmEmptycal();
    }
    if (selectedvalue == "Interest-Only") {
      bigTitleResult.style.color = "hsl(0, 100%, 56%)";
      resultSection.style.borderColor = "hsl(0, 100%, 56%)";
      resultSection.querySelector("p").innerHTML = "Refund your interest";
      bigTitleResult.innerHTML =
        "$" +
        Number(
          (amountValue *
            (((termsValue * rateValue) / 100))
          ).toFixed(2)
        ).toLocaleString();
        overPayDiv.classList.add("d-none");
        
      addResultRmEmptycal();
    }
  }
}
function setEmpty() {
  const error = document.getElementsByClassName("error");
  for (let i = 0; i < error.length; i++) {
    error[i].classList.add("d-none");
  }
  emptyCalculate.classList.replace("d-none","d-flex");
  resultCalculate.classList.add("d-none");

  document.querySelectorAll(".type-div").forEach((div) => {
    div.classList.replace("bg-border-lime","border-black");
  });

  array.forEach((i) => {
    const { div, spanElement, inputElement } = getElementsByIdAndSelectors(i);

    spanElement.classList.remove("danger-bg","needfield");
    inputElement.classList.remove("danger-border");
  });
}
