import { App } from 'vue'

// Form / UI components
import TextBox from '@/components/TextBox.vue'
import TextArea from '@/components/TextArea.vue'
import BasicButton from '@/components/BasicButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import CheckBox from '@/components/CheckBox.vue'
import CheckBoxes from '@/components/CheckBoxes.vue'
import CheckButton from '@/components/CheckButton.vue'
import LabeledCheckbox from '@/components/LabeledCheckbox.vue'
import LabeledFieldset from '@/components/LabeledFieldset.vue'
import RadioButtons from '@/components/RadioButtons.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import InputBox from '@/components/InputBox.vue'
import InputGroup from '@/components/InputGroup.vue'
// NOTE: DatePicker / DateRangePicker / DateSelector は Nuxt の自動 import と
//       アプリ側の FormValidationManager に依存しているため、ここでは公開していない
import DropdownUi from '@/components/DropdownUi.vue'
import ModalBox from '@/components/ModalBox.vue'
import PopupBox from '@/components/PopupBox.vue'
import SlideDownUi from '@/components/SlideDownUi.vue'
import TabUI from '@/components/TabUI.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

// ArticleList components
import StandardList from '@/components/ArticleList/List/Standard.vue'
import RoundedList from '@/components/ArticleList/List/Rounded.vue'
import ArtisticList from '@/components/ArticleList/List/Artistic.vue'
import TileList from '@/components/ArticleList/List/Tile.vue'
import SimpleList from '@/components/ArticleList/List/Simple.vue'
import RowList from '@/components/ArticleList/List/Row.vue'
import NewsList from '@/components/ArticleList/List/News.vue'
import EntertainmentList from '@/components/ArticleList/List/Entertainment.vue'
import GalleryList from '@/components/ArticleList/List/Gallery.vue'
import GridList from '@/components/ArticleList/List/Grid.vue'

const components = {
  GKTextBox        : TextBox,
  GKTextArea       : TextArea,
  GKBasicButton    : BasicButton,
  GKSelectBox      : SelectBox,
  GKCheckBox       : CheckBox,
  GKCheckBoxes     : CheckBoxes,
  GKCheckButton    : CheckButton,
  GKLabeledCheckbox: LabeledCheckbox,
  GKLabeledFieldset: LabeledFieldset,
  GKRadioButtons   : RadioButtons,
  GKToggleButton   : ToggleButton,
  GKInputBox       : InputBox,
  GKInputGroup     : InputGroup,
  GKDropdownUi     : DropdownUi,
  GKModalBox       : ModalBox,
  GKPopupBox       : PopupBox,
  GKSlideDownUi    : SlideDownUi,
  GKTabUI          : TabUI,
  GKLoadingSpinner : LoadingSpinner,
  GKErrorMessage   : ErrorMessage,

  GKStandardList     : StandardList,
  GKRoundedList      : RoundedList,
  GKArtisticList     : ArtisticList,
  GKTileList         : TileList,
  GKSimpleList       : SimpleList,
  GKRowList          : RowList,
  GKNewsList         : NewsList,
  GKEntertainmentList: EntertainmentList,
  GKGalleryList      : GalleryList,
  GKGridList         : GridList,
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export {
  TextBox as GKTextBox,
  TextArea as GKTextArea,
  BasicButton as GKBasicButton,
  SelectBox as GKSelectBox,
  CheckBox as GKCheckBox,
  CheckBoxes as GKCheckBoxes,
  CheckButton as GKCheckButton,
  LabeledCheckbox as GKLabeledCheckbox,
  LabeledFieldset as GKLabeledFieldset,
  RadioButtons as GKRadioButtons,
  ToggleButton as GKToggleButton,
  InputBox as GKInputBox,
  InputGroup as GKInputGroup,
  DropdownUi as GKDropdownUi,
  ModalBox as GKModalBox,
  PopupBox as GKPopupBox,
  SlideDownUi as GKSlideDownUi,
  TabUI as GKTabUI,
  LoadingSpinner as GKLoadingSpinner,
  ErrorMessage as GKErrorMessage,
  StandardList as GKStandardList,
  RoundedList as GKRoundedList,
  ArtisticList as GKArtisticList,
  TileList as GKTileList,
  SimpleList as GKSimpleList,
  RowList as GKRowList,
  NewsList as GKNewsList,
  EntertainmentList as GKEntertainmentList,
  GalleryList as GKGalleryList,
  GridList as GKGridList,
}

export { LIST_THEME } from '@/const/list-theme'
