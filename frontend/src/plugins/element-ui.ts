import Vue from 'vue';
import {
  Button,
  Table,
  TableColumn,
  Dialog,
  Loading,
  Message,
  MessageBox,
  Notification,
  Select,
  Option,
  Input,
  Alert,
  Tooltip,
  Switch,
  Radio,
  RadioGroup,
  RadioButton,
} from 'element-ui';

Vue.use(Button)
  .use(Table)
  .use(TableColumn)
  .use(Dialog)
  .use(Input)
  .use(Alert)
  .use(Tooltip)
  .use(Radio)
  .use(RadioGroup)
  .use(RadioButton)
  .use(Switch)
  .use(Option)
  .use(Select);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
