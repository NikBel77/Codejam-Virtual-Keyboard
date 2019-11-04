const firstRow = [
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61],
    [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43]
];
const secondRow = [
    [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92],
    [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 124]
];
const thirdRow = [
    [97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39],
    [65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34]
];
const fourthRow = [
    [122, 120, 99, 118, 98, 110, 109, 44, 46, 47],
    [90, 88, 67, 86, 66, 78, 77, 60, 62, 63]
];
let isCaps = false;


//Textarea
(function generateTextarea() {
    const body = document.querySelector('body');
    const textarea = document.createElement('textarea');
    body.classList.add('box');
    textarea.classList.add('text-area');
    body.appendChild(textarea);
})();


//keyboard
(function generateKeyboard() {
    const keyCodeName = [
        ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
        ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
        ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
        ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
        ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"]
    ];
    const sysKeys = ['Backspace', 'Tab', 'Del', 'CapsLock', 'Enter', 'Shift', '&#x25B2;', 'Shift', 'Ctrl', 'Win', 'Alt', 'Alt', '&#x25C4;', '&#x25BC;', '&#x25BA;', 'Ctrl'];
    const keyboard = document.createElement('div');
    const body = document.querySelector('body');
    keyboard.classList.add('keyboard');
    body.appendChild(keyboard);

    for (let j = 0; j < 5; j++) {
        let row = document.createElement('div');
        row.classList.add('keyboard__row');
        keyboard.appendChild(row);
        switch(j) {
            case 0: 
                //1st line
                for(let i = 0; i < 14; i++) {
                    if (i === 13) {
                        let key = document.createElement('div');
                        key.classList.add('system-key-back');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        key.innerHTML = `${sysKeys.shift()}`;
                        row.appendChild(key);
                    } else {
                        let key = document.createElement('div');
                        key.classList.add('key');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        row.appendChild(key);
                    }
                }
                break;

            case 1:
                //2th line
                for(let i = 0; i < 15; i++) {
                    if (i === 0 || i === 14) {
                        let key = document.createElement('div');
                        key.classList.add('system-key-md');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        key.innerHTML = `${sysKeys.shift()}`;
                        row.appendChild(key);
                    } else {
                        let key = document.createElement('div');
                        key.classList.add('key');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        row.appendChild(key);
                    }
                }
                break;

            case 2:
                //3rd line
                for(let i = 0; i < 13; i++) {
                    if (i === 0 || i === 12) {
                        let key = document.createElement('div');
                        key.classList.add('system-key-lg');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        key.innerHTML = `${sysKeys.shift()}`;
                        row.appendChild(key);
                    } else {
                        let key = document.createElement('div');
                        key.classList.add('key');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        row.appendChild(key);
                    }
                }
                break;

            case 3:
                //4th line
                for(let i = 0; i < 13; i++) {
                    if (i === 0 || i === 12) {
                        let key = document.createElement('div');
                        key.classList.add('system-key-lg');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        key.innerHTML = `${sysKeys.shift()}`;
                        row.appendChild(key);
                    } else if (i === 11) {
                        let key = document.createElement('div');
                        key.classList.add('system-key-xsm');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        key.innerHTML = `${sysKeys.shift()}`;
                        row.appendChild(key);
                    } else {
                        let key = document.createElement('div');
                        key.classList.add('key');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        row.appendChild(key);
                    }
                }
                break;
            
            case 4:
                //5th line
                for(let i = 0; i < 9; i++) {
                    if (i === 3) {
                        let key = document.createElement('div');
                        key.classList.add('space');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        row.appendChild(key);
                    } else {
                        let key = document.createElement('div');
                        key.classList.add('system-key-sm');
                        key.setAttribute('data', `${keyCodeName[j][i]}`);
                        key.innerHTML = `${sysKeys.shift()}`;
                        row.appendChild(key);
                    }
                }
                break;
        }
    }
    drawChar('', 0)
})();

function drawChar(lang, number) {

    let rows = document.querySelectorAll('.keyboard__row');
    for (let i = 0; i < 4; i++) {

        let buttons = rows[i].childNodes
        switch(i) {
            case 0:
                for (j = 0; j < firstRow[0].length; j++) {
                    buttons[j].innerHTML = `${String.fromCharCode(firstRow[number][j])}`;
                }
                break;
            case 1:
                for (j = 0; j < secondRow[0].length; j++) {
                    buttons[j + 1].innerHTML = `${String.fromCharCode(secondRow[number][j])}`;
                }
                break;
            case 2:
                for (j = 0; j < thirdRow[0].length; j++) {
                    buttons[j + 1].innerHTML = `${String.fromCharCode(thirdRow[number][j])}`;
                }
                break;
            case 3:
                for (j = 0; j < fourthRow[0].length; j++) {
                    buttons[j + 1].innerHTML = `${String.fromCharCode(fourthRow[number][j])}`;
                }
                break;
        }
    }
};

