'use client'
import { Button, Card } from 'react-bootstrap'
import Tooltip from '../Tooltip/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
import { useWasAlreadyLoggedIn } from '../../utils/Hooks'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn'
import axios from 'axios'
import { clarity } from 'react-microsoft-clarity';


export default function Refed() {
    
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    
    let wasAlreadyLoggedIn = useWasAlreadyLoggedIn()

    const getURL = () => {
        axios.get("https://web-api.colfnet.com/url")
            .then((response) => {
                console.log(response.data);
                window.open(response.data, '_blank', 'noreferrer');   
            })
            .catch((error) => {
                console.error('Error making GET request:', error);
    
                // Check for specific error properties
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Server responded with:', error.response.status, error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Request setup error:', error.message);
                }
            });
    };
    
    
    
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Invitation</Card.Title>
                </Card.Header>
                <Card.Body>
                    <p>You were invited to use this application because someone thought it would be interesting and helpful to you.</p>
                    <p>
                        You now have 2 days of free access to premium! Download the mod below to get started! 
                    </p>
                    <p>To claim your 2 days of premium on your account, please login below</p>
                    <Button onClick={() => getURL()}>Click here (It may take 1-3 minutes to reflect sign in)</Button>
                    <hr />
                    <p>OR download the mod to claim.</p>

                    <Link href="/mod" className="disableLinkStyle">
                        <Button>Download the mod</Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}
