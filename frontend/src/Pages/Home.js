import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import Product from '../Components/Product'
import { clearMessage } from '../Redux/actions/generalActions';
import { getAllProducts } from '../Redux/actions/productActions';
import "./Home.css"

function Home() {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.getAllProducts);
    const {loading, error, allProducts} = productsList;

    const userRegister = useSelector(state => state.userRegister);
    const { registerInfo } = userRegister;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const updateMessage = useSelector(state => state.message);
    const { successMessage } = updateMessage;

    useEffect(() => {
         dispatch(getAllProducts());
    }, [dispatch])


      setTimeout(()=>{dispatch(clearMessage())}, 40000);

  return (
    <div>
      { registerInfo && userInfo && <Message variant="success">Welcome to SuperStore Boss! {userInfo.firstName}</Message>}
      { !registerInfo && userInfo && successMessage && <Message variant="success">{successMessage }</Message>}
      {loading ? (<Loading />) : error ? (<Message variant="danger">{error}</Message>) :

        (
            <div>
                <h1 className="newest__products">Newest Products</h1>
        
        <div className="center row">
          {
            allProducts.map(product => {
              return <Product key={product._id} product={product} />
            })
          }
        </div>
        </div>)}
    </div>
  )

}

export default Home
