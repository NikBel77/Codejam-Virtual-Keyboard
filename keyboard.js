let isCaps = false;

const keyCodeName = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];
const sysKeys = ['Backspace', 'Tab', 'Del', 'CapsLock', 'Enter', 'Shift', '&#x25B2;', 'Shift', 'Ctrl', 'Win', 'Alt', 'Alt', '&#x25C4;', '&#x25BC;', '&#x25BA;', 'Ctrl'];

const eng = [
  [
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61],
    [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43],
  ],
  [
    [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92],
    [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 124],
  ],
  [
    [97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39],
    [65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34],
  ],
  [
    [122, 120, 99, 118, 98, 110, 109, 44, 46, 47],
    [90, 88, 67, 86, 66, 78, 77, 60, 62, 63],
  ],
];
const rus = [
  [
    [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61],
    [1025, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 95, 43],
  ],
  [
    [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92],
    [1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 47],
  ],
  [
    [1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101],
    [1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069],
  ],
  [
    [1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46],
    [1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 44],
  ],
];

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
    if (isSysKeys) {
      key.innerHTML = `${sysKeys.shift()}`;
      key.setAttribute('data-sys', 'true');
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
      } else if (keyCodeName[j][i] === 'Tab' || keyCodeName[j][i] === 'Delete') {
        row.appendChild(createKey(j, i, 'system-key-md', true));
      } else if (keyCodeName[j][i] === 'CapsLock' || keyCodeName[j][i] === 'Enter' || keyCodeName[j][i] === 'ShiftLeft' || keyCodeName[j][i] === 'ShiftRight') {
        row.appendChild(createKey(j, i, 'system-key-lg', true));
      } else if (keyCodeName[j][i] === 'ArrowUp') {
        row.appendChild(createKey(j, i, 'system-key-xsm', true));
      } else if (j === 4) {
        if (keyCodeName[j][i] === 'Space') {
          row.appendChild(createKey(j, i, 'space'));
        } else {
          row.appendChild(createKey(j, i, 'system-key-sm', true));
        }
      } else {
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
        } else if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
          changeCaps();
          buttons[i].classList.add('active');
          elems.push(buttons[i]);
        } else if (e.code === 'Enter') {
          textarea.value += '\n';
        } else if (e.code === 'Backspace') {
          if (textarea.value === '') return;
          textarea.value = textarea.value.slice(0, -1);
        } else if (e.code === 'Space') {
          textarea.value += ' ';
        } else if (e.code === 'Tab') {
          textarea.value += '\t';
        } else if (!buttons[i].getAttribute('data-sys')) {
          textarea.value += buttons[i].innerHTML;
          elems.push(buttons[i]);
          buttons[i].classList.add('active');
        } else {
          elems.push(buttons[i]);
          buttons[i].classList.add('active');
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
        } else if (buttons[i].getAttribute('data') === 'Enter') {
          textarea.value += '\n';
          buttons[i].classList.add('active');
        } else if (buttons[i].getAttribute('data') === 'Backspace') {
          textarea.value = textarea.value.slice(0, -1);
          buttons[i].classList.add('active');
        } else if (buttons[i].getAttribute('data') === 'Space') {
          textarea.value += ' ';
          buttons[i].classList.add('active');
        } else if (buttons[i].getAttribute('data') === 'Tab') {
          textarea.value += '\t';
          buttons[i].classList.add('active');
        } else if (buttons[i].getAttribute('data') === 'CapsLock') {
          return;
        } else if (!buttons[i].getAttribute('data-sys')) {
          textarea.value += buttons[i].innerHTML;
          buttons[i].classList.add('active');
        } else {
          buttons[i].classList.add('active');
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
        } else if (buttons[i].getAttribute('data') === 'CapsLock') {
          return;
        } else {
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
        } else if (buttons[i].getAttribute('data') === 'CapsLock') {
          return;
        } else {
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
  });
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

(function init() {
  generateTextarea();
  generateKeyboard();
  drawChar(0);
  setEvent();
  setLocalStorageLang();
}());
