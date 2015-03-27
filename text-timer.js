

(function ($, gameloop) {
    'use strict';

    if (!$) {

        throw new Error('jQuery is required');

    }


    if (!gameloop) {

        throw new Error('gameloop is required: see https://github.com/kt3k/gameloop');

    }

    var initTextTimers = function () {

        $('.text-timer').each(initTextTimerOne);

    };

    var initTextTimerOne = function () {

        var $el = $(this);

        $el.removeClass('text-timer');

        $el.addClass('text-timer-initialized');

        var endAt = +$el.attr('data-end-at');

        if (!endAt) {

            var time = +$el.attr('data-time') || 180 * 1000;

            endAt = time + (+new Date());

        }

        var loop = gameloop(function () {

            var now = +new Date();

            if (now > endAt) {

                loop.stop();

                now = endAt;

            }

            $el.text(timeLabel(endAt - now));

        });

        loop.setFPS(+$el.attr('data-fps') || 30);

        loop.start();

    };

    var timeLabel = function (time) {

        var days = Math.floor(time / (3600000 * 24));
        var hours = Math.floor(time / 3600000) % 24;
        var minutes = Math.floor(time / 60000) % 60;
        var seconds = Math.floor(time / 1000) % 60;
        var fragment = Math.floor(time / 10) % 100;

        var label = zeropad(hours) + ':' + zeropad(minutes) + ':' + zeropad(seconds) + '.' + zeropad(fragment);

        if (days > 0) {
            label = days + ' day(s) + ' + label;
        }

        return label;

    };

    var zeropad = function (num) {

        return ('00' + num).substr(-2, 2);

    };


    $(document).on('init.text-timer', initTextTimers);

    $(function () {

        $(document).trigger('init.text-timer');

    });

}(window.jQuery, window.gameloop));
