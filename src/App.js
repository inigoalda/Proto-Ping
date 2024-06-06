import React, {useRef, useState} from 'react';

import SideBar from './components/SideBar';
import WorkArea from './components/WorkArea';
import FloatingCalendar from "./components/FloatingCalendar";
import './App.css';

import Login from './components/Login';

function App() {

    const workAreaRef = useRef();
    const sideBarRef = useRef();

    const createNewTab = () => {
        workAreaRef.current.onNewTab();
    };

    const logoutUser = () => {
        setIsLogged("");
    }

    const openFile = () => {
        workAreaRef.current.onOpenFile();
        sideBarRef.current.handleCloseMenu();
    }

    const saveFile = () => {
        workAreaRef.current.onSaveFile();
        sideBarRef.current.handleCloseMenu();
    }

    const [isLogged, setIsLogged] = useState("");
    const [calendarShown, setCalendarShown] = useState(false);

    return (<div>
            {!isLogged && <Login userHandler={(username) => setIsLogged(username)}/>}
            {isLogged && <div>
                {calendarShown && <FloatingCalendar onClose={() => setCalendarShown(false)}/>}
                <div className="header">
                    <h2>Proto-Ping</h2>
                </div>

                <div className="App" style={{display: 'flex'}}>
                    <SideBar createNewTab={createNewTab} showCalendar={() => setCalendarShown(true)} logoutUser={logoutUser} openFile={openFile} ref={sideBarRef} saveFile={saveFile}/>
                    <WorkArea ref={workAreaRef}/>
                </div>
            </div>}
        </div>

    );
}

export default App;