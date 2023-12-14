const socket = io('ws://localhost:3500')


function sendMessage(e) {

    e.preventDefault()
    const msgInput = document.querySelector('input')

    if (msgInput.value) {
        socket.emit('message', msgInput.value)
        msgInput.value = ""
    }
    msgInput.focus()

}

const activityMsg = () => {

    socket.emit('activity', socket.id.substring(0, 5))

}

document.querySelector('form')
    .addEventListener('submit', sendMessage)
    
document.querySelector('.activity')
    .addEventListener('keypress', activityMsg)


// Listen for messages 
socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

//Listening for activity
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`
    let activityTimer

    // Clear after 3 seconds 
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})