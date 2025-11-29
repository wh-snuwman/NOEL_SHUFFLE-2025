



window.sc = new WebSocket('ws://localhost:3000')


sc.onopen = () => {
    console.log('✅ 서버에 연결 되었습니다!')
}


sc.onmessage = (event) => {
    const msg = event.data
}

sc.onerror = (err) => {
    console.log('‼️ 에러발생:'+ err)
}

sc.onclose = () => {
    null
}






