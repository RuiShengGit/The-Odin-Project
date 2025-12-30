let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    let choices = ["rock", "paper", "scissors"]
    return choices[Math.floor(Math.random() * 3)];
}


let updateUI = (cChoice, hChoice) => {
    const cDisplay = document.querySelector('.computer.img-box');
    const cImg = document.createElement('img');
    cImg.src = `img/${cChoice}_icon.png`; // relative path to your folder
    cImg.alt = 'Computer Choice Image';    
    cImg.style.width = '100%';
    cImg.style.height = '100%';

    cDisplay.innerHTML = ''; // clear previous
    cDisplay.appendChild(cImg);

    const hDisplay = document.querySelector('.human.img-box');
    const hImg = document.createElement('img');
    hImg.src = `img/${hChoice}_icon.png`; // relative path to your folder
    hImg.alt = 'Human Choice Image';    
    hImg.style.width = '100%';
    hImg.style.height = '100%';
    
    hDisplay.innerHTML = ''; // clear previous
    hDisplay.appendChild(hImg);

    const hScore = document.querySelector('.humanScore')
    hScore.textContent = humanScore;
    const cScore = document.querySelector('.computerScore')
    cScore.textContent = computerScore;
}

let resetUI = () => {
    const cDisplay = document.querySelector('.computer.img-box');
    const hDisplay = document.querySelector('.human.img-box');
    humanScore = 0;
    computerScore = 0;
    const hScore = document.querySelector('.humanScore')
    hScore.textContent = humanScore;
    const cScore = document.querySelector('.computerScore')
    cScore.textContent = computerScore;
    cDisplay.innerHTML = '';
    hDisplay.innerHTML = '';
}

let playRound = (cChoice, hChoice) => {
    if (hChoice == cChoice){
        console.log("Tie!" )
    } else if ((hChoice == "rock" && cChoice == "scissors") 
        || (hChoice == "paper" && cChoice == "rock") 
        || (hChoice == "scissors" && cChoice == "paper")) {
        console.log("You Win! " + hChoice + " beats " + cChoice + ".");
        humanScore++;
    } else {
        console.log("You Lose!");
        computerScore++;
    }

    console.log("User score: " + humanScore + " | Computer score: " + computerScore)
    
}


const options = document.querySelectorAll('button');
options.forEach((option) => {
    option.addEventListener("click", (e) => {
        console.log("click");
        const hChoice = e.target.dataset.choice;
        const cChoice = getComputerChoice();
        console.log("Computer chose " + cChoice);
        console.log("You chose " + hChoice);
        playRound(cChoice, hChoice);
        updateUI(cChoice, hChoice);
        if (humanScore >= 5 || computerScore >= 5) {
            if (humanScore > computerScore) alert('You won the game!');
            else if (humanScore < computerScore) alert('You lost the game!');
            else alert('Tie!');
            resetUI();
        }
    })
});








