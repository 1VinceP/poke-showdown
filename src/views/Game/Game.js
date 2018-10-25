import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { movePlayer, endTurn, setAction, setPlayerPokemon, addExp, dealDamage, attackUsed, playerKO, setStatusEffect, setStatChange } from '../../redux/gameReducer';
import maps from '../../data/maps';
import Pokemon from '../../pokemon';
import pokeList from '../../data/pokeList';
import attackList from '../../data/attackList';
import { findCoords, getMovement, getAttackRange, getTypeModifier, getEnvModifier } from './utils';
import './game.css';

class Game extends Component {
    state = {
        blankImage: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
        moveCoords: [],
        attackCoords: [],
        attack: '',
        combatLogs: []
    };
    battlefield = maps.desertOasis;

    componentDidUpdate( prevProps ) {
        if( prevProps.action === 'attack' ) {
            for( let i = 1; i <= this.props.playerCount; i++ ) {
                if( this.props['player_' + i].hp < 0 ) {
                    console.log( `${this.props['player_' + i].name} has been knocked out!` )
                    this.props.playerKO( this.props['player_' + i] )
                }
            }

        }

        if( this.props.action === 'move' && !this.state.moveCoords[0] ) {
            this.displayMovement();
        }
        else if( this.props.action !== 'move' && this.state.moveCoords[0] ) {
            this.setState({ moveCoords: [] });
        };

        if( this.props.action !== 'attack' && this.state.attackCoords[0] ) {
            this.setState({ attackCoords: [] });
        };
    };

    onTileClick( e ) {
        const { action, turn } = this.props
        let player = this.props[this.props.turn]
        ////////// find and log coords //////////
        let coords = findCoords( e.target.id )

        // Enable player movement when player is clicked
        if( e.target.src === this.props[turn].image && action !== 'move' ) {
            this.props.setAction( 'move' )
        }
        else if( player.canAttack && e.target.src === this.props[turn].image && action === 'move' ) {
            this.props.setAction( null )
        }

        // Launch player attack if in range
        let targetName = document.getElementById( `${coords.x},${coords.y}` ).name
        let target = targetName === this.props.player_1.who ? this.props.player_1
                    : targetName === this.props.player_2.who ? this.props.player_2
                    : targetName === this.props.player_3.who ? this.props.player_3
                    : targetName === this.props.player_4.who ? this.props.player_4
                    : null;
        let ground = document.getElementById( `${player.coords.x},${player.coords.y}` ).className.split(' ')[1];
        if( action === 'attack' && e.target.style.border.split(' ')[2] === 'red' ) {
            if( attackList[this.state.attack].range.pattern === 'area' ) {
                if ( document.getElementsByClassName( 'tile' ).player_1.style.border.split(' ')[2] === 'red' )
                    this.launchAttack( this.props.player_1, this.state.attack, ground );
                if ( document.getElementsByClassName( 'tile' ).player_2.style.border.split(' ')[2] === 'red' )
                    this.launchAttack( this.props.player_2, this.state.attack, ground );
                if ( document.getElementsByClassName( 'tile' ).player_3.style.border.split(' ')[2] === 'red' )
                    this.launchAttack( this.props.player_3, this.state.attack, ground );
                if ( document.getElementsByClassName( 'tile' ).player_4.style.border.split(' ')[2] === 'red' )
                    this.launchAttack( this.props.player_4, this.state.attack, ground );
            }
            else if( target ) {
                this.launchAttack( target, this.state.attack, ground );
            }
        };

        ////////// if tile is empty, and action is 'move', move player //////////
        if( e.target.src === 'http://localhost:3000/assets/move.png' && action === 'move' ) {
            this.props.movePlayer( this.props.turn, coords.x * 1, coords.y * 1 );
            this.props.setAction( null );
        };

    };

    // Get the available tiles to move to and set coords on state
    displayMovement() {
        this.setState({ moveCoords: getMovement( this.props[this.props.turn] ) });
    };

    // Change action to attack, set available target coords and attack name to state
    setAttack( attack ) {
        this.props.setAction( 'attack' )
        this.setState({
            attackCoords: getAttackRange( this.props[this.props.turn], attack ),
            attack
        });
    };

