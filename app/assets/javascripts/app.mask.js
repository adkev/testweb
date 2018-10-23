var App = App || {};

App.Mask = {
    init: function() {
        $( "input[type=tel]" ).inputmask( {
            mask: "(999) 999-9999",
            placeholder: " ",
            showMaskOnHover: false,
            showMaskOnFocus: false
        } );

        $( "input.currency" ).inputmask( "currency", { removeMaskOnSubmit: true, rightAlign: false } );
    }
};
