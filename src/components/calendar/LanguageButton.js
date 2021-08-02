import React from 'react';
import PropTypes from 'prop-types';

import englishImage from '../../assets/images/english.svg';
import spainImage from '../../assets/images/spain.svg';
import './languageButton.css';

export const LanguageButton = ({
  language,
  handleChangeLanguage
}) => {

  return (
    <button
      className="language__btn ms-auto"
      onClick={handleChangeLanguage}
      style={{
        backgroundImage: `url(${language ? spainImage : englishImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
    </button>
  )
}

LanguageButton.propTypes = {
  language: PropTypes.bool.isRequired,
  handleChangeLanguage: PropTypes.func.isRequired
}