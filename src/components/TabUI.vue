<script setup lang="ts">
window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');

  // 各タブに click イベントハンドラーを追加します
  tabs.forEach(tab => {
    tab.addEventListener("click", changeTabs);
  });
  
  // tabListの中で表示されているタブを指定するようの定数。
  let tabFocus = 0;
  tabList.addEventListener("keydown", e => {
    //← →を押したら
    if (e.keyCode === 37 || e.keyCode === 39) {
      tabs[tabFocus].setAttribute("tabindex", -1);
      
      if (e.keyCode === 37) {
        // ← を押したら
        tabFocus--;
        // 最初にいる場合は、最後に移動します
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }        
      } else if (e.keyCode === 39) {
        // → を押したら
        tabFocus++;
        // 最後にいる場合は、最初に移動します
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      }
      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  })
})

function changeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;
  
  // タブから現在すべての選択状態を取り除きます
  parent
    .querySelectorAll('[aria-selected="true"]')
    .forEach(t => t.setAttribute("aria-selected", false));
  
  // このタブを選択されたタブとして設定します
  target.setAttribute("aria-selected", true);
  
  // すべてのタブパネルを非表示にします
  grandparent
    .querySelectorAll('[role="tabpanel"]')
    .forEach(p => p.setAttribute("hidden", true));

  // 選択されたパネルを表示します
  grandparent.parentNode
    .querySelector(`#${target.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}
</script>

<template>
  <div class="tab">
    <div role="tablist">
      <button role="tab" id="tabA" aria-controls="panelA" aria-selected="true"  tabindex="0">
        タブA
      </button>
      <button role="tab" id="tabB" aria-controls="panelB" aria-selected="false" tabindex="-1">
        タブB
      </button>
      <button role="tab" id="tabC"aria-controls="panelC" aria-selected="false" tabindex="-1">
        タブC
      </button>
    </div>
    <div role="tabpanel" id="panelA" aria-labelledby="tabA" tabindex="0">
      <p>パネルAを表示しています。</p>
    </div>
    <div role="tabpanel" id="panelB" aria-labelledby="tabB" tabindex="0" hidden>
      <p>パネルBを表示しています。</p>
    </div>
    <div role="tabpanel" id="panelC" aria-labelledby="tabC" tabindex="0" hidden>
      <p>パネルCを表示しています。</p>
    </div>
  </div>
</template>

<style lang="scss" module>
.tab {
  width: 100%;
  max-width: 400px;
}

div[role="tablist"] {
  display: flex;
}

button[role="tab"] {
  border: none;
  background-color: #576066;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 12px;
}

button[role="tab"][aria-selected="true"] {
  background-color: #FFFFFF;
}

button[role="tab"][aria-selected="false"]:hover {
  background-color: #FFFFFF;
  cursor: pointer;
}

div[role="tabpanel"] {
  background-color: #FFFFFF;
  border-radius: 0 8px 8px 8px;
  padding: 32px 16px;
}

p {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

body {
  background-color: #212529;
  display: grid;
  height: calc(100vh - 16px);
  margin: 0;
  padding: 8px;
  place-items: center;
  width: calc(100% - 16px);
}

</style>