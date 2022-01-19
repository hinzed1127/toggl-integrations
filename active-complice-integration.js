"use strict"

// Main function. Set small timeout to let tasks/projects load.
setTimeout(() => {
  togglbutton.render(".nowdothis .ndt-text:not(.toggl)", { observe: true }, function (elem) {
    const link = togglbutton.createTimerLink({
      description: getTaskText(),
      projectName: getProjectName(),
      tags: ["Complice"],
    })
    elem.appendChild(link)
    link.addEventListener("click", () => {
      link.remove()
      // Fix modal styling bug this causes
      setTimeout(() => {
        const modal = document.querySelector("#toggl-button-edit-form")
        modal.remove()
      }, 500)
    })
  })
}, 1000)

const getTaskText = () => {
  const taskText = document.querySelector(".nowdothis .ndt-text").innerText
  return taskText.substring(taskText.lastIndexOf(")") + 1).trim()
}

const getTaskGoal = () => {
  const taskText = document.querySelector(".nowdothis .ndt-text").innerText
  const goalNumber = taskText.indexOf("(") == -1 ? taskText[0] : taskText[1]

  return goalNumber
}

const getProjectName = () => {
  const goals = Array.from(document.querySelectorAll(".goalsbar-name"))
  const goalNames = goals.map((goal) => goal.innerText)
  // subtract one for proper array index
  return goalNames[getTaskGoal() - 1]
}
