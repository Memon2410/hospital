document.addEventListener("DOMContentLoaded", function(event) {
  // Vars
  var button = document.getElementById('button')
  var nameInput = document.getElementById('name')
  var emailInput = document.getElementById('email')
  var phoneInput = document.getElementById('phone')
  var dateInput = document.getElementById('date')
  var hourInput = document.getElementById('hour')

  var name
  var email
  var phone
  var date
  var hour
  var nameBoolean
  var emailBoolean
  var phoneBoolean
  var dateBoolean
  var hourBoolean

  // Error
  var badAnswer = function(input) {
    input.style.border = '3px solid #ED536A'
  }

  var standardInput = function(input) {
    input.style.border = '1px solid #C7C7C7'
  }

  /* Validations
  ---------------------------------- */
  var nameCheck = function() {
    name = nameInput.value
    if (name === '' || name === undefined || name === null
      || !name.match(/^[a-z ñáéíóú A-Z ÑÁÉÍÓÚ]+$/)) {
      badAnswer(nameInput)
      nameBoolean = false
      return false
    } else {
      nameBoolean = true
    }
  }
  
  var emailCheck = function() {
    email = emailInput.value
    if (email === '' || email === undefined || email === null
      || !email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,5}))$/)) {
      badAnswer(emailInput)
      emailBoolean = false
      return false
    } else {
      emailBoolean = true
    }
  }
  
  var phoneCheck = function() {
    phone = phoneInput.value
    if (phone === '' || phone === undefined || phone === null
      || !phone.match('^([0-9][0-9]*)$')) {
      badAnswer(phoneInput)
      phoneBoolean = false
      return false
    } else {
      phoneBoolean = true
    }
  }

  var dateCheck = function() {
    date = dateInput.value
    if (date === '' || date === undefined || date === null) {
      badAnswer(dateInput)
      dateBoolean = false
      return false
    } else {
      dateBoolean = true
    }
  }

  var hourCheck = function() {
    hour = hourInput.value
    if (hour === '' || hour === undefined || hour === null) {
      badAnswer(hourInput)
      hourBoolean = false
      return false
    } else {
      hourBoolean = true
    }
  }

  var basicCheck = function() {
    nameCheck()
    emailCheck()
    phoneCheck()
  }

  nameInput.oninput = function(event) {
    standardInput(nameInput)
  }

  emailInput.oninput = function(event) {
    standardInput(emailInput)
  }

  phoneInput.oninput = function(event) {
    standardInput(phoneInput)
  }

  var sendData = function() {
    if (nameBoolean && emailBoolean && phoneBoolean && dateBoolean && hourBoolean) {
      alert('send data: ' + name + ', ' + phone + ', ' + email + ', ' + date + ', ' + hour)
    }
  }

  if (document.getElementsByClassName('flatpickr').length > 0) {
    /* Patient
    ---------------------------------- */
    // Pickers date
    flatpickr('#date', {
      locale: 'es',
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: new Date().fp_incr(1)
    })

    flatpickr('#hour', {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      minDate: "08:00",
      maxDate: "20:30",
    })

    var clickButton = function(event) {
      event.preventDefault()
      basicCheck()
      dateCheck()
      hourCheck()
      sendData()
    }
  } else {
    /* Doctor
    ---------------------------------- */
    var clickButton = function(event) {
      event.preventDefault()
      basicCheck()
      date = 'N/A'
      hour = 'N/A'
      dateBoolean = true
      hourBoolean = true
      sendData()
    }
  }

  button.addEventListener('click', clickButton)
})
