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
  Input,
  Alert,
  Tooltip,
  Switch,
} from 'element-ui';

Vue.use(Button)
  .use(Table)
  .use(TableColumn)
  .use(Dialog)
  .use(Input)
  .use(Alert)
  .use(Tooltip)
  .use(Switch);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
