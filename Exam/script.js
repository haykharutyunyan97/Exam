let state = [];
let elems = [];
let id = [];
let info = [];


function randomNum() {
    return Math.floor(Math.random() * 16)
}

function shakeNumbers() {
    for (let i = 0; i < 9; i++) {
        for (let j = 1; j <= 2; j++) {
            let index = randomNum();
            if (!state[index]) {
                state[index] = i;
            } else {
                --j
            }
        }
    }
    renderarea();
}


function renderarea() {
    const span = document.querySelectorAll("span");
    span.forEach((item, index) => {
        item.innerHTML = state[index];
    })
}


function addRemoveListener(event, addRemove) {
    const area = document.querySelectorAll(".overlay");
    area.forEach(item => {
        if (!item.classList.contains("opacity-0")) {
            item[`${addRemove}EventListener`](event, handleClick)
        }
    })
}

function handleClick({ target }) {
    elems.push(target);
    if (elems.length == 2) {
        addRemoveListener("click", "remove")
    }

    let index = setTimeout(() => {
        target.classList.remove("opacity-0");
        target.addEventListener("click", handleClick);
        elems = [];
        id = [];
    }, 2000);
    id.push(index);
    target.classList.add("opacity-0");
    target.removeEventListener("click", handleClick);
    if (elems.length == 2) {
        compareAreas(elems, id);
        elems = [];
        id = []
    }
}

function compareAreas([elem1, elem2], id) {
    id.forEach(item => {
        clearTimeout(item);
    })
    if (elem1.previousElementSibling.innerHTML === elem2.previousElementSibling.innerHTML) {
        setTimeout(() => {
            elem1.parentElement.classList.add('opacity-05');
            elem2.parentElement.classList.add('opacity-05');
        }, 480)
    } else {
        setTimeout(() => {
            elem1.classList.remove('opacity-0');
            elem2.classList.remove('opacity-0');
        }, 500)

    }

    setTimeout(() => {
        addRemoveListener('click', 'add')
    }, 520)

    setTimeout(checkWin, 530)
}


function checkWin() {
    let elems = document.querySelectorAll(".area");
    let findedElems = document.querySelectorAll(".opacity-05");

    if (elems.length == findedElems.length) {
        let endTime = Date.now();
        info[info.length - 1].time = (endTime - info[info.length - 1].time) / 1000;

        document.querySelector(".area-container").classList.add("dp-none");
        document.querySelector(".win-container").classList.remove("dp-none");
        document.querySelector("#gameId").innerHTML = info[info.length - 1].gameId;
        document.querySelector("#time").innerHTML = `${info[info.length - 1].time}s`;
    }

}

function init({ target }) {
    let winBlock = document.querySelector(".win-container");
    let areaBlock = document.querySelector(".area-container");
    let menuBlock = document.querySelector(".menu-container");

    if (target.title == "Document") {
        areaBlock.classList.add("dp-none");
        winBlock.classList.add("dp-none");
    } else {
        state = [];
        info.push({
            gameId: info.length ? ++info[info.length - 1].gameId : 1,
            time:Date.now()
        })

        areaBlock.classList.remove("dp-none");
        winBlock.classList.add("dp-none");
        menuBlock.classList.add("dp-none");

        let area = document.querySelectorAll(".area");

        area.forEach(item => {
            item.classList.remove("opacity-05")
            item.lastElementChild.classList.add("opacity-0");
        })
    }

    setTimeout(()=> {
        let overlay = document.querySelectorAll(".overlay");
        overlay.forEach(item => {
            item.classList.remove("opacity-0")
        })
        addRemoveListener("click","add");
    },2000);

    shakeNumbers();

    let newGameButton = document.querySelector("#newGame");
    newGameButton.addEventListener("click",init);
    let winBlockNewGame = document.querySelector("#win-new-game");
    winBlockNewGame.addEventListener("click",init);
    let winBlockMenu = document.querySelector("#win-menu");
    winBlockMenu.addEventListener("click",getMenu);
}

function getMenu() {
    let winBlock = document.querySelector('.win-container');
    let areaBlock = document.querySelector('.area-container');
    let menuBlock = document.querySelector('.menu-container');

    areaBlock.classList.add('dp-none');
    winBlock.classList.add('dp-none');
    menuBlock.classList.remove('dp-none');
}

let body = document.querySelector("body");
body.onload = init;