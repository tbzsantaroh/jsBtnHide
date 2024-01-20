// # jsBtnHide TypeScript export ver.

// ## 動作説明
// 特定の位置までスクロールしたら要素を表示する
// このファイルはimportを使っているので、ローカル環境では動作しない

// ## 使い方
// 1. htmlの適用したい要素のdata属性に data-return_to_top をつける。
// 2. htmlに
// <script>
//   import { BtnHide } from './js/BtnHide.js';
//   BtnHide();
// </script>
// このように追加する。
// 3. デフォルト設定を変えたい場合は
// <script>
//   import { setBtnHideProperties, BtnHide } from '@assets/js/BtnHide.js';
// 
//   setBtnHideProperties({ 
//     target: document.querySelector('[data-return_to_top]'), // 表記切り替えするボタン
//     height: '50vh', // ボタン表示を切り替えするスクロール位置
//     duration: 250  // アニメーション速度
//   });
// 
//   BtnHide();
// </script>
// このように書く。


let BtnHideTemplate = {  // デフォルト値
  target: (<HTMLElement>document.querySelector('[data-return_to_top]')), // 表記切り替えするボタン
  height: '50vh', // ボタン表示を切り替えするスクロール位置
  duration: 250  // アニメーション速度
};

export const setBtnHideProperties = (props) => {  // html側でデフォルト値上書きできるようにエクスポート
  BtnHideTemplate = { ...BtnHideTemplate, ...props };
};

export const BtnHide = () => {
  BtnHideTemplate.target.style.opacity = "0";  // 最初にボタンを非表示にする これしないと、キーフレームアニメーションの順番がopacity 1 -> 0 になって一瞬ボタンが表示される

  // ** 動作切り替えフラグ用div生成 **
  (<HTMLBodyElement>document.querySelector('body')).insertAdjacentHTML('afterbegin', '<div class="return_to_top_flag"></div>');  // bodyに子要素としてdivを生成、追加
  const flagBtn = (<HTMLDivElement>document.querySelector('.return_to_top_flag'));  // フラグボタンを変数化
  flagBtn.style.cssText = "width: 1px;  height: " + BtnHideTemplate.height + "; position: absolute;  left: 0;  top: 0;  z-index: -10;";  // z-indexをネガティブにして他の要素に被らないようにしてる


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
}