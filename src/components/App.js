import React, { Component } from 'react';
import { connect } from 'react-redux';
// makes these available to mapDispatchToProps, so available on this.props
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {
  state = {
    text: '',
    dueDate: ''
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  addReminder = () => {
    const { text, dueDate } = this.state;
    this.props.addReminder(text, dueDate);
    this.setState({
      text: ''
    });
  };

  deleteReminder = id => {
    this.props.deleteReminder(id);
  };

  handleDateInput = e => {
    this.setState({
      dueDate: e.target.value
    });
  };

  clearReminders = () => {
    this.props.clearReminders();
  };

  renderReminders = () => {
    const { reminders } = this.props;
    return (
      <ul className="list-group" style={{ fontSize: '1.6rem', marginTop: 15 }}>
        {reminders.length > 1 && (
          <li
            key="clear"
            className="list-group-item"
            style={{ paddingBottom: 23, paddingRight: 32 }}
          >
            <span
              className="badge"
              style={{
                backgroundColor: 'white',
                cursor: 'pointer',
                color: 'red'
              }}
              onClick={this.clearReminders}
            >
              clear all
            </span>
          </li>
        )}
        {reminders.map(reminder => (
          <li key={reminder.id} className="list-group-item">
            <div className="list-group-item fontscale">
              {reminder.text}

              <span
                className="badge"
                style={{
                  backgroundColor: '#2D2D2D',
                  marginTop: 3,
                  cursor: 'pointer'
                }}
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </span>
              <div
                style={{
                  color: '#5D5D5D'
                }}
              >
                <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { text, dueDate } = this.state;
    return (
      <div className="App">
        <div className="title">
          <h1 className="simple">ReminderPro</h1>
        </div>
        <div className="divider" />
        <div className="content">
          <label>Add a Reminder</label>
          <div className="input-group with-button">
            <input
              value={text}
              className="form-control"
              onChange={this.handleInputChange}
              placeholder="Remind me to..."
            />
          </div>

          <label style={{ marginTop: 20 }}>Input date and time</label>
          <div className="input-group with-button">
            <input
              value={dueDate}
              className="form-control"
              type="datetime-local"
              onChange={this.handleDateInput}
              placeholder="Remind me to..."
            />
            <span className="input-group-btn">
              <button
                className="btn btn-warning
                "
                type="button"
                style={{ marginLeft: 4 }}
                onClick={this.addReminder}
              >
                Add Reminder
              </button>
            </span>
          </div>

          <div>{this.renderReminders()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}
// import { bindActionCreators } from 'redux';
// . . .
// replaced with shorthand object syntax belwo
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addReminder }, dispatch);
// }

// first argument null/mapStateToProps
export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders
})(App);
