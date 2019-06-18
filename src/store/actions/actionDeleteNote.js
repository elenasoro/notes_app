import { DELETE_NOTE } from './actionHandlers';

function deleteNote(id) {
  return {
    type: DELETE_NOTE,
    payload: {
      id
    },
  };
}

export default deleteNote;