<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GettingStarted from '~demo/sections/GettingStarted.vue'
import FormComponents from '~demo/sections/FormComponents.vue'
import ArticleLists from '~demo/sections/ArticleLists.vue'

const PAGES = [
  {
    key      : 'getting-started',
    label    : 'はじめに',
    component: GettingStarted,
    links    : [],
  },
  {
    key      : 'form',
    label    : 'フォーム UI',
    component: FormComponents,
    links    : [
      { hash: 'textbox', label: 'TextBox' },
      { hash: 'textarea', label: 'TextArea' },
      { hash: 'selectbox', label: 'SelectBox' },
      { hash: 'checkbox', label: 'CheckBox 系' },
      { hash: 'checkboxes', label: 'CheckBoxes' },
      { hash: 'radiobuttons', label: 'RadioButtons' },
      { hash: 'togglebutton', label: 'ToggleButton' },
      { hash: 'basicbutton', label: 'BasicButton' },
      { hash: 'labeledfieldset', label: 'LabeledFieldset' },
      { hash: 'tabui', label: 'TabUI' },
      { hash: 'slidedownui', label: 'SlideDownUi' },
      { hash: 'dropdownui', label: 'DropdownUi' },
      { hash: 'modalbox', label: 'ModalBox' },
      { hash: 'misc', label: 'その他' },
    ],
  },
  {
    key      : 'article-list',
    label    : '記事一覧 UI',
    component: ArticleLists,
    links    : [
      { hash: 'standard', label: 'StandardList' },
      { hash: 'rounded', label: 'RoundedList' },
      { hash: 'artistic', label: 'ArtisticList' },
      { hash: 'tile', label: 'TileList' },
      { hash: 'simple', label: 'SimpleList' },
      { hash: 'row', label: 'RowList' },
      { hash: 'news', label: 'NewsList' },
      { hash: 'entertainment', label: 'EntertainmentList' },
      { hash: 'gallery', label: 'GalleryList' },
      { hash: 'grid', label: 'GridList' },
    ],
  },
]

