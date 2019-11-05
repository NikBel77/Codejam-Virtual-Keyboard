const eng = {
  firstRow: [
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61],
    [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43],
  ],
  secondRow: [
    [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92],
    [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 124],
  ],
  thirdRow: [
    [97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39],
    [65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34],
  ],
  fourthRow: [
    [122, 120, 99, 118, 98, 110, 109, 44, 46, 47],
    [90, 88, 67, 86, 66, 78, 77, 60, 62, 63],
  ],
};
const rus = {
  firstRow: [
    [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61],
    [1025, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 95, 43],
  ],
  secondRow: [
    [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92],
    [1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 47],
  ],
  thirdRow: [
    [1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101],
    [1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069],
  ],
  fourthRow: [
    [1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46],
    [1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 44],
  ],
};
let isCaps = false;

function drawChar(number, change) {
  const rows = document.querySelectorAll('.keyboard__row');
  let currentLang = localStorage.lang === 'eng' ? eng : rus;
  if (change) {
    if (localStorage.lang === 'eng') {
      currentLang = rus;
      localStorage.lang = 'rus';
    } else {
      currentLang = eng;
      localStorage.lang = 'eng';
    }
  }
  for (let i = 0; i < 4; i += 1) {
    const buttons = rows[i].childNodes;
    switch (i) {
      case 0:
        for (let j = 0; j < currentLang.firstRow[0].length; j += 1) {
          buttons[j].innerHTML = `${String.fromCharCode(currentLang.firstRow[number][j])}`;
        }
        break;
      case 1:
        for (let j = 0; j < currentLang.secondRow[0].length; j += 1) {
          buttons[j + 1].innerHTML = `${String.fromCharCode(currentLang.secondRow[number][j])}`;
        }
        break;
      case 2:
        for (let j = 0; j < currentLang.thirdRow[0].length; j += 1) {
          buttons[j + 1].innerHTML = `${String.fromCharCode(currentLang.thirdRow[number][j])}`;
        }
        break;
      default:
        for (let j = 0; j < currentLang.fourthRow[0].length; j += 1) {
          buttons[j + 1].innerHTML = `${String.fromCharCode(currentLang.fourthRow[number][j])}`;
        }
        break;
    }
  }
}

(function localStorageSet() {
  if (!localStorage.lang) {
    localStorage.lang = 'eng';
  }
}());

// Textarea
(function generateTextarea() {
  const body = document.querySelector('body');
  const textarea = document.createElement('textarea');
  body.classList.add('box');
  textarea.classList.add('text-area');
  body.appendChild(textarea);
}());


// keyboard
(function generateKeyboard() {
  const keyCodeName = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
  ];
  const sysKeys = ['Backspace', 'Tab', 'Del', 'CapsLock', 'Enter', 'Shift', '&#x25B2;', 'Shift', 'Ctrl', 'Win', 'Alt', 'Alt', '&#x25C4;', '&#x25BC;', '&#x25BA;', 'Ctrl'];
  const keyboard = document.createElement('div');
  const body = document.querySelector('body');
  keyboard.classList.add('keyboard');
  body.appendChild(keyboard);

  for (let j = 0; j < 5; j += 1) {
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    keyboard.appendChild(row);
    switch (j) {
      case 0:
        // 1st line
        for (let i = 0; i < 14; i += 1) {
          if (i === 13) {
            const key = document.createElement('div');
            key.classList.add('system-key-back');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            key.innerHTML = `${sysKeys.shift()}`;
            row.appendChild(key);
          } else {
            const key = document.createElement('div');
            key.classList.add('key');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            row.appendChild(key);
          }
        }
        break;

      case 1:
        // 2th line
        for (let i = 0; i < 15; i += 1) {
          if (i === 0 || i === 14) {
            const key = document.createElement('div');
            key.classList.add('system-key-md');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            key.innerHTML = `${sysKeys.shift()}`;
            row.appendChild(key);
          } else {
            const key = document.createElement('div');
            key.classList.add('key');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            row.appendChild(key);
          }
        }
        break;

      case 2:
        // 3rd line
        for (let i = 0; i < 13; i += 1) {
          if (i === 0 || i === 12) {
            const key = document.createElement('div');
            key.classList.add('system-key-lg');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            key.innerHTML = `${sysKeys.shift()}`;
            row.appendChild(key);
          } else {
            const key = document.createElement('div');
            key.classList.add('key');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            row.appendChild(key);
          }
        }
        break;

      case 3:
        // 4th line
        for (let i = 0; i < 13; i += 1) {
          if (i === 0 || i === 12) {
            const key = document.createElement('div');
            key.classList.add('system-key-lg');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            key.innerHTML = `${sysKeys.shift()}`;
            row.appendChild(key);
          } else if (i === 11) {
            const key = document.createElement('div');
            key.classList.add('system-key-xsm');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            key.innerHTML = `${sysKeys.shift()}`;
            row.appendChild(key);
          } else {
            const key = document.createElement('div');
            key.classList.add('key');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            row.appendChild(key);
          }
        }
        break;

      default:
        // 5th line
        for (let i = 0; i < 9; i += 1) {
          if (i === 3) {
            const key = document.createElement('div');
            key.classList.add('space');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            row.appendChild(key);
          } else {
            const key = document.createElement('div');
            key.classList.add('system-key-sm');
            key.setAttribute('data', `${keyCodeName[j][i]}`);
            key.innerHTML = `${sysKeys.shift()}`;
            row.appendChild(key);
          }
        }
        break;
    }
  }
  drawChar(0, false);
}());

