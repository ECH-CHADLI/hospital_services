import React from 'react';
import Stock from './componants/stock';
import { Routes, Route } from 'react-router-dom';
import Landing from './componants/landing';
import Sign from './componants/sign';
import StockUser from './componants/stock-user'
import Bars from './componants/bars';
import InternUser from './componants/intern-user';
import ComplaintsUser from './componants/complaints-user';
import Complaints from './componants/complaints';
import Intern from './componants/intern';
import { AuthContextProvider } from './componants/context';
import ProtectRoute from './componants/protectRoute';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/sign" element={<Sign/>}></Route>
          <Route path="/stock" element={
            <ProtectRoute>
              <Bars/>
              <Stock/>
            </ProtectRoute>}>
          </Route>
          <Route path="/stock_user" element={
            <ProtectRoute>
              <Bars/>
              <StockUser/>
            </ProtectRoute>}>
          </Route>
          <Route path="/complaints-user" element={
            <ProtectRoute>
              <Bars/>
              <ComplaintsUser/>
            </ProtectRoute>}>
          </Route>
          <Route path="/complaints" element={
            <ProtectRoute>
              <Bars/>
              <Complaints/>
            </ProtectRoute>}>
          </Route>
          <Route path="/intern" element={
            <ProtectRoute>
              <Bars/>
              <Intern/>
            </ProtectRoute>}>
          </Route>
        </Routes>
      </AuthContextProvider>

      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/intern-user" element={<InternUser/>}></Route>
      </Routes>
    </>
  );  
}

export default App;
