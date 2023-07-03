/* 
---------------------------------------------------------
-- Script to handle navbar windows size related events --
---------------------------------------------------------
*/

// Variables
var nav = $('#nav');
var nav_switch = $('#nav .switch');
var navbar_toggler = nav.children('button').filter('.navbar-toggler');
var navbar_supported_content = $('#navbarSupportedContent');
var navbar_brand_ul = $('#navbar-brand-ul');
var nav_items = navbar_supported_content.children('ul').children('li');
var nav_second_a = $('#nav-item-second').children('a');


// Re-order nav items
const reorder_nav_items = function () {
    let current_nav_items = navbar_supported_content.children('ul').children('li')
    current_nav_items.sort(function(a, b){
        return $(a).attr("key")-$(b).attr("key")
    });
    navbar_supported_content.children('ul').append(current_nav_items);
};

// Swap elements in nav between brand and content
const nav_a_swapping = function(a) {

    // If navbar brand is empty insert, otherwise swap
    if (navbar_brand_ul.children('li').length != 0) {
        navbar_supported_content.children('ul').append(navbar_brand_ul.children('li'));
    }
    // Insert active li inside navbar brand
    navbar_brand_ul.append(a.parent('li'));
    // Reorder
    reorder_nav_items();
};
// Nav items observer
const nav_items_observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        // When element becomes active we move it inside navbar_brand_ul
        let a = $(mutation.target);
        if (a.hasClass('active')) {
            nav_a_swapping(a);
        }
    });
});

// Scroll listener to collapse nav items
const collapse_nav = function() {
    if ($(navbar_toggler).attr('aria-expanded') == 'true') {
        $(navbar_toggler).trigger('click');
    }
}

// MD - Bootstrap
Breakpoints.get('md_bootstrap').on({
    enter: function(){
        navbar_brand_ul.removeClass("hidden");

        // Initial swap
        let a_active = navbar_supported_content.children('ul').children('li').children('a').filter('.active');
        nav_a_swapping(a_active);

        // Attach event active listener to links of nav items
        nav_items.toArray().forEach(el => {
            nav_items_observer.observe($(el).children('a').get(0), {
                attributes: true, attributeFilter: ['class']
            });
        });

        // Attach scroll event listener to nav to collapse
        collapse_nav();
        document.addEventListener('scroll', collapse_nav);

        // Place switch
        nav_switch.insertBefore(navbar_toggler);

        // Modify CV text
        // nav_second_a.text("Curriculum Vitae 💼");
        
    },
    leave: function(){
        navbar_brand_ul.addClass("hidden");

        // Move and reorder from navbar-brand
        navbar_supported_content.children('ul').append(
            navbar_brand_ul.children('li')
        );
        reorder_nav_items();

        // Detach event active listener to nav items
        nav_items_observer.disconnect();

        // Detach event listener to nav collapse
        collapse_nav();
        document.removeEventListener('scroll', collapse_nav);

        // Place switch
        nav_switch.insertAfter(navbar_supported_content);

    }
});

/*
// LG - Medium screen updates
Breakpoints.get('lg').on({
    enter: function(){
        nav_second_a.text("Curriculum Vitae 💼");
    },
});

// MD - Medium screen updates
Breakpoints.get('md').on({
    enter: function(){
        nav_second_a.text("CV 💼");
    },
    leave: function(){
        nav_second_a.text("Curriculum Vitae 💼");
    }
});
*/