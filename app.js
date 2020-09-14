// DOM variables

let playButton = document.querySelector(".play-button") // Play! button
let playerState = document.querySelector(".player-state") // paragraph
let fieldButtons = document.querySelectorAll(".btn-light") // white buttons
let bombsCountField = document.querySelector(".bombs-count") // Amount of bombs field
let chooseDifficultySection = document.querySelector(".choose-difficulty-section") // Radio inputs div

// =======================


// Matrix(field) variables

let n = 3 // matrix width
let m = 3 // matrix height

// =======================


// Counters

let bombsCount = 0 // Amount of bombs
let successCount = 0 // Counter of succesful turns

// =======================

// Default field
let field = []


// Get random integer including min and max
const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Set number of bombs by chosen difficulty
const chooseAmountByDifficulty = diff => {
    if(diff == 1){
        return 2
    } else if(diff == 2){
        return 4
    } else if(diff == 3){
        return 6
    }
}

// Generate field
const generateField = (difficulty) => {

    // Set max bombs amount
    let maxBombs = chooseAmountByDifficulty(difficulty)

    // Creation loop
    for (let i = 0; i < m; i++){

        field[i] = [];
    
        for (let j = 0; j < n; j++){
    
            if(bombsCount < maxBombs){
    
                generatedNum = getRandomInt(0,1)
                field[i][j] = generatedNum
                
                // Counting bombs
                if(generatedNum === 1){
                    bombsCount++
                }
    
            } else {
                field[i][j] = 0
            }
        }
    }

    // Insert amount of bombs to field
    bombsCountField.innerHTML = bombsCount

    console.log(field)
}

// Start game
playButton.addEventListener('click', () => {
    // Enable play field
    fieldButtons.forEach(btn => btn.disabled = false)
    // Hide play button and difficulty section
    playButton.classList.add('d-none')
    chooseDifficultySection.classList.add('d-none')

    // Set game state to active
    playerState.innerHTML = 'Your game is running!'

    try{
        // Get difficulty
        let difficulty = document.querySelector('input[name="diff"]:checked').value

        // Generate play field by difficulty
        generateField(difficulty)
    } catch (TypeError){
        alert("Choose difficulty")
        document.location.reload()
        
    }
    
})


const getNearlyBombsCount = value => {

    // Default variables
    let x
    let y
    let counter = 0

    // Setting value of coordinate according to value
    // (double equal sign because value attribute is string)

    if(value == 0){
        x = 0
        y = 0
    } else if(value == 1) {
        x = 0
        y = 1
    } else if(value == 2) {
        x = 0
        y = 2
    } else if(value == 3) {
        x = 1
        y = 0
    } else if(value == 4) {
        x = 1
        y = 1
    } else if(value == 5) {
        x = 1
        y = 2
    } else if(value == 6) {
        x = 2
        y = 0
    } else if(value == 7) {
        x = 2
        y = 1
    } else if(value == 8) {
        x = 2
        y = 2
    } 

    // Coordinates working well

    // Counting near bombs

    try {
        if (field[x-1][y+1] === 1) {
            counter++
        } 
  
    } catch (error) {
        counter += 0
    }

    try {
        if (field[x][y+1] === 1) {
            counter++
        }  
    } catch (error) {
        counter += 0
    }
       
    try {
        if (field[x+1][y+1] === 1) {
            counter++
        } 
    } catch (error) {
        counter += 0
    }

    try {
        if (field[x-1][y] === 1) {
            counter++
        } 
    } catch (error) {
        counter += 0
    }

    try {
        if (field[x+1][y] === 1) {
            counter++
        }  
    } catch (error) {
        counter += 0
    }
 
    try {
        if (field[x-1][y-1] === 1) {
            counter++
        } 
    } catch (error) {
        counter += 0
    }

    try {
        if (field[x][y-1] === 1) {
            counter++
        }
    } catch (error) {
        counter += 0
    }

    try {
        if (field[x+1][y-1] === 1) {
            counter++
        }
    } catch (error) {
        counter += 0
    }
      
 
    return counter


}


// Success turn
const successTurn = btn => {
    // Change color of button
    btn.classList.remove('btn-light')
    btn.classList.add('btn-success')

    // Increase success turns count
    successCount++

    btn.innerHTML += getNearlyBombsCount(btn.value)

    // Win condition
    if(successCount === 9 - bombsCount){
        fieldButtons.forEach(button => button.disabled = true)
        alert('You win! Congratulations!')
        playButton.classList.remove('d-none')
        playButton.innerHTML = 'Another try?'
        playButton.href = '.'
    }
}

// Fail turn
const failTurn = btn => {
    // Change color of button
    btn.classList.remove('btn-light')
    btn.classList.add('btn-danger')
    btn.innerHTML += '<i class="fas fa-bomb"></i>'
    // Show play again button
    playButton.classList.remove('d-none')
    playButton.innerHTML = 'You lost, play again'
    playButton.href = '.'

    // Disable play field
    fieldButtons.forEach(button => button.disabled = true)
}


// Main game loop
fieldButtons.forEach(btn => btn.addEventListener('click', () => {

    


    // Show amount of bombs
    bombsCountField.innerHTML = bombsCount


    // Success or fail conditions of buttons compared to matrix values
    if(btn.value == 0){
        if(field[0][0] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 1){
        if(field[0][1] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 2){
        if(field[0][2] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 3){
        if(field[1][0] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 4){
        if(field[1][1] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 5){
        if(field[1][2] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 6){
        if(field[2][0] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 7){
        if(field[2][1] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
    if(btn.value == 8){
        if(field[2][2] === 1){
            failTurn(btn)
        } else {
            successTurn(btn)
        }
    }
}))