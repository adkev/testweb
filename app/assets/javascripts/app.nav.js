var App = App || {};

App.Nav = {
    opened: function() {
        return $( ".nav" ).hasClass( "open" );
    },
    closed: function() {
        return !$( ".nav" ).hasClass( "open" );
    },
    open: function() {
        App.Animator.timelines.global.nav.tweenFromTo( 0, 0.5 );
    },
    openNow: function() {
        App.Animator.timelines.global.nav.seek( 0.5 );
    },
    close: function() {
        App.Animator.timelines.global.nav.tweenFromTo( 0.5, 1 );
    },
    closeNow: function() {
        App.Animator.timelines.global.nav.seek( 0 );
    }
};

$( document ).on( "click", ".btn-nav.nav-open", function() {
    if ( App.Nav.opened() ) {
        $( ".nav" ).removeClass( "open" );
        App.Nav.close();
    }
    else {
        $( ".nav" ).addClass( "open" );
        App.Nav.open();
    }
});

$( document ).on( "click", ".btn-nav.nav-close", function() {
    $( ".nav" ).removeClass( "open" );
    App.Nav.close();
});
