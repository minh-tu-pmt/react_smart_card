/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useRef } from 'react';
import { Avatar, Button, IconButton } from '@mui/material';
import User1 from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { useSelector } from 'react-redux';
import { Box, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, useMediaQuery } from '@mui/material';
import { Draggable } from 'react-drag-reorder';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { database } from 'hooks/firebase';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { makeid } from 'utils/utils';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import zalo_icon from '../../../assets/logo_zalo.png';
import fb_icon from '../../../assets/fb_icon.png';
import telegram_icon from '../../../assets/telegram_icon.png';
import email_icon from '../../../assets/email_icon.png';
import contact_icon from '../../../assets/contact_icon.jpg';

// const UID = 'iGzjBkpjh9eAN0SVGJN7';
const getIcon = (type) => {
    switch (type) {
        case 'zalo':
            return zalo_icon;
        case 'facebook':
            return fb_icon;
        case 'email':
            return email_icon;
        case 'telegram':
            return telegram_icon;
        case 'phone':
            return phone_icon;
        default:
            return contact_icon;
    }
};

function DragDrop({ ...others }) {
    const theme = useTheme();

    const params = useParams();
    const UID = params.id || 'iGzjBkpjh9eAN0SVGJN7';
    const anchorRef = useRef(null);
    const fileRef = useRef(null);
    const [mainInfo, setMainInfo] = useState({ fullname: '', summary: '' });
    const [contacts, setContacts] = useState([]);

    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [editInfo, setEditInfo] = useState(false);
    const [words, setWords] = useState(['Hello', 'Hi', 'How are you', 'Cool']);
    const [image, setImage] = useState();

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
        e.target.value = null;
    };

    const getChangedPos = (currentPos, newPos) => {
        console.log(currentPos, newPos);
    };

    const handleClick = () => {
        console.log('onClik');
    };

    const getData = async (id) => {
        const docRef = doc(database, 'users', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            const rs = docSnap.data();
            if (!rs.links) {
                rs.links = [];
            }
            setContacts(rs);
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
    };

    const handleSaveInfo = async () => {
        console.log(contacts);
        const docRef = await setDoc(doc(database, 'users', params.id), contacts);
        console.log(docRef);
    };

    const removeLink = async (id) => {
        console.log(id);
        const links = contacts.links.filter((el) => el.lid !== id);
        console.log(links);
        const userRef = doc(database, 'users', UID);
        await updateDoc(userRef, { links: [...links] });
        setContacts({ ...contacts, links: [...links] });
    };

    const editLink = (id) => {
        console.log(id);
    };

    useEffect(() => {
        getData(UID);
    }, []);
    return (
        <div>
            <MainCard title="Personal Info">
                <Grid container direction={'column'} justifyContent="center" alignItems="center">
                    <AvatarUser contacts={contacts} setContacts={setContacts} />
                    {editInfo ? (
                        <>
                            <Formik
                                initialValues={{
                                    email: contacts.displayName || 'PMT',
                                    password: contacts.bio || 'Summary',
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().max(255).required('Fullname is required'),
                                    password: Yup.string().max(255).required('Summary is required')
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    try {
                                        if (scriptedRef.current) {
                                            setStatus({ success: true });
                                            setSubmitting(false);
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        if (scriptedRef.current) {
                                            setStatus({ success: false });
                                            setErrors({ submit: err.message });
                                            setSubmitting(false);
                                        }
                                    }
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate onSubmit={handleSubmit} {...others}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-email-login">Fullname</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-email-login"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Fullname"
                                                inputProps={{}}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password-login">Summary</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password-login"
                                                type="text"
                                                value={values.password}
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Summary"
                                                inputProps={{}}
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                        {errors.submit && (
                                            <Box sx={{ mt: 3 }}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Box>
                                        )}
                                        <Box sx={{ mt: 2 }}>
                                            <AnimateButton type="scale">
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSaveInfo}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="grey"
                                                    onClick={() => {
                                                        setEditInfo(false);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </>
                    ) : (
                        <div
                            style={{ position: 'relative', cursor: 'pointer' }}
                            onClick={() => {
                                setEditInfo(true);
                            }}
                        >
                            <div>{contacts.displayName || 'PMT'}</div>
                            <div>{contacts.bio || 'Summary'}</div>
                        </div>
                    )}
                </Grid>
            </MainCard>
            <MainCard title="Contacts">
                <div className="flex-container">
                    <div className="row">
                        {/* <Draggable onPosChange={getChangedPos}>
                            {words.map((word, idx) => {
                                return (
                                    <div key={idx} className="flex-item" style={{ height: 50 }}>
                                        <div onClick={handleClick}>{word}</div>
                                    </div>
                                );
                            })}
                        </Draggable> */}
                        {contacts.links &&
                            contacts.links.map((item, index) => (
                                <Grid container alignItems="center" key={index}>
                                    <Grid item style={{ width: '10%' }}>
                                        <Avatar
                                            src={getIcon(item.type)}
                                            sx={{
                                                ...theme.typography.mediumAvatar,
                                                margin: '8px 0 8px 8px !important'
                                            }}
                                            aria-haspopup="true"
                                            color="inherit"
                                        ></Avatar>
                                    </Grid>
                                    <Grid item sx={{ width: '15%' }}>
                                        {item.title}
                                    </Grid>
                                    <Grid item sx={{ width: '65%' }}>
                                        {item.url}
                                    </Grid>
                                    <Grid item sx={{ width: '10%' }}>
                                        <EditOutlinedIcon
                                            sx={{ cursor: 'pointer', marginRight: '15px' }}
                                            onClick={() => {
                                                editLink(item);
                                            }}
                                        />
                                        <CloseIcon
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                removeLink(item.lid);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                        <Addition contacts={contacts} setContacts={setContacts} uid={UID} />
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

const AvatarUser = ({ contacts, setContacts }) => {
    const theme = useTheme();
    const anchorRef = useRef(null);
    const [image, setImage] = useState();
    const fileRef = useRef(null);

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
        e.target.value = null;
    };

    const uploadFile = () => {
        const imgID = makeid();
        const storage = getStorage();
        const storageRef = ref(storage, imgID);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
            getDownloadURL(ref(storage, imgID))
                .then(async (url) => {
                    console.log(url);
                    const contactChange = { ...contacts, photoURL: url };
                    setContacts(contactChange);
                    setImage(null);
                    const docRef = await setDoc(doc(database, 'users', UID), contactChange);
                    console.log('Update success');
                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error);
                });
        });
    };
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
                src={image ? URL.createObjectURL(image) : contacts.photoURL || User1}
                sx={{
                    ...theme.typography.mediumAvatar,
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer',
                    width: 100,
                    height: 100
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
            ></Avatar>

            <Box
                sx={{ cursor: 'pointer', position: 'absolute', top: 0, right: -15 }}
                component="span"
                onClick={() => {
                    fileRef.current.click();
                }}
            >
                <EditOutlinedIcon />
            </Box>

            {image && (
                <Button style={{ position: 'absolute', top: '33%', right: '-60%' }} onClick={uploadFile}>
                    Upload
                </Button>
            )}

            <input ref={fileRef} type="file" accept="image/*" onChange={onChangeImage} hidden></input>
        </div>
    );
};

const Addition = ({ uid, contacts, setContacts }) => {
    const contactHolder = { lid: makeid(), type: 'facebook', title: 'Facebook', url: 'https://facebook.com' };
    const handleAddContact = async () => {
        console.log('Add contact');
        const links = [...contacts.links];
        links.push(contactHolder);
        const rs = { ...contacts, links };
        // const docRef = await setDoc(doc(database, 'users', uid), rs);
        const userRef = doc(database, 'users', uid);
        await updateDoc(userRef, { links });
        setContacts(rs);
    };
    return (
        <div>
            <IconButton onClick={handleAddContact}>
                <AddOutlinedIcon />
            </IconButton>
        </div>
    );
};

export default DragDrop;
