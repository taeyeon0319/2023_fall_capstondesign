const express = require('express')
const socket = require('socket.io')
const http = require('http')
const fs = require('fs')

const chatRouter = express.Router();

/* express http 서버 생성 */
const server = http.createServer(chatRouter)

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server);


chatRouter.use('/css', express.static('./server/static_chat/css'))
chatRouter.use('/js', express.static('./server/static_chat/js'))

chatRouter.get('/', (req, res) => {
    res.json("채팅 구현 - 개발자 김태연");
})

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
chatRouter.get('/chat', function (request, response) {
    fs.readFile('./server/static_chat/index.html', function (err, data) {
        if (err) {
            console.error(err); // 에러 콘솔에 출력
            response.status(500).send('서버 에러'); // 500 Internal Server Error 응답 전송
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            response.end()
        }
    })
})

io.on('connection', function(socket) {
    /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
    socket.on('newUser', function(name) {
        console.log(name + ' 님이 접속했습니다.');
    
        /* 소켓에 이름과 시간 저장해두기 */
        socket.name = name;
        socket.date = new Date().toLocaleDateString();
        socket.time = new Date().toLocaleTimeString();
    
        /* 모든 소켓에게 전송 */
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속했습니다.', time: socket.time});
    });
    

    /* 전송한 메시지 받기 */
    socket.on('message', function(data) {
        /* 받은 데이터에 누가 보냈는지 이름과 시간을 추가 */
        socket.time = new Date().toLocaleTimeString();
    
        data.date = socket.date;
        data.name = socket.name;
        data.time = socket.time;
    
        console.log(data);
    
        /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', data);
    });
    

    /* 접속 종료 */
    socket.on('disconnect', function() {
        console.log(socket.name + '님이 나가셨습니다.')

        /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
    });
});

server.listen(8080, function() {
    console.log('✅ 채팅서버 : http://localhost:8080/chat')
})

module.exports = chatRouter;