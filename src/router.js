import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { UNSAFE_enhanceManualRouteObjects } from '@remix-run/router';
import Game from './pages/Game';
import Home from './pages/Home';
import CareerGuidance from './pages/CareerGuidance';

// Enable v7 future flags and configure routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/career-guidance" element={<CareerGuidance />} />
      <Route path="*" element={<Home />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
    basename: process.env.PUBLIC_URL || '/'
  }
);

export default router;
