const countButton = document.querySelector('.main__button'),
    input = document.querySelector('.main__input'),
    countDigits = document.querySelector('.main__digits')



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

function wordCount() {
    let inputVal = input.value
    let arr = inputVal.split(' '),
        finalArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== ''){
            finalArr.push(arr[i])
        }
    }
    countDigits.textContent = finalArr.length
}

countButton.addEventListener('click', ()=> {
    wordCount()
})

input.addEventListener('keyup', function(){
    if(this.scrollTop > 0){
        this.style.height = this.scrollHeight + 4 + "px";
    }
});