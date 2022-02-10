(function ($) {

    $.fn.copyToClipboard = function (options) {


        // Meine Default Werte
        var defaults = {
            buttonClassName: "copyToClipboard-button",
            buttonText: "Copy",
            callback: false
        }

        // Optionen
        options = $.extend(defaults, options);


        // the plugin
        return this.each(function (i) {

            var el = $(this);

            // Parent auf Relative
            el.css({ position: 'relative' });

            // 1. Eine Box erstellen die an der richtigen Position im Div ist
            var html = '<div class="' + options.buttonClassName +'">' + options.buttonText + '</div>'

            // 
            el.append(html);

            // Hover Funktion zum Ein- und Ausblenden der Copy Button
            el.hover(function() {
                el.find('.' + options.buttonClassName).show();
            }, function() {
                el.find('.' + options.buttonClassName).hide();
            });

            // Click Event
            el.on('click', '.' + options.buttonClassName,function() {
                
                var temp = $('<textarea>');
                $("body").append(temp);

                var text = $(el).text().trim();

                // Copy abschneiden
                text = text.substr(0, text.length - options.buttonText.length)

                temp.val(text).select();

                document.execCommand("copy");

                temp.remove();

                // 
                if(typeof options.callback == 'function') {
                    options.callback(text);
                }
            });
        });
    };
})(jQuery);
