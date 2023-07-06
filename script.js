const monsterHealth=document.getElementById("monster-health");
const playerHealth=document.getElementById("player-health");

const attackBtn=document.getElementById("attack-btn");
const StrongAttackBtn=document.getElementById("strong-btn");
const healBtn=document.getElementById("heal-btn");
const resetBtn=document.getElementById("reset-btn");


let chosenMaxLife=100;
const attackValue=10;
const strongAttackValue= 30;
let healValue=15;
let currentMonsterHealth=chosenMaxLife;
let currentPlayerHealth=chosenMaxLife;

function adjustHealthBars(chosenMaxLife){
    monsterHealth.max=chosenMaxLife;
    monsterHealth.value=chosenMaxLife;
    playerHealth.max=chosenMaxLife;
    playerHealth.value=chosenMaxLife;
}

function monsterDamage(damage){
    const dealtDamage=Math.random()*damage;
    monsterHealth.value -= dealtDamage;
    return dealtDamage;
}

function playerDamage(damage){
    const dealtDamage=Math.random()*damage;
    playerHealth.value-=dealtDamage;
    return dealtDamage;
}

function endRound(){
    const pDamage= playerDamage(attackValue);
    currentPlayerHealth-=pDamage;
        if (currentMonsterHealth<=0 && currentPlayerHealth>0){
            alert('You won!');
            resetHandler();
        }else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
            alert('You lost!');
            resetHandler();
        }else if(currentMonsterHealth<=0 && currentPlayerHealth<=0){
            alert('You have a draw!');
            resetHandler();
        }
}



//ATTACK AND STRONG ATTACK
function attackMonster(mode){
    let maxDamage;
    if(mode==="ATTACK"){
        maxDamage=attackValue
    }else if(mode==="STRONG_ATTACK"){
        maxDamage=strongAttackValue
    }
    const mDamage= monsterDamage(maxDamage);
    currentMonsterHealth-=mDamage;
        
    endRound();
}

function attackHandler(){
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}


//HEAL
function healPlayer(hValue){
    playerHealth.value+=hValue;
}

function healPlayerHandler(){
    let HEAL_VALUE;
    if (currentPlayerHealth>=chosenMaxLife-healValue){
        alert('You cant heal more than your max initial health.');
        HEAL_VALUE=chosenMaxLife-currentPlayerHealth;
    }else{
        HEAL_VALUE=healValue;
    }
    healPlayer(healValue);
    currentPlayerHealth+=healValue;
    endRound();
}



//RESET
function resetGame(value){
    playerHealth.value=value;
    monsterHealth.value=value;
}

function resetHandler(){
    currentMonsterHealth=chosenMaxLife;
    currentPlayerHealth=chosenMaxLife;
    resetGame(chosenMaxLife);
}




attackBtn.addEventListener('click',attackHandler);
StrongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
resetBtn.addEventListener('click',resetHandler);
