import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

import { closeModal } from '../../actions/ui'
import { customStyles } from '../../helpers/centerModalStyles';
import { createNewEvent, unsetActiveEvent, updateEvent } from '../../actions/calendar';
import { useFormDate } from '../../hooks/useFormDate';
import './calendarModal.css';

Modal.setAppElement('#root');
const today = moment();
const now = moment().minute(0).seconds(0).add(1, 'hour');
const nowToEndDate = now.clone().add(1, 'hour');

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const {ui, calendar} = useSelector(state => state);
  const {modalState} = ui;
  const {activeEvent} = calendar;
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowToEndDate.toDate());
  const validFormInitState = {
    titleValid: null, 
    notesValid: null
  }
  const [validForm, setValidForm] = useState(validFormInitState);
  const [formState, handleInputChange, handleDateChange, handleResetForm] = useFormDate({
    title: activeEvent.title || '',
    notes: activeEvent.notes || '',
    start: activeEvent.start || now.toDate(),
    end:   activeEvent.end || nowToEndDate.toDate()
  });

  const {title, notes, start, end} = formState;
  const {titleValid, notesValid} = validForm;


  // Cerrar el modal, vaciar el formulario y eliminar la nota activa
  const handleCloseModal = () => {
    dispatch(unsetActiveEvent());
    dispatch(closeModal());
    handleResetForm();
    setValidForm(validFormInitState);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(closeModal());

    // Bloquear si al validar la fecha de inicio es igual o mayor a la fecha final 
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if(momentStart.isSameOrAfter(momentEnd)){
      return Swal.fire('Upss', "Start date can't be same or after to End date", 'error');
    }
    
    // Validar Que el titulo y las notas no estén vacias
    if(title.trim().length < 2 || notes.trim().length < 2){
      return Swal.fire('Error', 'Please, Complete the Form', 'error');
    }

    // Subir o editar las notas y cerrar el modal
    if(activeEvent?.id){
      dispatch( updateEvent({
        ...formState, 
        id: activeEvent.id,
        user: {
          _id: '1',
          name: 'Ariz'
        } 
      }));
    } else {
      dispatch(createNewEvent({
        ...formState,
        id: new Date().getTime(),
        user: {
          _id: '1',
          name: 'Ariz'
        }
      }));
    }

    handleCloseModal();
  }

  // Validar el input
  const handleValidInput = ({target}) => {
    if(target.value.trim().length < 2){
      return setValidForm({
        ...validForm,
        [target.name+'Valid']: true
      }); 
    }
    return setValidForm({
      ...validForm,
      [target.name+'Valid']: false
    });
  }

  // Validar la fecha de inicio
  const handleStartDateChange = (date) => {    
    setStartDate(date);
    handleDateChange('start', date);
  }
  
  // Validar la fecha final
  const handleEndDateChange = (date) => {
    if(date < startDate) return;
    
    // Si la fecha de final es valida, guardar esta fecha
    setEndDate(date);
    handleDateChange('end', date);
  }
  
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={handleCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 className="text-center bg-primary pb-2 mb-0 text-white rounded-top shadow">New Event</h1>
      <hr  className="mt-0"/>
      <form 
        className="container"
        onSubmit={handleSubmitForm}
      >

          <div className="form-group">
              <label>Date & hour start</label>
              <DatePicker 
                selected={startDate} 
                minDate={today.toDate()}
                onChange={handleStartDateChange} 
                disabledKeyboardNavigation
                className="form-control"
                showTimeInput
              />
          </div>

          <div className="form-group">
              <label>Date & hour end</label>
              <DatePicker 
                selected={endDate} 
                minDate={startDate}
                onChange={handleEndDateChange} 
                disabledKeyboardNavigation
                className="form-control"
                showTimeInput
              />
          </div>

          <hr />
          <div className="form-group">
              <label>Title & note</label>
              <input 
                  type="text" 
                  className={`form-control ${(titleValid) ? 'is-invalid': (!titleValid && titleValid !== null) && 'is-valid'}`} 
                  placeholder="Event Title"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={handleInputChange}
                  onKeyUp={handleValidInput}
                  onBlur={handleValidInput}
                  required
              />
              <small id="emailHelp" className="form-text text-muted">A little description</small>
          </div>

          <div className="form-group">
              <textarea 
                  type="text" 
                  className={`form-control ${(notesValid) ? 'is-invalid': (!notesValid && notesValid !== null) && 'is-valid'}`}
                  style={{resize: 'none'}}
                  placeholder="Notes"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}
                  onKeyUp={handleValidInput}
                  onBlur={handleValidInput}
                  required
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">More info</small>
          </div>

          <div className="d-grid gap-2 d-md-block text-center mt-4">
            <button
                type="submit"
                className="btn btn-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>
          </div>

      </form>
    </Modal>
  )
}
