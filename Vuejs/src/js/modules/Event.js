import Vue from "vue/dist/vue.esm";

export default class {

    constructor () {
        this.vue = new Vue;
    }

    fire (event, data = null) {
        this.vue.$emit(event, data);
    }

    listen (event, fn) {
        this.vue.$on(event, fn);
    }
}