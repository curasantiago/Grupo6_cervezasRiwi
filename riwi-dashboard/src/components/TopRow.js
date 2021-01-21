import Card from './Card'
import {Component} from 'react'


class TopRow extends Component {
    
    constructor () {
        super();
        this.state= {
            totals: []
        }
    }

    componentDidMount () {
        console.log("Mounting!");

        // FETCH 1
        fetch('/api/products/')
        .then( response =>  { return response.json() })
        .then( data => { this.setState({ totals: [{idtotal: 'tot1', totalName:'Productos', value: data.metadata.count}] }) })
        .catch(error => console.log(error));

        // FETCH 2
        fetch('/api/products/')
        .then( response =>  { return response.json() })
        .then( data => { this.setState({ totals: [...this.state.totals, {idtotal: 'tot2', totalName:'Usuarios', value: data.metadata.count}] }) })
        .catch(error => console.log(error))

        // FETCH 3
        fetch('/api/products/')
        .then( response =>  { return response.json() })
        .then( data => { this.setState({ totals: [...this.state.totals, {idtotal: 'tot3', totalName:'Compras', value: data.metadata.count}] }) })
        .catch(error => console.log(error))
    }

    render () {
    
        return (
    <section className="row">
        
        {this.state.totals.map( cadaTotal => {return <Card key={cadaTotal.idtotal} totalName={cadaTotal.totalName} totalValue={cadaTotal.value}/>})}

      </section>
    )
    }
};

export default TopRow;