import { App } from 'vue'
import TextBox from './components/TextBox.vue'
import TextArea from './components/TextArea.vue'

export default {
  install(app: App) {
    app.component('GcTextBox', TextBox)
    app.component('GcTextArea', TextArea)
  }
}

export { TextBox }