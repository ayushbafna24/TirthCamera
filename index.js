require('dotenv').config();

const NodeMediaServer = require('node-media-server');

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 9080,
        allow_origin: '*',
        mediaroot: '/var/www/html/media',
    },
    auth: {
        play: true,
        publish: true,
        secret: 'nodemedia2017privatekey'
    },
    relay: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                mode: 'static',
                edge: 'rtsp://admin:Gurudev123@43.229.227.94:554/cam/realmonitor?channel=1&subtype=1',
                name: 'Tirth',
                rtsp_transport : 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
            }
        ]
    },
    trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                name: 'Tirth'
            }
        ]
    }
};

const nms = new NodeMediaServer(config);
nms.run();