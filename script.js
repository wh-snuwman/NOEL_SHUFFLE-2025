





const timer = document.getElementById('timer')

const target = new Date('2025-12-25 00:00:00')

function main(){
    const now = new Date()
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);


    timer.innerText = `${days} day ${hours} : ${minutes} : ${seconds}`


    requestAnimationFrame(main)
}

main()