// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Enable the Navigation Toggle
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

$(function() {
    const current = $(this).find(`[aria-selected='true']`);
    $(`#${$(current).attr('aria-controls')}`).removeClass('hidden');
})

$(`.header__navigation`).click(function(event) {
    // don't actually do the intended action
    event.preventDefault();

    // make sure we're only performing this if its an <li> tag or a child of one
    var target = event.target;
    var parent = event.target.parentNode;

    // Bump up to the LI if it's registered the SPAN
    if (target.nodeName === 'SPAN' && parent.nodeName === 'LI') {
        target = parent;
    }
    
    // Make sure we are dealing with the LI
    if (target.nodeName !== 'LI') return;

    // get the previously selected tab
    const previous = $(this).find(`[aria-selected='true']`);

    // select the new tab and show the panel
    $(target).attr('aria-selected', true);
    $(`#${$(target).attr('aria-controls')}`).removeClass('hidden');

    // unselect the old tab and hide the panel
    $(previous).attr('aria-selected', false);
    $(`#${$(previous).attr('aria-controls')}`).addClass('hidden');
});

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