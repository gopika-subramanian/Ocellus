import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';

const MacAddr = () => {
    const [mac, setMac] = useState();
    const [click, setClick] = useState(false);
    const [data, setData] = useState();

    const checkMac = () => {
        setClick(true);
        setData(null);
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url = 'https://macvendors.co/api' + '/' + mac;
        axios.post(proxyUrl + url).then(function (response) {
            setData(response.data);
        });
    };
    return (
        <Layout title={`Mac Address Checker`} description={`Check Mac Address`}>
            <div className="row mt-4">
                <div className="col-md-4 offset-md-4">
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg"
                            placeholder="Type here"
                            aria-label="Mac Address"
                            type="string"
                            onChange={(e) => setMac(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={checkMac}
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
                                    {data.result.error != 'no result' ? (
                                        <img
                                            src={`/static/images/valid.png`}
                                            alt={`Valid`}
                                            style={{ width: '15vw' }}
                                        />
                                    ) : (
                                        <React.Fragment>
                                            <img
                                                src={`/static/images/invalid.png`}
                                                alt={`Invalid`}
                                                style={{ width: '15vw' }}
                                            />
                                            <p>Invalid Mac Address</p>
                                        </React.Fragment>
                                    )}
                                    {data.result.error != 'no result' && (
                                        <React.Fragment>
                                            <p>Mac Address: {mac}</p>
                                            <p>
                                                Company: {data.result.company}
                                            </p>
                                            <p>
                                                Address: {data.result.address}
                                            </p>
                                            <p>
                                                Country: {data.result.country}
                                            </p>
                                            <p>
                                                End Hex: {data.result.end_hex}
                                            </p>
                                            <p>
                                                Mac Prefix:{' '}
                                                {data.result.mac_prefix}
                                            </p>
                                            <p>
                                                Start Hex:{' '}
                                                {data.result.start_hex}
                                            </p>
                                            <p>Type: {data.result.type}</p>
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

export default MacAddr;
