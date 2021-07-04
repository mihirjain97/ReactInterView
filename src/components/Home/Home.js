import axios from "axios";
import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import ViewData from "./ViewData";
// import './App.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 1,
            seconds:1,
            data: '',
            showData: false,
        }
        this.hoursInput = React.createRef();
        this.minutesInput= React.createRef();
        this.secondsInput = React.createRef();
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    convertToSeconds = ( hours, minutes,seconds) => {
        return seconds + minutes * 60 + hours * 60 * 60;
    }
    componentDidMount = () => {
        this.startTimer();
    }
    startTimer = () => {
        this.timer = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        const  { hours, minutes, seconds } = this.state;
        let c_seconds = this.convertToSeconds(hours, minutes, seconds);
        if(c_seconds) {

        // seconds change
        seconds ? this.setState({seconds: seconds-1}) : this.setState({seconds: 59});

        // minutes change
        if(c_seconds % 60 === 0 && minutes) {
            this.setState({minutes: minutes -1});
        }

        // when only hours entered
        if(!minutes && hours) {
            this.setState({minutes: 59});
        }

        // hours change
        if(c_seconds % 3600 === 0 && hours) {
            this.setState({hours: hours-1});
        }

        } else {
        clearInterval(this.timer);
        }
        if(c_seconds === 0)
        {
            var config = {
                method: 'post',
                url: 'https://stage-services.truemeds.in/ArticleService/getArticleListing',
                headers: { 
                    'Authorization': `Bearer ${this.props.access_token}`
                },
            };

            axios(config)
            .then((res) => {
                if(res.status === 200)
                {
                    console.log(res.data.result)
                    this.setState({data: res.data.result, showData: true})
                }
            })
        }
    }

    resetTimer = () => {
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 10
        });
        this.hoursInput.current.value = 0;
        this.minutesInput.current.value = 0;
        this.secondsInput.current.value = 0;
    }


    render() {
        const { hours, minutes, seconds } = this.state;

        return (
            <>
                <div className="App">
                    <h1 className="title"> (( React Countdown )) </h1>
                    <div className="inputGroup">
                        <h3>Hrs</h3>
                        <input ref={this.hoursInput} type="number" placeholder={0}  name="hours"  onChange={this.inputHandler} />
                        <h3>Min</h3>
                        <input  ref={this.minutesInput} type="number"  placeholder={0}   name="minutes"  onChange={this.inputHandler} />
                        <h3>Sec</h3>
                        <input   ref={this.secondsInput} type="number"  placeholder={0}  name="seconds"  onChange={this.inputHandler} />
                    </div>
                    <div className="m-4">
                        <button onClick={this.resetTimer}  className="reset rounded-md bg-green-300 p-2 m-2 text-xl w-20 text-white">RESET</button>
                    </div>
                    <h1> Timer {hours}: {minutes} : {seconds} </h1>
                </div>
                {
                    this.state.showData &&
                    <ViewData data={this.state.data} />
                }
            </>

        );
    }
    }
const mapStateToProps = (state) => {
    return {
        access_token: state.auth.auth.access_token,
    }
}

export default connect(mapStateToProps)(Home);
