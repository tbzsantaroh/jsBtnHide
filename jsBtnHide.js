// # jsBtnHide

// ## 動作説明
// 特定の位置までスクロールしたら要素を表示する
// このファイルはimportを使っていないので、ローカル環境でも動作する

// ## 使い方
// 1. このファイルの const BtnHideTemplate のところの設定を任意に変更。
// 2. htmlのbody要素に <script src="./jsBtnHide.js"></script> で、読み込む。
// 3. htmlの適用したい要素のdata属性に data-return_to_top をつける。


const BtnHideTemplate = ({
  target: document.querySelector('[data-return_to_top]'), // 表記切り替えするボタン
  height: '100vh', // ボタン表示を切り替えするスクロール位置
  duration: 250,  // アニメーション速度
});



BtnHideTemplate.target.style.opacity = 0;  // 最初にボタンを非表示にする これしないと、キーフレームアニメーションの順番がopacity 1 -> 0 になって一瞬ボタンが表示される

// ** 動作切り替えフラグ用div生成 **
document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="return_to_top_flag"></div>');  // bodyに子要素としてdivを生成、追加
const flagBtn = document.querySelector('.return_to_top_flag');  // フラグボタンを変数化
flagBtn.style.cssText = "width: 1px;  height: " + BtnHideTemplate.height + ";  position: absolute;  left: 0;  top: 0;  visibility: hidden;  z-index: -10;";  // z-indexをネガティブにして他の要素に被らないようにしてる

// ** フラグで動作切り替え **
const options = {
  rootMargin: "0px",
  threshold: 0 // 50%の範囲が見え隠れしたときにcallbackを呼ぶ
}


const callback = (entries, observer) => {
  const entry = entries[0];
  // 見えたか見えなくなったかはentry.isIntersectingでわかる
  if (entry.isIntersecting) {
    BtnHideTemplate.target.animate([{ opacity: 0 }], { duration: BtnHideTemplate.duration, fill: 'forwards' })
      .finished.then(() => BtnHideTemplate.target.style.visibility = 'hidden');  // アニメーション終了時に要素を非表示 opacity:0だけだとボタンが残ってて誤爆するから消す
  } else {
    BtnHideTemplate.target.animate([{ opacity: 1 }], { duration: BtnHideTemplate.duration, fill: 'forwards' })
      .finished.then(() => BtnHideTemplate.target.style.visibility = 'visible'); // アニメーション終了時に要素を表示
  }
};

const observer = new IntersectionObserver(callback, options);
observer.observe(flagBtn);