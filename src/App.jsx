import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Contact from "./Components/Contact.jsx";
import Services from "./Components/Services.jsx";

const App = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                <div >
                    <div id="about">
                        <Hero> </Hero>
                    </div>
                    <div id="services">
                        <Services></Services>
                    </div>
                    <div id="contact">
                        <Contact> </Contact>
                    </div>
                </div>
            </main>

        </div>


    );
}

export default App;
