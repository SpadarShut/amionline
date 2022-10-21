import React, { useCallback, useEffect, useState } from 'react'
import './App.css';

type ConnectionProp = keyof NonNullable<typeof navigator.connection>

function getConnectionData() {
  let keys: ConnectionProp[] = [
    'type',
    'effectiveType',
    'saveData',
    // 'rtt',
  ]

  return keys.reduce((acc: Record<ConnectionProp, string>, key: ConnectionProp) => {
    if (!navigator.connection) return acc
    acc[key] = navigator.connection[key] as string
    return acc
  }, {} as any )
}

// function setConnectionData(data) {
//   connection.innerHTML = JSON.stringify(data,null, 2)
// }
// const setMessage = (msg) => {
//   onlinestatus.innerHTML = msg
// }
// const setTime = () => {
//   let date = new Date();
//   time.innerHTML = "@ " + date.getHours() + ':' + date.getMinutes()
// }


function checkFetch() {
  return fetch('/')
    .then(r => {
      let msg = ''
      if (r.ok){
        msg = 'You are Online!'
      } else {
        msg = 'You are OFFline :/'
      }
      return msg
    }).catch((reason) => {

    return "Hi dino!"
  })
}

function App() {
  const [navOnline, setNavOnline] = useState(true)
  const [fetchRes, setFetchRes] = useState('')
  const [connection, setConnection] = useState({})
  const [time, setTime] = useState("")


  const doChecks = useCallback(async () => {
    setConnection(getConnectionData())
    await checkFetch().then(setFetchRes)
    setNavOnline(navigator.onLine)
    let now = new Date()
    setTime(new Intl.DateTimeFormat('en-US', {
      timeStyle: 'medium',
      hourCycle: 'h24',
      // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }).format(now))
  }, [])

  useEffect(() => {
    doChecks()
    navigator?.connection?.addEventListener('change', doChecks);
    window.addEventListener('load', doChecks)
    window.addEventListener('focus', doChecks)
    window.addEventListener('offline', (e) => {
      setNavOnline(false)
    });
    window.addEventListener('online', (e) => {
      setNavOnline(true)
    });
  }, [doChecks])

  return (
    <div className="App">
      <p>Fetch: <span>{fetchRes}</span></p>
      <p>Navigator.online: <em id="navonline">{String(navOnline)}</em></p>

      <code>
        <pre>{JSON.stringify(connection, null, 2)}</pre>
      </code>

      <p><em>@ {time}</em></p>
    </div>
  );
}

export default App;
