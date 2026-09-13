import React from 'react';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'There was an error, please try again...' 
}) => {
  return (
    <div className={css.container}>
      <p className={css.text}>{message}</p>
    </div>
  );
};