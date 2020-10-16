import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import { settings } from 'carbon-components';

const { prefix } = settings;

const getSuggestions = (values, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : values.filter((option) => option.toLowerCase().slice(0, inputLength) === inputValue);
};

class AutoSuggestInput extends Component {
  static propTypes = {
    autoSuggestions: PropTypes.array,
    children: PropTypes.node,
    getSuggestions: PropTypes.func,
    getSuggestionValue: PropTypes.func,
    inputProps: PropTypes.object,
    renderInputComponent: PropTypes.node,
    renderSuggestion: PropTypes.func,
    suggestions: PropTypes.array,
  };

  static defaultProps = {
    getSuggestions,
  };

  state = {
    suggestions: this.props.suggestions || [],
  };

  // allow external control of suggestions
  componentDidUpdate(prevProps) {
    const { suggestions } = this.props;
    if (this.didSuggestionsChange(prevProps.suggestions, suggestions)) {
      this.setState({ suggestions });
    }
  }

  didSuggestionsChange(suggestions1, suggestions2) {
    return JSON.stringify(suggestions1) !== JSON.stringify(suggestions2);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.props.getSuggestions(this.props.autoSuggestions, value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const {
      children,
      getSuggestionValue,
      inputProps,
      renderInputComponent,
      renderSuggestion,
      ...rest
    } = this.props;
    const { suggestions } = this.state;

    return (
      <div className={`${prefix}--bmrg-auto-suggest`}>
        <AutoSuggest
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderInputComponent={
            children ? (inputProps) => children(inputProps) : renderInputComponent || undefined
          }
          renderSuggestion={renderSuggestion}
          suggestions={suggestions}
          {...rest}
        />
      </div>
    );
  }
}

export default AutoSuggestInput;
