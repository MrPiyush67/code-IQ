import React from 'react';
import toast from 'react-hot-toast';

const HomePage = () => {
  return <div onClick={() => toast.success('this is a div')}>HomePage</div>;
};

export default HomePage;
