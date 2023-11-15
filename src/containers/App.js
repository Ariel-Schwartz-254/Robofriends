import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';
import Scroll from '../components/Scroll';

const App = () => {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    useEffect( () => {
        async function fetchUsers() {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            setRobots(users);
        }
        fetchUsers();
    }, []);

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    const handleSearchChange = (e) => {
        setSearchfield(e.target.value);
    }

    return  robots.length === 0 
            ? <h1>Loading...</h1>
            :   <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={handleSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
}

export default App;