import React, { Component } from "react";
import AutoSuggest from "react-autosuggest";
import { prefix } from "../../internal/settings";

const getSuggestions = (values: any, value: any) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : values.filter((option: any) => option.toLowerCase().slice(0, inputLength) === inputValue);
};

type OwnAutoSuggestInputProps = {
  autoSuggestions?: any[];
  children: any;
  focusInputOnSuggestionClick: boolean;
  getSuggestions?: (...args: any[]) => any;
  getSuggestionValue?: (...args: any[]) => any;
  inputProps?: any;
  renderInputComponent?: React.ReactNode;
  renderSuggestion?: (...args: any[]) => any;
  suggestions?: any[];
};

type AutoSuggestInputState = any;

type AutoSuggestInputProps = OwnAutoSuggestInputProps & typeof AutoSuggestInput.defaultProps;

class AutoSuggestInput extends Component<AutoSuggestInputProps, AutoSuggestInputState> {
  static defaultProps = {
    getSuggestions,
  };

  state = {
    suggestions: this.props.suggestions || [],
  };

  // allow external control of suggestions
  componentDidUpdate(prevProps: AutoSuggestInputProps) {
    const { suggestions } = this.props;
    if (this.didSuggestionsChange(prevProps.suggestions, suggestions)) {
      this.setState({ suggestions });
    }
  }

  didSuggestionsChange(suggestions1: any, suggestions2: any) {
    return JSON.stringify(suggestions1) !== JSON.stringify(suggestions2);
  }

  onSuggestionsFetchRequested = ({ value }: any) => {
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
    const { children, getSuggestionValue, inputProps, renderInputComponent, renderSuggestion, ...rest } = this.props;
    const { suggestions } = this.state;

    return (
      <div className={`${prefix}--bmrg-auto-suggest`}>
        <AutoSuggest
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderInputComponent={
            children ? (inputProps: any) => children(inputProps) : renderInputComponent || undefined
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
