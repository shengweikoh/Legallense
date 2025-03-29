import GoogleLogo from './Animation/Google.png';
import PropTypes from 'prop-types';


export default function GoogleCustomButton({ onClick }) {

const wrapperStyle = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:'10px',
    marginRight:'-100px',
    paddingRight:'100px'

}
  const buttonStyle = {
    background: 'white',
    color: '#444',
    width: '160px',
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
    fontFamily: "Roboto', sans-serif",
    flexGrow: 1,
    textAlign: 'center',
    marginLeft:'10px',
  };

  return (

    <div style ={wrapperStyle}>

    <span>Continue with</span>
    <button style={buttonStyle} onClick={onClick}>


        <img src={GoogleLogo} alt="Google logo" style={{
                width: '24px', // Adjusted size
                height: '24px',
                marginLeft:'-5px',
                }} />

      <span style={textStyle}>Google</span>
    </button>

    </div>


  );
}

GoogleCustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}