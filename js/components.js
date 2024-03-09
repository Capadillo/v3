class Attribute
{
    static Strength     = `attr_strength`;
    static Dexterity    = `attr_dexterity`;
    static Constitution = `attr_constitution`;
    static Intelligence = `attr_intelligence`;
    static Wisdom       = `attr_wisdom`;
    static Charisma     = `attr_charisma`;

    static ALL        = [
        Attribute.Strength,
        Attribute.Dexterity,
        Attribute.Constitution,
        Attribute.Intelligence,
        Attribute.Wisdom,
        Attribute.Charisma,
    ];
}

class Component
{
    static ability_score = `ctype_ability_score`;
    static saving_throw  = `ctype_saving_throw`;
    static skill         = `ctype_skill`;

    constructor(data) {
        this.type     = data[`type`]     ?? null;
        this.name     = data[`name`]     ?? `undefined`;
        this.value    = data[`value`]    ?? null;
        this.override = data[`override`] ?? false;
    }

    static findAll(list, search = {}) {
        var found_components = [];

        list.forEach((item) => {
            item.components.forEach((component) => {
                if ('type' in search && component.type !== search['type']) {
                    return;
                }

                if ('name' in search && component.name !== search['name']) {
                    return;
                }

                if ('override' in search && component.override !== search['override']) {
                    return;
                }

                found_components.push({
                    'ref': component,
                    'src': item
                });
            });
        });

        return found_components;
    }
}

// --------------------------------------------------
// Built In Components
// --------------------------------------------------

const PRESET = {
    override_strength_25: new Component({
        type: Component.ability_score,
        name: Attribute.Strength,
        value: 25,
        override: true
    }),
    
    // -----------------------------------
    // +1 to < Ability Score >
    // -----------------------------------

    add_strength: new Component({
        type: Component.ability_score,
        name: Attribute.Strength,
        value: 1
    }),
    add_dexterity: new Component({
        type: Component.ability_score,
        name: Attribute.Dexterity,
        value: 1
    }),
    add_constitution: new Component({
        type: Component.ability_score,
        name: Attribute.Constitution,
        value: 1
    }),
    add_intelligence: new Component({
        type: Component.ability_score,
        name: Attribute.Intelligence,
        value: 1
    }),
    add_wisdom: new Component({
        type: Component.ability_score,
        name: Attribute.Wisdom,
        value: 1
    }),
    add_charisma: new Component({
        type: Component.ability_score,
        name: Attribute.Charisma,
        value: 1
    }),
};

const example_features = [
    {
        "title": "Belt of Giant Strength",
        "description": "Gives you massive strength. Override strength to 25.",
        "components": [
            {
                'type': 'ctype_ability_score',
                'name': Attribute.Strength,
                'value': 25,
                'override': true
            }
        ]
    },
    {
        "title": "Circlet of Wisdom",
        "description": "Makes you a little more wise. +2 to Wisdom.",
        "components": [
            PRESET.add_wisdom,
            PRESET.add_wisdom
        ]
    },
    {
        "title": "Ability Score Increase",
        "description": "Increase one ability score by 2 or two by 1.",
        "components": [
            PRESET.add_strength,
            PRESET.add_constitution
        ]
    },
];

// --------------------------------------------------
// Example Update Attribute Script
// --------------------------------------------------

let value = 0;//base_value

function update_ability_score(value, features, search) {
    let addition_components = Component.findAll(
        features,
        {...search, 'override': false}
    );

    addition_components.forEach((component) => {
        value += component.ref.value;
    });

    let override_components = Component.findAll(
        features,
        {...search, 'override': true}
    );

    if (override_components.length > 0) {
        let current = override_components[0].ref;

        override_components.forEach((component) => {
            if (component.ref.value > current.value) {
                current = component.ref;
            }
        });

        if (current.value >= value) {
            value = current.value;
        }
    }

    return value;
}

const strength = update_ability_score(10, example_features, {
    'type': Component.ability_score,
    'name': Attribute.Strength
});

console.log('Example Strength Results:', strength);
