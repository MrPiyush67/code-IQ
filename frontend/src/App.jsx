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

/**
 * Root application component that displays a welcome header and conditional authentication controls.
 *
 * Renders a heading "welcome to the app". When the user is signed out, shows SignIn and SignUp buttons;
 * when signed in, shows the User menu button and SignOut button.
 *
 * @returns {JSX.Element} The app's top-level JSX containing the header and Clerk-based sign-in/sign-out UI.
 */
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
