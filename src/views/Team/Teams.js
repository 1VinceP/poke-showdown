import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPlayerPokemon } from '../../redux/gameReducer';
import Pokemon from '../../pokemon';
import pokeList from '../../data/pokeList';
import './team.css';

class Teams extends Component {
    state = {
        player_1: 'bulbasaur',
        player_2: 'bulbasaur',
        player_3: 'bulbasaur',
        player_4: 'bulbasaur'
    };

    evolve( pokemon ) {
        this.props.setPlayerPokemon( 'player_1', new Pokemon( pokeList[pokemon], 40 ) )
    };

    handleChange({ name, value }) {
        this.setState({
            [name]: value
        })
    };

    componentWillUnmount() {
        this.props.setPlayerPokemon( 'player_1', new Pokemon( pokeList[this.state.player_1], 0 ) );
        this.props.setPlayerPokemon( 'player_2', new Pokemon( pokeList[this.state.player_2], 0 ) );
        this.props.setPlayerPokemon( 'player_3', new Pokemon( pokeList[this.state.player_3], 0 ) );
        this.props.setPlayerPokemon( 'player_4', new Pokemon( pokeList[this.state.player_4], 0 ) );
    };

    render() {
        let options = Object.keys( pokeList ).map( (pokemon, i) => <option key={i} value={pokemon}>{pokemon}</option> );
        console.log( this.state )
        return (
            <div>
                This is the team page
                <div>
                    Player 1
                    <select name='player_1' onChange={e => this.handleChange( e.target )}>{options}</select>
                </div>
                <div>
                    Player 2
                    <select name='player_2' onChange={e => this.handleChange( e.target)}>{options}</select>
                </div>
                <div>
                    Player 3
                    <select name='player_3' onChange={e => this.handleChange( e.target )}>{options}</select>
                </div>
                <div>
                    Player 4
                    <select name='player_4' onChange={e => this.handleChange( e.target )}>{options}</select>
                </div>
                <Link to='/game'><button>To game</button></Link>
            </div>
        )
    }
}

export default connect( null, { setPlayerPokemon } )(Teams);