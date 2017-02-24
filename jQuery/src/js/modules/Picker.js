const store = require('store2');

function initializePicker () {

    if (store.has('Picker')) {
        return buildOptions(store.get('Picker'));
    }

    let data = {
        names : [
            'Elise',
            'Tim',
            'Rosalie'
        ],
        chosen: []
    };

    store.set('Picker', data);
    return buildOptions(data);
}

function buildOptions (data) {
    let html = '';

    data.names.forEach(function (item, index) {
        html += $('<span />', {
            id   : 'option_' + item,
            text : item,
            class: 'option',
        })[0].outerHTML;
    });

    $('.options').html(html);
}

function runSelection (element) {

    let $options = $('.option');

    $(element).fadeOut(200, function () {
        animateOption(($options.length * 3));
    });

    $options
        .removeClass('active chosen')
        .fadeOut(100);
}

function getNextElement ($element) {
    let $next = $element.next();

    if ($next.length > 0) {
        return $next;
    }

    return $element.siblings().first();
}

function animateOption (cycles_left, $next = null) {

    if (cycles_left === 0) {
        showResult();
        return;
    }

    console.log('cycles left:', cycles_left);

    let next_cycle = (cycles_left - 1);

    if ($next === null) {
        $next = $('.option:first-child')
            .addClass('active')
            .show();

        return animateOption(next_cycle, getNextElement($next));
    }

    $('.option.active').fadeOut(200, function () {
        $(this).removeClass('active');

        $next.fadeIn(200, function () {

            $(this).addClass('active');
            animateOption(next_cycle, getNextElement($next));
        });
    });
}

function getResult () {
    let current_data = store.get('Picker');

    if (current_data.names.length == current_data.chosen.length) {
        current_data.chosen = [];
    }

    let possible_names = current_data.names.filter(function (name) {
        return current_data.chosen.indexOf(name) < 0
    });

    let random_index = Math.floor(Math.random() * possible_names.length);
    let name         = possible_names[random_index];

    current_data.chosen.push(name);
    store.set('Picker', current_data);

    return name;

}

function showResult () {
    let result = getResult();

    $('.option').removeClass('active').hide(0);

    $('#option_' + result)
        .addClass('chosen')
        .delay(400)
        .fadeIn(200, function () {
            $('button').fadeIn(200);
        });
}


export default {
    initialize: () => {
        initializePicker();
    },
    click     : (element) => {
        runSelection(element)
    }
}