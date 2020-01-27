import uuid from 'uuid';
import moment from 'moment';

const notesReducer = (state = {
  notes: []
}, action) => {
  let note;
  const formatTimestamp = 'ddd, MMM Do - h:mm a';

  switch (action.type) {

    case 'ADD_NOTE':
      note = {
        content: action.content,
        timestamp: moment().format(formatTimestamp),
        id: uuid()
      }
      return {
        ...state,
        notes: [ ...state.notes, note ]
      }

    case 'REMOVE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.skillId)
      }

    case 'ADD_NOTES':
      console.log(action.notes);
      return { ...state, notes: action.notes, loading: false }

    case 'ADD_SKILL':
      console.log('add skill received by notesReducer');
      const content = `${action.dogName} started learning ${action.skill.name}`;
      const timestamp = moment().format(formatTimestamp);
      note = {
        content: content,
        timestamp: timestamp
      }
      return { ...state, notes: [ ...state.notes, note ] }

    default:
      return state;
  }
}

export default notesReducer;
