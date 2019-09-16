import React from 'react';
import Pokemons from '../ressources/pokemons.json';
import PokemonDetail from '../PokemonDetail/pokemon_detail';
import '../index.css';

export default class PokedexHome extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            pokemons : JSON.parse(JSON.stringify(Pokemons.pokemons)),
            searchInputValue : '',
            dynamicPokemonList: '',
            hasClicked: false,
            selectedPokemon: {},
            selectedPokemonImage: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(event) {
        event.target.value = event.target.value.charAt(0).toLowerCase() + event.target.value.slice(1);
        this.setState({ searchInputValue: event.target.value });
        let list = this.retrievePokemons();
        this.setState({dynamicPokemonList: list});
    }

    handleSelectedPokemon(pokemon) {
        this.setState({hasClicked: true});
        this.setState({selectedPokemon: pokemon}, () => {
            this.setState({selectedPokemonImage: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/Pokemon_XY_Sprites/' + (this.state.selectedPokemon.index + 1) + '.png'});
        });
    }

    retrievePokemons() {
        if(this.state.searchInputValue.length > 1) {
        let list = [];
        let finalList = []
        list = this.state.pokemons.filter(
            (item, index) => { 
                item.index = index;
                return item.name.includes(this.state.searchInputValue);
        });
        list.forEach(filteredPokemon => {
            finalList.push(<li className="capitalize" key={filteredPokemon.index} onClick={() => this.handleSelectedPokemon(filteredPokemon)}> <b> {filteredPokemon.name} </b> </li>);
        });
        return <ul>{finalList}</ul>
        } else {
            return null;        
        }
    }

    render() {
        return (
            <div style={{ marginLeft: 6 + 'px'}}>
                <h1> Pokedex Marceau </h1>
                <input type="text" placeholder="Search for a Pokemon..." value={this.state.searchInputValue} onChange={this.handleUserInput}></input>
                <div> {this.retrievePokemons()} </div>
                <div style={this.state.hasClicked ? {} : {display: 'none'}}>
                    <img style={{ marginLeft: 26 + 'px'}} src={this.state.selectedPokemonImage} alt="selected pokemon"></img>
                    <PokemonDetail pokemon={this.state.selectedPokemon}> </PokemonDetail>
                </div>
            </div>
        );
    }
}