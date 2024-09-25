import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Linked() {
  return (
    <div role="presentation" onClick={handleClick}>

      <Breadcrumbs aria-label="breadcrumb">
        


        <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', fontSize:"14Px" }}>Consultation</Typography>

      </Breadcrumbs>
    </div>
  );
}
