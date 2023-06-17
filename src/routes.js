import React from "react";

import { Route, Routes} from 'react-router-dom';

import Dashboard from "./pages/dashboard";
import Teamowner from "./pages/teamowner";
import Player from "./pages/player";
import Sponsors from "./pages/sponsors";
import Vendor from "./pages/vendor";
import Teamownercontract from "./pages/teamownercontract";



const AllRoutes = ({ handleLogin, user, error }) => {
    return (
        <Routes>
            
            <Route exact path="/" element={<Dashboard handleLogin={handleLogin} user={user} error={error}/>}/>
            <Route exact path="/teamowner" element={<Teamowner/>} />
            <Route exact path="/player" element={<Player />} />
            <Route exact path="/sponsors" element={<Sponsors />} />
            <Route exact path="/vendor" element={<Vendor />} />
            <Route exact path="/teamownercontract" element={<Teamownercontract />} />
            

        </Routes>
    );
};

export default AllRoutes;
