
function CategoryCard ({nombreSubCategoria, total}) {

        return (
            <div className="col">
            <div className="card border riwi-bg">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{nombreSubCategoria}</h5>
                <p className="card-text">Total de productos: {total}</p>
              </div>
            </div>
          </div>
        )
    }


export default CategoryCard;