import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import { useUser } from '@clerk/react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/problem"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={'/'} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
