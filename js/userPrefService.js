let gUserPref;

var init = () => {
    let userPref = {}
    if (loadFromStorage('userPref')) userPref = loadFromStorage('userPref')
    document.body.style.background = userPref.elBgcColor
    document.body.style.color = userPref.elTextColor
    document.querySelector('h1 span').innerText = userPref.elUserName
    document.querySelector('h2 span').innerText = userPref.elUserBirth
    document.querySelector('h3 span').innerText = userPref.elTimeZone

}

var onSubmit = (ev) => {
    ev.preventDefault()
    let elBgcColor = document.querySelector('.bgcColor').value
    let elTextColor = document.querySelector('.textColor').value
    let elUserName = document.querySelector('.userName').value
    let elUserBirth = document.querySelector('.userBirth').value
    let elTimeZone = document.querySelector('.timeZone').value
    let userPref = {
        elBgcColor,
        elTextColor,
        elUserName,
        elUserBirth,
        elTimeZone
    }
    setUserPref(userPref)
    saveToStorage('userPref', userPref)
}

var setUserPref = (userPref) => {gUserPref = userPref}