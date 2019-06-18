import { ADD_NEW_NOTE } from './actionHandlers';

function addNewNote(id, noteText, tag) {
  return {
    type: ADD_NEW_NOTE,
    payload: {
      id,
      noteText,
      tag,
    },
  };
}

export default addNewNote;