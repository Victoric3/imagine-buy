import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="container">
                <div></div>
                <p className='fs-3 fw-bold my-auto text-light'>FREE DELIVERY IN 24H</p>

                <div className="call px-4 text-light">
                    <span className='fw-bold'>Call or Whatsapp to order</span>
                    <br />
                    <span className="fw-bold fs-5">0700 000 000</span>
                </div>
            </div>
        </div>
    )
}


export default Navbar