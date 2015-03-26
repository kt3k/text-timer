# text-timer v0.0.0

> Simple text timer

This library depends on jquery and [gameloop](https://github.com/kt3k/gameloop).

# Usage

```html

<script src="path/to/jquery.js"></script>
<script src="path/to/gameloop.js"></script>

<script src="path/to/text-timer.js"></script>


<span class="text-timer" data-time="360000"></span>

```

The above `span` tag content become `hh:mm:ss.uu` and stop with label `00:00:00.00` after 6 minutes.


## Initialize manually

```
$(document).trigger('init.text-timer');
```

Trigger `init.text-timer` event on `document` and initialize the text-timers.
