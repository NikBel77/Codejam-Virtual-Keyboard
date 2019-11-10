let isCaps = false;

function setLocalStorageLang() {
    if (!localStorage.lang) {
      localStorage.lang = 'eng';
    }
}

function generateTextarea() {
    const body = document.querySelector('body');
    const textarea = document.createElement('textarea');
    body.classList.add('box');
    textarea.classList.add('text-area');
    body.appendChild(textarea);
}

function generateKeyboard() {
    const keyboard = document.createElement('div');
    const body = document.querySelector('body');
    keyboard.classList.add('keyboard');
    body.appendChild(keyboard);

    function createKey(j, i, classBtn, isSysKeys = false) {
        const key = document.createElement('div');
        key.classList.add(classBtn);
        key.setAttribute('data', `${keyCodeName[j][i]}`);
        if(isSysKeys) {
            key.innerHTML = `${sysKeys.shift()}`;
            key.setAttribute('data-sys', `true`);
        }
        return key;
    }
  
    for (let j = 0; j < keyCodeName.length; j += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      keyboard.appendChild(row);

      for (let i = 0; i < keyCodeName[j].length; i += 1) {
        if (keyCodeName[j][i] === 'Backspace') {
            row.appendChild(createKey(j, i, 'system-key-back', true));
        }
        else if (keyCodeName[j][i] === 'Tab' || keyCodeName[j][i] === 'Delete') {
            row.appendChild(createKey(j, i, 'system-key-md', true));
        }
        else if (keyCodeName[j][i] === 'CapsLock' || keyCodeName[j][i] === 'Enter' || keyCodeName[j][i] === 'ShiftLeft' || keyCodeName[j][i] === 'ShiftRight') {
            row.appendChild(createKey(j, i, 'system-key-lg', true));
        }
        else if (keyCodeName[j][i] === 'ArrowUp') {
            row.appendChild(createKey(j, i, 'system-key-xsm', true));
        }
        else if (j === 4) {
            if (keyCodeName[j][i] === 'Space') {
                row.appendChild(createKey(j, i, 'space'));
            } else {
                row.appendChild(createKey(j, i, 'system-key-sm', true));
            }
        }
        else {
            row.appendChild(createKey(j, i, 'key'));
        }
      }
    }
}

function drawChar(number, isChangeLang = false) {
    const rows = document.querySelectorAll('.keyboard__row');
    let currentLang = localStorage.lang === 'eng' ? eng : rus;

    if (isChangeLang) {
      if (localStorage.lang === 'eng') {
        currentLang = rus;
        localStorage.lang = 'rus';
      } else {
        currentLang = eng;
        localStorage.lang = 'eng';
      }
    }

    for (let i = 0; i < rows.length - 1; i += 1) {
        const buttons = rows[i].children;
        for (let j = 0, k = 0; j < buttons.length; j += 1) {
            if (!buttons[j].getAttribute('data-sys')) {
                buttons[j].innerHTML = String.fromCharCode(currentLang[i][number][k]);
                k += 1;
            }
        }
    }
}

function changeCaps() {
    if (isCaps) {
      drawChar(0);
      isCaps = false;
    } else {
      drawChar(1);
      isCaps = true;
    }
}

function setEvent() {
    const current = document.querySelectorAll('.keyboard__row');
    const buttons = [];
  
    current.forEach((el) => {
      el.childNodes.forEach((elem) => {
        buttons.push(elem);
      });
    });

    setKeyEvent(buttons);
    setMouseEvent(buttons);
}

