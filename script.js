const monsterHealth=document.getElementById("monster-health");
const playerHealth=document.getElementById("player-health");
const bonusLife=document.getElementById("bonus-life");

const attackBtn=document.getElementById("attack-btn");
const StrongAttackBtn=document.getElementById("strong-btn");
const healBtn=document.getElementById("heal-btn");
const resetBtn=document.getElementById("reset-btn");
const logBtn=document.getElementById("btn-log");


const attackValue=10;
const strongAttackValue= 30;
let healValue=15;

const enteredValue=prompt('Enter Max Life: ', '100');

let chosenMaxLife=parseInt(enteredValue);
let battleLog=[];

if (isNaN(chosenMaxLife) ||  chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealth=chosenMaxLife;
let currentPlayerHealth=chosenMaxLife;
let hasBonusLife = true;


const logEventPlayerAttack= 'PLAYER ATTACK';
const logEventMonsterAttack= 'MONSTER ATTACK';
const logEventStrongAttack= 'STRONG ATTACK';
const logEventPlayerHeal= 'PLAYER HEAL';
const logEventGameOver= 'GAME OVER';

adjustHealthBars(chosenMaxLife);

//Log
function writeToLog(eve, val, monstHealth, playHealth){
    let logEntry={
        event: eve,
        value: val,
        finalMonsterHealth: monstHealth,
        finalPlayerHealth: playHealth
    };;
    if(eve===logEventPlayerAttack){
        logEntry.target='Monster';
    }else if(eve===logEventMonsterAttack){
        logEntry.target='Player';
    }else if(eve===logEventStrongAttack){
        logEntry.target='Monster';
    }else if(eve===logEventPlayerHeal){
        logEntry.target='Player';
    }else if(eve===logEventGameOver){
        logEntry={
        event: eve,
        value: val,
        finalMonsterHealth: monstHealth,
        finalPlayerHealth: playHealth
        }
    }
    battleLog.push(logEntry);
}

function printLogHandler(){
    console.log(battleLog);
}


function adjustHealthBars(maxLife){
    monsterHealth.max=maxLife;
    monsterHealth.value=maxLife;
    playerHealth.max=maxLife;
    playerHealth.value=maxLife;
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
    const initialPlayerHealth=currentPlayerHealth;
    const pDamage= playerDamage(attackValue);
    currentPlayerHealth-=pDamage;
    writeToLog(logEventMonsterAttack, pDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth=initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Your bonus life has saved you! Heal Yourself!');
    }        

        if (currentMonsterHealth<=0 && currentPlayerHealth>0){
            alert('You won!');
            writeToLog(logEventGameOver, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
            resetHandler();
        }else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
            alert('You lost!');
            writeToLog(logEventGameOver, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
            resetHandler();
        }else if(currentMonsterHealth<=0 && currentPlayerHealth<=0){
            alert('You have a draw!');
            writeToLog(logEventGameOver, 'NOBODY WON', currentMonsterHealth, currentPlayerHealth);
            resetHandler();
        }
}



//ATTACK AND STRONG ATTACK
function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if(mode==="ATTACK"){
        maxDamage=attackValue;
        logEvent=logEventPlayerAttack;
    }else if(mode==="STRONG_ATTACK"){
        maxDamage=strongAttackValue;555
        logEvent=logEventStrongAttack;
    }
    const mDamage= monsterDamage(maxDamage);
    currentMonsterHealth-=mDamage;
    writeToLog(logEvent, mDamage, currentMonsterHealth, currentPlayerHealth);
        
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

    writeToLog(logEventPlayerHeal, HEAL_VALUE, currentMonsterHealth, currentPlayerHealth);

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


//BONUS LIFE
function removeBonusLife(){
    bonusLife.parentNode.removeChild(bonusLife);
}

function setPlayerHealth(health){
    playerHealth.value=health;
}




attackBtn.addEventListener('click',attackHandler);
StrongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
resetBtn.addEventListener('click',resetHandler);
logBtn.addEventListener('click', printLogHandler)
