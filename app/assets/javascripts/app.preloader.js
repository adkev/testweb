var App = App || {};

App.Preloader = {
    init: function( sources, callback ) {
        if ( sources && sources.length > 0 ) {
            var loaded = 0;

            $.each( sources, function( i, source ) {
                var img = $( "<img />" );

                img.off( "load" ).on( "load", function() {
                    loaded ++;

                    if ( loaded == sources.length ) {
                        if ( typeof callback === "function" ) { callback(); }
                    }
                });

                img.attr( "src", source );
            });
        }
        else {
            if ( typeof callback === "function" ) { callback(); }
        }
    },
    hide: function() {
        $( ".preloader-bg" ).remove();
        TweenMax.fromTo( ".preloader", 0.25, { opacity: 1 }, { opacity: 0, onComplete: function() { $( ".preloader" ).remove(); } } );
    }
};
