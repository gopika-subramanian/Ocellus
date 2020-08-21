import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';

const BlackList = () => {
    const [input, setInput] = useState("");
    const [type, setType] = useState("ip");
    const [click, setClick] = useState(false);
    const [data, setData] = useState();

    function changeType(e: any) {
        setType(e.target.value);
        setData(null);
        setClick(false);
    }

    function fetchData() {
        setClick(true);
        setData(null);
        type === "ip" ? checkIp(): checkDomain()
    }

    const checkIp = () => {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url =
            'https://api.abuseipdb.com/api/v2/check?key=1018e1b356b388aaea95492c751fa6b5a4dea1333d613815d4cb13df9231a93b9e01b3a69e3b8fe5&ipAddress=' +
            input +
            '&maxAgeInDays=90';
        axios.get(proxyUrl + url).then(function (response) {
            setData(response.data.data);
        });
    };
    const checkDomain = () => {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let url = 'https://openphish.com/feed.txt';
        axios.get(proxyUrl + url).then(function (response) {
            let array = response.data.split('\n');
            let arrayLength = array.length;
            let isBlacklisted = false;
            for (let i = 0; i < arrayLength; i++) {
                if (input == array[i]) {
                    isBlacklisted = true;
                    break;
                }
            }
            console.log(isBlacklisted);
            setData(isBlacklisted ? 'blacklist': 'whitelist');
        });
    };
    return (
        <Layout
            title={`Blacklisted IP/Domain Checker`}
            description={`Check whether an IP/Domain is reported as blacklisted or not`}
        >
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <select className="form-control-lg" onChange={e => changeType(e)}>
                                <option value="ip">IP</option>
                                <option value="domain">Domain</option>
                            </select>
                        </div>
                        <input
                            className="form-control form-control-lg"
                            placeholder={type === "ip" ? "Enter IP": "Enter Domain including http(s)"}
                            aria-label="IP/Domain"
                            type="string"
                            onChange={(e) => setInput(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={fetchData}
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
                                    {type === "ip" ? (
                                        <React.Fragment>
                                            {data.isWhitelisted ? (
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
                                            )}
                                            <p>
                                                Abuse Confidence Score out
                                                of 100:{' '}
                                                {data.abuseConfidenceScore}
                                            </p>
                                            <p>ISP: {data.isp}</p>
                                            <p>
                                                Last reported incident:{' '}
                                                {data.lastReportedAt}
                                            </p>
                                            <p>
                                                Total reports:{' '}
                                                {data.totalReports}
                                            </p>
                                        </React.Fragment>
                                    ): (
                                        <React.Fragment>
                                            {data === "whitelist" ? (
                                                <React.Fragment>
                                                    <img
                                                        src={`/static/images/valid.png`}
                                                        alt={`Valid`}
                                                        style={{ width: '15vw' }}
                                                    />
                                                    <p>Whitelist</p>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <img
                                                        src={`/static/images/invalid.png`}
                                                        alt={`Invalid`}
                                                        style={{ width: '15vw' }}
                                                    />
                                                    <p>Blacklist</p>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BlackList;
