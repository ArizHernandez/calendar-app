import { useEffect, useState } from "react";

import { messagesEn } from "../helpers/calendar-messages-en";
import { messagesEs } from "../helpers/calendar-messages-es";
import { loadLanguage, saveLanguage } from "../helpers/loadAndSaveLenguage";

export const useMessageLanguage = () => {
  const [language, setLanguage] = useState(loadLanguage());
  const [messages, setMessages] = useState((language) ? messagesEs : messagesEn);
  const [calendarLanguage, setCalendarLanguage] = useState((language) ? 'es' : 'en-gb');
  
  useEffect(() => {
    
    if(language){
      setMessages(messagesEs);
      setCalendarLanguage('es');
    } else {
      setMessages(messagesEn);
      setCalendarLanguage('en-gb');
    }

  }, [language])

  const handleChangeLanguage = () => {
    setLanguage(!language);
    saveLanguage(!language);
  }

  return { handleChangeLanguage, calendarLanguage, messages, language }
} 