import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

function FormInput(props) {
	const handleSubmit = (e) => {
		props.onTextSubmit(e.target.value);
		e.preventDefault();
	}
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-name"
        label={props.placeholder}
        value={props.inputText}
        onChange={props.onInputTextChange}
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Add Player"
                onClick={handleSubmit}
              >
                <Add />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default FormInput;
