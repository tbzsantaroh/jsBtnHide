# jsBtnHide
画面スクロールするまでボタンが非表示になるスクリプト





# jsBtnHide

画面スクロールするまで要素が非表示になるスクリプト

## Setup

`/jsBtnHide.js`（通常javascript）  
`/jsBtnHideEx.js`（ESM javascript　モジュール化）  
`/jsBtnHideEx.ts`（typescript　モジュール化）  

使用環境に合わせて、このどれかを使う。  
モジュール化のものはローカル環境では動作しないので注意。  

## Usage

### jsBtnHide.js

1. 実行したいhtmlファイルの指定要素のdata属性に `data-return_to_top` をつける。
1. 実行したいhtmlファイルのbodyに `<script src="./jsBtnHide.js"></script>` を追記。

### jsBtnHideEx.js or jsBtnHideEx.ts

**typescript版場合は、以下の `.js` の部分を `.ts` に置き換える。**

1. 実行したいhtmlファイルの指定要素のdata属性に `data-return_to_top` をつける。
1. 実行したいhtmlファイルのbodyに以下を追記。
```html
<script>
  import { BtnHide } from './js/BtnHide.js';
  BtnHide();
</script>
```  

デフォルト値を変えたい場合は、
```html
<script>
  import { setBtnHideProperties, BtnHide } from './js/BtnHide.js';
  setBtnHideProperties({ 
    target: document.querySelector('[data-return_to_top]'), // 表記切り替えするボタン
    height: '50vh', // ボタン表示を切り替えするスクロール位置
    duration: 250  // アニメーション速度
  });
  BtnHide();
</script>
```
こんな感じにプロパティを追記する。  

## License

This software is released under the MIT License, see LICENSE.

## Authors

<https://github.com/tbzsantaroh>