function setKeyEvent(buttons) {
    const elems = [];
    const textarea = document.querySelector('textarea');
    const body = document.querySelector('body');

    body.addEventListener('keydown', (e) => {
        if (e.repeat && e.code !== 'Backspace') return;
        if ((e.altKey && e.ctrlKey) && (e.code === 'AltLeft' || e.code === 'ControlLeft')) {
            if (isCaps) drawChar(1, true);
            else drawChar(0, true);
        }
        e.preventDefault();

        for (let i = 0; i < buttons.length; i += 1) {
            if (e.code === buttons[i].getAttribute('data')) {
                if (e.code === 'CapsLock') {
                    changeCaps();
                    buttons[i].classList.toggle('active');
                }
                else if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
                    changeCaps();
                    buttons[i].classList.add('active');
                    elems.push(buttons[i]);
                }
                else if (e.code === 'Enter') {
                        textarea.value += '\n';
                }
                else if (e.code  === 'Backspace') {
                    if (textarea.value === '') return;
                    textarea.value = textarea.value.slice(0, -1);
                }
                else if (e.code === 'Space') {
                    textarea.value += ' ';
                }
                else if (e.code === 'Tab') {
                    textarea.value += '\t';
                }
                else {
                    if (!buttons[i].getAttribute('data-sys')) {
                        textarea.value += buttons[i].innerHTML;
                        elems.push(buttons[i]);
                        buttons[i].classList.add('active');
                    } else {
                        elems.push(buttons[i]);
                        buttons[i].classList.add('active');
                    }
                }
                break;
            }
        }
    });
    body.addEventListener('keyup', (e) => {
        if (e.code === 'CapsLock') return;
        const el = elems.pop();

        if (el.getAttribute('data') === 'ShiftRight' || el.getAttribute('data') === 'ShiftLeft') {
            changeCaps();
            el.classList.remove('active');
            return;
        }

        el.classList.remove('active');
    });
}

function setMouseEvent(buttons) {
    const textarea = document.querySelector('textarea');
  
    document.querySelector('.keyboard').addEventListener('mousedown', (e) => {
        e.preventDefault();
        for (let i = 0; i < buttons.length; i += 1) {
            if (e.target === buttons[i]) {
                if (buttons[i].getAttribute('data') === 'ShiftRight' || buttons[i].getAttribute('data') === 'ShiftLeft') {
                    buttons[i].classList.add('active');
                    changeCaps();
                }
                else if (buttons[i].getAttribute('data') === 'Enter') {
                    textarea.value += '\n';
                    buttons[i].classList.add('active');
                }
                else if (buttons[i].getAttribute('data')  === 'Backspace') {
                    textarea.value = textarea.value.slice(0, -1);
                    buttons[i].classList.add('active');
                }
                else if (buttons[i].getAttribute('data') === 'Space') {
                    textarea.value += ' ';
                    buttons[i].classList.add('active');
                }
                else if (buttons[i].getAttribute('data') === 'Tab') {
                    textarea.value += '\t';
                    buttons[i].classList.add('active');
                }
                else if (buttons[i].getAttribute('data') === 'CapsLock') {
                    return;
                }
                else {
                    if (!buttons[i].getAttribute('data-sys')) {
                        textarea.value += buttons[i].innerHTML;
                        buttons[i].classList.add('active');
                    } else {
                        buttons[i].classList.add('active');
                    }
                }
            }
        }
    });

    document.querySelector('.keyboard').addEventListener('mouseup', (e) => {
        e.preventDefault();
        for (let i = 0; i < buttons.length; i += 1) {
            if (e.target === buttons[i]) {
                if (buttons[i].getAttribute('data') === 'ShiftRight' || buttons[i].getAttribute('data') === 'ShiftLeft') {
                    buttons[i].classList.remove('active');
                    changeCaps();
                }
                else if (buttons[i].getAttribute('data') === 'CapsLock') {
                    return;
                }
                else {
                    buttons[i].classList.remove('active');
                }
            }
        }
    });
    
    document.querySelector('.keyboard').addEventListener('mouseout', (e) => {
        e.preventDefault();
        for (let i = 0; i < buttons.length; i += 1) {
            if (e.target === buttons[i]) {
                if (buttons[i].getAttribute('data') === 'ShiftRight' || buttons[i].getAttribute('data') === 'ShiftLeft') {
                    if (e.shiftKey) return;
                    if (buttons[i].classList.contains('active')) {
                        buttons[i].classList.remove('active');
                        changeCaps();
                    }
                }
                else if (buttons[i].getAttribute('data') === 'CapsLock') {
                    return;
                }
                else {
                    buttons[i].classList.remove('active');
                }
            }
        }
    });

    document.querySelector('.keyboard').addEventListener('click', (e) => {
        if (e.target.getAttribute('data') === 'CapsLock') {
            e.target.classList.toggle('active');
            changeCaps();
        }
    })
}

(function init() {
    generateTextarea();
    generateKeyboard();
    drawChar(0);
    setEvent();
    setLocalStorageLang();
})();