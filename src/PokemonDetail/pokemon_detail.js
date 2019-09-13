import React from 'react';
import '../index.css';

export default class PokemonDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = { pokemon: this.props.pokemon, pokemonType: [], pokemonStats: [], selectedPokemonStats: {} };
    }

    componentDidUpdate() {
        if(this.state.pokemon.index !== this.props.pokemon.index) {
            this.setState({pokemon: this.props.pokemon});
            this.getPokemonData();
        }
    }

    getPokemonTypes() {
        let list = [];
        this.state.pokemonType.forEach((item) => {
            list.push(<li key={item.slot}> {item.type.name} </li> );
        });
        return <ul>{list}</ul>
    }

    getPokemonStats() {
        let statsObject = {};
        statsObject.stat = [];
        let list = [];

        this.state.pokemonStats.forEach((item, index) => {
            statsObject.stat[index] = {};
            statsObject.stat[index].name = item.stat.name; 
            statsObject.stat[index].number = item.base_stat; 
        });

        statsObject.stat.forEach((item, index) => {
            item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            list.push(<div> <li key={index}> <b> {item.name} </b> : {item.number} </li> <div style={{backgroundColor: 'black', height: 4 + 'px', width: (item.number/100)*100 + 'px', marginTop: 3 + 'px' }}> </div> </div>);
        })
        return <ul>{list}</ul>
    }

    getPokemonData() {
        const xhr = new XMLHttpRequest();       
        xhr.open('get', "https://pokeapi.co/api/v2/pokemon/" + (this.props.pokemon.index + 1) , true);
        console.log(this.props.pokemon.index);
        xhr.onload = () => {
            var response = JSON.parse(xhr.responseText);
            this.setState({ 
                pokemonType: response.types,
                pokemonStats : response.stats
             })
        };
        xhr.send();
        console.log('REQUETE');
    }
    

    render() {
        return (
            <div style={{ marginLeft: 20 + 'px'}}>
                <h2>{this.props.pokemon.name}</h2>
                <h3> Types : </h3>
                <div> {this.getPokemonTypes()} </div>
                <div>
                    <h3> Bases Stats </h3>
                    <a> { this.getPokemonStats() } </a>
                    <h3> Average Stats </h3>
                </div>
            </div>
        );
    }
}