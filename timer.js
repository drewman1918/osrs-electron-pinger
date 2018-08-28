let moment = require('moment')

var options = [
    {
        title: "Time's Up!",
        body: "Click reset to set the timer to your previous entry."
    }
]

let defaultMinutes = "00"
let defaultSeconds = "15"
let minutesInput = document.querySelector('#minutesInput')
let secondsInput = document.querySelector('#secondsInput')

let notify = () => {
    new window.Notification(options[0].title, options[0] )
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', startCountdown);
    document.getElementById('resetButton').addEventListener('click', stopCountdown);
    if (defaultMinutes.toString().length === 1) {
        minutesInput.value = "0" + defaultMinutes
    } else {
        minutesInput.value = defaultMinutes
    }
    if (defaultSeconds.toString().length === 1) {
        secondsInput.value = "0" + defaultSeconds
    } else {
        secondsInput.value = defaultSeconds
    }
})

let myIntervalID

let startCountdown = () => {
    //Set default value to be the last user input value
    if (minutesInput.value.toString().length === 1) {
        defaultMinutes = "0" + minutesInput.value
    } else {
        defaultMinutes = minutesInput.value
    }
    if (secondsInput.value.toString().length === 1) {
        defaultSeconds = "0" + secondsInput.value
    } else {
        defaultSeconds = secondsInput.value
    }
    
    //Determine the time the timer started and the end time.
    let now = moment()
    let endTime = moment(now).add(secondsInput.valueAsNumber + minutesInput.valueAsNumber * 60, 'seconds')
    
    //Use set interval to call a function each second, put the ID on the global myIntervalID for future reference
    myIntervalID = window.setInterval(() => {
        //Now what time is it?
        now = moment()
        
        //Find the difference between right now and the end time
        let dif = Math.round((endTime - now) / 1000)
        
        if (dif > 0) {
            //Determine the minutes and seconds left and update the value accordingly.
            let minutesLeft = Math.floor(dif / 60)
            let secondsLeft = dif - (minutesLeft * 60)
            if (minutesLeft.toString().length === 1) {
                minutesInput.value = "0" + minutesLeft
            } else {
                minutesInput.value = minutesLeft
            }
            if (secondsLeft.toString().length === 1) {
                secondsInput.value = "0" + secondsLeft
            } else {
                secondsInput.value = secondsLeft
            }
        } else {
            //If it's finished, set the seconds to Zero, stop this function from calling every second, and notify the user.
            secondsInput.value = "00"
            notify()
            clearInterval(myIntervalID)
        }

    }, 1000)
}

let stopCountdown = () => {
    minutesInput.value = defaultMinutes
    secondsInput.value = defaultSeconds
    if (myIntervalID) {
        clearInterval(myIntervalID)
    }
}