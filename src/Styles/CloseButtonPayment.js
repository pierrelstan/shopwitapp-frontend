import styled from 'styled-components';

const CloseButtonPayment = styled.button`
  font-size: 1rem;
  border: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 2;
  right: 20px;
  top: 10px;
  background-color: #cb436b;
  color: '#fff';

  @media (max-width: 430px) {
    font-size: 1rem;
    right: 10px;
    width: 40px;
    height: 40px;
  }
`;

export default CloseButtonPayment;
