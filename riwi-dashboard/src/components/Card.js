
function Card ({totalValue, totalName}) {
    
    return (
        
        
    <div className="card mb-3 col-4 border border-5 riwi-bg "  >
        <div className="row ">
            <img src="" alt="" />
        <div className="col-md-8 w-100">
            <div className="card-body d-flex justify-content-center w-100">
              <h5 className="card-title ">Total {totalName}: {totalValue}</h5>
              {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
              {/* <p className="card-text"><small className="text-muted">Total {totalName}: {totalValue}</small></p> */}
            </div>
          </div>
        </div>
    </div>


    )

    // Card.defaultProps
};

export default Card;