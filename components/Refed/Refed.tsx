'use client'
import { Button, Card } from 'react-bootstrap'
import Tooltip from '../Tooltip/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
import { useWasAlreadyLoggedIn } from '../../utils/Hooks'
import { useState } from 'react'
import Link from 'next/link'
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn'

export default function Refed() {
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let wasAlreadyLoggedIn = useWasAlreadyLoggedIn()
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
                        <Link href="/mod" style={{ fontWeight: 'bold' }}>
                             (Download here)
                        </Link>
                    </p>
                    <hr />
                    <p>Download the mod to get started.</p>

                    <Link href="/mod" className="disableLinkStyle">
                        <Button>Download the mod</Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}
