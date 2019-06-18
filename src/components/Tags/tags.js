import React from 'react';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupDisplayed: false,
    };
  }

  render() {
    return (
      <div>
        <p>Tags</p>
      </div>
    ) 
  }
} 

export default Tags;