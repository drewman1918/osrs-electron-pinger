let ping = require('node-http-ping')

let worldsArray = Array.apply(null, { length: 94 }).map(Number.call, Number)

function addRow(world, time) {
    let tableBody = document.getElementById('table-body')
    let tr = tableBody.insertRow()
    let tdL = tr.insertCell()
    let tdR = tr.insertCell()
    tdL.appendChild(document.createTextNode(Number(world)))
    tdR.appendChild(document.createTextNode(`${time} ms`))
}

function removeRows() {
    let tableBody = document.getElementById('table-body')
    let newTableBody = document.createElement('tbody')
    newTableBody.setAttribute('id', 'table-body')
    tableBody.parentNode.replaceChild(newTableBody, tableBody)
}

function pingOSRS() {
    removeRows()
    worldsArray.forEach(world => {
        if (world !== 72) {
            ping(`oldschool${world + 1}.runescape.com`)
                .then(time => {
                    addRow(world+1, time)
                })
                .catch(() => console.log(`World ${world + 1} failed.`))
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ping-button').addEventListener('click', () => {
        pingOSRS()
    })
})