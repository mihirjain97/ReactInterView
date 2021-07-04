import React, { Component } from 'react'
import ButtonContext from '../../Context/ButtonContext'
import UserContext from '../../Context/UserContext'

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <ButtonContext.Consumer>
                    {value => {
                        return(
                            <a href="#">{value}</a>
                        )
                    }}
                </ButtonContext.Consumer>
                <UserContext.Consumer>
                    {userValue => {
                        return (
                            <div>
                                {userValue.greet()}
                            </div>
                        )
                    }}
                </UserContext.Consumer>
            </div>
        )
    }
}
