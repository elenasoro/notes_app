import { EDIT_NOTE } from './actionHandlers';

function editNote(id, noteText, tag) {
  return {
    type: EDIT_NOTE,
    payload: {
      id,
      noteText,
      tag,
    },
  };
}

export default editNote;