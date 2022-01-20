"use strict"

waitForElement("#next").then(createButton)

function createButton() {
  togglbutton.render(".timerBox:not(.toggl)", { observe: true }, async function (elem) {
    const togglDiv = document.createElement("div")

    togglDiv.style.display = "inline-block"
    togglDiv.style.paddingRight = "10px"

    const link = togglbutton.createTimerLink({
      description: await getTaskText(),
      projectName: await getProjectName(),
      tags: ["Complice"],
      // className: "complice",
      // buttonType: "minimal",
    })

    togglDiv.appendChild(link)
    elem.prepend(togglDiv)
  })
}

const getTaskText = async () => {
  const taskText = await waitForElementWithRegex(".nowdothis .ndt-text span", /^\(?\d★?\).*/).then((element) => {
    const elementText = element.innerText
    return elementText.substring(elementText.indexOf(")") + 1).trim()
  })
  return taskText
}

const getProjectName = async () => {
  const project = await waitForElement(".goalsbar-name").then(async () => {
    const goals = Array.from(document.querySelectorAll(".goalsbar-name"))
    const goalNames = goals.map((goal) => goal.innerText)
    // subtract one for proper array index
    const goalNumber = await getTaskGoal()
    return goalNames[(await getTaskGoal()) - 1]
  })
  return project
}

const getTaskGoal = async () => {
  const goalNumber = await waitForElementWithRegex(".nowdothis .ndt-text span", /^\(?\d★?\).*/).then((element) => {
    const taskText = element.innerText
    return taskText.indexOf("(") == -1 ? taskText[0] : taskText[1]
  })
  return goalNumber
}

// Taken from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

function waitForElementWithRegex(selector, regex) {
  return new Promise((resolve) => {
    if (document.querySelector(selector) && regex.test(document.querySelector(selector).innerText)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector) && regex.test(document.querySelector(selector).innerText)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