    // Determine attack damage based on attacker and defender stats and locations
    launchAttack( defender, attack, ground ) {
        let attacker = this.props[this.props.turn]
        attack = attackList[ attack ];

        const { repeat = 1 } = attack
        let hit = false;
        let logs = [];
        let message = '';
        for( let i = 0; i < repeat; i++ ) {
            let result = attack.handleAttack( attacker, defender, attack, ground );
            console.log({ result });
            if( Math.floor( Math.random() * ( 100 - 1 + 1 ) + 1 ) <= attack.accuracy ) {
                ///// HANDLE DAMAGE /////
                if( result.damage ) {
                    hit = true;
                    this.props.dealDamage( attacker.who, defender.who, Math.round((result.damage + 0.00001) * 100) / 100 ); // Round damage to 2 decimal places
                    message = `${attacker.name} attacked with ${this.state.attack} and dealt ${Math.round( ( result.damage + 0.00001 ) * 100) / 100} to ${defender.name}`;
                    if( result.type > 1 ) message += '. It was super effective';
                    if( result.type < 1 ) message += '. It was not very effective...';
                    if( result.type === 0 ) message += '. It had no effect';
                    if( result.critical && result.type > 0 ) message += '. IT WAS A CRITICAL HIT';
                };

                ///// HANDLE EFFECT /////
                if( result.specialType === 'status' && result.effectInit ) {
                    message += `. ${defender.name} was effected by ${result.effect}`;
                    this.props.setStatusEffect( defender.who, result.effect );
                }
                else if( result.specialType === 'stat change' ) {
                    let target = result.effectTarget === 'defender' ? defender : attacker
                    message += `. ${target.name} was had its ${result.effect} reduced by ${result.amt}%`
                    this.props.setStatChange( target, result.effect, result.amt )
                }

                logs.unshift( message );
            }
            else {
                logs.unshift( `${attacker.name} attacked with ${this.state.attack} and missed` );
            };

        };
        this.props.setAction( null );
        this.props.attackUsed( attacker.who );
        if( hit ) {
             this.props.addExp( this.props.turn, this.props[this.props.turn].exp + 5 ); // Increase exp by 5
        };

        let newLogs = this.state.combatLogs;
        for( let i = 0; i < logs.length; i++ ) {
            newLogs.unshift( logs[i] );
        };
        this.setState({
            combatLogs: newLogs
        });
    };

    // Map over battlefield rows
    createMap() {
        return this.battlefield.map( (item, i) => {
            return this.createRow( i )
        } )
    };

    // Map over row values and assign classNames, styles  and images based on content
    // Assign tile coords to tile id
    createRow( y ) {
        const { player_1, player_2, player_3, player_4 } = this.props

        return this.battlefield[y].map( (item, x) => {
            let environment = item === 0 ? 'field'
                            : item === 1 ? 'sand'
                            : item === 2 ? 'water'
                            : item === 3 ? 'forest'
                            : item === 4 ? 'mountain'
                            : item === 5 ? 'cave'
                            : item === 6 ? 'snow'
                            : item === 7 ? 'ice'
                            : item === 8 ? 'lava'
                            : null;

            let image = this.state.blankImage;
            let border = '1px solid white';
            let name = ''

            // Place movement images if action === 'move'
            if( this.state.moveCoords.findIndex( coord => coord.x === x && coord.y === y ) >= 0 ) {
                image = 'assets/move.png';
            };
            // Place attack borders if action === 'attack'
            if( this.state.attackCoords.findIndex( coord => coord.x === x && coord.y === y ) >= 0 ) {
                border = '2px solid red'
            };
            // Place player image if player coords are equal to tile coords
            if( player_1.coords.y === y && player_1.coords.x === x ) {
                image = player_1.image;
                name = 'player_1'
            }
            else if( player_2.coords.y === y && player_2.coords.x === x ) {
                image = player_2.image;
                name = 'player_2'
            }
            else if( player_3.coords.y === y && player_3.coords.x === x ) {
                image = player_3.image;
                name = 'player_3'
            }
            else if( player_4.coords.y === y && player_4.coords.x === x ) {
                image = player_4.image;
                name = 'player_4'
            };

            return (
                <img
                    key={x}
                    id={`${x},${y}`}
                    className={`tile ${environment}`}
                    style={{border}}
                    onClick={e => this.onTileClick( e )}
                    src={image}
                    name={name}
                />
            )
        } )
    };

    render() {
        let num = this.props.turn.split('_')[1] * 1;
        let player = this.props[this.props.turn];

        let attacks = player.attacks.map( ( attack, i ) => {
            return (
                <div key={i}>
                    <button onClick={() => this.setAttack( _.camelCase( attack ) )} disabled={!player.canAttack}>{attack}</button>
                </div>
            )
        } );

        let combatLogs = this.state.combatLogs.map( (log, i) => {
            return <p key={i}>{log}<hr /></p>
        } );

        return (
            <div className='game-main'>
                <div className='game-map'>
                    {this.createMap()}
                </div>

                <div className='game-sidebar'>
                    <section className='sidebar-top'>
                        <h1>{this.props.turn.split('_').join(' ').toUpperCase()} - {player.name}</h1>
                        <p>{player.hp} / {player.starting_hp} HP</p>
                        <p>Exp: {player.exp} / {player.expToEvolve}</p>

                        {/* <button onClick={() => this.props.setAction( 'move' )} >Move</button> */}
                        {attacks}
                        { player.evolvesTo &&
                            <button
                                onClick={() =>
                                    this.props.setPlayerPokemon( this.props.turn, new Pokemon( pokeList[player.evolvesTo], player.exp ) )
                                }
                                disabled={player.exp < player.expToEvolve}
                            >
                                Evolve!
                            </button>
                        }
                        <button onClick={() => this.props.addExp( this.props.turn, player.exp + 10 )} >Add Exp</button>
                        <button onClick={() => this.props.endTurn( num + 1, this.props.playerCount )} >End turn</button>
                    </section>

                    <section className='sidebar-bottom'>
                        {combatLogs}
                    </section>
                </div>
                <div className='game-bottom'></div>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { turn, playerCount, action, player_1, player_2, player_3, player_4 } = state.game;

    return {
        turn,
        playerCount,
        action,
        player_1,
        player_2,
        player_3,
        player_4
    };
}

export default connect(
    mapStateToProps,
    { movePlayer, endTurn, setAction, setPlayerPokemon, addExp, dealDamage, attackUsed, playerKO, setStatusEffect, setStatChange }
)(Game);