(function setEvent () {
    let current = document.querySelectorAll('.keyboard__row');
    let buttons = [];
    const textarea = document.querySelector('textarea');
    current.forEach((el) => {
        el.childNodes.forEach((el) => {
            buttons.push(el);
        });
    });

    document.querySelector('.keyboard').addEventListener('mousedown', (e) => e.preventDefault());
    
    for (let el of buttons) {
        switch (el.getAttribute('data')) {

            case 'CapsLock':
                el.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                });
                el.addEventListener('click', () => {
                    el.classList.toggle('active');
                    if (isCaps) {
                        drawChar('', 0);
                        isCaps = false;
                    } else {
                        drawChar('', 1);
                        isCaps = true;
                    }
                });
                break;

            case 'ShiftLeft':
            case 'ShiftRight':
                el.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    el.classList.add('active');
                    isCaps ? drawChar('', 0) : drawChar('', 1);
                });
                el.addEventListener('mouseup', () => {
                    el.classList.remove('active');
                    isCaps ? drawChar('', 1) : drawChar('', 0);
                });
                el.addEventListener('mouseout', () => {
                    el.classList.remove('active');
                    isCaps ? drawChar('', 1) : drawChar('', 0);
                });
                break;

            case 'ControlLeft':         
            case 'MetaLeft':
            case 'AltLeft':
            case 'AltRight':
            case 'ControlRight':
            case 'Delete':
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowDown':
                el.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    el.classList.add('active');
                });
                el.addEventListener('mouseup', () => {
                    el.classList.remove('active');
                });
                el.addEventListener('mouseout', () => {
                    el.classList.remove('active');
                });
                break;

            default:
                el.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    if (el.getAttribute('data') === 'Enter') textarea.value += '\n';
                    else if (el.getAttribute('data') === 'Backspace') textarea.value = textarea.value.slice(0, -1);
                    else if (el.getAttribute('data') === 'Space') textarea.value += ' ';
                    else if (el.getAttribute('data') === 'Tab') textarea.value += '\t';
                    else textarea.value += el.innerHTML;
                    el.classList.add('active');
                });
                el.addEventListener('mouseup', () => {
                    el.classList.remove('active');
                });
                el.addEventListener('mouseout', () => {
                    el.classList.remove('active');
                });
        }
    }
})();

(function setKeyEvent () {
    const body = document.querySelector('body');
    let elems = [];
    const textarea = document.querySelector('textarea');
    let current = document.querySelectorAll('.keyboard__row');
    let buttons = [];

    current.forEach((el) => {
        el.childNodes.forEach((el) => {
            buttons.push(el);
        });
    });

    body.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        e.preventDefault();

        for(let el of buttons) {
            if (e.code === el.getAttribute('data')) {
                switch (e.code) {
                    case 'CapsLock':
                        if(isCaps) {
                            drawChar('', 0);
                            isCaps = false;
                        } else {
                            drawChar('', 1);
                            isCaps = true;
                        }
                        el.classList.toggle('active');
                        break;

                    case 'ShiftRight':
                    case 'ShiftLeft':
                        isCaps ? drawChar('', 0) : drawChar('', 1);
                        el.classList.add('active');
                        elems.push(el);
                        break;

                    case 'ControlLeft':
                    case 'MetaLeft':
                    case 'AltLeft':
                    case 'AltRight':
                    case 'ControlRight':
                    case 'Delete':
                    case 'ArrowUp':
                    case 'ArrowLeft':
                    case 'ArrowRight':
                    case 'ArrowDown':
                        elems.push(el);
                        el.classList.add('active');
                        break;
                    
                    default:
                        if (el.getAttribute('data') === 'Enter') textarea.value += '\n';
                        else if (el.getAttribute('data') === 'Backspace') textarea.value = textarea.value.slice(0, -1);
                        else if (el.getAttribute('data') === 'Space') textarea.value += ' ';
                        else if (el.getAttribute('data') === 'Tab') textarea.value += '\t';
                        else  textarea.value += el.innerHTML;
                        elems.push(el);
                        el.classList.add('active');
                }
                break;
            }
        }
    });
    body.addEventListener('keyup', (e) => {
        if (e.code === 'CapsLock') return;
        let el = elems.pop();

        if (el.getAttribute('data') === 'ShiftRight' || el.getAttribute('data') === 'ShiftLeft') {
            isCaps ? drawChar('', 1) : drawChar('', 0);
            el.classList.remove('active');
            return;
        }
        else {
            el.classList.remove('active');
        }
    });
})()