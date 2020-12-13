import { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const nowDate = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = nowDate.clone().add(1, 'hours');

const CalendarModal = () => {
  // const [isOpen, setIsOpen] = useState(true);
  const [dateStart, setDateStart] = useState(nowDate.toDate());
  const [dateEnd, setDateEnd] = useState(endDate.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: nowDate.toDate(),
    end: endDate.toDate(),
  });

  const { title, notes, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    console.log('modal cerrado');
    // setIsOpen(false);
  };

  const startDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const endDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones del formulario
    const mStart = moment(start);
    const mEnd = moment(end);

    if (mStart.isSameOrAfter(mEnd))
      return Swal.fire({
        title: 'Error',
        text: 'La fecha de termino debe ser mayor.',
        icon: 'error',
      });

    if (title.length < 2) return setTitleValid(false);

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      closeTimeoutMS={300}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>Nuevo evento</h1>
      <hr />
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            onChange={startDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora de termino</label>
          <DateTimePicker
            onChange={endDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Título y notas</label>
          <input
            value={title}
            onChange={handleInputChange}
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            values={notes}
            onChange={handleInputChange}
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="3"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
