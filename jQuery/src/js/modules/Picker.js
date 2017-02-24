function runSelection (element) {

    $(element).hide();

    var cycles = $('.option').length * 3;

    animateOption(cycles);
}

function getNextElement ($element) {
    var $next = $element.next();

    if ($next.length > 0) {
        return $next;
    }

    return $element.siblings().first();
}

function animateOption (cycles_left, $next = null) {
    if (cycles_left === 0) {
        return showResult();
    }

    if ($next === null) {
        var $next = $('.option:first-child')
            .addClass('active')
            .show();

        return animateOption((cycles_left - 1), getNextElement($next));
    }

    $('.option.active').fadeOut(200, function () {
        $(this).removeClass('active');

        $next.fadeIn(200, function () {

            $(this).addClass('active');
            animateOption((cycles_left - 1), getNextElement($next));
        });
    })
}

function showResult () {
    alert('jeeh');
}

export default {
    click: (element) => {
        runSelection(element);
    }
}