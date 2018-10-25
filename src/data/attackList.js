import { getEnvModifier, getTypeModifier } from '../views/Game/utils';

export default {
    agility: {
        power: 0,
        type: 'psychic',
        cat: null,
        accuracy: 1000,
        range: { pattern: 'self' },
        special: { specialType: 'stat change', specialEffect: 'speed-attacker', amt: 1 },
        handleAttack: (...args) => {
            return calcEffect( args[2] )
        }
    },
    aquaTail: {
        power: 90,
        type: 'water',
        cat: 'physical',
        accuracy: 90,
        range: { pattern: 'plus', distance: 1 },
        handleAttack: (...args) => {
            return calcDamage( args );
        }
    },
    bite: {
        power: 65,
        type: 'dark',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'plus', distance: 1 },
        special: { specialType: 'status', specialEffect: 'flinch', chance: 10 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    bubble: {
        power: 20,
        type: 'water',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'status', specialEffect: 'paralyze', chance: 10 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    bulletSeed: {
        power: 20,
        type: 'grass',
        cat: 'special',
        accuracy: 75,
        range: { pattern: 'square', distance: 1 },
        repeat: 3,
        handleAttack: (...args) => {
            return calcDamage( args );
        }
    },
    charm: {
        power: 0,
        type: 'normal',
        cat: null,
        accuracy: 1000,
        range: { pattern: 'square', distance: 1 },
        special: { specialType: 'stat change', specialEffect: 'atk-defender', amt: -20 },
        handleAttack: (...args) => {
            return calcEffect( args[2] );
        }
    },
    discharge: {
        power: 80,
        type: 'electric',
        cat: 'special',
        accuracy: 90,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'status', specialEffect: 'paralyze', chance: 30 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    earthquake: {
        power: 120,
        type: 'ground',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'area', distance: 2 },
        handleAttack: (...args) => {
            return calcDamage( args );
        }
    },
    ember: {
        power: 40,
        type: 'fire',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 1 },
        special: { specialType: 'status', specialEffect: 'burn', chance: 10 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    energyBall: {
        power: 90,
        type: 'grass',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'stat', specialEffect: 'sdef-defender', amt: 3 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    fireFang: {
        power: 65,
        type: 'fire',
        cat: 'physical',
        accuracy: 95,
        range: { pattern: 'plus', distance: 1 },
        special: { specialType: 'status', specialEffect: 'burn', chance: 10 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    fireSpin: {
        power: 35,
        type: 'fire',
        cat: 'special',
        accuracy: 85,
        range: { pattern: 'square', distance: 1 },
        repeat: 3,
        handleAttack: (...args) => {
            return calcEffect( args[2] );
        }
    },
    flamethrower: {
        power: 90,
        type: 'fire',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'status', specialEffect: 'burn', chance: 10 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    growl: {
        power: 0,
        type: 'normal',
        cat: null,
        accuracy: 1000,
        range: { pattern: 'square', distance: 1 },
        special: { specialType: 'stat change', specialEffect: 'atk-defender', amt: -10 },
        handleAttack: (...args) => {
            return calcEffect( args[2] );
        }
    },
    heatWave: {
        power: 95,
        type: 'fire',
        cat: 'special',
        accuracy: 90,
        range: { pattern: 'area', distance: 2 },
        special: { specialType: 'status', specialEffect: 'burn', chance: 15 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    hydroPump: {
        power: 120,
        type: 'water',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 3 },
        handleAttack: ( ...args ) => {
            return calcDamage( args );
        }
    },
    ironDefense: {
        power: 0,
        type: 'steel',
        cat: null,
        accuracy: 1000,
        range: { pattern: 'self', distance: 1 },
        special: { specialType: 'stat change', specialEffect: 'def-attacker', amt: 20 },
        handleAttack: (...args) => {
            return calcEffect( args[2] );
        }
    },
    nightSlash: {
        power: 70,
        type: 'dark',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'cross', distance: 1 },
        special: { specialType: 'crit', chance: 30 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    razorLeaf: {
        power: 55,
        type: 'grass',
        cat: 'special',
        accuracy: 95,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'crit', chance: 30 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    razorWind: {
        power: 80,
        type: 'normal',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'crit', chance: 30 },
        handleAttack: (...args) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    roar: {
        power: 0,
        type: 'normal',
        cat: null,
        accuracy: 100,
        range: { pattern: 'square', distance: 1 },
        handleAttack: (attacker, defender, attack, ground) => {
            let dirX = 0, dirY = 0;

            if( attacker.coords.x > defender.coords.x )
                dirX = -1
            else
                dirX = 1

            if( attacker.coords.y > defender.coords.y )
                dirY = -1
            else
                dirY = 1


        }
    },
    scratch: {
        power: 40,
        type: 'normal',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'cross', distance: 1 },
        handleAttack: (...args) => {
            return calcDamage( args );
        }
    },
    skullBash: {
        power: 130,
        type: 'normal',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'plus', distance: 2 },
        special: { specialType: 'stat', specialEffect: 'hp-attacker', amt: 10 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    slam: {
        power: 80,
        type: 'normal',
        cat: 'physical',
        accuracy: 75,
        range: { pattern: 'plus', distance: 1 },
        handleAttack: (...args) => {
            return calcDamage( args );
        }
    },
    slash: {
        power: 70,
        type: 'normal',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'cross', distance: 1 },
        special: { specialType: 'crit', chance: 30 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    sleepPowder: {
        power: 0,
        type: 'grass',
        cat: null,
        accuracy: 75,
        special: { specialType: 'status', specialEffect: 'sleep', chance: 100 },
        handleAttack: (...args) => {
            return calcEffect( args );
        }
    },
    solarBeam: {
        power: 120,
        type: 'grass',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 3 },
        special: { specialType: 'rest', specialEffect: 'paralyze', chance: 100 },
        handleAttack: (...args) => calcDamage( args )
    },
    surf: {
        power: 95,
        type: 'water',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'area', distance: 3 },
        handleAttack: (...args) => calcDamage( args )
    },
    swordsDance: {
        power: 0,
        type: 'normal',
        cat: null,
        accuracy: 1000,
        range: { pattern:  'self' },
        special: { specialType: 'stat change', specialEffect: 'atk-attacker', amt: 20 },
        handleAttack: (...args) => calcEffect( args[2] )
    },
    tackle: {
        power: 40,
        type: 'normal',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'plus', distance: 1 },
        handleAttack: (...args) => calcDamage( args )
    },
    thunderbolt: {
        power: 90,
        type: 'electric',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'status', specialEffect: 'paralyze', chance: 10 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    thunderShock: {
        power: 40,
        type: 'electric',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'status', specialEffect: 'paralyze', chance: 10 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    thunderWave: {
        power: 0,
        type: 'electric',
        cat: null,
        accuracy: 100,
        range: { pattern: 'square', distance: 1 },
        special: { specialType: 'status', specialEffect: 'paralyze', chance: 100 },
        handleAttack: (...args) => calcEffect( args )
    },
    venoshock: {
        power: 65,
        type: 'poison',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 2 },
        special: { specialType: 'stat change', specialEffect: 'hp-defender', amt: 5 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    voltTackle: {
        power: 120,
        type: 'electric',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'plus', distance: 2 },
        special: { specialType: 'stat change', specialEffect: 'hp-attacker', amt: 10 },
        handleAttack: ( ...args ) => {
            let damage = calcDamage( args );
            let effect = calcEffect( args[2] );

            return { ...damage, ...effect };
        }
    },
    waterGun: {
        power: 40,
        type: 'water',
        cat: 'special',
        accuracy: 100,
        range: { pattern: 'square', distance: 1 },
        handleAttack: (...args) => calcDamage( args )
    },
    withdraw: {
        power: 0,
        type: 'water',
        cat: null,
        accuracy: 1000,
        range: { pattern: 'self' },
        special: { specialType: 'stat change', specialEffect: 'def-attacker', amt: 10 },
        handleAttack: (...args) => calcEffect( args[2] )
    },
    wingAttack: {
        power: 60,
        type: 'flying',
        cat: 'physical',
        accuracy: 100,
        range: { pattern: 'cross', distance: 1 },
        handleAttack: (...args) => calcDamage( args )
    }
};

function calcDamage([ attacker, defender, attack, ground ]) {
    const { special: { specialType } = '' } = attack

    const level = 50
        , power = attack.power
        , a = attack.cat === 'physical' ? attacker.atk : attacker.satk
        , d = attack.cat === 'physical' ? defender.def : defender.sdef;

    const environment = getEnvModifier( attacker.types, ground );

    let critChance = 15;
    if( specialType === 'crit' ) critChance = attack.special.chance;
    const critical = ( Math.floor( Math.random() * 100 ) < critChance ) ? 1.5 : 1;

    let STAB = 1;
    if( attacker.types.findIndex( type => type === attack.type ) >= 0 ) STAB = 1.5;

    const type = getTypeModifier( defender.types, attack.type );

    const modifier = environment * critical * STAB * type;

    return {
        damage: ( ( ( ( 2 * level / 5 ) + 2 ) * power * ( a / d ) / 50 ) + 2 ) * modifier,
        critical: critical > 1,
        type,
        typeOfAttack: 'damage'
    };
};

function calcEffect( attack ) {
    const {
        special: {
            specialType,
            specialEffect,
            chance = 0,
            amt = 0
        } = ''
    } = attack;
    let effect = '';
    let effectInit = false;
    let effectTarget = 'defender';

    if( specialType === 'status' ) effect = specialEffect;
    if( specialType === 'stat change' ) {
        effect = specialEffect.split('-')[0];
        effectTarget = specialEffect.split('-')[1];
    };

    if( Math.floor( Math.random() * ( 100 - 1 + 1 ) + 1 ) <= chance ) {
        effectInit = true;
    };

    return {
        specialType, // 'status' or 'stat change'
        effect,
        effectInit,
        effectTarget,
        amt
    };
};