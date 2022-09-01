import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - Client</h1>
    <input id='jwt-token' placeholder='Json web Token' />
    <button id='btn-connect'> Connect</button>
    <br />
    <span id='server-status'>offline</span>
    <ul id='clients-ul'>
    </ul>
    <form id='message-form'>
    <input placeholder='message' id='message-input' />
    </form>

    <h3>Messages</h3>
    <ul id='messages-ul'>
  </div>
`


const inputJwt = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (inputJwt.value.trim().length <= 0) return alert('ingrese un JWT valido')
  connectToServer(inputJwt.value.trim());
});