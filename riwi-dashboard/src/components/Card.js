import {Component} from 'react';

class Card extends Component {
    
    constructor () {
        super();
        this.state= {
            products : [],
            productCount: ""
        }
    }

    componentDidMount () {
        console.log("Mounting!");
        fetch('/api/products/')
        .then( response =>  {
            return response.json() 
        })
        .then( data => {
            // console.log(data)
            this.setState({
                productCount: data.metadata.count
            })
            // console.log(this.state.products)
        })
        .catch(error => console.log(error))
    }

render () {
    return (
        
        
    <div className="card mb-3 col-12" style={{"maxWidth": "440px"}}>
        <div className="row g-0">
          <div className="col-xl-3">
            <img src="..." alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-muted">Total productos: {this.state.productCount}</small></p>
            </div>
          </div>
        </div>
    </div>


    )
}
};

export default Card;