import { connect } from "react-redux";

function Sidebar(props) {
    let sizes = props.state.sizeProducts.reduce((acc, cv) => {
      acc = acc.concat(cv.availableSizes);
      return acc;
    }, []);
    let uniqueSizes = [...new Set(sizes)];

    function handleSize(size){
      props.dispatch({
        type:"changeSize",
        size
      })
    }

    return (
      <aside className="flex-20 sidebar">
        <div className="flex wrap">
          {uniqueSizes.map((size) => (
            <span key={size} className="size" onClick={() => handleSize(size)}>{size}</span>
          ))}
        </div>
      </aside>
    );
  }
  
  function mapStateToProps(state){
    return {
      state,
    }
  }

  export default connect(mapStateToProps)(Sidebar);