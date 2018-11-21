/*
Papier kamień nożyce 
2018-1-21
*/
const hands = document.querySelectorAll(".images img");
const btn = document.querySelector("button");
const game = {
    handSelectedUser: null,
    handSelectedComputer: null,
    winner: "",
}
const summary = {
    gameCount: 0,
    gameWon: 0,
    gameLose: 0,
    gameDraw: 0,
}
//obsługa zaznaczenia: kamień , papier...
const handSelected = function (e) {
    // const selected = this.dataset.option;
    game.handSelectedUser = this.dataset.option;
    hands.forEach(hand => hand.setAttribute("src", `./img/${hand.dataset.option}.png`)); //ustawiam domyślne zdjęcia dla wszystkich img
    this.setAttribute("src", `./img/${this.dataset.option}-active.png`); //ustawiam aktywne - podmiana img
    document.querySelector(".game p:nth-of-type(1)").innerHTML = `user: <span>${this.dataset.option} </span>`;

}
//wyczysć bieżącą partię
const clearGame = function () {
    document.querySelector(".game p:nth-of-type(2)").innerHTML = `komputer: <span> - </span>`;
    document.querySelector(".game h3").textContent = ``;
    game.handSelectedComputer = "";
    game.winner = "";
    clearGame(); //wyczyść obiekty i stan gry
}

//sprawdz kto wygrał
const checkGameStatus = function () {
    if (game.handSelectedUser == game.handSelectedComputer) {
        game.winner = "remis";
        summary.gameDraw++;
    } else if ((game.handSelectedUser == 'kamien' && game.handSelectedComputer == 'nozyce') ||
        (game.handSelectedUser == 'nozyce' && game.handSelectedComputer == 'papier') ||
        (game.handSelectedUser == 'papier' && game.handSelectedComputer == 'kamien')) {
        game.winner = "user";
        summary.gameWon++;
    } else {
        game.winner = "komputer";
        summary.gameLose++;
    }
    return game.winner;
}

//aktualizuj wyniki
const updateStats = function () {
    document.querySelector(".scores p:nth-of-type(1)>span").textContent = `${summary.gameCount}`;
    document.querySelector(".scores p:nth-of-type(2)>span").textContent = `${summary.gameWon}`;
    document.querySelector(".scores p:nth-of-type(3)>span").textContent = `${summary.gameLose}`;
    document.querySelector(".scores p:nth-of-type(4)>span").textContent = `${summary.gameDraw}`;

}
//uruchom grę
const play = function () {
    if (game.handSelectedUser) {
        document.querySelector(".game p:nth-of-type(2)").innerHTML = `komputer: <span>${computerPlay()} </span>`;
        document.querySelector(".game h3").textContent = `${checkGameStatus()}`;
        summary.gameCount++;
        updateStats();
    } else alert("wybierz jedną z 3 opcji");
}
//AI - komputer wybiera
const computerPlay = function () {
    const randomHand = Math.floor(Math.random() * (3));
    const selectedComputer = hands[randomHand].dataset.option;
    game.handSelectedComputer = selectedComputer;
    return game.handSelectedComputer;
}

hands.forEach((hand) => hand.addEventListener("click", handSelected));
btn.addEventListener("click", play);