
const digitalClock = selEl('.digital-clock')

startTime((...time) => {
    digitalClock.innerHTML = `${time[0]}:${time[1]}:${time[2]}`
    updateBinary({
        hour: time[0],
        min: time[1],
        sec: time[2]
    })
})

function updateBinary({hour, min, sec}) {

    /**
     * 
     * skema :
     * hours: [[1, 2^1], [1, 2^1, 2^2, 2^3]]
     * mins: [[1, 2^1, 2^2], [1, 2^1, 2^2, 2^3]]
     * secs: [[1, 2^1, 2^2], [1, 2^1, 2^2, 2^3]]
     * 
     */

    const hours = [
        [selEl('.h-1-1'), selEl('.h-1-2')], 
        [selEl('.h-2-1'), selEl('.h-2-2'), selEl('.h-2-4'), selEl('.h-2-8')]
    ]

    const mins = [
        [selEl('.m-1-1'), selEl('.m-1-2'), selEl('.m-1-4')],
        [selEl('.m-2-1'), selEl('.m-2-2'), selEl('.m-2-4'), selEl('.m-2-8')]
    ]

    const secs = [
        [selEl('.s-1-1'), selEl('.s-1-2'), selEl('.s-1-4')],
        [selEl('.s-2-1'), selEl('.s-2-2'), selEl('.s-2-4'), selEl('.s-2-8')]
    ]

    /** Hours */
    const hoursArray = String(hour).split('')
    const hoursBin = [decimalToBinary(hoursArray[0]), decimalToBinary(hoursArray[1])]

    /** Mins */
    const minsArray = String(min).split('')
    const minsBin = [decimalToBinary(minsArray[0]), decimalToBinary(minsArray[1])]

    /** Secs */
    const secsArray = String(sec).split('')
    const secsBin = [decimalToBinary(secsArray[0]), decimalToBinary(secsArray[1])]

    hours.forEach((e, i) => {
        const preNum = hoursBin[i]
        e.forEach((f, j) => {
            if (preNum[j] == '1') {
                f.classList.add('active')
            } else {
                f.classList.remove('active')
            }
        })
    })

    mins.forEach((e, i) => {
        const preNum = minsBin[i]
        e.forEach((f, j) => {
            if (preNum[j] == '1') {
                f.classList.add('active')
            } else {
                f.classList.remove('active')
            }
        })
    })

    secs.forEach((e, i) => {
        const preNum = secsBin[i]
        e.forEach((f, j) => {
            if (preNum[j] == '1') {
                f.classList.add('active')
            } else {
                f.classList.remove('active')
            }
        })
    })

}

function decimalToBinary(decimal) {

    let binaryAppend = ''

    while (decimal > 0) {

        if (decimal % 2 == 0) {
            binaryAppend += '0'
        } else {
            binaryAppend += '1'
        }

        decimal = Math.floor(decimal / 2)
    }

    return binaryAppend
}

function selEl(className) {
    return document.querySelector(className)
}

function startTime(callback) {

    const date = () => {
        
        const date = new Date()

        const sec = date.getSeconds()
        const min = date.getMinutes()
        const hour = date.getHours()

        return {sec, min, hour}
    }

    setInterval(() => {
        const {sec, min, hour} = date()
        callback(hour < 10 ? `0${hour}` : hour, min < 10 ? `0${min}` : min, sec < 10 ? `0${sec}` : sec)
    }, 1000)
}