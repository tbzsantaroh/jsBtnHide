const returnBtn = document.querySelector('[data-return_to_top]'); // 表記切り替えするボタン
const flagHeight = "100vh"; // ボタン表示を切り替えする高さ


returnBtn.style.opacity = 0;  // 最初にボタンを非表示にする これしないと、キーフレームアニメーションの順番がopacity 1 -> 0 になって一瞬ボタンが表示される

// ** 動作切り替えフラグ用div生成 **
document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="return_to_top_flag"></div>');  // bodyに子要素としてdivを生成、追加
const flagBtn = document.querySelector('.return_to_top_flag');  // フラグボタンを変数化
flagBtn.style.cssText = "width: 1px;  height: " + flagHeight + ";  position: absolute;  left: 0;  top: 0;  visibility: hidden;  z-index: -10;";  // z-indexをネガティブにして他の要素に被らないようにしてる


// ** フラグで動作切り替え **
const options = {
  rootMargin: "0px",
  threshold: 0 // 50%の範囲が見え隠れしたときにcallbackを呼ぶ
}


const callback = (entries, observer) => {
  const entry = entries[0];
  // 見えたか見えなくなったかはentry.isIntersectingでわかる
  if (entry.isIntersecting) {
    returnBtn.animate([{ opacity: 0 }], { duration: 250, fill: 'forwards' })
      .finished.then(() => returnBtn.style.visibility = 'hidden');  // アニメーション終了時に要素を非表示 opacity:0だけだとボタンが残ってて誤爆するから消す
  } else {
    returnBtn.animate([{ opacity: 1 }], { duration: 250, fill: 'forwards' })
      .finished.then(() => returnBtn.style.visibility = 'visible'); // アニメーション終了時に要素を表示
  }
};

const observer = new IntersectionObserver(callback, options);
observer.observe(flagBtn);
