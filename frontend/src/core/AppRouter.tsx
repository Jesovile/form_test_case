import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import AppLayout from "../framework/layouts/AppLayout.tsx";
import LoginPage from "../pages/LoginPage";
import React from "react";
import RequestPageResolver from "../pages/RequestPageResolver";

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            {/* public pages -> Site*/}
            <Route element={
                <AppLayout>
                    <Outlet/>
                </AppLayout>
            }>
                <Route index element={<Navigate to={'/login'}/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/app'} element={<RequestPageResolver/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default AppRouter;

