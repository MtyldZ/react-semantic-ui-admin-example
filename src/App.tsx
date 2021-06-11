import React from 'react';
import {SidebarComponent} from "./components/Sidebar";

import './App.css';
import {MainScreen} from "./screens/MainScreen";

function App() {
    return (
        <div className="app">
            <SidebarComponent>
                <MainScreen/>
            </SidebarComponent>
        </div>
    );
}

export default App;
