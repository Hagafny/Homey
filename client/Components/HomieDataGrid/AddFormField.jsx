import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from './SelectBox';

const AddFormField = props => {
  let selectedInput;

  if (props.data.hasOwnProperty('dropdownOptions'))
    selectedInput = (
      <AddFormSelectInput
        name={props.data.key}
        handleInputChange={props.handleInputChange}
        options={props.data.dropdownOptions}
        dropDownName={props.data.name}
      />
    );
  else if (props.data.type === 'textarea')
    selectedInput = (
      <AddFormTextAreaInput name={props.data.key} handleInputChange={props.handleInputChange} />
    );
  else
    selectedInput = (
      <AddFormTextInput
        name={props.data.key}
        handleInputChange={props.handleInputChange}
        type={props.data.type ? props.data.type : 'text'}
      />
    );

  return (
    <div className="form-group">
      <label className="control-label" htmlFor={props.data.key}>
        {props.data.name}:
      </label>
      {selectedInput}
    </div>
  );
};

const AddFormTextInput = props => {
  return (
    <input
      type={props.type}
      className="form-control"
      name={props.name}
      onChange={props.handleInputChange}
    />
  );
};

const AddFormTextAreaInput = props => {
  return <textarea className="form-control" name={props.name} onChange={props.handleInputChange} />;
};

const AddFormSelectInput = props => {
  return (
    <SelectBox
      options={props.options}
      name={props.name}
      handleInputChange={props.handleInputChange}
      dropDownName={props.dropDownName}
    />
  );
};

AddFormField.propTypes = {};

export default AddFormField;
