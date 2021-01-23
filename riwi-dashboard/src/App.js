import TopRow from './components/TopRow'
import Categories from './components/Categories'
import ProductList from './components/ProductList'
import LastProduct from './components/LastProduct'

function App () {
 
  return (
    <>
    <div className="container-fluid">
      <TopRow />
    <section className="row">
      <LastProduct />
      <Categories />
    </section>
      <ProductList />
    </div>
    </>
  );
}


export default App;
