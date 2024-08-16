const timeCountDown = document.getElementById("timeDisplay")
const playerScoreDisplay = document.getElementById("playerScoreDisplay")
const computerScoreDisplay = document.getElementById("computerScoreDisplay")
const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
const computerChoice = document.getElementById("computerDecision")
const gameVerdict = document.getElementById("gameVerdict")
const playButton = document.getElementById("btn")
const scoreContainer = document.querySelectorAll(".score_container")


const choices = [`Rock`, `Paper`, `Scissors`]
let playerScore = 0
let computerScore = 0;
let countdown = 5
let timeOut;


// Random generation for computer
function computerPick(){
    const choiceIndex = Math.floor(Math.random() * choices.length);
    return choices[choiceIndex]

    // console.log(choiceIndex);
};


// Function to disable button
function disableButton(){

    timeCountDown.textContent  = ``

    playerScore = "-"
    computerScore= "-"
    playerScoreDisplay.textContent = `You: ${playerScore}`
    computerScoreDisplay.textContent = `Computer: ${computerScore}`

   rock.disabled = true
   rock.style.pointerEvents = "none"
   paper.disabled = true
   paper.style.pointerEvents = "none"
   scissors.disabled = true
   scissors.style.pointerEvents = "none"

   scoreContainer.forEach((item) => {
        item.style.backgroundColor = "#eeeeee";
        item.style.color = "#888888";
        item.style.border = "1px solid #999999"
   })

}
 

// Function to enable button
function enableButton(){

    rock.disabled = false
    rock.style.pointerEvents = "visible"
    paper.disabled = false
    paper.style.pointerEvents = "visible"
    scissors.disabled = false
    scissors.style.pointerEvents = "visible"

    scoreContainer.forEach((item) => {
        item.style.backgroundColor = "#ffffff";
        item.style.color = "initial";
        item.style.border = "1px solid #4464AD"
   })

}


// Function to restart
function restartGame(){
    clearInterval(timeOut)
    countdown = 5
    startTimer()

    playerScore = 0
    computerScore = 0;
    computerChoice.innerHTML = ""
    gameVerdict.innerHTML = ""
    gameVerdict.style.padding = "0"
    gameVerdict.style.marginBottom = "0"
    gameVerdict.style.border = "none"
    playerScoreDisplay.textContent = `You: ${playerScore}`
    computerScoreDisplay.textContent = `Computer: ${computerScore}`
}

function startTimer(){
    // timeCountDown.textContent = `Time left: ${countdown}s`
    timeCountDown.innerHTML = ""

    let displayCountdown = document.createElement("p")
    displayCountdown.textContent = `Time left: ${countdown}s`
    displayCountdown.style.fontSize = "1.5rem"
    timeCountDown.append(displayCountdown)
    clearInterval(timeOut)
    
    timeOut = setInterval(() => {
        if (countdown > 0) {
            countdown--
            displayCountdown.textContent = `Time left: ${countdown}s`
            
        }else {
            clearInterval(timeOut)
            displayCountdown.textContent = 'Time is up!'
            computerMove = computerPick()
            scoreUpdate(null, computerMove)
            computerChoice.firstElementChild.textContent = `Computer chose: ${computerMove}`
            gameVerdict.firstElementChild.textContent = `You missed a turn`
            restartTimer()
        } 
    }, 1000)
}

// Function to restart timer
function restartTimer(){
    clearInterval(timeOut)
    countdown = 5
    startTimer()
}

// Funtion to stop timer
function stopTimer(){
    clearTimeout(timeOut)
}

//  Function to end game
function gameOver() {

    timeCountDown.textContent  = `Time's Up!`
    timeCountDown.style.fontSize = "1.5rem"

    // playerScore = "-"
    // computerScore= "-"
    playerScoreDisplay.textContent = `You: ${playerScore}`
    computerScoreDisplay.textContent = `Computer: ${computerScore}`

   rock.disabled = true
   rock.style.pointerEvents = "none"
   paper.disabled = true
   paper.style.pointerEvents = "none"
   scissors.disabled = true
   scissors.style.pointerEvents = "none"

   scoreContainer.forEach((item) => {
    item.style.backgroundColor = "#ffffff";
    item.style.color = "initial";
    item.style.border = "1px solid #4464AD"
})
}




