import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';
import base64url from "base64url";

const Domain = () => {
    const [domain, setDomain] = useState();
    const [click, setClick] = useState(false);
    const [data, setData] = useState();

    const checkDomain = () => {
        setClick(true);
        setData(null);
        const domain64 = base64url(domain+"");
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url = 'https://www.virustotal.com/api/v3/urls/' + domain64;
        axios.get(proxyUrl + url, {
            headers: {
                "x-apikey": "777e59c9d7f2cd882372d3a937ab1578035565c2cfe7d2beb186204da8d8e446"
            }
        })
        .then((response) => {
            console.log(response.data.data.attributes)
            setData(response.data.data.attributes)
        })
    };
    
    return (
        <Layout
            title={`Domain Analysis`}
            description={`Analyse a domain`}
        >
            <div className="row mt-4">
                <div className="col-md-4 offset-md-4">
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg"
                            placeholder="Type here"
                            aria-label="Phone Number"
                            type="string"
                            onChange={(e) => setDomain(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={checkDomain}
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
                        <div className="col-md-6 offset-md-3">
                            <div className="card text-dark text-center">
                                <div className="text-center">
                                    {data.url = domain ? (
                                        data.last_analysis_stats.malicious < 30 ? (
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
                                            <p>Invalid Phone Number</p>
                                        </React.Fragment>
                                    )}
                                    {data.url = domain && (
                                        <React.Fragment>
                                            <p>Harmless score: {data.last_analysis_stats.harmless}</p>
                                            <p>Malicious score: {data.last_analysis_stats.malicious}</p>
                                            <p>Suspicous score: {data.last_analysis_stats.suspicious}</p>
                                            <p>Timeout score: {data.last_analysis_stats.timeout}</p>
                                            <p>Undetected score: {data.last_analysis_stats.undetected}</p>
                                            <p>Virus Total Harmless score: {data.total_votes.harmless}</p>
                                            <p>Virus Total Malicious score: {data.total_votes.malicious}</p>
                                            <p>Number of times URL has been submitted for testing: {data.times_submitted}</p>
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

export default Domain;
