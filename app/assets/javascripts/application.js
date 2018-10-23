// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets
//= require inputmask/jquery.inputmask.bundle.min
//= require throttle-debounce/jquery.throttle-debounce.min
//= require greensock/TweenMax.min
//= require greensock/jquery.gsap.min
//= require greensock/easing/EasePack.min
//= require greensock/plugins/CSSPlugin.min
//= require greensock/plugins/DrawSVGPlugin.min
//= require fluid/jquery.fluid-scroll.min
//= require_tree .
//= stub rails_admin/custom/ui.js


var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

$( document ).on( "turbolinks:load", function() {
    window.Turbolinks.controller.adapter.showProgressBar();
    window.Turbolinks.controller.adapter.hideProgressBar();
} );

$( document ).on( "turbolinks:before-cache", function() {
    App.Nav.closeNow();
} );

$( window ).on( "popstate", function( e ) {
    e.preventDefault();
    Turbolinks.visit( window.location.url );
    return false;
} );


// don't use animated progress
Turbolinks.ProgressBar.prototype.refresh = function() {};

// no css
Turbolinks.ProgressBar.defaultCSS = "";

// create custom progress bar
Turbolinks.ProgressBar.prototype.installProgressElement = function() {
    return $( "body" ).before( '<div class="preloader"><svg version="1.1" class="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31.5 35" style="enable-background:new 0 0 31.5 35;" xml:space="preserve" width="80"><path class="hex-logo" d="M23,17.9l0.2-1.5h-2.6l-0.2,1.2h0.5l-1.3,1l0.8-4.8h-2.5l-0.1,1.5h0.6l-0.8,4.5h-0.4l0,0h-0.1l0,0l0,0h-0.6L16,15.3h0.8l0.2-1.5h-5.1l-0.3,1.5h0.8l-2.1,4.5H9.6l-0.3,1.5h3.4l0.3-1.5h-0.7l0.5-1.1h1.9l0.1,1.1h-0.9l-0.4,1.5h3.4H17h2.3l0.4-2.2h0.1l0.9,1.1h-0.5l-0.3,1.1h2.6l0.2-1.5h-0.4l-0.9-1.1l1.1-0.9H23V17.9z M13.1,17.5l1-2.3l0.2,2.3H13.1z" fill="#0581ff"/><path class="hex-path" d="M0.8,11.5v12c0,1.7,0.6,3.3,2.1,4.2l10,6c1.5,0.9,3.4,0.9,4.8,0l10.4-6c1.5-0.9,2.7-2.4,2.7-4.2v-12c0-1.7-1.2-3.3-2.7-4.2l-10.5-6c-1.5-0.9-3.2-0.9-4.7,0l-10.1,6C1.3,8.2,0.8,9.8,0.8,11.5z" fill="none" stroke="#0581ff" stroke-dasharray="1000" stroke-dashoffset="1000" stroke-linejoin="round" stroke-width="1"/></svg></div>' );
};

// remove custom progress bar
Turbolinks.ProgressBar.prototype.uninstallProgressElement = function() {
    App.Preloader.init( $( "[data-preload]" ).data( "preload" ), function() {
        App.Scroll.init();
        App.Animator.init();
        App.Sliders.init();
        App.Mask.init();
        App.Preloader.hide();
        App.Animator.start();
    } );
};

// changes the default 500ms threshold to show progress bar
Turbolinks.BrowserAdapter.prototype.showProgressBarAfterDelay = function() {
    return this.progressBarTimeout = setTimeout( this.showProgressBar, 50 );
};
