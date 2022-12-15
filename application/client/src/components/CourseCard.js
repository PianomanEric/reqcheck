
import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import { decodeCourseID } from '../util/FormatData';
import axios from 'axios';

export default function Course(props) {
    //const [courseData, setCourseData] = useState();
    const courseData = props.courseData;

    return (
        <Box sx={{
            bgcolor: '#fff',
            p: 4,
        }}>
            {courseData ? <>
                <Typography gutterBottom align='center' variant='h4' sx={{
                    width: '100%',
                }}>
                    {`${decodeCourseID(courseData.courseID)} - ${courseData.title}`}
                </Typography>
                <Typography gutterBottom align='center' variant='h5' sx={{
                    width: '100%',
                }}>
                    (San Francisco State University)
                </Typography>
                <Typography gutterBottom align='center' variant='h5' sx={{
                    width: '100%',
                }}>
                    {`Credits: ${courseData.unit}`}
                </Typography>
                <Typography gutterBottom sx={{
                    width: '100%',
                    fontWeight: 'bold',
                }}>
                    Description:
                </Typography>
                <Typography gutterBottom sx={{
                    width: '100%',
                }}>
                    {courseData.description}
                </Typography>
            </> : undefined}
        </Box>
    );
}