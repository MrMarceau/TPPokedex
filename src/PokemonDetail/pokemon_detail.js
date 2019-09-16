import React from 'react';
import '../index.css';
import { request } from 'graphql-request';


export default class PokemonDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            pokemon: this.props.pokemon,
            pokemonType: [],
            pokemonStats: [],
            selectedPokemonStats: {},
            avgType1: {},
            avgType2: {} 
        };
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
            list.push(<b> <li className="capitalize" key={item.slot}> {item.type.name} </li> </b>);
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
            list.push(<div> <li key={"stat-" + index}> <b> {item.name} </b> : {item.number} </li> <div style={{backgroundColor: 'black', height: 4 + 'px', width: (item.number/100)*100 + 'px', marginTop: 3 + 'px' }}> </div> </div>);
        })
        return <ul>{list}</ul>
    }

    getPokemonData() {
        const xhr = new XMLHttpRequest();       
        xhr.open('get', "https://pokeapi.co/api/v2/pokemon/" + (this.props.pokemon.index + 1) , true);
        xhr.onload = () => {
            var response = JSON.parse(xhr.responseText);
            this.setState({ 
                pokemonType: response.types,
                pokemonStats : response.stats
             })
             this.getAverageData(response);
        };
        xhr.send();
    }

    getAverageData(response) {
        let query = `{
        averageStats(type1:`+ response.types[0].type.name.toUpperCase() + `) {
          meta { lastUpdated }
          avg {
            attack
            defense
            hp
            specialAttack
            specialDefense
            speed
          }
        }
      }`;
        request('https://pokestats-gmtiqydwwa.now.sh', query).then(data => {
            if(data.averageStats.avg) {
                this.setState({ avgType1: data.averageStats.avg })
                let lol = this.state.avgType1;
                lol.type = response.types[0].type.name;
                this.setState({ avgType1: lol });
            }
        });

        if (response.types[1] !== undefined) {
            let query2 = `{
                averageStats(type1:`+ response.types[1].type.name.toUpperCase() + `) {
                  meta { lastUpdated }
                  avg {
                    attack
                    defense
                    hp
                    specialAttack
                    specialDefense
                    speed
                  }
                }
              }`;
            request('https://pokestats-gmtiqydwwa.now.sh', query2).then(data => {
                if(data.averageStats.avg) {
                    this.setState({ avgType2: data.averageStats.avg })
                    let lol2 = this.state.avgType2;
                    lol2.type = response.types[1].type.name;
                    this.setState({ avgType2: lol2 });
                }
            });

        } else {
            this.setState({ avgType2: {} });
        }

    }

    getAverage() {
        let table = [];
        table.push(
            <div>
                <h3>Average {this.state.avgType1.type} stats</h3>
                <ul>
                    <li>
                        <b>Speed</b> :  {this.state.avgType1.speed}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType1.speed/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                        <b>SpecialDefense</b> : {this.state.avgType1.specialDefense}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType1.specialDefense/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                        <b>SpecialAttack</b> : {this.state.avgType1.specialAttack}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType1.specialAttack/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                        <b>Defense</b> : {this.state.avgType1.defense}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType1.defense/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                        <b>Attack</b> : {this.state.avgType1.attack}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType1.attack/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                        <b>Hp</b> :  {this.state.avgType1.hp}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType1.hp/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                </ul>
            </div>   
        )
        if(this.state.avgType2.speed !== undefined){
            table.push(
                <div>
                    <h3>Average {this.state.avgType2.type} stats</h3>
                    <ul>
                    <li>
                       <b>Speed</b> :  {this.state.avgType2.speed}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType2.speed/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                       <b>SpecialDefense</b> : {this.state.avgType2.specialDefense}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType2.specialDefense/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                       <b>SpecialAttack</b> : {this.state.avgType2.specialAttack}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType2.specialAttack/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                       <b>Defense</b> : {this.state.avgType2.defense}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType2.defense/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                       <b>Attack</b> : {this.state.avgType2.attack}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType2.attack/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                    <li>
                       <b>Hp</b> :  {this.state.avgType2.hp}
                    </li>
                    <div style={{backgroundColor: 'black', height: 4 + 'px', width: (this.state.avgType2.hp/100)*100 + 'px', marginTop: 3 + 'px' }}> </div>
                </ul>
                </div>   
            )
        }

        return table;
    }
    

    render() {
        return (
            <div style={{ marginLeft: 16 + 'px'}}>
                <h1 className="capitalize">{this.props.pokemon.name}</h1>
                <h2> Types : </h2>
                <div> {this.getPokemonTypes()} </div>
                <div>
                    <h2> Bases Stats </h2>
                    <span> { this.getPokemonStats() } </span>
                    <h2> Average Stats </h2>
                    <span> { this.getAverage() } </span>
                </div>
            </div>
        );
    }
}