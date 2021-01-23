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

          Promise.all([
            fetch("/api/products/").then(value => value.json()),
            fetch("/api/users/").then(value => value.json()),
            fetch("/api/products/purchases").then(value => value.json()),
            ])
            .then((value) => {
              this.setState({ totals: [{idtotal: 'tot1', totalName:'Productos', value: value[0].metadata.count},{idtotal: 'tot2', totalName:'Usuarios', value: value[1].metadata.count},{idtotal: 'tot3', totalName:'Compras', value: value[2].metadata.count}] })
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render () {
    
        return (
    <section className="row m-2 justify-content-center">
        <h1 className="d-inline text-center">RIWI CERVEZAS DASHBOARD</h1>
        {this.state.totals.map( cadaTotal => {return <Card key={cadaTotal.idtotal} totalName={cadaTotal.totalName} totalValue={cadaTotal.value}/>})}

      </section>
    )
    }
};

export default TopRow;