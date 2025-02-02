import React from 'react'
import { useStore } from '../zustandstore/store';

export default function Collections() {

  // const [responseMessage, setResponseMessage] = useStore()

  const responseMessage = useStore(state => state.responseMessage);
  const setResponseMessage = useStore(state => state.setResponseMessage);
  function test() {
    console.log(responseMessage);
    setResponseMessage({ message: 'Hello', type: 'error' });
  }

  return (
    <div>Collections


      <button onClick={test}>responseMessage</button>

      <p>{responseMessage.message}</p>
      <p>{responseMessage.type}</p>
    </div>
  )
}
