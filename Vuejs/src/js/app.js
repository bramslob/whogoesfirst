import Vue from "vue/dist/vue.esm";
import Store from "./modules/Store";
import EventClass from "./modules/Event";
import picker from "./components/picker.vue";

window.Event = new EventClass();

new Vue({
    el        : '#whogoesfirst',
    components: {picker},
    data      : {
        showForm: false,
        names   : Store.get()
    },
    created() {
        Event.listen('added', function (name) {
            Store.add('names', name);
        });
        Event.listen('chosen', function () {

        });
        Event.listen('removed', function () {

        })
    }
});