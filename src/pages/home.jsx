import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar";

import BurgerBackground from "./../images/burgerBackground.jpg";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Jumbotron />
            <div>Hello from home</div>
        </div>
    )
}

export default Home;