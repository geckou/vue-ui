import { App } from 'vue'
import TextBox from '@/components/TextBox.vue'
import TextArea from '@/components/TextArea.vue'
import BasicButton from '@/components/BasicButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import CheckBox from '@/components/CheckBox.vue'
import RadioButtons from '@/components/RadioButtons.vue'

export { TextBox as GKTextBox }
export { TextArea as GKTextArea }
export { BasicButton as GKBasicButton }
export { SelectBox as GKSelectBox }
export { CheckBox as GKCheckBox }
export { RadioButtons as GKRadioButtons }

export default {
  install(app: App) {
    app.component('GKTextBox', TextBox)
    app.component('GKTextArea', TextArea)
    app.component('GKBasicButton', BasicButton)
    app.component('GKSelectBox', SelectBox)
    app.component('GKCheckBox', CheckBox)
    app.component('GKRadioButtons', RadioButtons)
  },
}