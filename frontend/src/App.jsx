import {
  Show,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from '@clerk/react';

function App() {
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
