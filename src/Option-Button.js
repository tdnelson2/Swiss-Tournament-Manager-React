import React from 'react';

function OptionButton(props) {
  return (
    <button
      onClick={props.onClick}
      style={{transform: 'rotate(180deg)'}}
    >^</button>
  );
}

export default OptionButton;
