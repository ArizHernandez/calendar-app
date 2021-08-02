export const saveLanguage = (language) => {
  localStorage.setItem('language', language);
}

export const loadLanguage = () => {
  const languageOptions = localStorage.getItem('language') || false;

  return JSON.parse(languageOptions);
}