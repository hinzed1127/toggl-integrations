"use strict"

// Main function. Set small timeout to let tasks/projects load.
setTimeout(createButton, 1000)

function createButton() {
  togglbutton.render(".timerBox:not(.toggl)", { observe: true }, function (elem) {
    const togglDiv = document.createElement("div")

    togglDiv.style.display = "inline-block"
    togglDiv.style.paddingRight = "10px"

    const link = togglbutton.createTimerLink({
      description: getTaskText(),
      projectName: getProjectName(),
      tags: ["Complice"],
      // className: "complice",
      // buttonType: "minimal",
    })

    togglDiv.appendChild(link)
    elem.prepend(togglDiv)
  })
}

const getTaskText = () => {
  const taskText = document.querySelector(".nowdothis .ndt-text").innerText
  return taskText.substring(taskText.lastIndexOf(")") + 1).trim()
}

const getProjectName = () => {
  const goals = Array.from(document.querySelectorAll(".goalsbar-name"))
  const goalNames = goals.map((goal) => goal.innerText)
  // subtract one for proper array index
  return goalNames[getTaskGoal() - 1]
}

const getTaskGoal = () => {
  const taskText = document.querySelector(".nowdothis .ndt-text").innerText
  const goalNumber = taskText.indexOf("(") == -1 ? taskText[0] : taskText[1]

  return goalNumber
}
