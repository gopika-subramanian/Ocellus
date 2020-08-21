import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { data } from '../components/data';
import axios from 'axios';
import { Card } from '../components/Card';

const CheckUsername = () => {
    const [input, setInput] = useState('');
    const [click, setClick] = useState(false);
    const [platforms, setPlatforms] = useState([]);

    function retrieve(url: string, suspect: string, icon: string) {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        axios
            .get(proxyUrl + url)
            .then(function (response) {
                if (response.status === 200) {
                    let obj = {
                        name: suspect,
                        found: true,
                        url: url,
                        icon: icon,
                    };
                    // @ts-ignore
                    setPlatforms((platforms) => [...platforms, obj]);
                }
            })
            .catch(function (error) {
                if (error) {
                    let obj = {
                        name: suspect,
                        found: false,
                        url: url,
                        icon: icon,
                    };
                    // @ts-ignore
                    setPlatforms((platforms) => [...platforms, obj]);
                }
            });
    }

    function analyze(suspects: any) {
        for (let suspect in suspects) {
            retrieve(
                suspects[suspect]['url'].replace('{}', input),
                suspect,
                suspects[suspect]['icon']
            );
        }
    }

    const searchUsername = () => {
        setPlatforms([]);
        setClick(true);
        analyze(data);
    };

    return (
        <Layout title={`Username Checker`} description={`Check Username`}>
            <div className="row mt-4">
                <div className="col-md-4 col-sm-12 offset-md-4">
                    <label>Search for username</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Type here"
                            aria-label="Username"
                            onChange={(e) => setInput(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={searchUsername}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center m-4">
                {!click ? (
                    <p className="m-2">Waiting to search!</p>
                ) : platforms === [] ? (
                    <p className="m-2">Searching!</p>
                ) : (
                    <div className="row m-0">
                        {platforms.map((platform) => (
                            <div
                                className="col-md-2 mt-4"
                                key={platform['name']}
                            >
                                <Card
                                    title={platform['name']}
                                    icon={platform['icon']}
                                    link={
                                        platform['found']
                                            ? platform['url']
                                            : '/username'
                                    }
                                    color={
                                        platform['found']
                                            ? '#008000'
                                            : '#FF0000'
                                    }
                                    iconStyle={true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CheckUsername;
