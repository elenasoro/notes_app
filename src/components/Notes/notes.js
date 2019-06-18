import React from 'react';
import addNewNote from '../../store/actions/actionAddNewNote';
import editNote from '../../store/actions/actionEditNote';
import deleteNote from '../../store/actions/actionDeleteNote';
import ContentEditable from 'react-contenteditable'

import { connect } from 'react-redux';



class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();

    this.state = {
      showAddNoteInput: false,
      noteToSave: '',
      tagToSave: '',
      idToEdit: '',
      errorMessage: '', 
      filteredByTag: '',
      inputValue: '',
    };
    
    this.displayInput = this.displayInput.bind(this);
    this.returnForm = this.returnForm.bind(this);
    this.addNote = this.addNote.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
    this.filterArray = this.filterArray.bind(this);
    this.saveFilteredTag = this.saveFilteredTag.bind(this);
    this.displayResetFilters = this.displayResetFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.editNote = this.editNote.bind(this);
    this.returnNotesTable = this.returnNotesTable.bind(this);
    this.handleNoteInputChange = this.handleNoteInputChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkForTags = this.checkForTags.bind(this);
    this.returnAdditionalOption = this.returnAdditionalOption.bind(this);
  }

  displayInput() {
    this.setState({
      showAddNoteInput: true,
    })
  }

  addNote(event) {
    event.preventDefault();  

    const { notes } = this.props;
    const { noteToSave, tagToSave, idToEdit } = this.state;

  
    const newIndex = !idToEdit ? String(notes.length + 1) : idToEdit;
    const newNoteName = noteToSave
    const newTagName = tagToSave;

    if(newNoteName && newTagName) {
      if(!idToEdit){
        this.props.addNote(newIndex, newNoteName, newTagName);
        this.setState({
          showAddNoteInput: false,
          errorMessage: '',
          noteToSave: '',
          tagToSave: '',
          idToEdit: '',
          successMessage: '',
        })
        this.addForm.reset();
      } else {
        this.props.editNote(idToEdit, newNoteName, newTagName);
        this.setState({
          showAddNoteInput: false,
          errorMessage: '',
          noteToSave: '',
          tagToSave: '',
          idToEdit: '',
        })
        this.addForm.reset();
      }
      
    } else {
      this.setState({
        errorMessage: 'Both fields are required'
      })
    }
  }

  displayErrorMessage() {
    if(this.state.errorMessage !== ''){
      return (
        <p className="error_message">{this.state.errorMessage}</p>
      )
    }
  }

  filterArray(arr){
    const { filteredByTag } = this.state;

    if(filteredByTag){
      const filteredNotes = arr.filter(note => note.tag === filteredByTag)
      return filteredNotes;
    } else return arr;
  }

  saveFilteredTag(e){
    this.setState({
      filteredByTag: e.target.textContent
    })
  }

  handleNoteInputChange(event) {
    this.setState({
      noteToSave:event.target.value
    })
  }

  handleSelectChange(event) {
    this.setState({
      tagToSave:event.target.value
    })
  }

  checkForTags(event) {
    const hashtagRegExp = /(#[a-z0-9][a-z0-9\-_]*)/;
    const newTag = event.target.value.match(hashtagRegExp)
    if(newTag){
      this.setState({
        tagToSave: newTag[0].substring(1)
      })
    }
  }

  returnAdditionalOption(){
    const newTag = this.state.tagToSave
    const { notes } = this.props

    function isEquelToNewTag(item){
      return item.tag === newTag
    }

    if(!notes.some(isEquelToNewTag)){
      return <option value={newTag}>{newTag}</option>
    }

  }

//   getHighlightedText() {
//       const text = this.state.noteToSave
//       const notesArr = this.props.notes
//       let parts = text.split(new RegExp(`(${notesArr[0].tag})`, 'gi'));
//       const html = parts.map(part => part.toLowerCase() === notesArr[0].tag.toLowerCase() ? `<span class='highlight'>${part}</span>` : part).join('')
//       return html
// }

  returnForm() {
    if(this.state.showAddNoteInput) {
      return (
        <form 
        className="new_note_form" 
        onSubmit={this.addNote}
        ref={input => this.addForm = input}>
          <label htmlFor="newNoteInput">Note:</label>

     
          <input 
            value={this.state.noteToSave}
            type="text" 
            id="newNoteInput"
            onChange={this.handleNoteInputChange}
            onBlur={this.checkForTags}
            ref={input => this.note = input}>        
          </input>
          
          {/* <ContentEditable
            className="note_input_highlightable"
            innerRef={this.contentEditable}
            html={this.getHighlightedText()} 
            disabled={false}
            onChange={this.handleNoteInputChange}
            tagName='div' 
            onBlur={this.checkForTags}
          /> */}
   
          <label htmlFor="newTagInput">Tag:</label>

          <select value={this.state.tagToSave} onChange={this.handleSelectChange}>
            {this.props.notes.map(item =>{
              return (
                <option value={item.tag}>{item.tag}</option>
                )}
              )}
              {this.returnAdditionalOption()}
          </select>

          {this.displayErrorMessage()}
          <button type="submit">Add</button>
        </form>
      )
    } else return null;
  }

  displayResetFilters() {
    if(this.state.filteredByTag) {
      return (
        <button className="reset_button" onClick={this.resetFilters}>Reset Filters</button>
      )
    }
  }

  resetFilters(){
    this.setState({
      filteredByTag: ''
    })
  }

  editNote(item){

    this.displayInput()

    this.setState({
      idToEdit: item.id,
      noteToSave: item.noteText,
      tagToSave: item.tag,
    })
  }

  deleteNote(index){

    this.props.deleteNote(index);
    this.setState({
      successMessage: 'success',
    })
  }

  returnNotesTable(){
    const { notes } = this.props;
    let notesTable = (
      <div className="notes_table">
        <ul>
          {this.filterArray(notes).map((noteItem, index)=>{
            return (
              <li>
                <div className="table_row">
                  <div className="note_title">{noteItem.noteText}</div>
                  <div className="note_tag">
                    <div>
                      <button 
                      onClick={this.saveFilteredTag}
                      >
                        {noteItem.tag}
                      </button>
                    </div>
                  </div>
                  <div className="note_buttons">
                    <button onClick={() => {this.deleteNote(index)}}>
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <button onClick={() => {this.editNote(noteItem)}}>
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
    return notesTable;
  }

  render() {
    
    return (
      <React.Fragment>
      {this.displayResetFilters()}
      <div>
        {this.returnNotesTable()}
      </div>
      <button className="add_note" onClick={this.displayInput}>Add New Note</button>
      {this.returnForm()}
      
      </React.Fragment>
    ) 
  }
} 

const mapStateToProps = (state) => {
  return {
    notes: state.notesReducer.notes,
  }
};

function mapDispatchToProps(dispatch){
  return {
    addNote: (id, noteText, tag) => {
      dispatch(addNewNote(id, noteText, tag))
    },
    editNote: (id, noteText, tag) => {
      dispatch(editNote(id, noteText, tag))
    },
    deleteNote: (id) => {
      dispatch(deleteNote(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);