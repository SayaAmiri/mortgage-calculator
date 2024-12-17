const array = ["amount", "terms", "rate"];

array.forEach((i) => {
  const div = document.getElementById(i + "-div");
  const p = document.getElementById(i + "-p");
  const spanElement = div.querySelector("span");
  const inputElement = div.querySelector("input");
  inputElement.addEventListener("input", () => {
    if (spanElement.classList.contains("needfield")) {
      if (inputElement.value) {
        spanElement.classList.remove("opacity-100", "border-danger", "text-white", "bg-danger");
        inputElement.classList.remove("border-danger");
        p.classList.add("d-none");
      } else {
        spanElement.classList.add("opacity-100", "border-danger", "text-white", "bg-danger");
        inputElement.classList.add("border-danger");
        p.classList.remove("d-none");
      }
    }
  });
  inputElement.addEventListener("blur", () => {
    if (inputElement.value) {
      spanElement.classList.remove("needfield");
    }
  })
})

array.forEach((i) => {
  const div = document.getElementById(i + "-div");
  const p = document.getElementById(i + "-p");
  const spanElement = div.querySelector("span");
  const inputElement = div.querySelector("input");
  inputElement.addEventListener("focus", () => {
    spanElement.classList.remove("opacity-50", "border-black");
    spanElement.classList.add("opacity-100", "border-warning", "text-black-50", "bg-warning");
    inputElement.classList.add("border", "border-2", "border-warning");
  });
  inputElement.addEventListener("blur", () => {
    if (!spanElement.classList.contains("needfield")) {
      spanElement.classList.add("opacity-50", "border-black");
      inputElement.classList.remove("border-2");
    }
    spanElement.classList.remove("opacity-100", "border-warning", "text-black-50", "bg-warning");
    inputElement.classList.remove("border", "border-warning");
  });
});

const radio = document.getElementsByName("paytype");

radio.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    document.querySelectorAll(".type-div").forEach((div) => {
      div.classList.remove("bg-lightlime", "limecolor-for-border", "border-1");
      div.classList.add("border-black");
      radioButton.classList.remove("limecolor-accent");
    });

    if (radioButton.checked) {
      const parentDiv = radioButton.closest(".type-div");
      parentDiv.classList.remove("border-black");
      parentDiv.classList.add("bg-lightlime", "limecolor-for-border", "border-1");
      radioButton.classList.add("limecolor-accent");
      document.getElementById("radio-p").classList.add("d-none");
    }
  });
});

function calculate() {
  array.forEach((i) => {
    const div = document.getElementById(i + "-div");
    const p = document.getElementById(i + "-p");
    const spanElement = div.querySelector("span");
    const inputElement = div.querySelector("input");

    if (!inputElement.value) {
      p.innerHTML = "This field is required";
      p.classList.remove("d-none");
      spanElement.classList.remove("opacity-50", "border-black");
      spanElement.classList.add("needfield", "opacity-100", "border-danger", "text-white", "bg-danger"
      );
      inputElement.classList.add("border", "border-2", "border-danger");
    } else {
      p.classList.add("d-none");
      spanElement.classList.add("opacity-50", "border-black");
      spanElement.classList.remove("opacity-100", "border-danger", "text-white", "bg-danger"
      );
      inputElement.classList.remove("border", "border-2", "border-danger"
      );
    }
  });
  const radiop = document.getElementById("radio-p");
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
      const emptyCalculate = document.getElementById("empty-calculate");
      emptyCalculate.classList.remove("d-flex");
      emptyCalculate.classList.add("d-none");
    
      const resultCalculate = document.getElementById("result-calculate");
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
      bigTitleResult.style.color="hsl(0, 100%, 56%)";
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

  const emptyCalculate = document.getElementById("empty-calculate");
  emptyCalculate.classList.remove("d-none");
  emptyCalculate.classList.add("d-flex");

  const resultCalculate = document.getElementById("result-calculate");
  resultCalculate.classList.add("d-none");

  document.querySelectorAll(".type-div").forEach((div) => {
    div.classList.remove("bg-lightlime", "limecolor-for-border", "border-1"
    );
    div.classList.add("border-black");
  });

  array.forEach((i) => {
    const div = document.getElementById(i + "-div");
    const p = document.getElementById(i + "-p");
    const spanElement = div.querySelector("span");
    const inputElement = div.querySelector("input");

    p.classList.add("d-none");
    spanElement.classList.add("opacity-50", "border-black");
    spanElement.classList.remove("opacity-100", "border-danger", "text-white", "bg-danger"
    );
    inputElement.classList.remove("border", "border-2", "border-danger"
    );
    spanElement.classList.remove("needfield");
  });
}