import Card from './Card'
import {Component} from 'react'


class TopRow extends Component {
    
    constructor () {
        super();
        this.state= {
            products : [],
            total: []
        }
    }

    componentDidMount () {
        console.log("Mounting!");
        fetch('/api/products/')
        .then( response =>  {
            return response.json() 
        })
        .then( data => {
            this.setState({
                productCount: data.metadata.count,
                // total: [this.state.productCount]
            })
        })
        .catch(error => console.log(error))
    }

    render () {
        return (
    <section className="row">
      {/* {this.state.total.map ( valor => {return <Card key={valor.id} total={valor.totalProductos}/>} )} */}
      </section>
    )
    }
};

export default TopRow;