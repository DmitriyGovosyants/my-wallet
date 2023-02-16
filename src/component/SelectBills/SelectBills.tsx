import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blue } from '@mui/material/colors';

export const SelectBills = () => {
  const [bill, setBill] = useState('');
  console.log(bill)

  const handleChange = (event: SelectChangeEvent) => {
    setBill(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        sx={{
          color: blue[50],
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: blue[500],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[500],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[500],
          },
          '.MuiSvgIcon-root ': {
            fill: blue[50],
          }
        }}
        value={bill}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value=""><b>All bills</b></MenuItem>
        <MenuItem value='Cash'>Cash</MenuItem>
        <MenuItem value='Credit'>Credit</MenuItem>
        <MenuItem value='Deposit'>Deposit</MenuItem>
      </Select>
    </FormControl>
  );
}