
function Card (props) {
    
    console.log(props.total)
    return (
        
        
    <div className="card mb-3 col-xs-12 col-xl-4" >
        <div className="row g-0">
            <img src="" alt="" />
        <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-muted">Total productos: {props.total}</small></p>
            </div>
          </div>
        </div>
    </div>


    )
};

export default Card;