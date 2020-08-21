import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';

const EmailAddr = () => {
    const [email, setMail] = useState();
    const [click, setClick] = useState(false);
    const [data, setData] = useState();

    const checkEmail = () => {
        setClick(true);
        setData(null);
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url =
            'https://ipqualityscore.com/api/json/email/U13tqREPLrVy8BlYS1VmA0yXkV3zSgwg/' +
            email;
        axios.post(proxyUrl + url).then(function (response) {
            console.log(response.data);
            setData(response.data);
        });
    };
    return (
        <Layout
            title={`Email Address Checker`}
            description={`Check Email Address`}
        >
            <div className="row mt-4">
                <div className="col-md-4 offset-md-4">
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg"
                            placeholder="Type here"
                            aria-label="Mac Address"
                            type="string"
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={checkEmail}
                            >
                                Check
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                {!click ? (
                    <p className="m-2">Waiting to search!</p>
                ) : !data ? (
                    <p className="m-2">Searching!</p>
                ) : (
                    <div className="row m-4">
                        <div className="col-md-6 text-left">
                            <div className="alert alert-warning">
                                <pre>
                                    SMTP Scoring:{'\n'}
                                    -1 = invalid email address{'\n'}0 = mail
                                    server exists, but is rejecting all mail
                                    {'\n'}1 = mail server exists, but is showing
                                    a temporary error{'\n'}2 = mail server
                                    exists, but accepts all email{'\n'}3 = mail
                                    server exists and has verified the email
                                    address{'\n\n'}
                                    Overall Scoring:{'\n'}0 = invalid email
                                    address{'\n'}1 = dns valid, unreachable mail
                                    server{'\n'}2 = dns valid, temporary mail
                                    rejection error{'\n'}3 = dns valid, accepts
                                    all mail{'\n'}4 = dns valid, verified email
                                    exists
                                </pre>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-dark text-center">
                                <div className="text-center">
                                    {data.success ? (
                                        data.valid ? (
                                            <img
                                                src={`/static/images/valid.png`}
                                                alt={`Valid`}
                                                style={{ width: '15vw' }}
                                            />
                                        ) : (
                                            <img
                                                src={`/static/images/invalid.png`}
                                                alt={`Invalid`}
                                                style={{ width: '15vw' }}
                                            />
                                        )
                                    ) : (
                                        <React.Fragment>
                                            <img
                                                src={`/static/images/invalid.png`}
                                                alt={`Invalid`}
                                                style={{ width: '15vw' }}
                                            />
                                            <p>Request not successful</p>
                                        </React.Fragment>
                                    )}
                                    {data.success && (
                                        <React.Fragment>
                                            <p>
                                                Email Address:{' '}
                                                {data.sanitized_email}
                                            </p>
                                            <p>
                                                Valid: {data.valid.toString()}
                                            </p>
                                            <p>
                                                Disposable:{' '}
                                                {data.disposable.toString()}
                                            </p>
                                            <p>
                                                Likeliness of an email being
                                                delivered at this address:{' '}
                                                {data.deliverability}
                                            </p>
                                            <p>
                                                Recently breached email:{' '}
                                                {data.leaked.toString()}
                                            </p>
                                            <p>
                                                SMTP Score:{' '}
                                                {data.smtp_score.toString()}
                                            </p>
                                            <p>
                                                First name associated with the
                                                email address: {data.first_name}
                                            </p>
                                            <p>
                                                Valid DNS Entries:{' '}
                                                {data.dns_valid.toString()}
                                            </p>
                                            <p>
                                                Honeypot:{' '}
                                                {data.honeypot.toString()}
                                            </p>
                                            <p>
                                                Probability of the email being
                                                an active SPAM trap:{' '}
                                                {data.spam_trap_score}
                                            </p>
                                            <p>
                                                Overall Score:{' '}
                                                {data.overall_score}
                                            </p>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EmailAddr;
