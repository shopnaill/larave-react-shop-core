import React from 'react';
import './styles.css';

class Loader extends React.Component {


    render() {
        return (
            <div className="loader">
                <img src={'/loading.gif'} className="loader__icon"></img>
            </div>
        );
    }
}
export default Loader;