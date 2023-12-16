const socket = io('ws://localhost:3500')
socket.emit('setUserId', 'user123');

const activity = document.querySelector('.activity')
const msgInput = document.getElementById('msgInput')

function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value) {
        socket.emit('message', msgInput.value)
        msgInput.value = ""
    }
    msgInput.focus()
}

  // Example of sending a private message
  const sendPrivateMessage = (e) => {
    e.preventDefault()
    const id = document.getElementById('receptentId').value;
    const message = document.getElementById('pvtMsg').value;
    const recipientUsername = id; // Replace with the actual recipient's username
    socket.emit('privateMessage', { recipientUsername , message });
  };

  socket.on('privateMessage', (data) => {
    const { senderId, message } = data;
    console.log(`Received private message from ${senderId}: ${message}`);
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = message
    document.querySelector('ul').appendChild(li)
  });


const activityMsg = () => {
    socket.emit('activity', socket.id.substring(0, 5))
}

document.getElementById('form1')
    .addEventListener('submit', sendMessage)

document.getElementById('form2')
    .addEventListener('submit', sendPrivateMessage)
    
msgInput.addEventListener('keypress', activityMsg)
// Listen for messages 
socket.on("message", (data) => {
    console.log(data);
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})


let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`

    // Clear after 3 seconds 
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})