let URL_BASE = 'https://sgvk24hul1.execute-api.us-west-2.amazonaws.com/beta'

async function getRequest(ws){
	//let token = localStorage.getItem('token')
	let token = ''
    let response = await fetch(URL_BASE + ws)
    let data = await response.json()
    if(data.m == 'token no existe o expirado'){
        localStorage.removeItem('token')
        setTimeout(() => {
            location.reload()
        }, 5000)
    } else {
        return data
    }
}

async function postRequest(ws, json = {}){
    //let token = localStorage.getItem('token')
    let token = ''
    let response = await fetch(URL_BASE + ws, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
    let data = await response.json()
    if(data.m == 'token no existe o expirado'){
        localStorage.removeItem('token')
        setTimeout(() => {
            location.reload()
        }, 5000)
    } else {
        return data
    }
}

async function deleteRequest(ws){
    //let token = localStorage.getItem('token')
    let token = ''
    let response = await fetch(URL_BASE + ws,{
        method:'DELETE',

    })
    let data = await response.json()
    if(data.m == 'token no existe o expirado'){
        localStorage.removeItem('token')
        setTimeout(() => {
            location.reload()
        }, 5000)
    } else {
        return data
    }
}