import React, { useState } from 'react';
import EXIF from 'exif-js';
import { Layout } from '../components/Layout';

const Metadata = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [data, setData] = useState();
    const [latlong, setLatLong] = useState();
    const [isLoading, setLoaded] = useState(false);

    function getMetadata(e: any) {
        setData(null);
        setFile(null);
        setLoaded(false);
        let img = e.target.files[0];
        setFile(img);
        setImage(URL.createObjectURL(img));
        if (img) {
            EXIF.getData(img, function () {
                let allMetaData = EXIF.getAllTags(img);
                setData(allMetaData);
                const latlong = {
                    latitude:
                        allMetaData.GPSLatitude &&
                        getLatandLong(
                            allMetaData.GPSLatitude[0],
                            allMetaData.GPSLatitude[1],
                            allMetaData.GPSLatitude[2],
                            allMetaData.GPSLatitudeRef
                        ),
                    longitude:
                        allMetaData.GPSLatitude &&
                        getLatandLong(
                            allMetaData.GPSLongitude[0],
                            allMetaData.GPSLongitude[1],
                            allMetaData.GPSLongitude[2],
                            allMetaData.GPSLongitudeRef
                        ),
                };
                setLatLong(latlong);
                setLoaded(true);
            });
        }
    }

    function getLatandLong(
        degrees: number,
        minutes: number,
        seconds: number,
        direction: string
    ) {
        let dd = degrees + minutes / 60 + seconds / (60 * 60);
        if (direction == 'S' || direction == 'W') {
            dd = dd * -1;
        }
        return dd;
    }

    function display(p: any) {
        return p ? p : <p style={{ color: 'red' }}>Not Found</p>;
    }

    return (
        <Layout title={`Image Metadata`} description={`Image Metadata`}>
            <div className="row mt-4">
                <div className="col-md-6 col-sm-12 offset-md-5">
                    <div className="input-group mb-3">
                        <input
                            className="form-control-lg"
                            type="file"
                            id="file"
                            accept=".jpg, .png, .jpeg"
                            onChange={(e) => getMetadata(e)}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                {!file ? (
                    <p className="m-2">Waiting to search!</p>
                ) : !isLoading ? (
                    <p className="m-2">Searching!</p>
                ) : (
                    <React.Fragment>
                        <div className="row m-0 mt-5">
                            <div className="col-md-5 m-2">
                                <div className="text-dark">
                                    <div className="text-center py-4">
                                        <img
                                            src={image}
                                            alt={`Image`}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card text-dark col-md-5 col-sm-12 m-2">
                                <h3 className="m-2">Location</h3>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    src={`https://maps.google.com/maps?q=${latlong.latitude}, ${latlong.longitude}&output=embed`}
                                />
                                <table className="table table-striped table-sm mt-2">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Latitude</th>
                                            <td>{display(latlong.latitude)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Longitude</th>
                                            <td>
                                                {display(latlong.longitude)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Altitude (above sea level)
                                            </th>
                                            <td>
                                                {display(
                                                    data.GPSAltitude &&
                                                        data.GPSAltitude
                                                            .numerator /
                                                            data.GPSAltitude
                                                                .denominator
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card text-dark col-md-5 col-sm-12 m-2">
                                <h3 className="m-2">Camera</h3>
                                <table className="table table-striped table-sm p-2 mt-2">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Make</th>
                                            <td>{display(data.Make)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Model</th>
                                            <td>{display(data.Model)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Aperture</th>
                                            <td>
                                                {display(
                                                    data.ApertureValue &&
                                                        data.ApertureValue
                                                            .numerator /
                                                            data.ApertureValue
                                                                .denominator
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Focal Length</th>
                                            <td>
                                                {display(
                                                    data.FocalLength &&
                                                        data.FocalLength
                                                            .numerator /
                                                            data.FocalLength
                                                                .denominator
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">ISO Speed</th>
                                            <td>
                                                {display(data.ISOSpeedRatings)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Flash</th>
                                            <td>{display(data.Flash)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card text-dark col-md-6 col-sm-12 m-2 offset-md-3">
                                <h3 className="m-2">EXIF</h3>
                                <table className="table table-striped table-sm p-2 mt-2">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Width</th>
                                            <td>{display(data.ImageWidth)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Height</th>
                                            <td>{display(data.ImageHeight)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Exposure Componsensation
                                            </th>
                                            <td>
                                                {display(data.ExposureBias)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Exposure Program
                                            </th>
                                            <td>
                                                {display(data.ExposureProgram)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                DateTimeOriginal
                                            </th>
                                            <td>
                                                {display(data.DateTimeOriginal)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                FocalLengthIn35mmFormat
                                            </th>
                                            <td>
                                                {display(
                                                    data.FocalLengthIn35mmFilm
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">White Balance</th>
                                            <td>
                                                {display(data.WhiteBalance)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </Layout>
    );
};

export default Metadata;
