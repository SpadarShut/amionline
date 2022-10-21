fetch('/').then(r => {
  let msg = ''
  if (r.ok){
    msg = 'You are ONline!'
  } else {
    msg = 'You are OFFline :/'
  }
  return msg
}).catch((reason) => {
  return "Hi dino!"
}).then((msg) => {
  onlinestatus.innerHTML = msg
})
