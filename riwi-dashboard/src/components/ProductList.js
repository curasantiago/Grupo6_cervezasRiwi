import {Component} from 'react'
import Product from './Product'

class ProductList extends Component {

    constructor () {
        super();
        this.state= {
            products: []
        }
    }

    componentDidMount () {
        console.log("Mounting!");

        fetch('/api/products/')
        .then( response =>  { return response.json() })
        .then( data => { 
            this.setState({ products: data.data })
            console.log(this.state.products)
        })
        .catch(error => console.log(error));
        }
    

    render() {
        return (
                <section className="row m-3">
                    <p>Lista de productos:</p>
                    <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Información</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Tamaño</th>
                    <th scope="col">Subcategoria</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map ( product => {return <Product key={product.id} id={product.id} name={product.name} info={product.info} subcategory={product.subcategory.name} size={product.size.value} price={product.price} />})}
                </tbody>
                </table>
                    </section>
        )
    }
}

export default ProductList

