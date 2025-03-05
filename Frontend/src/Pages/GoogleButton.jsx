import React from 'react';
import GoogleLogo from './Animation/Google.png';



export default function GoogleCustomButton({ onClick }) {
  const buttonStyle = {
    display: 'inline-block',
    background: 'white',
    color: '#444',
    width: '410px',
    borderRadius: '10px',
    border: 'thin solid #888',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    height:'52px',
  };


  const textStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: "Roboto', sans-serif",
    flexGrow: 1,
    textAlign: 'center',
    marginLeft:'10px',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>


<img src={GoogleLogo} alt="Google logo" style={{
          width: '24px', // Adjusted size
          height: '24px',
          marginLeft:'-5px',
        }} />

      <span style={textStyle}>Sign in with Google</span>
    </button>
  );
}
