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

const checkInputDate = (inputDate) => {
    //0[1-9]$|1[0-9]$|2[0-9]$|3[0-1]$\/0[1-9]$|1[0-2]$\/
    //remove partial match with -- $ (End String)
    let dateFormat = (/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])$/g)

    if (inputDate.match(dateFormat)) {

        let inputDateArr = inputDate.split('/').map(val => parseInt(val))
        inputDateArr.push(2019)
        const [day, month, year] = inputDateArr

        const dateReserve = new Date(year, (month - 1), day),
            dateCurrent = new Date()
        if (dateReserve > dateCurrent) {
            return inputDateArr.join("/")
        }
        return "-1" //enter date after current time
    }
    return "-2" //enter date with the correct format

}

const checkInputName = (inputName) => {
    return inputName == "" ? "-1" : inputName

}

element.resSubmitBtn.addEventListener('click', () => {
    let inputDate = element.resInputDate.value,
        inputName = element.resInputName.value,
        validatedInputDate = checkInputDate(inputDate),
        validatedInputName = checkInputName(inputName)


    if (validatedInputDate == "-1") {
        alert("Enter Appopriate Date (After Today)")
    }
    else if (validatedInputDate == "-2") {
        alert("Enter Appropriate Date Format")
    }
    else if (validatedInputName == "-1") {
        alert("Enter Appropriate Name")
    }
    else {
        let data = {
            reservationDate: validatedInputDate,
            time: element.resInputTime.value,
            name: validatedInputName
        }
        let sendData = JSON.stringify(data)
        console.log(sendData)

        ajax_post('/reserve', sendData)
    }


})

window.addEventListener('load', (e) => {
    e.preventDefault()
    removeAllMenus()
    showMenu("breakfast")
})

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
window.addEventListener('hashchange', controlMenu)