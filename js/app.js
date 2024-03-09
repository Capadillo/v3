import { Cookie } from './Cookie.js';

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Service Worker
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("../service.js");
}

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Main Features
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

$(function() {
    // get active tab from cookies
    let href = Cookie.get('active-tab') ?? 'attributes';
    // set the active tab value
    $('[data-tab]').attr('data-tab', href);
    // highlight the active tab button
    $(`[href='#${href}']`).attr('aria-current', 'page');
});

$('#nav-tabs a').click(function(e) {
    // stop the anchor from doing its thing
    e.preventDefault();
    // get the anchor href without the preceeding #
    let href = $(this).attr('href').substring(1);
    // set the active tab value
    $('[data-tab]').attr('data-tab', href);
    // highlight the new active tab button and clear the old
    $('[aria-current]').removeAttr('aria-current');
    $(this).attr('aria-current', 'page');
    // store the currently active tab in cookies
    Cookie.set('active-tab', href);
})

$('[collapsable] :header').click(function() {
    const container = $(this).parent('[collapsable]');
    const breakpoint = $(container).attr('breakpoint');

    if (breakpoint == "small") {
        if (window.innerWidth > 540) {
            return;
        }
    }

    $(container).toggleClass('collapsed');
});

$(window).on('resize', function() {
    if (window.innerWidth > 540) {
        $('[collapsable]').removeClass('collapsed');
    }
})

$('.portrait').click(function() {
    $("#character__progress").attr(
        'hidden',
        !$("#character__progress").attr('hidden')
    );
});