(function setEvent() {
  const current = document.querySelectorAll('.keyboard__row');
  const buttons = [];
  const textarea = document.querySelector('textarea');
  current.forEach((el) => {
    el.childNodes.forEach((elem) => {
      buttons.push(elem);
    });
  });

  document.querySelector('.keyboard').addEventListener('mousedown', (e) => e.preventDefault());

  for (const el of buttons) {
    switch (el.getAttribute('data')) {
      case 'CapsLock':
        el.addEventListener('mousedown', (e) => {
          e.preventDefault();
        });
        el.addEventListener('click', () => {
          el.classList.toggle('active');
          if (isCaps) {
            drawChar(0, false);
            isCaps = false;
          } else {
            drawChar(1, false);
            isCaps = true;
          }
        });
        break;

      case 'ShiftLeft':
      case 'ShiftRight':
        el.addEventListener('mousedown', (e) => {
          e.preventDefault();
          el.classList.add('active');
          isCaps ? drawChar(0, false) : drawChar(1, false);
        });
        el.addEventListener('mouseup', () => {
          el.classList.remove('active');
          isCaps ? drawChar(1, false) : drawChar(0, false);
        });
        el.addEventListener('mouseout', () => {
          el.classList.remove('active');
          isCaps ? drawChar(1, false) : drawChar(0, false);
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
}());

(function setKeyEvent() {
  const body = document.querySelector('body');
  const elems = [];
  const textarea = document.querySelector('textarea');
  const current = document.querySelectorAll('.keyboard__row');
  const buttons = [];

  current.forEach((el) => {
    el.childNodes.forEach((el) => {
      buttons.push(el);
    });
  });

  body.addEventListener('keydown', (e) => {
    if (e.repeat && e.code !== 'Backspace') return;
    if ((e.altKey && e.ctrlKey) && (e.code === 'AltLeft' || e.code === 'ControlLeft')) {
      isCaps ? drawChar(1, true) : drawChar(0, true);
    }
    e.preventDefault();

    for (const el of buttons) {
      if (e.code === el.getAttribute('data')) {
        switch (e.code) {
          case 'CapsLock':
            if (isCaps) {
              drawChar(0, false);
              isCaps = false;
            } else {
              drawChar(1, false);
              isCaps = true;
            }
            el.classList.toggle('active');
            break;

          case 'ShiftRight':
          case 'ShiftLeft':
            isCaps ? drawChar(0, false) : drawChar(1, false);
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
            else textarea.value += el.innerHTML;
            elems.push(el);
            el.classList.add('active');
        }
        break;
      }
    }
  });
  body.addEventListener('keyup', (e) => {
    if (e.code === 'CapsLock') return;
    const el = elems.pop();

    if (el.getAttribute('data') === 'ShiftRight' || el.getAttribute('data') === 'ShiftLeft') {
      isCaps ? drawChar(1, false) : drawChar(0, false);
      el.classList.remove('active');
      return;
    }

    el.classList.remove('active');
  });
}());
