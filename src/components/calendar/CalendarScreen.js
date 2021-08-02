import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import 'moment/locale/en-gb';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { LanguageButton } from './LanguageButton';
import { useMessageLanguage } from '../../hooks/useMessageLanguage';
import { openModal } from '../../actions/ui';
import { deleteEvent, setActiveEvent, unsetActiveEvent } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import './calendar.css';

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const {handleChangeLanguage, calendarLanguage, messages, language} = useMessageLanguage();
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
  const {events, activeEvent} = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  moment.locale(calendarLanguage);

  const handleModalOnView = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }
  
  const handleDelete = () => {
    dispatch(deleteEvent(activeEvent?.id));
  }
  
  const handleAddEvent = () => {
    dispatch(unsetActiveEvent())
    dispatch(openModal())
  }

  const handleModalSelect = (event) => {
    (activeEvent?.id) ? dispatch(unsetActiveEvent()) : dispatch(setActiveEvent(event));
  }
  
  const handleModalDobleClick = (e) => {
    dispatch(setActiveEvent(e))
    dispatch(openModal());
  }

  const handleEventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.bgColor,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      width: 'auto',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">

        <div className="language__button-container">
          <LanguageButton 
            language={language}
            handleChangeLanguage={handleChangeLanguage}
          />
        </div>

        <Calendar
          view={lastView}
          messages={messages}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onView={handleModalOnView}
          onSelectEvent={handleModalSelect}
          eventPropGetter={handleEventPropGetter}
          onDoubleClickEvent={handleModalDobleClick}
          components={{
            event: CalendarEvent
          }}
        />
    
        <CalendarModal />
        <AddNewFab
          color="primary"
          icon="fa-plus"
          position="right"
          action={handleAddEvent}
        />

        {
          activeEvent?.id 
          && (
            <AddNewFab
              color="danger"
              icon="fa-trash"
              position="left"
              action={() => handleDelete()}
            />
          )
        }
        
      </div>
    </div>
  )
}
