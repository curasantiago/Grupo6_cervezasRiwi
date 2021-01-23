import {Component} from 'react'

class LastProduct extends Component {
    constructor () {
        super();
        this.state= {
            products: [],
            image: ""
        }
    }



    componentDidMount () {
        console.log("Mounting!");

        fetch('/api/products/')
        .then( response =>  { return response.json() })
        .then( data => { 
            this.setState({ products: data.data[data.data.length -1] })
            this.setState({image: "http://localhost:5000/images/products/" + this.state.products.image})
            console.log(this.state.products)
        })
        .catch(error => console.log(error));
    }
    
    render () {
        return (
            <div className="jumbotron col-xs-12 col-md-6">
            <p>Último producto agregado:</p>
            <h1 className="display-4">{this.state.products.name}</h1>
            <p className="lead">{this.state.products.info}</p>
            <hr className="my-4" />
            
            <p className="lead">
              <img className="w-100" src={this.state.image} alt="Imagen"></img>
              {/* <a className="btn btn-primary btn-lg" href="//#endregion" role="button">Learn more</a> */}
            </p>
            </div>
        )
    }
}

export default LastProduct