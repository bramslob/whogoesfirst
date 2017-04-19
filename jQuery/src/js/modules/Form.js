import Store from "./Store";

function already_there_template (name) {
    return `
    <span class="already-there-entry" id="already_there_entry_${name}">
        <span class="already-there-name">
            ${name}
        </span>
        
        <a href="javascript:void(0);" class="already-there-remove" data-name="${name}">
            X
        </a>
    </span>`;
}

export default class {

    constructor () {

        Store.init();

        this.$input         = $('#new_name');
        this.$form          = $('.form');
        this.$already_there = $('.already-there');

        let self = this;

        $('.toggle-form').on('click', function () {
            self.toggleForm();
        });

        $('.name-submiter').on('click', function () {
            self.add();
        });

        this.$already_there.on('click', '.already-there-remove', function () {
            let name = $(this).data('name');

            if (name.length <= 0) {
                return;
            }

            self.remove(name)
        });

        this.buildCurrentOptions();
    }

    buildCurrentOptions () {
        let data = Store.get();
        let html = '';

        data.names.forEach(function (item, index) {
            html += already_there_template(item);
        });

        this.$already_there.html(html);
    }

    toggleForm () {
        if (this.$form.is(':visible')) {
            return this.$form.slideUp();
        }

        return this.$form.slideDown();
    }

    add () {

        let input = this.$input.val();
        if (input.length <= 0) {
            return;
        }

        Store.add('names', input);
        this.$input.val('');
        this.buildCurrentOptions();
    }

    remove (name) {
        Store.remove(name);
        this.buildCurrentOptions();
    }
}