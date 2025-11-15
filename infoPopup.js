// Створюємо стилі
const style = document.createElement('style');
style.textContent = `
#infoPopupOverlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  justify-content: center;
  align-items: center;
  z-index: 500;
}
#infoPopupWindow {
  background: #111;
  color: white;
  border: 2px solid #00ff00;
  border-radius: 12px;
  padding: 20px;
  width: 260px;
  text-align: center;
  box-shadow: 0 0 20px #00ff00;
  position: relative;
  transform: scale(0.8);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}
#infoPopupWindow.show {
  transform: scale(1);
  opacity: 1;
}
#infoPopupWindow h3 {
  margin-bottom: 10px;
}
#infoPopupWindow p {
  font-size: 14px;
  line-height: 1.4;
}
#closeInfoPopup {
  margin-top: 12px;
  background: #00ff00;
  color: black;
  border: none;
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
}
#showInfoBtn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1001;
  background: #00ff00;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 10px #00ff00;
}
`;
document.head.appendChild(style);

// Створюємо кнопку
const showBtn = document.createElement('button');
showBtn.id = 'showInfoBtn';
showBtn.textContent = 'i';
document.body.appendChild(showBtn);

// Оверлей
const overlay = document.createElement('div');
overlay.id = 'infoPopupOverlay';
overlay.style.display = 'none';
overlay.style.flexDirection = 'column';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
document.body.appendChild(overlay);

// Вікно
const popupWindow = document.createElement('div');
popupWindow.id = 'infoPopupWindow';
popupWindow.innerHTML = `
<h3>Reference</h3>
<p>It's better to play on PC!<br>Controls: WASD and Swipe — Pause: Space / ▐▐ (on phone)</p>
<button id="closeInfoPopup">Close</button>
`;
overlay.appendChild(popupWindow);

const closeBtn = popupWindow.querySelector('#closeInfoPopup');

// Відкрити
function showInfoPopup() {
  overlay.style.display = 'flex';
  setTimeout(() => popupWindow.classList.add('show'), 10);
}

// Закрити
function closeInfoPopup() {
  popupWindow.classList.remove('show');
  setTimeout(() => overlay.style.display = 'none', 300);
}

showBtn.addEventListener('click', showInfoPopup);
closeBtn.addEventListener('click', closeInfoPopup);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closePopup();
});