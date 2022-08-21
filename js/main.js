// =======- Объявления -=======
// Главный экран
const countButton = document.querySelector('.main__button'),
    input = document.querySelector('.main__input'),
    countDigits = document.querySelector('.main__digits'),
    mainResult = document.querySelector('.main__result'),
    mainRows = document.querySelectorAll('.main__row')

let meetDigits = document.querySelector('.main__meet'),
    mainWord = document.querySelector('.main__word')

let finalArr = [], lastArr = []

// Приветственный экран (СПРАВКА)
const checkbox = document.querySelector('#showNoMore'),
    popupButton = document.querySelector('.popup__button'),
    popupWrapper = document.querySelector('.popup-wrapper'),
    popup = document.querySelector('.popup')
    // obj = JSON.parse(localStorage.getItem('item'))
    let obj = {

    }

// =======- ---- -=======
    if (JSON.parse(localStorage.getItem('item')) === null ||
        JSON.parse(localStorage.getItem('item')) === undefined) {
        obj = {
            showNoMore: false
        }
        localStorage.setItem('item', JSON.stringify(obj))
    } else {
        obj = JSON.parse(localStorage.getItem('item'))
    }

countButton.addEventListener('click', ()=> {
    finalArr = [ ]
    wordCount()
    wordRepeat()
})

input.addEventListener('keyup', function(){
    if(this.scrollTop > 0){
        this.style.height = this.scrollHeight + 4 + "px";
    }
});
input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        finalArr = [ ]
        wordCount()
        wordRepeat()
    }
})

// Функция определения повторяющихся слов и их количества
function wordRepeat() {
    const wordArr = []
    lastArr = []
    for (let i = 0; i < finalArr.length; i++) {
        const isExist = wordArr.find((item) => {
            return item[0].toLowerCase() === finalArr[i].toLowerCase()
        })
        if (isExist) {
            isExist[1] ++
        } else {
            wordArr.push([finalArr[i].toLowerCase(), 1])
        }
    }

    let popularWord = wordArr[0]
    const popularArr = [wordArr[0]]


    wordArr.forEach((item, i) => {
        if (item[1] > popularWord[1]) {
            popularWord = item
        }
    })

    wordArr.forEach((item, i) => {
        if (item[1] === popularWord[1]) {
            lastArr.push(item)
        }
    })

    // --- Вывод популярных слов ---
    mainRows[0].innerHTML = declensionOfWords()
    mainWord = document.querySelector('.main__word')

    mainWord.textContent = ''
    lastArr.forEach((item, i) => {
        if (i === lastArr.length - 1) {
            mainWord.textContent += `${item[0]}`
        } else {
            mainWord.textContent += `${item[0]}, `
        }

    })
    mainRows[1].innerHTML = declensionOfTimes()
    meetDigits = document.querySelector('.main__meet')
    meetDigits.textContent = lastArr[0][1]
    // --- Появление информации ---
    mainRows.forEach(item => item.style.cssText = 'opacity: 1;')
    console.log(finalArr)
}

// Функция счета количества слов
function wordCount() {
    let inputVal = input.value
    inputVal = inputVal.replace(/[^a-zа-яё0-9\s]/gi, ' ')
    inputVal = inputVal.replace(/\n/g,' ')
    let arr = inputVal.split(' ')

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== ''){
            finalArr.push(arr[i])
        }
    }
    mainResult.innerHTML = `Слов найдено: <span class="main__digits">${finalArr.length}</span>`
}


// Склонения "раз"
const declensionOfTimes = function () {
    if (lastArr.length === 1) {
        if ((lastArr[0][1] % 10 === 2 ||
            lastArr[0][1] % 10 === 3 ||
            lastArr[0][1] % 10 === 4) && (lastArr[0][1] < 10 || lastArr[0][1] > 20)) {
            return `Встречается <span class="main__meet"></span> раза`
        } else {
            return `Встречается <span class="main__meet"></span> раз`
        }
    } else if (lastArr.length > 1) {
        if ((lastArr[0][1] % 10 === 2 ||
            lastArr[0][1] % 10 === 3 ||
            lastArr[0][1] % 10 === 4) && (lastArr[0][1] < 10 || lastArr[0][1] > 20)) {
            return `Встречаются <span class="main__meet"></span> раза`
        } else {
            return `Встречаются <span class="main__meet"></span> раз`
        }
    } else if (lastArr[0][1] > 10 && lastArr[0][1] < 20) {
        if (lastArr.length === 1) {

        }
    }
}

// Склонения "Популярный слов"
const declensionOfWords = function () {
    if (lastArr.length > 1) {
        return `Самые популярные слова в тексте: <span class="main__word"></span>`
    } else {
        return `Самое популярное слово в тексте: <span class="main__word"></span>`
    }
}

// Открытие окна справки
document.querySelector('.reference').addEventListener('click', ()=> {
    showPopup()
})

// Скрытие окна справки
popupButton.addEventListener('click', () => {
    hidePopup()
})

showOnLoad()

function showOnLoad() {
    if (obj.showNoMore === false) {
        showPopup()
    } else {
        popupWrapper.style.cssText = `
    display: none;
    `
    }
}

function showPopup() {
    popupWrapper.style.cssText = `
    animation-name: popupWrapperShow;
    animation-duration: 1s;
    `
    popupWrapper.addEventListener('animationend', ()=> {
        popupWrapper.style.cssText = `
            display: flex;
            opacity: 1;
            backdrop-filter: blur(5px);
        `
    })

    if (obj.showNoMore === true) {
        checkbox.checked = true
    }
}

function hidePopup() {
    popupWrapper.style.cssText = `
    animation-name: popupWrapperHide;
    animation-duration: 1s;
    `
    popupWrapper.addEventListener('animationend', ()=> {
        popupWrapper.style.cssText = `
        display: none;
    `
    })

    if (checkbox.checked) {
        obj.showNoMore = true

    } else {
        obj.showNoMore = false
    }
    localStorage.setItem('item', JSON.stringify(obj))
}


// Старая функция счета слов
// function wordCount() {
//     let inputVal = input.value
//     let str = inputVal
//     let pos = inputVal.indexOf(' ')
//     let count = 1
//     if (inputVal !== '') {
//         while (pos > -1) {
//             if (pos !== -1) {
//                 console.log(pos)
//                 str = str.substring(0, pos) + str.substring(pos + 1, str.length)
//                 pos = str.indexOf(' ')
//                 count += 1
//                 if (pos !== -1) {
//
//                 } else {
//
//                 }
//             }
//         }
//     } else {
//         count = 0
//     }
//     countDigits.textContent = count
// }
