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
const setTime = () => {
  let date = new Date();
  time.innerHTML = "@ " + date.getHours() + ':' + date.getMinutes()
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
  setNavigatorOnline(navigator.onLine)
  setTime()
};
function setNavigatorOnline(val) {
  navonline.innerHTML = val ? 'true' : 'false'
}
navigator?.connection?.addEventListener('change', doChecks);
window.addEventListener('load', doChecks)
window.addEventListener('focus', doChecks)

window.addEventListener('offline', (e) => {
  setNavigatorOnline(false)
});
window.addEventListener('online', (e) => {
  setNavigatorOnline(true)
});

