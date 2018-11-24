const initialState = {
    playerCount: 2,
    turn: 'player_1',
    action: null,

    player_1: {
        coords: { x: 0, y: 0 },
        attacks: [],
        who: 'player_1'
    },
    player_2: {
        coords: { x: 1, y: 0 }, // { x: 14, y: 0 }
        attacks: [],
        who: 'player_2'
    },
    player_3: {
        coords: { x: 0, y: 1 }, // { x: 0, y: 13 }
        attacks: [],
        who: 'player_3'
    },
    player_4: {
        coords: { x: 1, y: 1 }, // { x: 14, y: 13 }
        attacks: [],
        who: 'player_4'
    },
    player_5: {
        coords: { x: 0, y: 2 },
        attacks: [],
        who: 'player_4'
    },
    player_6: {
        coords: { x: 1, y: 2 },
        attacks: [],
        who: 'player_4'
    },

    teams: {
        player_1: [
            { name: '', exp: '', hp: '' }
        ],
        player_2: [
            { name: '', exp: '', hp: '' }
        ],
        player_3: [
            { name: '', exp: '', hp: '' }
        ],
        player_4: [
            { name: '', exp: '', hp: '' }
        ],
    }
};

const END_TURN = 'END_TURN'
    , MOVE_PLAYER = 'MOVE_PLAYER'
    , SET_PLAYER_POKEMON = 'SET_PLAYER_POKEMON'
    , SET_ACTION = 'SET_ACTION'
    , ADD_EXP = 'ADD_EXP'
    , DEAL_DAMAGE = 'DEAL_DAMAGE'
    , ATTACK_USED = 'ATTACK_USED'
    , PLAYER_KO = 'PLAYER_KO'
    , SET_STATUS_EFFECT = 'SET_STATUS_EFFECT'
    , SET_STAT_CHANGE = 'SET_STAT_CHANGE'
    , SET_PLAYER_COUNT = 'SET_PLAYER_COUNT'

export default ( state = initialState, action ) => {


    switch( action.type ) {
        case END_TURN:
            return {
                ...state,
                turn: action.payload,
                [action.payload]: {
                    ...state[action.payload],
                    canMove: true,
                    canAttack: true
                }
            }
        case MOVE_PLAYER:
            return {
                ...state,
                [action.payload.player]: {
                    ...state[action.payload.player],
                    coords: { x: action.payload.x, y: action.payload.y }
                }
            }
        case SET_PLAYER_POKEMON:
            return {
                ...state,
                [action.payload.player]: {
                    ...action.payload.pokemon,
                    coords: state[action.payload.player].coords,
                    who: state[action.payload.player].who
                }
            }
        case SET_ACTION:
            return { ...state, action: action.payload }
        case ADD_EXP:
            return {
                ...state,
                [action.payload.player]: {
                    ...state[action.payload.player],
                    exp: action.payload.exp
                }
            }
        case DEAL_DAMAGE:
            let damage = state[action.payload.defender].hp - action.payload.damage;
            let total = Math.round( ( damage + 0.00001 ) * 100) / 100
            return {
                ...state,
                [action.payload.defender]: {
                    ...state[action.payload.defender],
                    hp: total
                }
            }
        case ATTACK_USED:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    canAttack: false
                }
            }
        case PLAYER_KO:
            return {
                ...state,
                [action.payload]: { ...initialState[action.payload] }
            }
        case SET_STATUS_EFFECT:
            return {
                ...state,
                [action.payload.player]: {
                    ...state[action.payload.player],
                    status: action.payload.status
                }
            }
        case SET_STAT_CHANGE:
            return {
                ...state,
                [action.payload.player]: {
                    ...state[action.payload.player],
                    [action.payload.stat]: action.payload.change
                }
            }

        case SET_PLAYER_COUNT:
            return {
                ...state,
                playerCount: action.payload
            }

        default:
            return state;
    };
};

export function endTurn( next, playerCount ) {
    if( next > playerCount )
        next = 1

    return {
        type: END_TURN,
        payload: 'player_' + next
    }
}

export function movePlayer( player, x, y ) {

    return {
        type: MOVE_PLAYER,
        payload: { player, x, y }
    }
};

export function setPlayerPokemon( player, pokemon ) {

    return {
        type: SET_PLAYER_POKEMON,
        payload: { player, pokemon }
    }
};

export function setAction( action ) {

    return {
        type: SET_ACTION,
        payload: action
    }
};

export function addExp( player, exp ) {

    return {
        type: ADD_EXP,
        payload: { player, exp }
    }
};

export function dealDamage( attacker, defender, damage ) {

    return {
        type: DEAL_DAMAGE,
        payload: { attacker, defender, damage }
    }
};

export function attackUsed( player ) {

    return {
        type: ATTACK_USED,
        payload: player
    }
};

export function playerKO( player ) {

    return {
        type: PLAYER_KO,
        payload: player
    }
};

export function setStatusEffect( player, status ) {

    return {
        type: SET_STATUS_EFFECT,
        payload: { player, status }
    }
};

export function setStatChange( player, stat, statChange ) {
    let change = player[stat];

    if( stat === 'speed' && player.speed > 1 && player.speed < 7 ) {
        change = player.speed += statChange;
    }
    else if( stat === 'hp' ) {
        change = player.hp - ( player.starting_hp / statChange )
    }
    else if( player[stat] > player['starting_' + stat] / 2 || player[stat] < player['starting_' + stat] * 1.5 ) {
        change = player[stat] + ( player[stat] / statChange );
    };

    return {
        type: SET_STAT_CHANGE,
        payload: { player: player.who, stat, change }
    }
};

export function setPlayerCount( count ) {

    return {
        type: SET_PLAYER_COUNT,
        payload: count
    }
};