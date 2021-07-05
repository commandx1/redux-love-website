import { lazy } from 'react';

const Home = lazy(() => import('./home'));
const Login = lazy(() => import('./login'));
const Memories = lazy(() => import('./memories'));

export { Home, Login, Memories };
