// REVIEW This file allows you to globally register components so you you don't have to import them
//        Must be put in main.js

import vue from "vue";
// @ts-ignore
import Modal from "./components/Modal.vue";

// Can use any name here
vue.component("modal", Modal);