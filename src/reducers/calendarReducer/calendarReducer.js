import { Types } from "../../types/types";
import moment from 'moment';

const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: "#548827",
    notes: 'Comprar el pastel',
    user: {
      _id: '123',
      name: 'Ariz'
    }
  }],
  activeEvent: {}
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.calendarDelete:
      return ({
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
        activeEvent: {}
      });
    
    case Types.calendarUpdate: 
      return ({
        ...state,
        events: state.events.map(event => (event.id === action.payload.id) ? action.payload : event)
      });

    case Types.calendarSetActive:
      return ({
        ...state,
        activeEvent: action.payload
      });

    case Types.calendarUnsetActive:
      return ({
        ...state,
        activeEvent: {}
      })

    case Types.calendarNewEvent:
      return ({
        ...state,
        events: [...state.events, action.payload]
      })

    default:
      return state;
  }
}