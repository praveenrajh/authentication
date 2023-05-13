import { Link } from "react-router-dom";

function Header({handleLogoutFn}) {
    return <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/mobile'>Mobiles</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/login'>login</Link>
        </li>
        <li>
          <Link to='/signup'>signup</Link>
        </li>
        <li>
          <button onClick={()=>(handleLogoutFn())}>Logout</button>
        </li>
      </ul>
    </nav>;
  }

  export default Header ;