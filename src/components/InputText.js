import { TextField } from '@mui/material';

export const InputText = ({ label, onChange }) => {
  return (
    <div className = "input-text">
      <TextField
      sx={{
        width: { md: 500, marginBottom:50},
        "& .MuiInputBase-root": {
            height: 300
        }
    }}
    label={label}
    multiline
    rows={10}
    fullWidth
    variant="outlined"
    onChange={onChange} 
    placeholder="Text"
    />
    </div>
  );
};
