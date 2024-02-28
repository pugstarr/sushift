import { createTheme } from '@mui/material/styles';

// create a theme for light mode only
const getTheme = () => createTheme({
    palette: {
        // palette values for light mode
        primary: { main: '#556cd6' },
        secondary: { main: '#19857b' },
        mode: 'light', 
    },
    typography: {
        fontFamily: 'Open Sans, Arial, sans-serif',
    },
    components: {
        // customizations for MUI components
    },
});

export default getTheme;
