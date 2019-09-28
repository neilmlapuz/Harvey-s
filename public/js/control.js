import { element } from "./base.js"
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js'


const ajax_post = (url, data, callback, progress) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    //JSON PAYLOAD
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'json' //arraybuffer, application/json plain/text
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback({ stat: xhr.status, mes: xhr.response.message })
        }
        else if (xhr.readyState == 4 && xhr.status == 400) {
            callback({ stat: xhr.status, mes: xhr.response.message })
        }
    }
    if (progress)
        xhr.onprogress = progress // e.loaded the bytes the browser received

    xhr.send(data)
}

const removeAllMenus = () => {      //reset menu on display
    Array.from(element.menu).forEach(cur => {
        cur.style.display = 'none'
    })
}

const showMenu = (menuId) => {  //show menu items depend on chosen menu
    switch (menuId) {
        case "breakfast":
            element.menuBreakfast.style.display = 'block'
            break
        case "lunch":
            element.menuLunch.style.display = 'block'
            break
        case "dinner":
            element.menuDinner.style.display = 'block'
            break
    }
}

const checkToken = (hashToken) => {
    return Array.from(element.menu).map(cur => cur.className.substring(5)).includes(hashToken)
}

const controlMenu = () => {
    const hashToken = window.location.hash.substring(6)
    if (checkToken(hashToken)) {
        removeAllMenus()
        showMenu(hashToken)
    }

}

const reservationAlertBox = (res) => {
    let payload = (res.stat == 200) ?
        { heightAuto: false, title: "Success", text: res.mes, type: "success" } : { heightAuto: false, title: "Oh No!", text: res.mes, type: "error" }

    Swal.fire(payload)
}
element.resDeleteBtn.addEventListener('click', () => {
    let data = { name: element.resDelInput.value },
        sendData = JSON.stringify(data)

    console.log("Ok")
    ajax_post('/delReserve/delRes', sendData, res => {
        element.resDelInput.value = ""
        reservationAlertBox(res)
    })

})
element.resSubmitBtn.addEventListener('click', () => {
    let data = {
        reservationDate: element.resInputDate.value,
        time: element.resInputTime.value,
        name: element.resInputName.value
    }
    let sendData = JSON.stringify(data)
    console.log(sendData)

    ajax_post('/reserve', sendData, res => {
        reservationAlertBox(res)
    })

})




window.addEventListener('load', (e) => {
    e.preventDefault()
    removeAllMenus()
    showMenu("breakfast")
})

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
window.addEventListener('hashchange', controlMenu)