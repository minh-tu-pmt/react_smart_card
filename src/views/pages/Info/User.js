import React, { useEffect } from 'react';
import style from './style.module.css';
import { makeStyles } from '@mui/styles';
import avatar from '../../../assets/avatar.jpg';
import { Container, Box, Grid } from '@mui/material';
import { Card, CardContent, Link } from '@mui/material';
import zalo_icon from '../../../assets/logo_zalo.png';
import fb_icon from '../../../assets/fb_icon.png';
import telegram_icon from '../../../assets/telegram_icon.png';
import email_icon from '../../../assets/email_icon.png';
import contact_icon from '../../../assets/contact_icon.jpg';
// import { database, ref, push, onValue } from './../../hook/firebase';

const useStyles = makeStyles({
    materialSymbolsOutlined: {
        fontFamily: "'Material Symbols Outlined'",
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: '24px',
        lineHeight: 1,
        letterSpacing: 'normal',
        textTransform: 'none',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        direction: 'ltr'
    },
    avatar: {
        borderRadius: '50%',
        width: 96,
        height: 96,
        objectFit: 'contain',
        filter: 'none'
    },
    wrapName: {
        display: 'grid',
        webkitBoxAlign: 'center',
        alignItems: 'center'
    },
    name: {
        margin: 0,
        color: 'rgb(8, 49, 112)',
        fontSize: 17,
        lineHeight: 1.5,
        fontWeight: 400,
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    desc: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        lineHeight: 1.5,
        fontSize: '15px',
        color: 'rgb(8, 49, 112)',
        fontWeight: 700
    },
    card: {
        borderRadius: '50px !important',
        letterSpacing: 'normal',
        boxSizing: 'inherit',
        margin: '0px',
        font: 'inherit',
        verticalAlign: 'baseline',
        position: 'relative',
        height: 'auto',
        zIndex: 0,
        overflow: 'hidden',
        marginBottom: '16px',
        border: '2px solid rgb(255, 255, 255)',
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(8, 49, 112)',
        boxShadow: 'rgba(8, 49, 112, 0.24) 0px 2px 8px 0px !important',
        transform: 'scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, box-shadow 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s',

        '&:hover': {
            boxShadow: 'rgb(8 49 112 / 24%) 0px 4px 12px 0px',
            transform: 'scale(1.01)'
        }
    },
    link_content: {
        flexGrow: 1,
        letterSpacing: 'normal',
        font: 'inherit',
        margin: '0px',
        border: 'none',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        textAlign: 'center',
        cursor: 'pointer',
        textDecoration: 'none !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        position: 'relative',
        // width: "100%",
        appearance: 'none',
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        hyphens: 'auto',
        whiteSpace: 'normal',
        background: 'none',
        color: 'rgb(8, 49, 112) !important',
        transition:
            'box-shadow 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, border-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, background-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s',
        paddingLeft: '66px',
        paddingRight: '66px'
    },
    card_content: {
        position: 'relative',
        padding: 10,
        '&:last-child': {
            padding: '10px !important'
        }
    },
    icon: {
        position: 'absolute',
        top: '-12px',
        width: '25px',
        height: '25px',
        left: '10px'
    }
});

function Main() {
    const classes = useStyles();

    useEffect(() => {
        console.log('first');
    }, []);

    return (
        <Container style={{ maxWidth: 680, minHeight: '100vh', paddingTop: '30px' }}>
            <Box sx={{ marginBottom: '2rem' }}>
                <Grid container alignItems="center" flexDirection="column">
                    <div className={style.fHsJuh}></div>
                    <Box sx={{ marginBottom: '16px' }}>
                        <img className={classes.avatar} src={avatar} alt="avatar"></img>
                    </Box>
                    <Box className={classes.wrapName}>
                        <h1 className={classes.name}>Phạm Minh Tú</h1>
                    </Box>
                    <Box className={classes.desc}>
                        <h2 style={{ font: 'inherit', margin: 0 }}>Software Engineer</h2>
                    </Box>
                </Grid>
            </Box>
            <Box>
                <Card className={classes.card}>
                    <CardContent className={classes.card_content}>
                        <Grid container alignItems="center">
                            <Box sx={{ width: '3rem', position: 'relative' }}>
                                <img src={zalo_icon} alt="zalo icon" className={classes.icon}></img>
                            </Box>
                            <Link className={classes.link_content} target="_blank" href="https://zalo.me/84941040675">
                                Zalo
                            </Link>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent className={classes.card_content}>
                        <Grid container alignItems="center">
                            <Box sx={{ width: '3rem', position: 'relative' }}>
                                <img src={fb_icon} alt="zalo icon" className={classes.icon}></img>
                            </Box>
                            <Link className={classes.link_content} target="_blank" href="https://www.facebook.com/phamminhtu1402/">
                                Facebook
                            </Link>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent className={classes.card_content}>
                        <Grid container alignItems="center">
                            <Box sx={{ width: '3rem', position: 'relative' }}>
                                <img src={telegram_icon} alt="zalo icon" className={classes.icon}></img>
                            </Box>
                            <Link className={classes.link_content}>Telegram</Link>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent className={classes.card_content}>
                        <Grid container alignItems="center">
                            <Box sx={{ width: '3rem', position: 'relative' }}>
                                <img src={email_icon} alt="zalo icon" className={classes.icon}></img>
                            </Box>
                            <Link className={classes.link_content}>Email</Link>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent className={classes.card_content}>
                        <Grid container alignItems="center">
                            <Box sx={{ width: '3rem', position: 'relative' }}>
                                <img src={contact_icon} alt="zalo icon" className={classes.icon}></img>
                            </Box>
                            <Link className={classes.link_content} target="_blank" href="tel:+84941040675">
                                Phone number
                            </Link>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default Main;
