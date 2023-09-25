import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [element, setElement] = useState();

  useEffect(() => {
    setElement(document.getElementById('__portal'));
  }, []);

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
};

export default Portal;
