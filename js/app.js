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

function collapsable_on_click() {
    if (!user_clicked.includes(this)) {
        user_clicked.push(this);
    }

    $(this).parent('[collapsable]').toggleClass('collapsed');
}

$('[collapsable] > header').on('click', collapsable_on_click);
$('[collapsable] > .heading').on('click', collapsable_on_click);

$(`header img`).click(function() {
    $(this).closest('header').toggleClass('condensed');
});

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Section
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

$('[data-section]').on('click', function() {
    const section = $(this).data('section');

    // store the last clicked section in cookies
    Cookie.set('section', section);

    // toggle the active section on the navbar
    $(`[data-section]`).removeClass('active');
    $(this).addClass('active');

    // toggle the section to be displayed
    $(`main [id*=section__]`).not(`#section__${section}`).addClass('hidden');
    $(`#section__${section}`).removeClass('hidden');
})

$(function() {
    // get the active section from cookies or default
    const section = Cookie.get('section') ?? 'attributes';

    // toggle the active section on the navbar
    $(`[data-section]`).removeClass('active');
    $(`[data-section='${section}']`).addClass('active');

    // toggle the section to be displayed
    $(`main [id*=section__]`).not(`#section__${section}`).addClass('hidden');
    $(`#section__${section}`).removeClass('hidden');
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