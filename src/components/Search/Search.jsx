import React, { Component } from "react";
import "./Search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClicker = this.handleClick.bind(this);
  }

  // on change event to capture input value and set state
  handleChange(event) {
    this.setState({ value: event.target.value.toLowerCase() });
  }

  handleClick(city) {
    this.props.requestCityData(city);
    this.setState({
      value: ""
    });
  }

  // highlight input value
  highlighter(text) {
    const value = this.state.value;
    const textSub = text.substring(0, value.length);
    const textSlice = text.slice(value.length);
    return (
      <>
        <b>{textSub}</b>
        {textSlice}
      </>
    );
  }

  render() {
    const { value } = this.state;
    const { data } = this.props;

    let valueCheck = data.some(item =>
      item.city.toLowerCase().startsWith(value)
    );

    return (
      <div className="Search">
        <input
          className="Search__Input"
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder="Enter city name..."
        />

        {value && (
          <div className="Search__Results">
            <ul>
              {valueCheck ? (
                value &&
                data
                  .filter(item => {
                    return item.city.toLowerCase().startsWith(value);
                  })
                  .map((item, i) => {
                    return (
                      <li
                        key={item.city.replace(/\s/, "")}
                        onClick={() => this.handleClick(item.city)}
                      >
                        {this.highlighter(item.city)}
                      </li>
                    );
                  })
              ) : (
                <li>
                  Sorry, we can't find any city in the UK that matches your
                  search
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
