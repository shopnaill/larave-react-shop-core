/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require("./components/Example");
import "swiper/css/bundle";

import React from "react";
import ReactDOM from "react-dom";
import RouterList from "./router";
import SimpleReactLightbox from "simple-react-lightbox";

class App extends React.Component {
    render() {
        return (
            <SimpleReactLightbox>
                <div className="py-5 mt-5">
                    <RouterList />
                </div>
            </SimpleReactLightbox>
        );
    }
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
    //  ReactDOM.render(<Navbar />, document.getElementById("navbar"));
}
