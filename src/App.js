
import './App.css';
import io from 'socket.io-client'; //importo el paquete entero de la version de clieentee de socket io
import {useState, useEffect} from 'react'


const socket = io('http://localhost:4000') //se tiene q pasar la direccion del servidor de socket.io
//este objeto socket se crea la conexion



function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const receiveMessage = (messageBackend) => {
      console.log('messageBackend', messageBackend)
      setMessages([messageBackend, ...messages])
    }
    socket.on('message', receiveMessage)
  
    return () => {
      socket.off('message', receiveMessage)
    }

  }, [messages])

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(message)
    socket.emit('message', message) //emito un evento tipo 'message', el cual el valor va a ser message
    setMessages([{body:message, from: 'Me'}, ...messages])
    setMessage('')
  }

  return (
    <div className="App">
     <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>
      <button>send</button>
     </form>
     {messages.map((message, index) => (
      <div key={index}>
        <p>{message.from}: {message.body}</p>  
      </div>
     ))}
    </div>
  );
}

export default App;
