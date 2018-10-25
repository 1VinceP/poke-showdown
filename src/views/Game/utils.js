import attackList from '../../data/attackList';

export function findCoords( id ) {
    let regex = /(.*),(.*)/g
    let result = regex.exec( id );
    let x = result[1];
    let y = result[2];

    return { x: x * 1, y: y * 1 }
};

export function getMovement( player ) {
    return createSquare( player.speed, player.coords )
};

export function getAttackRange( player, selectedAttack ) {
    const { range: { pattern, distance } } = attackList[selectedAttack];

    switch( pattern ) {
        case 'square':
            return createSquare( distance, player.coords );
        case 'area':
            return createSquare( distance, player.coords );
        case 'cross':
            return createCross( distance, player.coords );
        case 'plus':
            return createPlus( distance, player.coords );
        case 'self':
            return [{x: player.coords.x, y: player.coords.y}];

        default: return []
    }
};

function createSquare( size, { x, y } ) {
    let arr = [];

    for( let i = 1; i <= size; i++  ) {
        arr.push({ x, y: y - i }); // NORTH
        arr.push({ x: x + i, y }); // EAST
        arr.push({ x, y: y + i }); // SOUTH
        arr.push({ x: x - i, y }); // WEST

        arr.push({ x: x - i, y: y - i }); // NORTH-WEST
        arr.push({ x: x + i, y: y - i }); // NORTH-EAST
        arr.push({ x: x + i, y: y + i }); // SOUTH-EAST
        arr.push({ x: x - i, y: y + i }); // SOUTH-WEST

        if( size >= 2 ) {
            for( let j = 1; j <= size; j++ ) {
                arr.push({ x: x - j, y: y - i }); // NORTH-WESTISH
                arr.push({ x: x + j, y: y - i }); // NORTH-EASTISH
                arr.push({ x: x - j, y: y + i }); // SOUTH-WESTISH
                arr.push({ x: x + j, y: y + i }); // SOUTH-EASTISH
            }
        }
    };

    return arr
};

function createCross( size, { x, y } ) {
    let arr = [];

    for( let i = 1; i <= size; i++ ) {
        arr.push({ x: x - i, y: y - i }); // NORTH-WEST
        arr.push({ x: x + i, y: y - i }); // NORTH-EAST
        arr.push({ x: x + i, y: y + i }); // SOUTH-EAST
        arr.push({ x: x - i, y: y + i }); // SOUTH-WEST
    };

    return arr;
};

function createPlus( size, { x, y } ) {
    let arr = [];

    for( let i = 1; i <= size; i++ ) {
        arr.push({ x, y: y - i }); // NORTH
        arr.push({ x: x + i, y }); // EAST
        arr.push({ x, y: y + i }); // SOUTH
        arr.push({ x: x - i, y }); // WEST
    };

    return arr;
};

export function getEnvModifier( attackerTypes, ground ) {
    let bonus = 1;

    attackerTypes.forEach( type => {
        if( type === 'fire' ) {
            bonus += ground === 'sand' ? 0.1
            : ground === 'lava' ? 0.15
            : ground === 'water' ? -0.2
            : ground === 'snow' || ground === 'ice' ? -0.1
            : null
        }
        else if( type === 'grass' ) {
            bonus += ground === 'forest' ? 0.15
            : ground === 'lava' ? -0.2
            : null
        }
        else if( type === 'water' ) {
            bonus += ground === 'water' ? 0.15
            : ground === 'desert' ? -0.1
            : ground === 'lava' ? -0.15
            : null
        }
    } );

    return bonus;
};

export function getTypeModifier( defenderTypes, attackType) {
    let bonus = 1;

    defenderTypes.forEach( type => {
        // Find weaknesses
        if( weakAgainst[type].find( t => t === attackType ) ) {
            bonus += 0.5;
        };

        // Find strengths
        if( resistantAgainst[type].find( t => t === attackType ) ) {
            bonus -= 0.5;
            if( bonus === 0 ) {
                bonus = 0.25
            }
        };

        // Find if no effect
        if( noEffect[type] ) {
            if( noEffect[type].find( t => t === attackType ) ) {
                bonus = 0;
            };
        };
    } );

    return bonus;
};

const weakAgainst = { // x2 in type column
    bug: [ 'flying', 'rock', 'fire' ],
    dark: [ 'fighting', 'bug', 'fairy' ],
    dragon: [ 'ice', 'dragon', 'fairy' ],
    electric: [ 'ground' ],
    fairy: [ 'poison', 'steel' ],
    fighting: [ 'flying', 'psychic', 'fairy' ],
    fire: [ 'water', 'ground', 'rock' ],
    flying: [ 'electric', 'rock', 'ice' ],
    ghost: [ 'ghost', 'dark' ],
    grass: [ 'fire', 'flying', 'poison', 'bug', 'ice' ],
    ground: [ 'water', 'grass', 'ice' ],
    ice: [ 'fire', 'ground', 'steel', 'rock' ],
    normal: [ 'fighting' ],
    poison: [ 'ground', 'psychic' ],
    psychic: [ 'bug', 'ghost', 'dark' ],
    rock: [ 'fighting', 'ground', 'steel', 'water', 'grass' ],
    steel: [ 'fighting', 'ground', 'fire' ],
    water: [ 'electric', 'grass' ],
};
const resistantAgainst = { // x0.5 in type column
    bug: [ 'fighting', 'ground', 'grass' ],
    dark: [ 'ghost', 'dark' ],
    dragon: [ 'fire', 'water', 'grass', 'electric' ],
    electric: [ 'flying', 'steel', 'electric' ],
    fairy: [ 'fighting', 'bug', 'dark' ],
    fighting: [ 'rock', 'bug', 'dark' ],
    fire: [ 'bug', 'steel', 'fire', 'grass', 'ice', 'fairy' ],
    flying: [ 'fighting', 'bug', 'grass' ],
    ghost: [ 'poison', 'bug' ],
    grass: [ 'water', 'ground', 'grass', 'electric' ],
    ground: [ 'poison', 'rock' ],
    ice: [ 'ice' ],
    normal: [ '' ],
    poison: [ 'fighting', 'poison', 'grass', 'fairy' ],
    psychic: [ 'fighting', 'psychic' ],
    rock: [ 'normal', 'flying', 'poison', 'fire' ],
    steel: [ 'normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy' ],
    water: [ 'steel', 'fire', 'water', 'ice' ],
};
const noEffect = { // x0 in type column
    fairy: [ 'dragon' ],
    flying: [ 'ground' ],
    dark: [ 'psychic' ],
    ghost: [ 'normal', 'fighting' ],
    ground: [ 'electric' ],
    normal: [ 'ghost' ],
    steel: [ 'poison' ]
};