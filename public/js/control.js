import { element } from "./base.js"

const ajax_post = (url, data, type, progress) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    //JSON PAYLOAD
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = type ? type : 'json' //arraybuffer, application/json plain/text
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(">>>>>>>>", xhr.response)
            // callback(xhr.response)
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

const controlMenu = () => {
    const menuId = window.location.hash.substring(6)
    removeAllMenus()
    showMenu(menuId)
}

window.addEventListener('load', (e) => {
    e.preventDefault()
    removeAllMenus()
    showMenu("breakfast")
})

element.resSubmitBtn.addEventListener('click', () => {
    let data = {
        reservationDate: element.resInputDate.value,
        time: element.resInputTime.value,
        name: element.resInputName.value
    }
    let sendData = JSON.stringify(data)
    // window.location = '/reserve'

    ajax_post('/reserve', sendData)

})

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
window.addEventListener('hashchange', controlMenu)