var App = App || {};
App["Scroll"] = App["Scroll"] || {}

App.Scroll = {
    init: function() {
        if ( $( "#fluid-scroll" ).length ) {
            this.initFluidScroll();
        }
        else if ( $( "#full-scroll" ).length ) {
            this.initFullScroll();
        }

        return this;
    },
    initFluidScroll: function () {
        $( "#fluid-scroll" ).fluidscroll( {
            afterRender: function() {
                $( ".nav-open" ).addClass( this.currentFrame.data( "nav-class" ) );
                $( ".nav-logo" ).addClass( this.currentFrame.data( "nav-class" ) );
                $( ".fluid-menu" ).addClass( this.currentFrame.data( "menu-class" ) );
            },
            onBetween: function( currentFrame, nextFrame ) {
                $( ".nav-open" ).removeClass( "white" ).addClass( nextFrame.data( "nav-class" ) );
                $( ".nav-logo" ).removeClass( "white" ).addClass( nextFrame.data( "nav-class" ) );
                $( ".fluid-menu" ).removeClass( "blue-gray white dark-blue" ).addClass( nextFrame.data( "menu-class" ) );
                App.Animator.run( nextFrame.data( "frame" ) );

            }
        } );

        return this;
    },
    initFullScroll: function() {
        if ( window.location.hash.length ) {
            var anchor = "[data-anchor=" + window.location.hash.replace( "#", "" ) + "]";
            if ( $( anchor ).length > 0 ) {
                $( "#full-scroll" ).scrollTo( anchor, 0 );
            }
        }

        if ( ! $( "body" ).hasClass( "body-mobile" ) ){
            App.Scroll.colorizer = new App.Scroll.Colorizer();
            App.Scroll.colorizer.init();
        }

        return this;
    },
    Colorizer: function() {
        this.init = function() {
            this.buildCache()
                .bindEvents()
                .update();
        };

        this.buildCache = function() {
            var _this = this;

            this.navOpen = $( ".nav-open" );
            this.navLogo = $( ".nav-logo" );
            this.scrollOffset = 60;
            this.frames = $( ".frame" );

            return this;
        };

        this.bindEvents = function() {
            $( "#full-scroll" ).on( "scroll touchmove", $.throttle( 100, $.proxy( this.update, this ) ) );
            $( window ).on( "resize", $.throttle( 100, $.proxy( this.update, this ) ) );

            return this;
        };

        this.update = function() {
            for ( var i = this.frames.length - 1; i >= 0; i-- ) {
                if ( this.frames.eq( i ).offset().top < this.scrollOffset ) {
                    var anchor = this.frames.eq( i ).data( "anchor" );
                    if ( anchor !== undefined ) {
                        history.replaceState( {}, '', "#" + anchor );
                    }
                    else if ( window.location.hash.length ) {
                        history.replaceState( {}, '', window.location.pathname );
                    }
                    this.navOpen.removeClass( "white" ).addClass( this.frames.eq( i ).data( "nav-class" ) );
                    this.navLogo.removeClass( "white" ).addClass( this.frames.eq( i ).data( "nav-class" ) );
                    break;
                }
            }

            return this;
        }
    }
};
