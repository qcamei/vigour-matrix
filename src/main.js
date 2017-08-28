import Vue from 'vue'

require('es6-promise').polyfill()
import VueResource from 'vue-resource'
import 'vue-ydui/dist/ydui.rem.css'
import 'vue-ydui/dist/ydui.base.css';
import './common/stylus/index.styl'
import App from './App.vue'
import router from './router'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.use(VueResource)

import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);

import {NavBar, NavBarBackIcon, NavBarNextIcon} from 'vue-ydui/dist/lib.rem/navbar';
Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);

import {SendCode} from 'vue-ydui/dist/lib.rem/sendcode';
Vue.component(SendCode.name, SendCode);

import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);

import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};

import {Icons} from 'vue-ydui/dist/lib.rem/icons';
Vue.component(Icons.name, Icons);

import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);

import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.rem/list';
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);

import {TextArea} from 'vue-ydui/dist/lib.rem/textarea';
Vue.component(TextArea.name, TextArea);

import {Input} from 'vue-ydui/dist/lib.rem/input';
Vue.component(Input.name, Input);

new Vue({
    el: '#app',
    router,
    ...App,
})
