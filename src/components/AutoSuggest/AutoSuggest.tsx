import React, { Component } from "react";
import { matchSorter as ms } from "match-sorter";
import AutoSuggestInput, { AutoSuggestInputProps } from "./AutoSuggestInput";

const SELECT_METHODS = ["up", "down", "click"];

type Suggestion = { label: string; value: string };

interface Props {
  autoSuggestions: Suggestion[];
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  initialValue?: string;
  inputProps?: AutoSuggestInputProps;
  onChange?: (newValue: any) => any;
}

type State = {
  value: string;
  caretIndex: number;
  suggestions: any[];
};

class AutoSuggest extends Component<Props, State> {
  inputRef = React.createRef();

  state = {
    // Used if we want to have some of the functions external instead of
    // the default ones in the wrapper
    value: this.props.initialValue ?? "",
    caretIndex: 0,
    suggestions: [],
  };

  // Each time the component updates we want to refocus the input and keep the cursor in the correct place
  // Needed for when cycling through mutliple suggestions with the arrow keys and the cursor resets to the end of the input. We don't want that.
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.value && prevState.value !== this.state.value) {
      // prevent it from focusing on initial render / empty
      (this as any).inputRef.current?.focus();
      (this as any).inputRef.current?.setSelectionRange(this.state.caretIndex, this.state.caretIndex);
    }
  }

  renderSuggestion = (suggestion: Suggestion) => <div>{suggestion.label}</div>;

  /**
   * More logic here for handling a user cycling through suggestions
   * Move the caret to the new suggestion location or use the reference to the DOM element.
   * Shift based on the change in length of the value b/c of different length suggestions
   */

  onInputChange = (_: any, { newValue, method }: any) => {
    this.setState((prevState: any) => ({
      value: newValue,
      caretIndex: SELECT_METHODS.includes(method)
        ? prevState.caretIndex + (newValue.length - prevState.value.length)
        : (this as any).inputRef.current.selectionStart,
    }));
    if (typeof this.props.onChange === "function") {
      this.props.onChange(newValue);
    }
  };

  /**
   * Return the new value for the input
   * - Find the current caret position
   * - get the string up to that point
   * - find the last word (space-delimited) and replace it in input
   * -
   */
  getSuggestionValue = (suggestion: Suggestion) => {
    const inputWords = this.findWordsBeforeCurrentLocation();
    // const propertySuggestion = `\${p:${suggestion}}`;

    /*
     * Find the position of the caret, get the string up to that point
     * and find the index of the last word - i.e. the one the user entered
     */
    const pos = this.state.value.slice(0, this.state.caretIndex).lastIndexOf(inputWords[inputWords.length - 1]);

    // Sub in the new property suggestion
    return (
      this.state.value.substring(0, pos) +
      suggestion.value +
      this.state.value.substring(pos + inputWords[inputWords.length - 1].length)
    );
  };

  getSuggestions = () => {
    const inputWords = this.findWordsBeforeCurrentLocation();
    // Prevent empty string from matching everyhing
    const inputWord = inputWords.length ? inputWords[inputWords.length - 1] : "";
    return !inputWord
      ? []
      : ms(this.props.autoSuggestions, inputWord, {
          // Use match-sorter for matching inputs
          keys: [{ key: "value" }],
        });
  };

  // Get array of distinct words prior to the current location of entered text
  // Use the inputRef instead of state becuase of asnychronous updating of state and calling of these functions :(
  findWordsBeforeCurrentLocation() {
    return (this as any).inputRef.current.value.slice(0, (this as any).inputRef.current.selectionStart).split(" ");
  }

  render() {
    const { inputProps, children, ...rest } = this.props;
    const finalInputProps = {
      onChange: this.onInputChange,
      value: this.state.value,
      ...inputProps,
    };
    return (
      <AutoSuggestInput
        getSuggestionValue={this.getSuggestionValue}
        inputProps={finalInputProps}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        focusInputOnSuggestionClick={false}
        {...rest}
      >
        {(inputProps: AutoSuggestInputProps) => React.cloneElement(children, { ...inputProps, ref: this.inputRef })}
      </AutoSuggestInput>
    );
  }
}

export default AutoSuggest;
