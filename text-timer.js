

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

        var remaining = +$el.attr('data-time') || 180 * 1000;

        var endAt = remaining + (+new Date());

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

        var hours = Math.floor(time / 3600000);
        var minutes = Math.floor(time / 60000) % 60;
        var seconds = Math.floor(time / 1000) % 60;
        var fragment = Math.floor(time / 10) % 100;

        return zeropad(hours) + ':' + zeropad(minutes) + ':' + zeropad(seconds) + '.' + zeropad(fragment);

    };

    var zeropad = function (num) {

        return ('00' + num).substr(-2, 2);

    };


    $(document).on('init.text-timer', initTextTimers);

    $(function () {

        $(document).trigger('init.text-timer');

    });

}(window.jQuery, window.gameloop));
