import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';

const Index = () => (
    <Layout
        title={`Ocellus: Open Source Intelligence Analysis Platform`}
        description={`OSINT Platform`}
    >
        <div className="row mt-4">
            <div className="col-md-3 mt-3">
                <Card
                    title={`Username`}
                    icon={'/static/images/avatar.png'}
                    link={'/check-username'}
                    color={`#e52165`}
                />
            </div>
            <div className="col-md-3 mt-3">
                <Card
                    title={`Email`}
                    icon={'/static/images/email.png'}
                    link={'/check-email'}
                    color={`#0d1137`}
                />
            </div>
            <div className="col-md-3 mt-3">
                <Card
                    title={`Phone`}
                    icon={'/static/images/phone.png'}
                    link={'/check-phone'}
                    color={`#322e2f`}
                />
            </div>
            <div className="col-md-3 mt-3">
                <Card
                    title={`Domain Analysis`}
                    icon={'/static/images/image.svg'}
                    link={'/check-domain'}
                    color={`#ff6e40`}
                />
            </div>
            <div className="col-md-3 mt-4">
                <Card
                    title={`Mac Address`}
                    icon={'/static/images/mac.png'}
                    link={'/check-macaddr'}
                    color={`#1e847f`}
                />
            </div>
            <div className="col-md-3 mt-4">
                <Card
                    title={`IP Address`}
                    icon={'/static/images/ip.png'}
                    link={'/check-ip-addr'}
                    color={`#d902ee`}
                />
            </div>
            <div className="col-md-3 mt-4">
                <Card
                    title={`Image Metadata`}
                    icon={'/static/images/imgmeta.svg'}
                    link={'/check-imgmetadata'}
                    color={`#5F4B8BFF`}
                />
            </div>
            <div className="col-md-3 mt-4">
                <Card
                    title={`IP/Domain Blacklist Checker`}
                    icon={'/static/images/blacklist.png'}
                    link={'/blacklist-check'}
                    color={`#ED2B33FF`}
                />
            </div>
        </div>
    </Layout>
);

export default Index;
