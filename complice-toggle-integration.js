"use strict"

waitForElm("#next").then(createButton)

function createButton() {
  togglbutton.render(".timerBox:not(.toggl)", { observe: true }, async function (elem) {
    const togglDiv = document.createElement("div")

    togglDiv.style.display = "inline-block"
    togglDiv.style.paddingRight = "10px"

    const link = togglbutton.createTimerLink({
      description: await getTaskText(),
      projectName: getProjectName(),
      tags: ["Complice"],
      // className: "complice",
      // buttonType: "minimal",
    })

    togglDiv.appendChild(link)
    elem.prepend(togglDiv)
  })
}

const getTaskText = async () => {
  const taskText = await waitForElmWithRegex(".nowdothis .ndt-text span", /^\d★?\).*/).then((element) => {
    const elementText = element.innerText
    return elementText.substring(elementText.lastIndexOf(")") + 1).trim()
  })

  return taskText
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

// Taken from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
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

function waitForElmWithRegex(selector, regex) {
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
