import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';

const IPAddr = () => {
    const [ip, setIp] = useState();
    const [click, setClick] = useState(false);
    const [data, setData] = useState();

    const checkIP = () => {
        setClick(true);
        setData(null);
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url =
            'https://api.ipgeolocation.io/ipgeo?apiKey=62a4aec006bb49f3874bf022b2d4ac0d&ip=' +
            ip;
        axios
            .get(proxyUrl + url)
            .then(function (response) {
                setData(response.data);
            })
            .catch((error) => {
                setData('error');
                console.warn(error);
            });
    };
    return (
        <Layout title={`IP Address Checker`} description={`Check IP Address`}>
            <div className="row mt-4">
                <div className="col-md-4 offset-md-4">
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg"
                            placeholder="Type here"
                            aria-label="Mac Address"
                            type="string"
                            onChange={(e) => setIp(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={checkIP}
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
                    <React.Fragment>
                        <div className="row m-4">
                            <div className="col-md-6">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    src={`https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&output=embed`}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="card text-dark text-center">
                                    <div className="text-center">
                                        {data != 'error' ? (
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
                                                <p>Invalid IP Address</p>
                                            </React.Fragment>
                                        )}
                                        {data != 'error' && (
                                            <React.Fragment>
                                                <p>IP Address: {ip}</p>
                                                <p>ISP: {data.isp}</p>
                                                <p>Latitude: {data.latitude}</p>
                                                <p>
                                                    Longitude: {data.longitude}
                                                </p>
                                                <p>
                                                    Organization:{' '}
                                                    {data.organization}
                                                </p>
                                                <p>
                                                    Country: {data.country_name}
                                                </p>
                                                <p>State: {data.state_prov}</p>
                                                <p>
                                                    Calling code:{' '}
                                                    {data.calling_code}
                                                </p>
                                                <p>City: {data.city}</p>
                                                <p>District: {data.district}</p>
                                                <p>Zipcode: {data.zipcode}</p>
                                                <p>
                                                    Time zone:{' '}
                                                    {data.time_zone.name}
                                                </p>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </Layout>
    );
};

export default IPAddr;
