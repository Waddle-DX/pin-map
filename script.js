// 画像とピンを包む要素を取得
const wrapper = document.getElementById("image-wrapper");

// ピン情報表示エリア
const pinInfo = document.getElementById("pin-info");

// ピンのコメント表示用要素
const pinComment = document.getElementById("pin-comment");

// ピン削除ボタン
const deleteButton = document.getElementById("delete-pin-button");

// 色選択ラジオボタンをすべて取得
const colorRadios = document.querySelectorAll('input[name="pinColor"]');

// 現在選択中のピンの色（初期値）
let currentColor = "red";

// 現在選択されているピン（削除対象）
let selectedPin = null;

/* ===== 色選択処理 ===== */
colorRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    // 選択された色を現在の色として保持
    currentColor = radio.value;
  });
});

/* ===== 画像クリックでピンを追加 ===== */
wrapper.addEventListener("click", (e) => {

  // 画像以外をクリックした場合は処理しない
  if (e.target.id !== "image") return;

  // image-wrapperの画面上の位置とサイズを取得
  const rect = wrapper.getBoundingClientRect();

  // クリック位置を画像内の座標に変換
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // ピン要素を作成
  const pin = document.createElement("div");
  pin.className = "pin";

  // ピンの位置を設定
  pin.style.left = `${x}px`;
  pin.style.top = `${y}px`;

  // ピンの色を設定
  pin.style.backgroundColor = currentColor;

  // ピンの色情報を保存
  pin.dataset.color = currentColor;

  // ピンが刺された時刻を保存（ISO形式）
  const createdAt = new Date();
  pin.dataset.createdAt = createdAt.toISOString();

  /* ===== ピンをクリックしたとき ===== */
  pin.addEventListener("click", (event) => {
    // 親要素のクリック（ピン追加）を防ぐ
    event.stopPropagation();

    // 選択中のピンとして保持
    selectedPin = pin;

    // 保存しておいた時刻をDate型に戻す
    const date = new Date(pin.dataset.createdAt);

    // 表示用に日本語形式へ変換
    const formattedTime =
      `${date.getFullYear()}年` +
      `${date.getMonth() + 1}月` +
      `${date.getDate()}日 ` +
      `${date.getHours()}時` +
      `${date.getMinutes()}分` +
      `${date.getSeconds()}秒`;

    // 色＋時刻をコメントとして表示
    pinComment.textContent =
      `色：${pin.dataset.color} / 刺された時刻：${formattedTime}`;

    // ピン情報エリアを表示
    pinInfo.classList.remove("hidden");
  });

  // ピンを画像上に追加
  wrapper.appendChild(pin);
});

/* ===== 削除ボタンが押されたとき ===== */
deleteButton.addEventListener("click", () => {

  // 削除対象のピンが存在する場合
  if (selectedPin) {
    // ピンを削除
    selectedPin.remove();

    // 選択状態をリセット
    selectedPin = null;

    // ピン情報エリアを非表示
    pinInfo.classList.add("hidden");
  }
});
