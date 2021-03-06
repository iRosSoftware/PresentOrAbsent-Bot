'use strict';

const http = require('http');
const https = require('https');
const crypto = require('crypto');

const HOST = 'api.line.me';
const REPLY_PATH = '/v2/bot/message/reply';//リプライ用
const CH_SECRET = 'ea46a5b3b13d5c720709adbc1762782c'; //Channel Secretを指定
const CH_ACCESS_TOKEN = 'PWp2/OpgqiMmz8jeZaMXLSsYB313ElEb2BUixY7F49PR/GhZTg39VwXLXwjUF/VUvNG+N7sL1PALiN2ErfYcd3s0Vu0nedpKsZaWWqaOgXCeIvb4Yp3DSMpM8lcgAzMMp0utm5jW7ri36zmMDd5MxgdB04t89/1O/w1cDnyilFU='; //Channel Access Tokenを指定
const SIGNATURE = crypto.createHmac('sha256', CH_SECRET);
const PORT = process.env.PORT || 8080;

/**
 * httpリクエスト部分
 */
const client = (replyToken, SendMessageObject) => {
    let postDataStr = JSON.stringify({ replyToken: replyToken, messages: SendMessageObject });
    let options = {
        host: HOST,
        port: 443,
        path: REPLY_PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Line-Signature': SIGNATURE,
            'Authorization': `Bearer ${CH_ACCESS_TOKEN}`,
            'Content-Length': Buffer.byteLength(postDataStr)
        }
    };

    return new Promise((resolve, reject) => {
        let req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve(body);
            });
        });

        req.on('error', (e) => {
            reject(e);
        });
        req.write(postDataStr);
        req.end();
    });
};

http.createServer((req, res) => {
    if (req.url !== '/webhook' || req.method !== 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('');
    }

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        if (body === '') {
            console.log('bodyが空です。');
            return;
        }

        let WebhookEventObject = JSON.parse(body).events[0];
        //メッセージが送られて来た場合
        if (WebhookEventObject.type === 'message') {
            let SendMessageObject;
            if (WebhookEventObject.message.type === 'text') {
                if (WebhookEventObject.message.text == "check" || WebhookEventObject.message.text == "Check" || WebhookEventObject.message.text == "チェック") {
                    SendMessageObject = [{
                        "type": "flex",
                        "altText": "This is a flex message",
                        "contents": {
                            "type": "bubble",
                            "body": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "何限目??",
                                        "weight": "bold",
                                        "size": "xl"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "margin": "lg",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "box",
                                                "layout": "baseline",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "text",
                                                        "text": "Place",
                                                        "color": "#aaaaaa",
                                                        "size": "sm",
                                                        "flex": 1
                                                    },
                                                    {
                                                        "type": "text",
                                                        "text": "京都産業大学",
                                                        "wrap": true,
                                                        "color": "#666666",
                                                        "size": "sm",
                                                        "flex": 5
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "box",
                                                "layout": "baseline",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "text",
                                                        "text": "Time",
                                                        "color": "#aaaaaa",
                                                        "size": "sm",
                                                        "flex": 1
                                                    },
                                                    {
                                                        "type": "text",
                                                        "text": "1限目から8限目",
                                                        "wrap": true,
                                                        "color": "#666666",
                                                        "size": "sm",
                                                        "flex": 5
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "footer": {
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "1限目",
                                            "text": "1限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "2限目",
                                            "text": "2限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "3限目",
                                            "text": "3限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "4限目",
                                            "text": "4限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "5限目",
                                            "text": "5限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "6限目",
                                            "text": "6限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "7限目",
                                            "text": "7限目"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "8限目",
                                            "text": "8限目"
                                        }
                                    },

                                    {
                                        "type": "spacer",
                                        "size": "sm"
                                    }
                                ],
                                "flex": 0
                            }
                        },
                    }]
                }
                else {
                    SendMessageObject = [{
                        type: 'text',
                        text: getMessage(WebhookEventObject.message.text)
                    }];
                }
            }
            //var message = getMessage(WebhookEventObject.message.text);

            client(WebhookEventObject.replyToken, SendMessageObject)
                .then((body) => {
                    console.log(body);
                }, (e) => { console.log(e) });
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('success');
    });

}).listen(PORT);

console.log(`Server running at ${PORT}`);

function getMessage(t) {
    var t = t.slice(0, 1);
    var dtl = getTimeLesson(t);

    dtl.setMinutes(dtl.getMinutes() - 30);

    var h = dtl.getTime() - getnow().getTime();

    var t = getnow().getTime() - getToday().getTime();

    var ti = h - t;
    //var ti = dtl.getTime() - getnow().getTime();

    console.log(ti);
    //秒数で判定
    if (ti > 0) {
        return "間に合うよ";
    } else {
        return "諦めろ";
    }
}


function getTimeLesson(t) {
    var lesson;
    var tint = Number(t)
    switch (tint) {
        case 1:
            lesson = new Date(new Date().setHours(9, 0, 0, 0));
            break;
        case 2:
            lesson = new Date(new Date().setHours(10, 30, 0, 0));
            break;
        case 3:
            lesson = new Date(new Date().setHours(13, 0, 0, 0));
            break;
        case 4:
            lesson = new Date(new Date().setHours(14, 30, 0, 0));
            break;
        case 5:
            lesson = new Date(new Date().setHours(16, 0, 0, 0));
            break;
        case 6:
            lesson = new Date(new Date().setHours(17, 30, 0, 0));
            break;
        case 7:
            lesson = new Date(new Date().setHours(19, 0, 0, 0));
            break;
        case 8:
            lesson = new Date(new Date().setHours(21, 30, 0, 0));
            break;
        default:
            lesson = new Date(new Date().setHours(0, 0, 0, 0));
            break;
    }
    return lesson;
}

function getToday() {
    var today = new Date(new Date().setHours(0, 0, 0, 0));
    return today;
}

function getnow() {
    var now = new Date();
    return now;
}
