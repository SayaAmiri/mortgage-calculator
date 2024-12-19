const emptyCalculate = document.getElementById("empty-calculate");
const resultCalculate = document.getElementById("result-calculate");
const radiop = document.getElementById("radio-p");
const array = ["amount", "terms", "rate"];

array.forEach((i) => {
  const div = document.getElementById(i + "-div");
  const p = div.querySelector("p");
  const spanElement = div.querySelector("span");
  const inputElement = div.querySelector("input");
  inputElement.addEventListener("input", () => {
    if (spanElement.classList.contains("needfield")) {
      if (inputElement.value) {
        spanElement.classList.remove("danger-bg");
        inputElement.classList.remove("danger-border","border-danger");
        p.classList.add("d-none");
      } else {
        spanElement.classList.add("danger-bg");
        inputElement.classList.add("danger-border","border-danger");
        p.classList.remove("d-none");
      }
    }
  });
  inputElement.addEventListener("blur", () => {
    if (inputElement.value) {
      spanElement.classList.remove("needfield");
    }
  });
})

const radio = document.getElementsByName("paytype");

radio.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    document.querySelectorAll(".type-div").forEach((div) => {
      div.classList.remove("bg-border-lime");
      div.classList.add("border-black");
    });
    if (radioButton.checked) {
      const parentDiv = radioButton.closest(".type-div");
      parentDiv.classList.remove("border-black");
      parentDiv.classList.add("bg-border-lime");
      radiop.classList.add("d-none");
    }
  });
});

function calculate() {
  array.forEach((i) => {
    const div = document.getElementById(i + "-div");
    const p = div.querySelector("p");
    const spanElement = div.querySelector("span");
    const inputElement = div.querySelector("input");

    if (!inputElement.value) {
      p.innerHTML = "This field is required";
      p.classList.remove("d-none");
      spanElement.classList.add("needfield", "danger-bg");
      inputElement.classList.add("danger-border");
    } else {
      p.classList.add("d-none");
      spanElement.classList.remove("danger-bg");
      inputElement.classList.remove("danger-border");
    }
  });
  let selectedvalue;
  for (let x = 0; x < radio.length; x++) {
    if (radio[x].checked) {
      if (typeof radio[x].checked !== "undefinded") {
        selectedvalue = radio[x].value;
      }
    }

    if (selectedvalue) {
      radiop.classList.add("d-none");
    } else {
      radiop.innerHTML = "This field is required";
      radiop.classList.remove("d-none");
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
      emptyCalculate.classList.remove("d-flex");
      emptyCalculate.classList.add("d-none");
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
  emptyCalculate.classList.remove("d-none");
  emptyCalculate.classList.add("d-flex");
  resultCalculate.classList.add("d-none");

  document.querySelectorAll(".type-div").forEach((div) => {
    div.classList.remove("bg-border-lime");
    div.classList.add("border-black");
  });

  array.forEach((i) => {
    const div = document.getElementById(i + "-div");
    const spanElement = div.querySelector("span");
    const inputElement = div.querySelector("input");

    spanElement.classList.remove("danger-bg","needfield");
    inputElement.classList.remove("danger-border");
  });
}
