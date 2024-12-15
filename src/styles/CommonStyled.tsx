import styled, { keyframes } from 'styled-components';

// Animação de deslizamento para a notificação
const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Notificação de erro centralizada
export const ErrorNotification = styled.div`
  position: fixed;
  top: 0; /* Posiciona no topo da tela */
  left: 0; /* Posiciona à esquerda da tela */
  right: 0; /* Extende até a direita da tela */
  bottom: 0; /* Preenche toda a altura */
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  z-index: 9999; /* Garante que a notificação apareça acima de outros elementos */
`;

export const NotificationContent = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  max-width: 80%;
  text-align: center;
  animation: ${slideDown} 0.5s ease forwards;

  @media (min-width: 768px) {
    font-size: 18px;
    max-width: 60%;
  }
`;


// Notificação de erro centralizada
export const WarningNotification = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  right: 0; 
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
`;

export const WarningNotificationContent = styled.div`
  background-color: #fbeaaa;
  color: #919602;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  max-width: 80%;
  text-align: center;
  animation: ${slideDown} 0.5s ease forwards;

  @media (min-width: 768px) {
    font-size: 18px;
    max-width: 60%;
  }
`;


// Notificação de erro centralizada
export const SuccessNotification = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  right: 0; 
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
`;

export const SuccessNotificationContent = styled.div`
  background-color: #5ed573;
  color: #0cb528;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  max-width: 80%;
  text-align: center;
  animation: ${slideDown} 0.5s ease forwards;

  @media (min-width: 768px) {
    font-size: 18px;
    max-width: 60%;
  }
`;

export const BackButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background-color: green;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: green;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;