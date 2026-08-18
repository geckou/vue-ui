<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GeckouLogo from '~demo/components/GeckouLogo.vue'
import StarField from '~demo/components/StarField.vue'
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
      { hash: 'datepicker', label: 'DatePicker' },
      { hash: 'daterangepicker', label: 'DateRangePicker' },
      { hash: 'dateselector', label: 'DateSelector' },
      { hash: 'textbutton', label: 'TextButton' },
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
    <StarField />

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
        <GeckouLogo :class="$style.brandMark" />
        <span>
          <strong :class="$style.brandName">Geckou Vue UI</strong>
          <span :class="$style.brandSub">@geckou/vue-ui コンポーネントカタログ</span>
        </span>
      </a>
      <nav :class="$style.headerNav">
        <a
          :class="$style.githubLink"
          href="https://github.com/geckou/vue-ui"
          target="_blank"
          rel="noopener"
        >
          <svg
            viewBox="0 0 16 16"
            :class="$style.githubIcon"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
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
          <p :class="$style.footerLinks">
            <a
              href="https://github.com/geckou/vue-ui"
              target="_blank"
              rel="noopener"
            >
              GitHub リポジトリ
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="https://github.com/geckou/vue-ui/blob/main/README.md"
              target="_blank"
              rel="noopener"
            >
              README
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="https://github.com/geckou/vue-ui/issues"
              target="_blank"
              rel="noopener"
            >
              Issues
            </a>
          </p>
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

.header,
.body {
  position: relative;
  z-index : 1;
}

.header {
  position        : sticky;
  top             : 0;
  z-index         : 50;
  display         : flex;
  align-items     : center;
  gap             : 1rem;
  padding         : var(--sp-medium) var(--sp-large);
  border-bottom   : 1px solid var(--border-color);
  background-color: color-mix(in srgb, var(--base-color) 88%, transparent);
  backdrop-filter : blur(8px);
}

.brand {
  display    : flex;
  align-items: center;
  gap        : .6rem;
  color      : var(--text-color);
}

.brandMark {
  color: var(--gk-blue);
}

@media (prefers-color-scheme: dark) {
  .brandMark {
    color: var(--gk-white);
  }
}

.brandName {
  display       : block;
  font-size     : var(--fs-medium);
  font-weight   : 500;
  letter-spacing: var(--letter-spacing-normal);
  line-height   : var(--line-height-tight);
}

.brandSub {
  display  : block;
  color    : var(--gray);
  font-size: var(--fs-min);
  line-height: var(--line-height-narrow);
}

.headerNav {
  margin-left   : auto;
  font-size     : var(--fs-small);
  letter-spacing: var(--letter-spacing-normal);
}

.githubLink {
  display        : inline-flex;
  align-items    : center;
  gap            : .4rem;
  padding        : .3rem .8rem;
  border         : 1px solid var(--border-color);
  border-radius  : 999px;
  color          : var(--text-color);

  &:hover {
    border-color: var(--primary-color);
    color       : var(--primary-color);
  }
}

.githubIcon {
  inline-size: 1rem;
  block-size : 1rem;
  fill       : currentColor;
}

.navToggle {
  display         : none;
  padding         : .35rem .7rem;
  border          : 1px solid var(--border-color);
  border-radius   : var(--radius-size);
  background-color: transparent;
  color           : var(--text-color);
  font-family     : inherit;
  font-size       : var(--fs-smaller);
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
  padding         : .4rem .6rem;
  border          : none;
  border-radius   : var(--radius-size);
  background-color: transparent;
  color           : var(--text-color);
  font-family     : inherit;
  font-size       : var(--fs-small);
  font-weight     : 500;
  letter-spacing  : var(--letter-spacing-normal);
  text-align      : left;
  cursor          : pointer;

  &:hover {
    background-color: var(--sub-color);
  }

  &.current {
    background-color: var(--gk-blue);
    color           : #fff;
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
  font-family     : inherit;
  font-size       : var(--fs-smaller);
  letter-spacing  : var(--letter-spacing-narrow);
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
  padding  : var(--sp-large) var(--sp-large) var(--sp-max);
}

.footerLinks {
  display        : flex;
  align-items    : center;
  justify-content: center;
  flex-wrap      : wrap;
  gap            : var(--sp-small);
  margin         : 0 0 var(--sp-small);
}

.footer {
  margin-top    : var(--sp-larger);
  color         : var(--gray);
  font-size     : var(--fs-min);
  letter-spacing: var(--letter-spacing-normal);
  text-align    : center;
}

@media (max-width: 900px) {
  .githubLink {
  display        : inline-flex;
  align-items    : center;
  gap            : .4rem;
  padding        : .3rem .8rem;
  border         : 1px solid var(--border-color);
  border-radius  : 999px;
  color          : var(--text-color);

  &:hover {
    border-color: var(--primary-color);
    color       : var(--primary-color);
  }
}

.githubIcon {
  inline-size: 1rem;
  block-size : 1rem;
  fill       : currentColor;
}

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
      background-color: var(--base-color);
    }
  }

  .main {
    padding: 1rem 1rem 3rem;
  }
}
</style>
