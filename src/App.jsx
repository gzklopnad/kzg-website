import Navbar from "./Components/Navbar.jsx";
import Header from "./Components/Header.jsx";
import Contact from "./Components/Contact.jsx";
import Services from "./Components/Services.jsx";

const App = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                <div >
                    <div id="about">
                        <Header> </Header>
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
