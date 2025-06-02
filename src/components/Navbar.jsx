import '../styles/Navbar.css';

function Navbar(props) {
    function captureInputChange(event) {
        console.log(event.target.value);
    }

    return (
        <nav className='navbar'>
            {props.title}
            <input type="text" placeholder='Search here' size="30" onChange={captureInputChange}/>
        </nav>
    );
}

export default Navbar;