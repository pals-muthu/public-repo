import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UserCard = (props) => {
    console.log('props userInfo: ', props.userInfo);
    return (
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
             { props.userInfo.name }
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            { props.userInfo.login }
            </Typography>
                <Button size="small" color="primary">
                    Share
                </Button>
          </CardContent>
        </Box>
      </Card>
    );
    
}

export default UserCard;