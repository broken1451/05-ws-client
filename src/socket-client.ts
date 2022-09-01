import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {

    // const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')// url de conecxion al socket
    // const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    const manager = new Manager('https://tesloshopadrian.herokuapp.com/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            autentication: token
        }
    });
    // manager.socket('sala')
    socket?.removeAllListeners();
    socket = manager.socket('/');
    // console.log({ socket });
    addListeners()
}


const addListeners = () => {


    const serverStatusLvl = document.querySelector('#server-status')!;
    const clientUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    // socket.on() // escuchar eventos q vengan del servidor
    // socket.emit() // hablar/emitir al  servidor

    socket.on('connect', () => {
        serverStatusLvl.innerHTML = 'conected';
    });
    socket.on('disconnect', () => {
        serverStatusLvl.innerHTML = 'disconnect';
    });
    socket.on('clients-update', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientID => {
            clientsHtml = clientsHtml + `
            <li>${clientID}</li>
            `
        });
        clientUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (messageInput.value.trim().length <= 0) {
            return
        }
        // console.log({ id: 'yooo', message: messageInput.value });
        // socket.emit('message-from-input') // nombre que queramor darle
        socket.emit('message-from-client',
            { id: 'yooo', message: messageInput.value }
        );
        messageInput.value = '';
    });


    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    });
}