import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import Downshift from "downshift";
import debounce from "lodash/debounce";
import { useQuery } from "react-query";
import { InlineLoading } from "carbon-components-react";
import { TextInput } from "../TextInput";
import { settings } from 'carbon-components';

const { prefix } = settings;

export default function ServiceAutocompleteInput(props) {
  const { handleChange, enableOptions, isExternalValid, optionsResolver, optionsUrl, dataToOptionsArray, successMessage, onSelect, ...textInputProps } = props;
  const [optionsQuery, setOptionsQuery] = useState("");
  const [externallyValidated, setExternallyValidated] = useState(isExternalValid);
  /** Get auto complete options */
  const getOptionsUrl = optionsUrl({
    query: optionsQuery,
  });

  const queryOptions = useQuery({
    queryKey: getOptionsUrl,
    queryFn: optionsResolver(getOptionsUrl),
    enabled: false,
  });

  // Open menu on search focus only when there is a value
  const handleSearchFocus = (e, openMenu) => {
    if (e.target.value) {
      openMenu();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchRequest = useCallback(
    debounce(() => {
      if (optionsQuery) {
        queryOptions.refetch();
      }
    }, 300),
    [queryOptions]
  );

  const optionsArray = 
    dataToOptionsArray 
      ? dataToOptionsArray(queryOptions?.data??[])
      : queryOptions?.data?.suggest["autocomplete-fuzzy"]?.length > 0
        ? queryOptions?.data?.suggest["autocomplete-fuzzy"].reduce(
            (acc, obj) => (obj?.options ? [...acc, ...obj?.options] : [...acc]),
            []
          )
        : [];

  return (
    <div className={`${prefix}--bmrg-service-autocomplete__container`}>
      <div className={`${prefix}--bmrg-service-autocomplete__input-container`}>
        <Downshift onSelect={onSelect}>
          {(downshiftProps) => {
            const { getInputProps, getRootProps, getItemProps, getMenuProps, isOpen, openMenu } = downshiftProps;
            return (
              <div className={`${prefix}--bmrg-service-autocomplete__downshift`}>
                <div {...getRootProps({}, { suppressRefError: true })}>
                  <TextInput
                    {...getInputProps({
                      ...textInputProps,
                      onFocus: (e) => handleSearchFocus(e, openMenu),
                      onChange: (e) => {
                        handleChange(e);
                        setOptionsQuery(e.target.value);
                        setExternallyValidated(false);
                        if (e.target.value && enableOptions) {
                          debouncedSearchRequest();
                        }
                      },
                    })}
                  />
                </div>
                {isOpen &&
                  (Boolean(optionsArray.length) ? (
                    <div className={`${prefix}--bmrg-service-autocomplete__options-container`}>
                      <ul {...getMenuProps({ className: `${prefix}--bmrg-service-autocomplete__options`})}>
                        {optionsArray.map((option, index) => {
                          return (
                            <li
                              {...getItemProps({
                                className: `${prefix}--bmrg-service-autocomplete__option`,
                                item: option.text,
                                key: index,
                                id: index,
                                index,
                              })}
                            >
                              {option.text}
                            </li>
                          );
                        })}
                        <li
                          {...getItemProps({
                            className: cx(`${prefix}--bmrg-service-autocomplete__option`, `${prefix}--bmrg-service-autocomplete__option-use`),
                            item: optionsQuery,
                            key: optionsArray.lenght,
                            id: optionsArray.lenght,
                            index: optionsArray.lenght,
                          })}
                        >
                          {`Use ${optionsQuery}`}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    optionsQuery && (
                      <div className={`${prefix}--bmrg-service-autocomplete__options-container`}>
                        <ul {...getMenuProps({ className: `${prefix}--bmrg-service-autocomplete__options` })}>
                          <li
                            {...getItemProps({
                              className: cx(`${prefix}--bmrg-service-autocomplete__option`, `${prefix}--bmrg-service-autocomplete__option-use`),
                              item: optionsQuery,
                              key: optionsArray.lenght,
                              id: optionsArray.lenght,
                              index: optionsArray.lenght,
                            })}
                          >
                            {`Use ${optionsQuery}`}
                          </li>
                        </ul>
                      </div>
                    )
                  ))}
              </div>
            );
          }}
        </Downshift>
        {externallyValidated && <InlineLoading status="finished" className={`${prefix}--bmrg-service-autocomplete__validity-status`} description="" />}
      </div>
      <p className={cx(`${prefix}--bmrg-service-autocomplete__message`, { [`${prefix}--bmrg-service-autocomplete__message-is-valid`]: externallyValidated })}>
        {successMessage}
      </p>
    </div>
  );
}

ServiceAutocompleteInput.propTypes = {
  dataToOptionsArray: PropTypes.func,
  enableOptions: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  isExternalValid: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  optionsResolver: PropTypes.func.isRequired,
  optionsUrl: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
};

ServiceAutocompleteInput.defaultProps = {
  enableOptions: true,
  isExternalValid: false,
  successMessage: "Field successfully updated",
};
