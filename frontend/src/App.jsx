import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import {
  Show,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from '@clerk/react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>welcome to the app</h1>

      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
        <SignOutButton />
      </Show>
    </>
  );
}

export default App;
