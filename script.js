const allCheckBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done",
  "Just step away,keep going!",
  "Woaw..You just completed all the goals!Time for chill 😀",
];

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

let completedGoals = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${(completedGoals / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoals}/${inputFields.length} Completed`;
progressLabel.innerText = allQuotes[completedGoals];

allCheckBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalAdded) {
      checkbox.parentElement.classList.toggle("completed");
      // progressValue.style.width = "33.33%";
      const inputId = checkbox.nextElementSibling.id;
      console.log(inputId);
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoals = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${
        (completedGoals / inputFields.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoals}/${inputFields.length}  Completed`;
      progressLabel.innerText = allQuotes[completedGoals];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});
inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name;
      return;
    }

    (allGoals[input.id].name = input.value),
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
