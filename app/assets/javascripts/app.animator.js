var App = App || {};

App.Animator = {
    init: function() {
        this.timelines = {
            global: {},
            local: {}
        };

        this.timelines.global.nav = new App.Timelines.global.nav();

        if ( $( "body" ).hasClass( "body-home" ) ) {
            this.timelines.local.splash = new App.Timelines.home.splash();
            this.timelines.local.performance = new App.Timelines.home.performance();
        };

        if ( $( "body" ).hasClass( "body-performance" ) ) {
            this.timelines.local.metrics = new App.Timelines.performance.metrics();
        };

        if ( $( "body" ).hasClass( "body-capabilities" ) ) {
            this.timelines.local.insert = new App.Timelines.capabilities.insert();
            this.timelines.local.twoShot = new App.Timelines.capabilities.twoShot();
            this.timelines.local.valueAdded = new App.Timelines.capabilities.valueAdded();
        };

        return this;
    },

    start: function() {
        $.each( this.timelines.local, function() {
            if ( this.data.autoplay ) {
                this.play();
            }
        } );
    },

    run: function( frame ) {
        if ( this.timelines.local[ frame ] !== undefined ) this.timelines.local[ frame ].restart();
    }
};


App.Timelines = {
    global: {
        nav: function() {

            this.buildTimeline = function() {
                this.timeline = new TimelineMax( { paused: true } );

                this.timeline.add([
                    TweenMax.fromTo( ".main", 0.5, { css: { rotationY: 0, scale: 1, x: 0 } }, { css: { rotationY: this.getRotationY(), scale: 0.9, x: 20 },  ease: Power3.easeOut } ),
                    TweenMax.fromTo( ".nav", 0.5, { opacity: 0 }, { opacity: 1, ease: Power1.easeIn } )
                ], "closed" );
                this.timeline.add([
                    TweenMax.to( ".main", 0.5, { css: { rotationY: 0, scale: 1, x: 0 }, ease: Power3.easeOut } ),
                    TweenMax.to( ".nav", 0.5, { opacity: 0, ease: Power1.easeOut } )
                ], "opened" );

                return this.timeline;
            }


            this.handleResize = function( e ) {
                var _this = this;

                waitForFinalEvent( function() {
                    var time = _this.timeline.time();

                    _this.timeline.getChildren()[ 0 ].vars.css.rotationY = _this.getRotationY();
                    _this.timeline.invalidate().seek( time );
                }, 500, "todo1" );
            };

            this.getRotationY = function () {
                return $( window ).width() > 1050 ? 20 : ( $( window ).width() > 800 ? 30 : ( $( window ).width() > 600 ? 40 : 70 ) );
            }

            $( window ).on( "resize", $.proxy( this.handleResize, this ) );

            return this.buildTimeline();
        }
    },
    capabilities: {
        insert: function() {
            this.timeline = new TimelineMax( { paused: true, repeat: 50, repeatDelay: 3, yoyo: true, data: { autoplay: true } } );

            var svg = $( "#svg-insert" );

            if ( svg.length > 0 ) {
                var topStartBox = $( "#position-left-top-bolt" )[ 0 ].getBBox(),
                    topEndBox = $( "#position-right-top-bolt" )[ 0 ].getBBox(),
                    bottomStartBox = $( "#position-left-bottom-bolt" )[ 0 ].getBBox(),
                    bottomEndBox = $( "#position-right-bottom-bolt" )[ 0 ].getBBox();


                TweenMax.set( "#part-top-bolt", { rotation: 10 } );
                TweenMax.set( "#part-bottom-bolt", { rotation: 12 } );

                TweenMax.set( "#part-top-bolt", { x: topStartBox.x, y: topStartBox.y, scale: 0.6 } );
                TweenMax.set( "#part-bottom-bolt", { x: bottomStartBox.x, y: bottomStartBox.y, scale: 0.6 } );

                this.timeline.add( [
                    TweenMax.fromTo( "#part-top-bolt, #part-bottom-bolt", 0.25, { opacity: 0 }, { opacity: 1 } ),
                    TweenMax.fromTo( "#part-top-bolt", 2, { x: topStartBox.x, y: topStartBox.y }, { x: topEndBox.x, y: topEndBox.y, ease: Back.easeOut.config(1.7) } ),
                    TweenMax.fromTo( "#part-bottom-bolt", 2, { x: bottomStartBox.x, y: bottomStartBox.y }, { x: bottomEndBox.x, y: bottomEndBox.y, ease: Back.easeOut.config(1.7) } ),
                    TweenMax.fromTo( "#line-top, #line-bottom", 2, { drawSVG: "100%" }, { drawSVG: "100% 100%", ease: Power1.easeInOut } ),
                ] );

                this.timeline.add( TweenMax.to( "#part-top-bolt, #part-bottom-bolt", 0.5, { scale: 0.75, ease: Back.easeOut.config(1.7), transformOrigin: "center center" } ) );
            }

            return this.timeline;
        },
        twoShot: function() {
            this.timeline = new TimelineMax( { paused: true, repeat: 50, repeatDelay: 4, data: { autoplay: true } } );

            var svg = $( "#svg-two-shot" );

            if ( svg.length > 0 ) {
                var liquidSpeed = 2,
                    anchorBounds = $( "#pour-anchor" )[ 0 ].getBBox(),
                    pour1Outer1Bounds = $( "#pour-1-outer-1 g > path" )[ 0 ].getBBox(),
                    pour1Outer2Bounds = $( "#pour-1-outer-2 g > path" )[ 0 ].getBBox(),
                    pour1Middle1Bounds = $( "#pour-1-middle-1 g > path" )[ 0 ].getBBox(),
                    pour1Middle2Bounds = $( "#pour-1-middle-2 g > path" )[ 0 ].getBBox(),
                    pour1Inner1Bounds = $( "#pour-1-inner-1 g > path" )[ 0 ].getBBox(),
                    pour1Inner2Bounds = $( "#pour-1-inner-2 g > path" )[ 0 ].getBBox(),
                    pour2Outer1Bounds = $( "#pour-2-outer-1 g > path" )[ 0 ].getBBox(),
                    pour2Outer2Bounds = $( "#pour-2-outer-2 g > path" )[ 0 ].getBBox(),
                    pour2Middle1Bounds = $( "#pour-2-middle-1 g > path" )[ 0 ].getBBox(),
                    pour2Middle2Bounds = $( "#pour-2-middle-2 g > path" )[ 0 ].getBBox(),
                    pour2Inner1Bounds = $( "#pour-2-inner-1 g > path" )[ 0 ].getBBox(),
                    pour2Inner2Bounds = $( "#pour-2-inner-2 g > path" )[ 0 ].getBBox(),
                    pour3Outer1Bounds = $( "#pour-3-outer-1 g > path" )[ 0 ].getBBox(),
                    pour3Outer2Bounds = $( "#pour-3-outer-2 g > path" )[ 0 ].getBBox(),
                    pour3Middle1Bounds = $( "#pour-3-middle-1 g > path" )[ 0 ].getBBox(),
                    pour3Middle2Bounds = $( "#pour-3-middle-2 g > path" )[ 0 ].getBBox(),
                    pour3Inner1Bounds = $( "#pour-3-inner-1 g > path" )[ 0 ].getBBox(),
                    pour3Inner2Bounds = $( "#pour-3-inner-2 g > path" )[ 0 ].getBBox(),
                    pour1Outer1OriginX = anchorBounds.x - pour1Outer1Bounds.x,
                    pour1Outer1OriginY = anchorBounds.y - pour1Outer1Bounds.y,
                    pour1Outer2OriginX = anchorBounds.x - pour1Outer2Bounds.x,
                    pour1Outer2OriginY = anchorBounds.y - pour1Outer2Bounds.y,
                    pour1Middle1OriginX = anchorBounds.x - pour1Middle1Bounds.x,
                    pour1Middle1OriginY = anchorBounds.y - pour1Middle1Bounds.y,
                    pour1Middle2OriginX = anchorBounds.x - pour1Middle2Bounds.x,
                    pour1Middle2OriginY = anchorBounds.y - pour1Middle2Bounds.y,
                    pour1Inner1OriginX = anchorBounds.x - pour1Inner1Bounds.x,
                    pour1Inner1OriginY = anchorBounds.y - pour1Inner1Bounds.y,
                    pour1Inner2OriginX = anchorBounds.x - pour1Inner2Bounds.x,
                    pour1Inner2OriginY = anchorBounds.y - pour1Inner2Bounds.y,
                    pour2Outer1OriginX = anchorBounds.x - pour2Outer1Bounds.x,
                    pour2Outer1OriginY = anchorBounds.y - pour2Outer1Bounds.y,
                    pour2Outer2OriginX = anchorBounds.x - pour2Outer2Bounds.x,
                    pour2Outer2OriginY = anchorBounds.y - pour2Outer2Bounds.y,
                    pour2Middle1OriginX = anchorBounds.x - pour2Middle1Bounds.x,
                    pour2Middle1OriginY = anchorBounds.y - pour2Middle1Bounds.y,
                    pour2Middle2OriginX = anchorBounds.x - pour2Middle2Bounds.x,
                    pour2Middle2OriginY = anchorBounds.y - pour2Middle2Bounds.y,
                    pour2Inner1OriginX = anchorBounds.x - pour2Inner1Bounds.x,
                    pour2Inner1OriginY = anchorBounds.y - pour2Inner1Bounds.y,
                    pour2Inner2OriginX = anchorBounds.x - pour2Inner2Bounds.x,
                    pour2Inner2OriginY = anchorBounds.y - pour2Inner2Bounds.y,
                    pour3Outer1OriginX = anchorBounds.x - pour3Outer1Bounds.x,
                    pour3Outer1OriginY = anchorBounds.y - pour3Outer1Bounds.y,
                    pour3Outer2OriginX = anchorBounds.x - pour3Outer2Bounds.x,
                    pour3Outer2OriginY = anchorBounds.y - pour3Outer2Bounds.y,
                    pour3Middle1OriginX = anchorBounds.x - pour3Middle1Bounds.x,
                    pour3Middle1OriginY = anchorBounds.y - pour3Middle1Bounds.y,
                    pour3Middle2OriginX = anchorBounds.x - pour3Middle2Bounds.x,
                    pour3Middle2OriginY = anchorBounds.y - pour3Middle2Bounds.y,
                    pour3Inner1OriginX = anchorBounds.x - pour3Inner1Bounds.x,
                    pour3Inner1OriginY = anchorBounds.y - pour3Inner1Bounds.y,
                    pour3Inner2OriginX = anchorBounds.x - pour3Inner2Bounds.x,
                    pour3Inner2OriginY = anchorBounds.y - pour3Inner2Bounds.y;

                this.timeline.add( [
                    TweenMax.fromTo( "#pour-1-start defs > *", liquidSpeed * 0.25, { x: 0, y: 0 }, { x: "100%", y: -4, ease: Power1.easeIn } ),
                    TweenMax.fromTo( "#pour-2-start defs > *", liquidSpeed * 0.25, { x: 0, y: 0 }, { x: "-90%", y: "100%", ease: Power1.easeIn } ),
                    TweenMax.fromTo( "#pour-3-start defs > *", liquidSpeed * 0.25, { x: 0, y: 0 }, { x: "-83%", y: "-100%", ease: Power1.easeIn } )
                ] );

                this.timeline.add( [
                    TweenMax.fromTo( "#pour-1-box defs > *", liquidSpeed, { x: 0, y: 0 }, { x: 150, y: 0, ease: Power1.easeIn } ),
                    TweenMax.fromTo( "#pour-2-box defs > *", liquidSpeed, { x: 0, y: 0 }, { x: -100, y: 100, ease: Power1.easeIn } ),
                    TweenMax.fromTo( "#pour-3-box defs > *", liquidSpeed, { x: 0, y: 0 }, { x: -75, y: -110, ease: Power1.easeIn } ),
                    TweenMax.fromTo( "#pour-1-outer-1 defs > *", liquidSpeed * 0.75, { rotation: 0, transformOrigin: pour1Outer1OriginX + " " + pour1Outer1OriginY }, { rotation: 40, ease: Sine.easeIn, delay: liquidSpeed * 0.33 } ),
                    TweenMax.fromTo( "#pour-1-outer-2 defs > *", liquidSpeed * 0.75, { rotation: 0, transformOrigin: pour1Outer2OriginX + " " + pour1Outer2OriginY }, { rotation: -40, ease: Sine.easeIn, delay: liquidSpeed * 0.33 } ),
                    TweenMax.fromTo( "#pour-1-middle-1 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour1Middle1OriginX + " " + pour1Middle1OriginY }, { rotation: 45, ease: Sine.easeIn, delay: liquidSpeed * 0.5 } ),
                    TweenMax.fromTo( "#pour-1-middle-2 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour1Middle2OriginX + " " + pour1Middle2OriginY }, { rotation: -45, ease: Sine.easeIn, delay: liquidSpeed * 0.5 } ),
                    TweenMax.fromTo( "#pour-1-inner-1 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour1Inner1OriginX + " " + pour1Inner1OriginY }, { rotation: 38, ease: Sine.easeIn, delay: liquidSpeed * 0.66 } ),
                    TweenMax.fromTo( "#pour-1-inner-2 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour1Inner2OriginX + " " + pour1Inner2OriginY }, { rotation: -38, ease: Sine.easeIn, delay: liquidSpeed * 0.66 } ),
                    TweenMax.fromTo( "#pour-2-outer-1 defs > *", liquidSpeed * 0.75, { rotation: 0, transformOrigin: pour2Outer1OriginX + " " + pour2Outer1OriginY }, { rotation: 40, ease: Sine.easeIn, delay: liquidSpeed * 0.33 } ),
                    TweenMax.fromTo( "#pour-2-outer-2 defs > *", liquidSpeed * 0.75, { rotation: 0, transformOrigin: pour2Outer2OriginX + " " + pour2Outer2OriginY }, { rotation: -60, ease: Sine.easeIn, delay: liquidSpeed * 0.33 } ),
                    TweenMax.fromTo( "#pour-2-middle-1 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour2Middle1OriginX + " " + pour2Middle1OriginY }, { rotation: 45, ease: Sine.easeIn, delay: liquidSpeed * 0.5 } ),
                    TweenMax.fromTo( "#pour-2-middle-2 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour2Middle2OriginX + " " + pour2Middle2OriginY }, { rotation: -65, ease: Sine.easeIn, delay: liquidSpeed * 0.5 } ),
                    TweenMax.fromTo( "#pour-2-inner-1 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour2Inner1OriginX + " " + pour2Inner1OriginY }, { rotation: 38, ease: Sine.easeIn, delay: liquidSpeed * 0.66 } ),
                    TweenMax.fromTo( "#pour-2-inner-2 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour2Inner2OriginX + " " + pour2Inner2OriginY }, { rotation: -58, ease: Sine.easeIn, delay: liquidSpeed * 0.66 } ),
                    TweenMax.fromTo( "#pour-3-outer-1 defs > *", liquidSpeed * 0.75, { rotation: 0, transformOrigin: pour3Outer1OriginX + " " + pour3Outer1OriginY }, { rotation: 50, ease: Sine.easeIn, delay: liquidSpeed * 0.33 } ),
                    TweenMax.fromTo( "#pour-3-outer-2 defs > *", liquidSpeed * 0.75, { rotation: 0, transformOrigin: pour3Outer2OriginX + " " + pour3Outer2OriginY }, { rotation: -40, ease: Sine.easeIn, delay: liquidSpeed * 0.33 } ),
                    TweenMax.fromTo( "#pour-3-middle-1 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour3Middle1OriginX + " " + pour3Middle1OriginY }, { rotation: 55, ease: Sine.easeIn, delay: liquidSpeed * 0.5 } ),
                    TweenMax.fromTo( "#pour-3-middle-2 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour3Middle2OriginX + " " + pour3Middle2OriginY }, { rotation: -45, ease: Sine.easeIn, delay: liquidSpeed * 0.5 } ),
                    TweenMax.fromTo( "#pour-3-inner-1 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour3Inner1OriginX + " " + pour3Inner1OriginY }, { rotation: 48, ease: Sine.easeIn, delay: liquidSpeed * 0.66 } ),
                    TweenMax.fromTo( "#pour-3-inner-2 defs > *", liquidSpeed, { rotation: 0, transformOrigin: pour3Inner2OriginX + " " + pour3Inner2OriginY }, { rotation: -38, ease: Sine.easeIn, delay: liquidSpeed * 0.66 } )
                ] );
            }

            return this.timeline;
        },
        valueAdded: function() {
            this.timeline = new TimelineMax( { paused: true, repeat: 50, repeatDelay: 3, yoyo: true, data: { autoplay: true } } );

            var svg = $( "#svg-value-added" );

            if ( svg.length > 0 ) {
                var arm = svg.find( ".arm" ),
                    gear1 = svg.find( ".gear-1" ),
                    gear2 = svg.find( ".gear-2" ),
                    gear3 = svg.find( ".gear-3" );


                this.timeline.add( [
                    TweenMax.fromTo( gear1, 1, { xPercent: -100, yPercent: -50 }, { xPercent: 0, yPercent: 0, ease: Power3.easeIn, delay: 1 } ),
                    TweenMax.fromTo( arm, 1, { xPercent: -50, yPercent: 100 }, { xPercent: 0, yPercent: 0, ease: Power3.easeIn, delay: 1.2 } ),
                    TweenMax.fromTo( gear3, 1, { xPercent: 100, yPercent: -50 }, { xPercent: 0, yPercent: 0, ease: Power3.easeIn, delay: 1.4 } ),
                    TweenMax.fromTo( gear2, 1, { xPercent: 50, yPercent: 140 }, { xPercent: 0, yPercent: 0, ease: Power3.easeIn, delay: 1.6 } ),
                ] );

                this.timeline.add( [
                    TweenMax.to( arm, 8.5, { rotation: -50, transformOrigin: "22% 85%", ease: Power0.easeNone } ),
                    TweenMax.to( [gear1, gear3], 8.5, { rotation: 220, transformOrigin: "center center", ease: Power0.easeNone } ),
                    TweenMax.to( gear2, 8.5, { rotation: -360, transformOrigin: "center center", ease: Power0.easeNone } )
                ] );
            }

            return this.timeline;
        }
    },
    home: {
        splash: function() {
            this.timeline = new TimelineMax( { paused: true, data: { autoplay: true } } );

            var svg = $( "svg#athlete" );

            if ( svg.length > 0 ) {
                var view = svg.find( "> g" ),
                    elements = view.find( "> g" ),
                    delay = 1,
                    speed = 4,
                    tweens = [],
                    viewRect = view[ 0 ].getBoundingClientRect(),
                    viewCenter = {
                        x: viewRect.left + ( viewRect.width / 2 ) + 50,
                        y: viewRect.top + ( viewRect.height / 2 )
                    };

                elements.each( function() {
                    var rect   = this.getBoundingClientRect(),
                        behind = Math.random() > 0.5 ? 1 : -1,
                        center = {
                            x: rect.left + rect.width / 2,
                            y: rect.top + rect.height / 2
                        };


                    tweens.push( TweenMax.fromTo( this, ( Math.random() * speed ) + 0.5, { scale: Math.random(), opacity: 0.5, zIndex: behind }, { scale: 1, opacity: 1, ease: Power1.easeOut, zIndex: behind, delay: delay } ) );


                    if ( center.y < viewCenter.y ) {
                        tweens.push( TweenMax.fromTo( this, ( Math.random() * speed ) + 0.5, { yPercent: -105 }, { yPercent: 0, ease: Power3.easeOut, delay: delay } ) );
                    }
                    else {
                        tweens.push( TweenMax.fromTo( this, ( Math.random() * speed ) + 0.5, { yPercent: 105 }, { yPercent: 0, ease: Power3.easeOut, delay: delay } ) );
                    }

                    if ( center.x < viewCenter.x ) {
                        tweens.push( TweenMax.fromTo( this, ( Math.random() * speed ) + 0.5, { x: -viewRect.width - ( Math.random() * viewRect.left ) - rect.left }, { x: 0, ease: Power3.easeOut, delay: delay } ) );
                    }
                    else {
                        tweens.push( TweenMax.fromTo( this, ( Math.random() * speed ) + 0.5, { x: ( Math.random() * viewRect.right ) + rect.right }, { x: 0, ease: Power3.easeOut, delay: delay } ) );
                    }

                    if ( $( this ).hasClass( "rotate" ) ) {
                        var duration = rect.width > 50 ? 40 : 10;
                        tweens.push( TweenMax.to( $( this ).find( "image" ), duration, { rotation: 360, transformOrigin: "52% 48%", repeat: -1, ease: Power0.easeNone, delay: delay } ) );
                    }

                    if ( $( this ).hasClass( "hover" ) ) {
                        tweens.push( TweenMax.fromTo( $( this ).find( "image" ), speed, { y: -2, x: 2, transformOrigin: "center center" }, { y: 2, x: -2, transformOrigin: "center center", ease: Power3.easeOut, repeat: -1, yoyo: true, delay: delay } ) );
                    }
                } );

                this.timeline.add( tweens );
            }

            return this.timeline;
        },

        performance: function() {
            this.timeline = new TimelineMax( { paused: true, data: { autoplay: true } } );

            this.timeline.add( [
                TweenMax.staggerFromTo( ".benchmark .dot", 0.5, { scale: 0, transformOrigin: "center center" }, { scale: 1, ease: Back.easeOut.config( 1.7 ) }, 0.25 ),
                TweenMax.staggerFromTo( ".benchmark .line", 0.75, { drawSVG: "0%" }, { drawSVG: "100%", ease: Power2.easeIn }, 0.25 ),
                TweenMax.staggerFromTo( ".benchmark .text", 0.3, { y: 10, opacity: 0 }, { y: 0, opacity: 1, delay: 0.6, ease: Power3.easeIn }, 0.25 )
            ] );

            return this.timeline;
        }
    },
    performance: {
        metrics: function() {
            var _this = this,
                wh = $( window ).height(),
                fullScroll = $( "#full-scroll" ),
                metricsArrows = $( ".metrics-frame .arrows" ),
                metricsGraphics = $( ".metrics-frame .graphics" ),
                partsArrows = $( ".parts-frame .arrows" ),
                partsGraphics = $( ".parts-frame .graphics" ),
                accuracyArrows = $( ".accuracy-frame .arrows" ),
                accuracyGraphics = $( ".accuracy-frame .graphics" ),
                awardsArrows = $( ".awards-frame .arrows" ),
                awardsGraphics = $( ".awards-frame .graphics" );

            this.timeline = new TimelineMax( { paused: true, data: { autoplay: false } } );

            this.timeline.add( TweenMax.fromTo( metricsArrows, 0.5, { opacity: 0, y: -20 }, { opacity: 1, y: 0 } ) );
            this.timeline.addLabel( "metrics-arrows" );
            this.timeline.add( TweenMax.fromTo( metricsGraphics, 0.5, { opacity: 0 }, { opacity: 1 } ) );
            this.timeline.addLabel( "metrics-graphics" );
            this.timeline.add( TweenMax.fromTo( partsArrows, 0.5, { opacity: 0, y: -20 }, { opacity: 1, y: 0 } ) );
            this.timeline.addLabel( "parts-arrows" );
            this.timeline.add( TweenMax.fromTo( partsGraphics, 0.5, { opacity: 0 }, { opacity: 1 } ) );
            this.timeline.addLabel( "parts-graphics" );
            this.timeline.add( TweenMax.fromTo( accuracyArrows, 0.5, { opacity: 0, y: -20 }, { opacity: 1, y: 0 } ) );
            this.timeline.addLabel( "accuracy-arrows" );
            this.timeline.add( TweenMax.fromTo( accuracyGraphics, 0.5, { opacity: 0 }, { opacity: 1 } ) );
            this.timeline.addLabel( "accuracy-graphics" );
            this.timeline.add( TweenMax.fromTo( awardsArrows, 0.5, { opacity: 0, y: -20 }, { opacity: 1, y: 0 } ) );
            this.timeline.addLabel( "awards-arrows" );
            this.timeline.add( TweenMax.fromTo( awardsGraphics, 0.5, { opacity: 0 }, { opacity: 1 } ) );
            this.timeline.addLabel( "awards-graphics" );

            this.handleScroll = function( e ) {
                if ( ! _this.timeline.isActive() ) {
                    if ( awardsGraphics.offset().top + awardsGraphics.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "awards-graphics" );
                    }
                    else if ( awardsArrows.offset().top + awardsArrows.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "awards-arrows" );
                    }
                    else if ( accuracyGraphics.offset().top + accuracyGraphics.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "accuracy-graphics" );
                    }
                    else if ( accuracyArrows.offset().top + accuracyArrows.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "accuracy-arrows" );
                    }
                    else if ( partsGraphics.offset().top + partsGraphics.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "parts-graphics" );
                    }
                    else if ( partsArrows.offset().top + partsArrows.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "parts-arrows" );
                    }
                    else if ( metricsGraphics.offset().top + metricsGraphics.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "metrics-graphics" );
                    }
                    else if ( metricsArrows.offset().top + metricsArrows.height() - wh < 0 ) {
                        _this.timeline.stop().tweenTo( "metrics-arrows" );
                    }
                }
            };

            if ( awardsArrows.offset().top + awardsArrows.height() - wh < 0 ) {
                _this.timeline.seek( "awards-graphics" );
            }
            else if ( accuracyArrows.offset().top + accuracyArrows.height() - wh < 0 ) {
                _this.timeline.seek( "accuracy-graphics" );
            }
            else if ( partsArrows.offset().top + partsArrows.height() - wh < 0 ) {
                _this.timeline.seek( "parts-graphics" );
            }
            else if ( metricsArrows.offset().top + metricsArrows.height() - wh < 0 ) {
                _this.timeline.seek( "metrics-graphics" );
            }

            fullScroll.on( "mousewheel scroll", $.proxy( this.handleScroll, this ) );

            return this.timeline;
        }
    }
};
