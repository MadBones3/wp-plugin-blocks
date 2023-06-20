document.addEventListener("DOMContentLoaded", () => {
  // Open and close the sign in modal
  const openModalBtn = document.querySelectorAll(".open-modal")
  const modalElement = document.querySelector(".wp-block-udemy-plus-auth-modal")
  const modalCloseElement = document.querySelectorAll(".modal-overlay, .modal-btn-close")

  openModalBtn.forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault()
      modalElement.classList.add("modal-show")
    })
  })

  modalCloseElement.forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault()
      modalElement.classList.remove("modal-show")
    })
  })

  //change sign in modal tabs
  const tabs = document.querySelectorAll(".tabs a")
  const signinForm = document.querySelector("#signin-tab")
  const signupForm = document.querySelector("#signup-tab")

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault()

      //looping to remove the active tab class
      tabs.forEach(currentTab => {
        currentTab.classList.remove("active-tab")
      })

      //set the current tab to active
      e.currentTarget.classList.add("active-tab")

      //get the href attrivbute to match the form id of each form
      const activeTab = e.currentTarget.getAttribute("href")

      if (activeTab === "#signin-tab") {
        signinForm.style.display = "block"
        signupForm.style.display = "none"
      } else {
        signinForm.style.display = "none"
        signupForm.style.display = "block"
      }
    })
  })

  // Handle signup form
  signupForm.addEventListener("submit", async e => {
    e.preventDefault()
    const signUpFieldset = signupForm.querySelector("fieldset")
    signUpFieldset.setAttribute("disabled", true)

    const signUpStatus = signupForm.querySelector("#signup-status")
    signUpStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please Wait! We are creating your account.
      </div>
    `

    const formData = {
      username: signupForm.querySelector("#su-name").value,
      email: signupForm.querySelector("#su-email").value,
      password: signupForm.querySelector("#su-password").value
    }

    // up_auth_rest is from the inline script in enqueue.php
    const response = await fetch(up_auth_rest.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const responseJSON = await response.json()

    // user successfully added
    if (responseJSON.status === 2) {
      signUpStatus.innerHTML = `
        <div class="modal-status modal-status-success">
          Success! Your account has been created.
        </div>
      `
      location.reload()
    } else {
      signUpFieldset.removeAttribute("disabled")
      signUpStatus.innerHTML = `
        <div class="modal-status modal-status-danger">
          Unable to create an account please try again later.
        </div>
      `
    }
  })

  // Handle signin form
  signinForm.addEventListener("submit", async e => {
    e.preventDefault()

    const signinFieldset = signinForm.querySelector("fieldset")
    const signinStatus = signinForm.querySelector("#signin-status")

    signinFieldset.setAttribute("disabled", true)
    signinStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please wait! We are logging you in.
      </div>
    `

    const formData = {
      user_login: signinForm.querySelector("#si-email").value,
      password: signinForm.querySelector("#si-password").value
    }

    const response = await fetch(up_auth_rest.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const responseJSON = await response.json()

    if (responseJSON.status === 2) {
      signinForm.innerHTML = `
        <div class="modal-status modal-status-success">
          Success! You are now logged in.
        </div>
      `
      location.reload()
    } else {
      signinFieldset.removeAttribute("disabled")
      signinStatus.innerHTML = `
        <div class="modal-status modal-status-danger">
          Invalid credentials! Please try again later.
        </div>
      `
    }
  })
})
