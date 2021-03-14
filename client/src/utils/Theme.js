import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: 'red',
            },
        },
        MuiPickersDay: {
            day: {
                color: 'black',

            },
            daySelected: {
                backgroundColor: '#33abb6',
            },
            dayDisabled: {
                color: '#ccc',
            },
            current: {
                color: 'red',
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: '#33abb6', 
                backgroundColor: 'YOUR HEX HERE',
            },
        },
  },
});

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  );
}