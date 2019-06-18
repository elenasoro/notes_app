import { ADD_NEW_NOTE } from '../actions/actionHandlers';
import { EDIT_NOTE } from '../actions/actionHandlers';
import { DELETE_NOTE } from '../actions/actionHandlers';

import NotesData from '../../data/notes.json';

const initialState = {
  notes: NotesData,
}

function notesReducer(state = initialState, action){

  switch (action.type) {
    case ADD_NEW_NOTE:
      return {
        ...state,
        notes: state.notes.concat(action.payload)
      };
    
    case EDIT_NOTE:  
      let newNotes = [];
      state.notes[action.payload.id - 1] = action.payload
      newNotes = state.notes;
      return {
        ...state,
        notes: newNotes
      }
    
    case DELETE_NOTE:
      let splicedNotes = [];
      state.notes.splice(action.payload.id, 1);
      splicedNotes = state.notes;
      return {
        ...state,
        notes: splicedNotes
      }

    default:
      return state;
  }
}

export default notesReducer;
