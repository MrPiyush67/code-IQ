import { Navigate, Outlet, Route, Routes } from 'react-router';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SessionPage from './pages/SessionPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';

function ProtectedRoute() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to={'/'} />;
  }
  return <Outlet />;
}
function PublicRoute() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return <Navigate to={'/dashboard'} />;
  }
  return <Outlet />;
}

function App() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Routes>
        {/* if not user signedin then dont let him go to '/' but if not then take him to '/' */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* only go to the routes if signedin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problem/:id" element={<ProblemPage />} />
          <Route path="/session/:id" element={<SessionPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
