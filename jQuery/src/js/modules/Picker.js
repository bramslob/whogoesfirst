import Store from "./Store";

function option_template (name) {
    return `
    <span class="option" id="option_${name}">
        ${name}
    </span>`;
}
export default class {

    constructor () {

        let self = this;
        $('.name-picker').on('click', function () {
            self.runSelection(this);
        });
    }

    buildOptions () {

        let html = '';
        let data = Store.get();

        data.names.forEach(function (item, index) {
            html += option_template(item);
        });

        $('.options').html(html);
    }

    runSelection (element) {

        this.buildOptions();

        let $options = $('.option'),
            self     = this;

        $(element).fadeOut(200, function () {
            self.animateOption(($options.length * 2));
        });

        $options
            .removeClass('active chosen')
            .fadeOut(100);
    }

    getNextElement ($element) {
        let $next = $element.next();

        if ($next.length > 0) {
            return $next;
        }

        return $element.siblings().first();
    }

    animateOption (cycles_left, $next = null) {

        if (cycles_left === 0) {
            this.showResult();
            return;
        }
        let self       = this;
        let next_cycle = (cycles_left - 1);

        if ($next === null) {
            $next = $('.option:first-child')
                .addClass('active')
                .show();

            return this.animateOption(next_cycle, self.getNextElement($next));
        }

        $('.option.active').fadeOut(200, function () {
            $(this).removeClass('active');

            $next.fadeIn(200, function () {

                $(this).addClass('active');
                self.animateOption(next_cycle, self.getNextElement($next));
            });
        });
    }

    getResult () {
        let current_data   = Store.get(),
            possible_names = current_data.names.filter(function (name) {
                return current_data.chosen.indexOf(name) < 0
            }),
            random_index   = Math.floor(Math.random() * possible_names.length),
            name           = possible_names[random_index];

        current_data.chosen.push(name);

        if (current_data.names.length === current_data.chosen.length) {
            current_data.chosen = [];
        }

        Store.set(current_data);

        return name;

    }

    showResult () {
        let result = this.getResult();

        $('.option').removeClass('active').hide(0);

        $('#option_' + result)
            .addClass('chosen')
            .delay(400)
            .fadeIn(200, function () {
                $('button').fadeIn(200);
            });
    }
}