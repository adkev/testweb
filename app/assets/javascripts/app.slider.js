var App = App || {};

App.Sliders = {
    init: function() {
        ( new App.Slider() ).init();
    }
}

App.Slider = function() {
    this.init = function() {
        this.buildCache()
            .bindEvents()
            .setup()
            .loop();
    };

    this.buildCache = function() {
        this.controls = $( ".slide-control" );
        this.container = $( ".slides" );
        this.slides = $( ".slide" );
        this.currentIdx = 0;
        this.transition = this.container.data( "transition" );
        this.stopOnHover = ( this.container.data( "stop-on-hover" ) !== undefined );
        this.duration = this.container.data( "duration" ) * 1000;
        this.speed = this.container.data( "speed" );
        this.timeout = undefined;

        return this;
    };

    this.bindEvents = function() {
        var _this = this;

        this.controls.off( "click" ).on( "click", function( e ) {
            e.preventDefault();
            clearTimeout( _this.timeout );
            _this.slide( $( this ).data( "slide" ) - 1 );
            return false;
        } );

        if ( this.stopOnHover ) {
            this.slides.hover( function() {
                clearTimeout( _this.timeout );
            }, function() {
                _this.loop();
            } );
        }

        return this;
    };

    this.setup = function() {
        TweenMax.set( this.slides.not( this.slides.eq( this.currentIdx ) ), { opacity: 0, zIndex: 1 } );
        TweenMax.set( this.slides.eq( this.currentIdx ), { opacity: 1, zIndex: 2 } );

        this.controls.eq( this.currentIdx ).addClass( "active" );

        return this;
    };

    this.loop = function() {
        var _this = this;

        this.timeout = setTimeout( function() {
            var nextIdx = ( _this.currentIdx + 1 > _this.slides.length - 1 ) ? 0 : _this.currentIdx + 1;
            _this.slide( nextIdx );
        }, this.duration );

        return this;
    };

    this.slide = function( n ) {
        var prevSlide = this.slides.eq( this.currentIdx );
        var nextSlide = this.slides.eq( n );

        if ( this.transition === "fade" ) {
            new TweenMax.fromTo( prevSlide, this.speed, { opacity: 1 }, { opacity: 0, ease: Power2.easeOut } ),
            new TweenMax.fromTo( nextSlide, this.speed, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut } );
        }
        else if ( this.transition === "bleed" ) {
            new TweenMax.set( this.slides.not( nextSlide ).not( prevSlide), { zIndex: 1 } );
            new TweenMax.set( prevSlide, { zIndex: 2 } );
            new TweenMax.fromTo( nextSlide, this.speed, { opacity: 0, zIndex: 3 }, { opacity: 1, zIndex: 3, ease: Power2.easeOut } );
        }

        this.currentIdx = n;

        this.loop();
        this.controls.filter( ".active" ).removeClass( "active" );
        this.controls.eq( n ).addClass( "active" );

        return this;
    };
};
