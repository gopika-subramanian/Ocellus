import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';

const Phone = () => {
    const [phone, setPhone] = useState();
    const [click, setClick] = useState(false);
    const [data, setData] = useState();

    const checkPhone = () => {
        setClick(true);
        setData(null);
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url =
            'https://apilayer.net/api/validate?access_key=08da4f6e569683448386fd76e1710dfc&number=' +
            phone;
        axios.get(proxyUrl + url).then(function (response) {
            console.log(response);
            setData(response.data);
        });
    };
    return (
        <Layout
            title={`Phone Number Checker`}
            description={`Check Phone Number`}
        >
            <div className="row mt-4">
                <div className="col-md-4 offset-md-4">
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg"
                            placeholder="Type here"
                            aria-label="Phone Number"
                            type="number"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={checkPhone}
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
                                    {data.valid ? (
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
                                            <p>Invalid Phone Number</p>
                                        </React.Fragment>
                                    )}
                                    {data.valid && (
                                        <React.Fragment>
                                            <p>Number: {data.number}</p>
                                            <p>
                                                International Format:{' '}
                                                {data.international_format}
                                            </p>
                                            <p>Location: {data.location}</p>
                                            <p>
                                                Country Code:{' '}
                                                {data.country_code}
                                            </p>
                                            <p>Country: {data.country_name}</p>
                                            <p>Carrier: {data.carrier}</p>
                                            <p>Is Mobile: {data.line_type}</p>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="footer-copyright text-center py-3">
                Proudly supported by{' '}
                <a href="https://numverify.com">numverify</a>
            </div>
        </Layout>
    );
};

export default Phone;
