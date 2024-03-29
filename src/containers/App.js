import React, { useEffect } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';
import Scroll from '../components/Scroll';

import { requestRobots, setSearchField } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        inPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

const App = (props) => {
    const { searchField, onSearchChange, onRequestRobots, robots, isPending } = props;
    
    useEffect( () => {
        onRequestRobots();
    }, []);

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    return  isPending 
            ? <h1>Loading...</h1>
            :   <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
}

export default connect(mapStateToProps, mapDispachToProps)(App);