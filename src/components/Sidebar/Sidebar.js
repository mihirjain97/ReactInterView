import React, { Component } from 'react'
import Navigation from '../Navigation/Navigation'
import ButtonContext from '../../Context/ButtonContext'

class Sidebar extends Component {
    render() {
        return (
            <div>
                <ButtonContext.Provider value="Mihir Web Dev Pro">
                    <Navigation />
                </ButtonContext.Provider>
            </div>
        )
    }
}

export default Sidebar