const parseHash = () => {
  const [page, anchor] = window.location.hash.replace(/^#\/?/, '').split('#')
  return {
    page  : PAGES.some(item => item.key === page) ? page : PAGES[0].key,
    anchor: anchor ?? '',
  }
}

const currentPage = ref(parseHash().page)
const isNavOpen = ref(false)

const currentDefinition = computed(() => PAGES.find(page => page.key === currentPage.value) ?? PAGES[0])

const scrollToAnchor = (anchor: string) => {
  if (!anchor) {
    window.scrollTo({ top: 0 })
    return
  }

  window.requestAnimationFrame(() => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const applyHash = () => {
  const { page, anchor } = parseHash()
  currentPage.value = page
  scrollToAnchor(anchor)
}

const navigate = (pageKey: string, anchor = '') => {
  isNavOpen.value = false
  window.location.hash = anchor ? `#/${pageKey}#${anchor}` : `#/${pageKey}`
  if (currentPage.value === pageKey) scrollToAnchor(anchor)
}

onMounted(() => {
  window.addEventListener('hashchange', applyHash)
  applyHash()
})

onUnmounted(() => window.removeEventListener('hashchange', applyHash))
</script>

<template>
  <div :class="$style.layout">
    <header :class="$style.header">
      <button
        type="button"
        :class="$style.navToggle"
        @click="isNavOpen = !isNavOpen"
      >
        メニュー
      </button>
      <a
        :class="$style.brand"
        href="#/getting-started"
      >
        <span :class="$style.brandMark">GK</span>
        <span>
          <strong :class="$style.brandName">Geckou Vue UI</strong>
          <span :class="$style.brandSub">@geckou/vue-ui コンポーネントカタログ</span>
        </span>
      </a>
      <nav :class="$style.headerNav">
        <a
          href="https://github.com/geckou/vue-ui"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
      </nav>
    </header>

    <div :class="$style.body">
      <aside :class="[$style.sidebar, { [$style.open]: isNavOpen }]">
        <nav :class="$style.nav">
          <div
            v-for="page in PAGES"
            :key="page.key"
            :class="$style.navGroup"
          >
            <button
              type="button"
              :class="[$style.navPage, { [$style.current]: page.key === currentPage }]"
              @click="navigate(page.key)"
            >
              {{ page.label }}
            </button>
            <ul
              v-if="page.key === currentPage && page.links.length"
              :class="$style.navList"
            >
              <li
                v-for="link in page.links"
                :key="link.hash"
              >
                <button
                  type="button"
                  :class="$style.navLink"
                  @click="navigate(page.key, link.hash)"
                >
                  {{ link.label }}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main :class="$style.main">
        <component :is="currentDefinition.component" />
        <footer :class="$style.footer">
          <p>© Geckou — MIT License</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style lang="scss" module>
.layout {
  min-height    : 100vh;
  display       : flex;
  flex-direction: column;
}

.header {
  position        : sticky;
  top             : 0;
  z-index         : 50;
  display         : flex;
  align-items     : center;
  gap             : 1rem;
  padding         : .75rem 1.25rem;
  border-bottom   : 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, .92);
  backdrop-filter : blur(8px);
}

.brand {
  display    : flex;
  align-items: center;
  gap        : .6rem;
  color      : var(--text-color);
}

.brandMark {
  display         : grid;
  place-items     : center;
  width           : 2rem;
  height          : 2rem;
  border-radius   : 8px;
  background-color: var(--primary-color);
  color           : var(--white);
  font-size       : .8125rem;
  font-weight     : bold;
}

.brandName {
  display  : block;
  font-size: .9375rem;
  line-height: 1.2;
}

.brandSub {
  display  : block;
  color    : var(--gray);
  font-size: .75rem;
}

.headerNav {
  margin-left: auto;
  font-size  : .875rem;
}

.navToggle {
  display         : none;
  padding         : .35rem .7rem;
  border          : 1px solid var(--border-color);
  border-radius   : 6px;
  background-color: var(--white);
  font-size       : .8125rem;
  cursor          : pointer;
}

.body {
  display : flex;
  flex    : 1;
  align-items: flex-start;
}

.sidebar {
  position  : sticky;
  top       : 4rem;
  flex      : 0 0 var(--sidebar-width);
  width     : var(--sidebar-width);
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding   : 1.5rem 1rem;
}

.nav {
  display       : flex;
  flex-direction: column;
  gap           : 1rem;
}

.navGroup {
  display       : flex;
  flex-direction: column;
  gap           : .35rem;
}

.navPage {
  padding         : .35rem .5rem;
  border          : none;
  border-radius   : 6px;
  background-color: transparent;
  color           : var(--text-color);
  font-size       : .875rem;
  font-weight     : bold;
  text-align      : left;
  cursor          : pointer;

  &:hover {
    background-color: var(--sub-color);
  }

  &.current {
    background-color: var(--primary-color);
    color           : var(--white);
  }
}

.navList {
  display       : flex;
  flex-direction: column;
  gap           : .1rem;
  padding-left  : .5rem;
}

.navLink {
  width           : 100%;
  padding         : .2rem .5rem;
  border          : none;
  border-left     : 2px solid var(--border-color);
  border-radius   : 0;
  background-color: transparent;
  color           : var(--gray);
  font-size       : .8125rem;
  text-align      : left;
  cursor          : pointer;

  &:hover {
    border-left-color: var(--primary-color);
    color            : var(--primary-color);
  }
}

.main {
  flex     : 1;
  min-width: 0;
  max-width: 72rem;
  padding  : 1.5rem 1.5rem 4rem;
}

.footer {
  margin-top: 3rem;
  color     : var(--gray);
  font-size : .8125rem;
  text-align: center;
}

@media (max-width: 900px) {
  .navToggle {
    display: block;
  }

  .sidebar {
    display: none;

    &.open {
      display         : block;
      position        : fixed;
      top             : 3.5rem;
      left            : 0;
      z-index         : 40;
      width           : min(80vw, 20rem);
      height          : calc(100vh - 3.5rem);
      border-right    : 1px solid var(--border-color);
      background-color: var(--white);
    }
  }

  .main {
    padding: 1rem 1rem 3rem;
  }
}
</style>
