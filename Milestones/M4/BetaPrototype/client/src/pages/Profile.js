import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    IconButton
} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';

export default function Profile() {
    useEffect(() => {
        document.title = 'ReqCheck | Profile';
    }, []);

    return (<>
    
        <Box sx={{
            bgcolor: '#fff',
            width: '100%',
        }}>
            <Typography align='center' variant='h4' sx={{
                mt: 9,
                mb: 6,
                p: 3,
                width: '100%',
            }}>
                
            </Typography>  

           
        </Box>

        <Box>
        <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        alt="user profile img"
        height="140"
        src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
           User Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome User
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Email</Button>
        <Button size="small">Notifications</Button>
      </CardActions>
    </Card>  
        </Box>
    </>);
}

