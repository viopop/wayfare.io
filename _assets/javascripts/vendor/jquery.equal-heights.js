/*!
 * Simple jQuery Equal Heights
 *
 * Copyright (c) 2013 Matt Banks
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.5.1
 */
(function($) {

    $.fn.equalHeights = function() {
      var maxHeight = 0,
          $this = $(this);
      $this.each( function() {
        var height = $(this).innerHeight();
        if ( height > maxHeight ) { maxHeight = height; }
      });
      return $this.css('height', maxHeight);
    };

    // auto-initialize plugin
    $(function() {
      $('[data-equal]').each(function(i, el) {
        var target = $(el).data('equal');
        $(el).find(target).equalHeights();
        $(window).on("resize", function() { $(el).find(target).css('height', 'auto').equalHeights() });
      });
    });

})(jQuery);
