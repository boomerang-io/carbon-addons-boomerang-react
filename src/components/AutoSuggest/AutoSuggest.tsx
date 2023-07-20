import React, { Component } from "react";
import AutoSuggest, { ChangeEvent, RenderSuggestionsContainerParams } from "react-autosuggest";
import { matchSorter as ms } from "match-sorter";
import { prefix } from "../../internal/settings";

const SELECT_METHODS = ["up", "down", "click"];

interface Suggestion {
  label: string;
  value: string;
}

// Omit the functions we define in the component itself
type AutoSuggestProps = Omit<
  AutoSuggest.AutosuggestPropsBase<Suggestion>,
  "getSuggestionValue" | "onSuggestionsFetchRequested" | "renderSuggestion" | "inputProps"
> & {
  autoSuggestions: Suggestion[];
  children: React.ReactElement;
  initialValue?: string;
  onChange: (newValue: string) => void;
  inputProps: any;
};

interface AutoSuggestState {
  value: string;
  caretIndex: number;
  suggestions: Suggestion[];
  lastSuggestion?: string;
}

class AutoSuggestBmrg extends Component<AutoSuggestProps, AutoSuggestState> {
  inputRef = React.createRef<HTMLInputElement>();

  state = {
    // Used if we want to have some of the functions external instead of
    // the default ones in the wrapper
    value: this.props.initialValue ?? "",
    caretIndex: 0,
    suggestions: [],
    lastSuggestion: "",
  };

  // Each time the component updates we want to refocus the input and keep the cursor in the correct place
  // Needed for when cycling through mutliple suggestions with the arrow keys and the cursor resets to the end of the input. We don't want that.
  componentDidUpdate(_: AutoSuggestProps, prevState: AutoSuggestState) {
    if (this.state.value && prevState.value !== this.state.value) {
      // prevent it from focusing on initial render / empty
      this.inputRef.current?.focus();
      this.inputRef.current?.setSelectionRange(this.state.caretIndex, this.state.caretIndex);
    }
  }

  renderSuggestion = (suggestion: Suggestion) => suggestion.label;

  onSuggestionsFetchRequested = () => {
    this.setState(() => ({
      suggestions: this.getSuggestions(),
    }));
  };

  /**
   * More logic here for handling a user cycling through suggestions
   * Move the caret to the new suggestion location or use the reference to the DOM element.
   * Shift based on the change in length of the value b/c of different length suggestions
   */

  onInputChange = (event: React.FormEvent<HTMLElement>, { newValue, method }: ChangeEvent) => {
    this.setState((prevState: AutoSuggestState) => {
      const caretIndex = SELECT_METHODS.includes(method)
        ? prevState.caretIndex + (newValue.length - prevState.value.length)
        : this.inputRef.current?.selectionStart ?? 0;
      if (prevState.lastSuggestion === this.state.lastSuggestion) {
        return {
          value: newValue,
          caretIndex: caretIndex,
          /**
           * Resets the last suggestion when there is no suggestion focused to
           * avoid replacing previously selected suggestions
           */
          lastSuggestion: "",
        };
      } else {
        return {
          value: newValue,
          caretIndex: caretIndex,
        };
      }
    });
    this.props.onChange(newValue);
  };

  /**
   * Return the new value for the input
   * Find the current caret position
   * get the string up to that point
   * find the last word (space-delimited) and replace it in input
   */
  getSuggestionValue = (suggestion: Suggestion) => {
    // Set the latest suggestion so we can verify changes on the input
    this.setState({ lastSuggestion: suggestion.value });
    const { value, lastSuggestion, caretIndex } = this.state;
    const substringWordList = this.findWordsBeforeCurrentLocation();
    /*
     * Find the position of the caret, get the string up to that point
     * and find the index of the last word or suggestion in that substring
     * This gives use the word to suggest matches for
     */
    const closestWord = substringWordList.at(-1) as string;
    const valueSlice = value.slice(0, caretIndex);
    // Need to check for suggestions since this one can have spaced values
    const suggestionPosition = valueSlice.lastIndexOf(lastSuggestion);
    const closestWordPosition = valueSlice.lastIndexOf(closestWord);
    // If we have no suggestion, just use the position of the closest word
    const position = !lastSuggestion || suggestionPosition < 0 ? closestWordPosition : suggestionPosition;
    const wordToReplace = !lastSuggestion || suggestionPosition < 0 ? closestWord : lastSuggestion;

    // Sub in the new property suggestion
    return (
      value.substring(0, position) + suggestion.value + value.substring(position + wordToReplace.length)
    );
  };

  getSuggestions = () => {
    const substringWordList = this.findWordsBeforeCurrentLocation();

    // Prevent empty string from matching everyhing
    const closestWord = substringWordList.at(-1);
    return !closestWord
      ? []
      : ms(this.props.autoSuggestions, closestWord, {
          // Use match-sorter for matching inputs
          keys: [{ key: "value" }],
        });
  };

  // Get array of distinct words prior to the current location of entered text
  // Use the inputRef instead of state becuase of asnychronous updating of state and calling of these functions :(
  findWordsBeforeCurrentLocation = () => {
    return this.inputRef.current?.value
      .slice(0, this.inputRef.current?.selectionStart ?? undefined)
      .split(" ") as string[];
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      lastSuggestion: "",
    });
  };

  render() {
    const { inputProps, children, ...rest } = this.props;

    const finalInputProps = {
      ...inputProps,
      onChange: this.onInputChange,
      value: this.state.value,
    };

    return (
      <div className={`${prefix}--bmrg-auto-suggest`}>
        <AutoSuggest
          getSuggestionValue={this.getSuggestionValue}
          inputProps={finalInputProps}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderInputComponent={(props) => React.cloneElement(children, { ...props, ref: this.inputRef })}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          suggestions={this.state.suggestions}
          {...rest}
        />
      </div>
    );
  }
}

// Needed to add aria-label for a11y
function renderSuggestionsContainer({ containerProps, children, ...rest }: RenderSuggestionsContainerParams) {
  return (
    <div aria-label="AutoSuggest listbox" {...containerProps} {...rest}>
      {children}
    </div>
  );
}

export default AutoSuggestBmrg;
