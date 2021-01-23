import CategoryCard from './CategoryCard'
import {Component} from 'react'

class Categories extends Component {
    constructor () {
        super();
        this.state= {
            subcategories: []
        }
    }

    componentDidMount () {
        console.log("Mounting!");

        fetch('/api/products/')
        .then( response =>  { return response.json() })
        .then( data => { 
            this.setState({ subcategories: data.metadata.countBySubCategory })
        })
        .catch(error => console.log(error));
        }
    

    render() {
    return (
        <>
    
    <div className="row row-cols-1 row-cols-md-2 g-4 col-xs-12 col-md-6">
    
        {this.state.subcategories.map ( subCat => {return <CategoryCard key={subCat.id} {...subCat} />})}
    </div>
    </>
    )
    }
}

export default Categories