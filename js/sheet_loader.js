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
    'alignment':        "Lawful Neutral",
    'background':       "Soldier",
    'faith':            "Atheist",
    'gender':           "Male",
    'inspiration':      false,
    'race':             "Stout Gnome",
    'proficiencies': {
        'armour':       [ 'Heavy' ],
        'languages':    [ 'Common', 'Gnome', 'Dwarven' ],
        'weapons':      [ 'Simple', 'Martial' ],
        'tools':        [ 'Mason\'s Tools' ]
    }
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

// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
// Side Bar
// =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

// ----------------------------------------
// 1. Details
// ----------------------------------------

$(`#character__alignment`).text(Character['alignment']);
$(`#character__background`).text(Character['background']);
$(`#character__faith`).text(Character['faith']);
$(`#character__gender`).text(Character['gender']);
$(`#character__inspiration`).text(Character['inspiration'] ? 'Yes' : 'No');
$(`#character__proficiency_bonus`).text(Math.ceil(1 + (level / 4)));
$(`#character__race`).text(Character['race']);

// ----------------------------------------
// 2. Proficiencies
// ----------------------------------------

const prof = Character['proficiencies'];
$(`#character__proficiencies_armor`).text(prof['armour'].join(', '));
$(`#character__languages`).text(prof['languages'].join(', '));
$(`#character__proficiencies_weapons`).text(prof['weapons'].join(', '));
$(`#character__proficiencies_tools`).text(prof['tools'].join(', '));