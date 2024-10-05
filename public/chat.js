//solo funciona si lo estas desplegando en el mismo dominio,
//sino se debe pasar por parámetro

//io()

const socket = io('https://socketio-server-olive.vercel.app/')

//DOM element
let message = document.getElementById('message')
let username = document.getElementById('username')
let btnSend = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')


btnSend.addEventListener('click', ()=>{
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    })
    message.value = ''
})

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username.value)
})

//data es un objeto que envía el servidor 
socket.on('chat:message', (data)=>{
    actions.innerHTML = ''
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
    
})

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p>
        <em>${data} is typing a message...</em>
    </p>`
})