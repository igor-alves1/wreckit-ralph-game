const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    value: {
        timerId: null,
        gameVelocity: 800,
        hitPosition: 0,
        result: 0, 
        currentTime: 60
    }, 
    actions: {
        countdownTimerId: setInterval(countdown, 1000)
    }
};

function randomSquare(){
    for (square of state.view.squares){
        square.classList.remove("enemy");
    }

    let randomNumber = Math.floor(Math.random()*9);
    let chosenSquare = state.view.squares[randomNumber];
    state.value.hitPosition = chosenSquare.id;
    chosenSquare.classList.add("enemy");
}

function moveEnemy(){
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition){
            playAudio();
            state.value.hitPosition = null;
            state.value.result++;
            state.view.score.textContent = state.value.result;
            }
        })
    })
}

function countdown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if (state.value.currentTime <= 0){
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.value.timerId);
        alert(`Game Over! You scored ${state.value.result}`);
    }
}

function playAudio(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function main(){
    moveEnemy();
    addListenerHitbox();
}

main();