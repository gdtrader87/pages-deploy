import React, { useState, useEffect } from 'react';

const TypingEffect = ({ strings, typeSpeed, backSpeed }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === strings[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 500);
    } else if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % strings.length);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? backSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, typeSpeed, backSpeed, strings]);

  useEffect(() => {
    setText(strings[index].substring(0, subIndex));
  }, [subIndex, index, strings]);

  return (
    <span>{text}<span className="cursor" /></span>
  );
};

export default TypingEffect;
