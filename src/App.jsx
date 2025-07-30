import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Contact from "./Components/Contact.jsx";
import Services from "./Components/Services.jsx";
import {useEffect, useState} from "react";

const App = () => {
    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    const [skipSteps, setSkipSteps] = useState(false);

    return (
        <div className="bg-light">
            <Navbar onNavClick={() => setSkipSteps(true)} />
            <main>
                <div id="about">
                    <Hero skipSteps={skipSteps} setSkipSteps={setSkipSteps} />
                </div>
                <div id="services">
                    <Services />
                </div>
                <div id="contact">
                    <Contact />
                </div>
            </main>
        </div>
    );
};


export default App;
