import PropTypes from 'prop-types';
import LogoSabatae from '@/assets/images/Logo.png';

const Logo = ({ size }) => {
  return <img src={LogoSabatae} alt="Sabbatae" width={size || 55} />;
};

Logo.propTypes = {
  size: PropTypes.number,
};

export default Logo;
