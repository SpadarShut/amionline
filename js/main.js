function getConnectionData() {
  return [
    ['type'],
    ['effectiveType'],
    ['saveData'],
    // 'rtt',
  ].reduce((acc, [key, fn]) => {
    acc[key] = navigator.connection[key]
    return acc
  }, {})
}

function setConnectionData(data) {
  connection.innerHTML = JSON.stringify(data,null, 2)
}
const setMessage = (msg) => {
  onlinestatus.innerHTML = msg
}

async function checkFetch() {
  return fetch('/').then(r => {
    let msg = ''
    if (r.ok){
      msg = 'You are ONline!'
    } else {
      msg = 'You are OFFline :/'
    }
    return msg
  }).catch((reason) => {
    return "Hi dino!"
  })
}

const doChecks = async (e) => {
  setConnectionData(getConnectionData())
  await checkFetch().then(setMessage)
};

navigator?.connection?.addEventListener('change', doChecks);
window.addEventListener('load', doChecks)

