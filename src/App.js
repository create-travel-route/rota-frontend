import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Homepage, PropertyList } from './Pages';
import { routes } from './Routes/Routes';
import Control from './Routes/Control';
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/properties" element={<PropertyList />} />
        {routes.map(({ path, element: Element, permissions, params }, index) => (
          <Route key={index} element={<Control permissions={permissions} />}>
            <Route key={index} path={path} element={<Element {...params} />} />
          </Route>
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