// Function to update and display score
function scoreUpdate(playerMove, computerMove){

    computerChoice.innerHTML = ""
    gameVerdict.innerHTML = ""


    // computer's choice
    const computerDecision = document.createElement("p")
    computerDecision.textContent = ``
    computerDecision.style.fontSize = `1.5rem`

    computerChoice.append(computerDecision)

    //round verdict
    const roundVerdict = document.createElement("p")
    roundVerdict.text = ``
    roundVerdict.style.fontSize = `1rem`
    gameVerdict.append(roundVerdict)
    gameVerdict.style.padding = `0.5rem`
    gameVerdict.style.borderRadius = `0.25rem`
    gameVerdict.style.marginBottom = `2rem`
        
    if(playerMove){
        computerDecision.innerHTML = ""
         computerDecision.textContent = `Computer Chose ${computerMove}`
        restartTimer()
    };

    if(playerMove === computerMove){
        roundVerdict.textContent = `Its a tie`
        roundVerdict.style.color = `1e1e1e`
        gameVerdict.style.backgroundColor = `#f6f6f6`
        gameVerdict.style.border = `1px solid #1e1e1e`
    } ;

    if(playerMove === "Rock" && computerMove === "Rock" ||
        playerMove === "Paper" && computerMove === "Paper" ||
        playerMove === "Scissor" && computerMove === "Scissor"
    ){
        roundVerdict.textContent = `Try again`
        roundVerdict.style.color = `#46351D`
        gameVerdict.style.backgroundColor = `#F9F5F1`
        gameVerdict.style.border = `1px solid #46351D`
    }else if (
        playerMove === "Rock" && computerMove === "Scissors" || 
        playerMove === "Scissors" && computerMove === "Paper" ||
        playerMove === "Paper" && computerMove === "Rock"
    ) {
        roundVerdict.textContent = `You Win`
        roundVerdict.style.color = `#355E3B`
        gameVerdict.style.backgroundColor = `#f9fbf9`
        gameVerdict.style.border = `1px solid #355E3B`
        playerScore++
        playerScoreDisplay.textContent = `You: ${playerScore}`
    } else {
        roundVerdict.textContent = `You lose`
        roundVerdict.style.color = `#900C3F`
        gameVerdict.style.backgroundColor = `#fdecf3`
        gameVerdict.style.border = `1px solid #900C3F`
        computerScore++
        computerScoreDisplay.textContent = `Computer: ${computerScore}`
    }


    startTimer()

    if(playerScore === 5){
        roundVerdict.textContent = `You Win`
        roundVerdict.style.color = `#355E3B`
        computerDecision.textContent = `Game Over!`
        stopTimer()
        gameOver()
    }

    if(computerScore === 5){
        roundVerdict.textContent = `You lose`
        roundVerdict.style.color = `#900C3F`
        computerChoice.firstElementChild.textContent = `Game Over!`
        stopTimer()
        gameOver()
    }

}



// EVENT LISTENERS
rock.addEventListener("click", (event) => {

    playerMove = "Rock"
    computerMove = computerPick()
    scoreUpdate(playerMove, computerMove)
    // console.log(event);
})

paper.addEventListener("click", (event) => {

    playerMove = "Paper"
    computerMove = computerPick()
    scoreUpdate(playerMove, computerMove)
    // console.log(event);
})

scissors.addEventListener("click", (event) => {


    playerMove = "Scissors"
    computerMove = computerPick()
    scoreUpdate(playerMove, computerMove)
})

playButton.addEventListener("click", (event) => {
    

    enableButton()
    playButton.firstElementChild.textContent = "Restart game"

    restartGame()
    // disableButton()
    
})

disableButton()