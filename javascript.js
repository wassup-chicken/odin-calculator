const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");
const ops = ["/", "*", "+", "-"];

let currValue;
let prevValue = null;
let operator;
let oped = false;

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Add visual feedback
    btn.style.transform = "translateY(0)";
    setTimeout(() => {
      btn.style.transform = "";
    }, 100);

    // Add screen update animation
    screen.classList.add("updating");
    setTimeout(() => {
      screen.classList.remove("updating");
    }, 300);

    switch (e.target.value) {
      case "c":
        screen.textContent = "0";
        currValue = null;
        prevValue = null;
        operator = null;
        oped = false;
        break;
      case "1":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "1";
          oped = false;
        } else {
          screen.textContent += "1";
        }
        break;
      case "2":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "2";
          oped = false;
        } else {
          screen.textContent += "2";
        }
        break;
      case "3":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "3";
          oped = false;
        } else {
          screen.textContent += "3";
        }
        break;
      case "4":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "4";
          oped = false;
        } else {
          screen.textContent += "4";
        }
        break;
      case "5":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "5";
          oped = false;
        } else {
          screen.textContent += "5";
        }
        break;
      case "6":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "6";
          oped = false;
        } else {
          screen.textContent += "6";
        }
        break;
      case "7":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "7";
          oped = false;
        } else {
          screen.textContent += "7";
        }
        break;
      case "8":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "8";
          oped = false;
        } else {
          screen.textContent += "8";
        }
        break;
      case "9":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "9";
          oped = false;
        } else {
          screen.textContent += "9";
        }
        break;
      case "0":
        if (screen.textContent === "0" || oped) {
          screen.textContent = "0";
          oped = false;
        } else {
          screen.textContent += "0";
        }
        break;
      case ".":
        if (oped) {
          screen.textContent = "0.";
          oped = false;
        } else if (screen.textContent.indexOf(".") === -1) {
          screen.textContent += ".";
        }
        break;
      case "*":
        handleOperator("*");
        break;
      case "+":
        handleOperator("+");
        break;
      case "-":
        handleOperator("-");
        break;
      case "/":
        handleOperator("/");
        break;
      case "=":
        if (prevValue !== null && operator !== null) {
          currValue = parseFloat(screen.textContent);
          const result = calculate(prevValue, currValue, operator);
          screen.textContent = result;
          prevValue = null;
          operator = null;
          oped = true;
        }
        break;
    }
  });
});

function handleOperator(op) {
  if (prevValue !== null && operator !== null) {
    currValue = parseFloat(screen.textContent);
    const result = calculate(prevValue, currValue, operator);
    screen.textContent = result;
    prevValue = result;
  } else {
    prevValue = parseFloat(screen.textContent);
  }
  operator = op;
  oped = true;
}

function calculate(prev, curr, operator) {
  switch (operator) {
    case "+":
      return prev + curr;
    case "-":
      return prev - curr;
    case "*":
      return prev * curr;
    case "/":
      return curr !== 0 ? prev / curr : 0;
    default:
      return curr;
  }
}

// Add keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Prevent default for calculator keys
  if (
    "0123456789+-*/.=cC".includes(key) ||
    key === "Enter" ||
    key === "Escape"
  ) {
    e.preventDefault();
  }

  let buttonValue = null;

  switch (key) {
    case "Enter":
      buttonValue = "=";
      break;
    case "Escape":
    case "c":
    case "C":
      buttonValue = "c";
      break;
    case "Backspace":
      // Handle backspace to clear or delete last character
      if (screen.textContent.length > 1) {
        screen.textContent = screen.textContent.slice(0, -1);
      } else {
        screen.textContent = "0";
        currValue = null;
        prevValue = null;
        operator = null;
        oped = false;
      }
      return;
    default:
      if ("0123456789+-*/.".includes(key)) {
        buttonValue = key;
      }
  }

  if (buttonValue) {
    const button = document.querySelector(`button[value="${buttonValue}"]`);
    if (button) {
      button.click();
    }
  }
});
