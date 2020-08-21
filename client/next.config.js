const withPlugins = require('next-compose-plugins');
const withSourceMaps = require( '@zeit/next-source-maps' );

const nextConfig = {
    target: 'serverless',
    devIndicators: {
        autoPrerender: false,
    },
};

module.exports = withPlugins(
    [withSourceMaps],
    nextConfig
);
