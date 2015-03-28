

(function ($, gameloop) {
    'use strict';

    var CLASS = 'text-timer';
    var CLASS_INIT = 'text-timer-initialized';
    var SELECTOR = '.' + CLASS + ':not(.' + CLASS_INIT + ')';

    if (!$) {

        throw new Error('jQuery is required');

    }


    if (!gameloop) {

        throw new Error('gameloop is required: see https://github.com/kt3k/gameloop');

    }

    /**
     * Initialize all `text-timer`s in the domument.
     *
     * @private
     */
    var init = function () {

        $(SELECTOR).each(function () {

            initOne(this);

        });

        initDomTimers();

    };

    /**
     * Initializes all the dom-timers in the document.
     */
    var initDomTimers = function () {

        $(document).trigger('init.dom-timer');

    };

    /**
     * Sets the element as dom-timer.
     *
     * @param {HTMLElement} element
     */
    var setDomTimer = function (element) {

        $(element).addClass('dom-timer');

    };

    /**
     * Initializes the element as a text-timer.
     *
     * @param {HTMLElement} element
     */
    var initOne = function (element) {

        var $el = $(element);

        // mark as initialized
        $el.addClass(CLASS_INIT);

        $el.on('tick.dom-timer', function (event, timeRemains) {

            $(this).text(timeLabel(timeRemains));

        });

        setDomTimer(element);

    };

    /**
     * Returns a time label for the given time.
     *
     * @param {Number} time
     * @return {String} The label
     */
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


    $(document).on('init.text-timer', init);

    $(function () {

        $(document).trigger('init.text-timer');

    });

}(window.jQuery, window.gameloop));
