import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayerPokemon, setPlayerCount } from '../../redux/gameReducer';
import { Link } from 'react-router-dom';
import Pokemon from '../../pokemon';
import pokeList from '../../data/pokeList';
import './team.css';

class Teams extends Component {
    state = {
        player_1: 'bulbasaur',
        player_2: 'bulbasaur',
        player_3: 'bulbasaur',
        player_4: 'bulbasaur',
        player_5: 'bulbasaur',
        player_6: 'bulbasaur'
    };

    evolve( pokemon ) {
        this.props.setPlayerPokemon( 'player_1', new Pokemon( pokeList[pokemon], 40 ) )
    };

    handleChange({ name, value }) {
        this.setState({
            [name]: value
        })
    };

    handlePlayerCount( val ) {
        const { playerCount, setPlayerCount } = this.props;

        if( val === 'add' && playerCount <= 6 )
            setPlayerCount( playerCount + 1 );
        else if( val === 'remove' && playerCount >= 2 )
            setPlayerCount( playerCount - 1 );
        else
            alert( 'You cannot have fewer than two players or more than six' );


        // if( val === 'add' ) {
        //     this.props.setPlayerCount( ++playerCount )
        //     // this.setState({
        //     //     playerCount: ++this.state.playerCount
        //     // });
        // }
        // else if( val === 'remove' && this.state.playerCount > 2 ) {

        //     // this.setState({
        //     //     playerCount: --this.state.playerCount
        //     // });
        // }
        // else {
        //     alert( 'You cannot have fewer than two players' );
        // };
    };

    renderPlayerSelect( options ) {
        let display = [];

        for( let i = 1; i <= this.props.playerCount; i++ ) {
            display.push( <div key={i}>
                Player {i}
                <select name={`player_${i}`} onChange={e => this.handleChange( e.target )}>{options}</select>
            </div> )
        }

        return display;
    }

    componentWillUnmount() {
        // this.props.setPlayerPokemon( 'player_1', new Pokemon( pokeList[this.state.player_1], 0 ) );
        // this.props.setPlayerPokemon( 'player_2', new Pokemon( pokeList[this.state.player_2], 0 ) );
        // this.props.setPlayerPokemon( 'player_3', new Pokemon( pokeList[this.state.player_3], 0 ) );
        // this.props.setPlayerPokemon( 'player_4', new Pokemon( pokeList[this.state.player_4], 0 ) );

        for( let i = 1; i <= this.props.playerCount; i++ ) {
            this.props.setPlayerPokemon( `player_${i}`, new Pokemon( pokeList[this.state['player_' + i]], 0 ) );
        };
    };

    render() {
        let options = Object.keys( pokeList ).map( (pokemon, i) => <option key={i} value={pokemon}>{pokemon}</option> );
        console.log( this.state )
        return (
            <div>
                This is the team page
                {this.renderPlayerSelect( options )}
                <div>
                    <button onClick={() => this.handlePlayerCount('remove')} disabled={this.props.playerCount <= 2}>Remove Player</button>
                    <button onClick={() => this.handlePlayerCount('add')} disabled={this.props.playerCount >= 6}>Add Player</button>
                </div>
                <Link to='/game'><button>To game</button></Link>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { playerCount } = state.game;

    return {
        playerCount
    };
}

export default connect( mapStateToProps, { setPlayerPokemon, setPlayerCount } )(Teams);