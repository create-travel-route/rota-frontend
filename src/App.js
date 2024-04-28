import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Homepage, CreatePropertyPage } from './Pages';
import { routes } from './Routes/Routes';
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-property" element={<CreatePropertyPage />} />
        {routes.map(({ path, element: Element, permissions }, index) => (
          //<Route key={index} element={<Control permissions={permissions} />}>
          <Route key={index} path={path} element={<Element />} />
          //</Route>
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
