// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Tabs & Panels
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join(";");
}

function deserialize(str) {
    let obj = {};
    
    for (var p in str.split(";")) {
        var { key, value } = p.split('=');
        obj[key] = value;
    }

    return obj;
}

class Cookie {
  static get(name) {
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie;
    let value = null;

    const startIndex = cookie.indexOf(cookieName);
    if (startIndex > -1) {
      let endIndex = cookie.indexOf(';', startIndex);
      if (endIndex == -1) {
        endIndex = cookie.length;
      }
      value = decodeURIComponent(
        cookie.substring(startIndex + name.length + 1, endIndex)
      );
    }
    return value;
  }

  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`;
    }

    if (path) cookieText += `; path=${path}`;
    if (domain) cookieText += `; domain=${domain}`;
    if (secure) cookieText += `; secure`;

    document.cookie = cookieText;
  }

  static remove(name, path, domain, secure) {
    Cookie.set(name, '', new Date(0), path, domain, secure);
  }
}

let user_interacted = [];

$(document).ready(function() {
    //$('#dialog__editor')[0].showModal();
    // hide all panels
    $(`main [id^="panel__"]`).hide();
    
    let active = Cookie.get('active') ?? 'attributes';

    $(`[data-panel="${active}"]`).addClass('active');
    $(`#panel__${active}`).show();

    const width = $(window).width();

    $('ul[collapsable]').each(function() {
        if (width <= 512) {
            $(this).addClass('collapsed');
        }
    });
});

$('#nav__main > *').click(function() {
    const panel = $(this).data('panel');
    Cookie.set('active', panel);

    // swap the active class on the tabs
    $('#nav__main .active').removeClass('active');
    $(this).addClass('active');

    $(`main [id^="panel__"]`).hide();
    $(`#panel__${panel}`).show();
});

$('ul[collapsable] .heading').click(function() {
    const ul = $(this).parent('ul');

    user_interacted.push(ul[0]);

    if ($(ul).hasClass('collapsed')) {
        $(ul).removeClass('collapsed');
    } else {
        $(ul).addClass('collapsed');
    }
});

$(window).on('resize', function() {
    const width = $(this).width();
    
    $('ul[collapsable]').each(function() {
        if (user_interacted.includes(this)) {
            return;
        }

        if (width <= 512) {
            $(this).addClass('collapsed');
        } else {
            $(this).removeClass('collapsed');
        }
    });
});