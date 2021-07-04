import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logoutAction } from '../../store/actions/AuthActions';
import { isAuthenticated } from '../selectors/AuthSelectors';

const Header = (props) => {

    const dispatch = useDispatch();
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAction(props.history))
    }

    return (
        <div className="bg-green-400 text-blue px-2 py-2 flex items-center">
            <div>
                <h2 className="font-bold text-xl mr-4">React Interview</h2>
            </div>
            <div>
                {props.isAuthenticate && (
                    <>
                        <NavLink activeClassName='text-white' className='px-2' exact to="/">Home</NavLink>
                    </>
                )}
                {!props.isAuthenticate && (
                    <>
                        <NavLink activeClassName='text-white' className='px-2' to="/sign-up">Register</NavLink>
                        <NavLink activeClassName='text-white' className='px-2' to="/sign-in">Login</NavLink>
                    </>
                )}
                { props.isAuthenticate &&
                    <button onClick={(e) => onLogout(e)} className='px-2' >Logout</button>
                }

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticate: isAuthenticated(state),
    }
}

export default withRouter(connect(mapStateToProps)(Header));
