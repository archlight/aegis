Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Template.mainLayout.rendered = function(){

    // SKIN OPTIONS
    // Uncomment this if you want to have different skin option:
    // Available skin: (skin-1 or skin-3, skin-2 deprecated, md-skin)
    $('body').addClass('skin-3');

    // FIXED-SIDEBAR
    // Uncomment this if you want to have fixed left navigation
    // $('body').addClass('fixed-sidebar');
    // $('.sidebar-collapse').slimScroll({
    //     height: '100%',
    //     railOpacity: 0.9
    // });

    // BOXED LAYOUT
    // Uncomment this if you want to have boxed layout
    //$('body').addClass('boxed-layout');

    //$('body').addClass('top-navigation')


};