const returnBtn = document.querySelector('.return_to_top'); // 表記切り替えするボタン
const flagHeight = "100vh"; // ボタン表示を切り替えする高さ



// ** CSS生成 **
const headcss = document.createElement('style');  // CSS生成
document.head.appendChild(headcss);  // original => document.getElementsByTagName('head')[0].appendChild(css); headに生成したCSSを入れる

// transitionだとdisplayがアニメーションできないので、やむなくkyeframes実装
const cssKeyFI = '@keyframes jsanifade-in{' + [
  '0% {display: block}',
  '0% {opacity: 0}',
  '100% {opacity: 1}'
].join(' ') + '}';
const cssKeyFO = '@keyframes jsanifade-out{' + [
  '0% {opacity: 1.0}',
  '100% {opacity: 0}',
  '100% {display: none}'
].join('') + '}';

const cssFI = '.jsFadeIn {' + [
  'animation: jsanifade-in .1s linear 0s 1 normal forwards;'
].join('') + '}';
const cssFO = '.jsFadeOut {' + [
  'animation: jsanifade-out .1s linear 0s 1 normal forwards;'
].join('') + '}';

const cssrules = document.createTextNode([cssKeyFI, cssKeyFO, cssFI, cssFO].join('\n')); // CSS追加部分を結合
headcss.appendChild(cssrules);  // 生成したCSSに結合リストを追加



// ** 動作切り替えフラグ用div生成 **
const elm_body = document.querySelector('body');  // body要素を変数に入れる
elm_body.insertAdjacentHTML('afterbegin', '<div class="return_to_top_flag"></div>');  // bodyの変数に対して、子要素としてdivを生成追加

const flagBtn = document.querySelector('.return_to_top_flag');  // フラグボタンを変数化
flagBtn.style.cssText = "width: 1px;  height: " + flagHeight + ";  position: absolute;  left: 0;  top: 0;  z-index: -10;";  // z-indexをネガティブにして他の要素に被らないようにしてる



// ** フラグで動作切り替え **
// Intersection Observerでスクロール判定してるので若干負荷軽めなはず
const options = {
  rootMargin: "0px",
  threshold: 0 // 50%の範囲が見え隠れしたときにcallbackを呼ぶ
}

const callback = (entries, observer) => {
  const entry = entries[0];
  // 見えたか見えなくなったかはentry.isIntersectingでわかる
  if (entry.isIntersecting) {
    returnBtn.classList.add("jsFadeOut");
    returnBtn.classList.remove("jsFadeIn");
  } else {
    returnBtn.classList.remove("jsFadeOut");
    returnBtn.classList.add("jsFadeIn");
  }
};

const observer = new IntersectionObserver(callback, options);
observer.observe(flagBtn);
