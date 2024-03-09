// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Experience Points
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

const experience_table = {
    1:	0,      2:	300,    3:	900,    4:	2700,
    5:	6500,   6:	14000,  7:	23000,  8:	34000,
    9:	48000,  10:	64000,  11:	85000,  12:	100000,
    13:	120000, 14:	140000, 15:	165000, 16:	195000,
    17:	225000, 18:	265000, 19:	305000, 20:	355000,
};

function get_level(experience) {
    let previous = undefined;

    for (const level in experience_table) {
        if (experience < experience_table[level]) {
            return { level: previous, threshold: experience_table[level] };
        }

        previous = level;
    }

    return { level: previous, threshold: 0 };
}

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Template Character Sheet
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

const Character = {
    'appearance':        './img/jorgrim.png',
    'name':              'Jorgrim',
    'player_name':       'Cappy',
    'health': {
        'temp':          0,
        'current':       65,
        'maximum':       121,
    },
    'experience':        125000,
    'classes': [
        {
            "name":      'Fighter',
            "archetype": 'Rune Knight',
            "level":     11
        },
        {
            "name":      'Monk',
            "archetype": '',
            "level":     2
        },
    ],
};

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Header
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

// ----------------------------------------
// 1. Identity
// ----------------------------------------

$('img#appearance').attr('src', Character['appearance']);
$('ins#name').text(Character['name']);
$('ins#player_name').text(Character['player_name']);

// ----------------------------------------
// 2. Progression
// ----------------------------------------

// 2a. Health
let health_current = Character['health']['current'];
let health_maximum = Character['health']['maximum'];
let health_percent = Math.floor((health_current / health_maximum) * 100);
$('#health.gauge').css('--pct', `${health_percent}%`);
$('#health.gauge label span:nth-of-type(2)').text(`${health_percent}%`);
$('#health.gauge label span:nth-of-type(3)').text(`${health_current} / ${health_maximum}`);

// 2b. Experience
let experience_current = Character['experience'];
let { level, threshold } = get_level(experience_current);
let experience_percent = Math.floor((experience_current / threshold) * 100);
$('#experience.gauge').css('--pct', `${experience_percent}%`);
$('#experience.gauge label span:nth-of-type(1)').text(`Level ${level}`);
$('#experience.gauge label span:nth-of-type(2)').text(`${experience_percent}%`);
$('#experience.gauge label span:nth-of-type(3)').text(`${experience_current} / ${threshold}`);

// 2c. Classes
Character['classes'].forEach((cls) => {
    let gauge = $($('#template_gauge_class').html());
    gauge.addClass(`gauge__${cls.name.toLowerCase()}`);
    gauge.css('--pct', `${Math.floor((cls.level / level) * 100)}%`)
    gauge.find('label > span:nth-child(1)').text(cls.name);
    gauge.find('label > span:nth-child(3)').text(cls.level);
    $('.header__progression').append(gauge);
});