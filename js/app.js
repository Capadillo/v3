import { Cookie } from './Cookie.js';

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Service Worker
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("../service.js");
}

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Accordian
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

$('[data-accordian]').on('click', function() {
    const group = $(this).data('accordian');
    const parent = $(this);
    
    $(`[data-accordian=${group}]`).each(function() {
        if ($(this)[0] === parent[0] && $(this).next('li').is(':visible') == false) {
            $(this).next('li').removeClass('hidden');
        } else {
            $(this).next('li').addClass('hidden');
        }
    });
});

$(function() {
    $('[data-accordian] + li').addClass('hidden');
});

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Collapsable
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

let user_clicked = [];

$('[collapsable] > header').on('click', function() {
    if (!user_clicked.includes(this)) {
        user_clicked.push(this);
    }

    $(this).parent('[collapsable]').toggleClass('collapsed');
});

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Panel
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

$('[data-panel]').on('click', function() {
    const panel = $(this).data('panel');

    // store the last clicked panel in cookies
    Cookie.set('active_panel', panel);

    // toggle the active panel on the navbar
    $(`[data-panel]`).removeClass('active');
    $(this).addClass('active');

    // toggle the panel to be displayed
    $(`main [id*=panel__]`).not(`#panel__${panel}`).addClass('hidden');
    $(`#panel__${panel}`).removeClass('hidden');
})

$(function() {
    // get the active panel from cookies or default
    const panel = Cookie.get('active_panel') ?? 'attributes';

    // toggle the active panel on the navbar
    $(`[data-panel]`).removeClass('active');
    $(`[data-panel='${panel}']`).addClass('active');

    // toggle the panel to be displayed
    $(`main [id*=panel__]`).not(`#panel__${panel}`).addClass('hidden');
    $(`#panel__${panel}`).removeClass('hidden');
})

let previous_width = 0;
const breakpoint = 512;

function toggle_collapsable() {
    const width = window.innerWidth;

    let action = "";

    if (width < breakpoint && (width < previous_width || previous_width == 0)) {
        action = "close";
    }

    $(`[collapsable]`).each((_, element) => {
        if (user_clicked.includes(element)) return;
        if (action == "close") {
            $(element).addClass('collapsed');
        } else {
            $(element).removeClass('collapsed');
        }
    });
}

$(window).resize(toggle_collapsable);
$(toggle_collapsable);