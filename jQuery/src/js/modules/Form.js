import Store from "./Store";

const already_there_template = `
    <span class="already-there-entry">
        <span class="already-there-name">
            ${name}
        </span>
        
        <a href="javascript:void(0);" class="already-there-remove">
            X
        </a>
    </span>`;

export default class {

    constructor (input) {
        Store.init();
        this.$input = $('#new_name');
        this.$form  = $('.form');

        $('.toggle-form').on('click', $.proxy(function () {
            this.toggleForm();
        }, this));
    }

    toggleForm () {
        if (this.$form.is(':visible')) {
            return this.$form.slideUp();
        }

        return this.$form.slideDown();
    }

    initialize () {
        $('.name-submiter').on('click', $.proxy(function () {
            this.add();
        }, this));
    }

    add () {
        let input = this.$input.val();
        if (input.length <= 0) {
            return;
        }

        Store.add('names', input);
        this.$input.val('');
    }
}