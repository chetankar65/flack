import os
from flask import Flask, render_template,jsonify, request
from flask_socketio import SocketIO, emit
import time
import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = '29icsnvdhweio'
socketio = SocketIO(app)

channels={}

@app.route("/")
def index():
    return render_template('index.html')

@socketio.on("submit channel")
def create_channel(data):
    name=data["channelName"].replace(' ', '-')
    if name in channels:
        pass
    else:
        channels[name]=[]
        lister=list(channels.keys())
        socketio.emit("all channels", lister, broadcast=True)

@socketio.on("get channels")
def get_channels():
    lister=list(channels.keys())
    socketio.emit("all channels", lister, broadcast=True)

@socketio.on("submit message")
def submit_message(data):
    global channels
    channel = data['channel']
    message = data ['message']
    name = data['name']
    print(channel,name,message)
    arr = channels[channel]
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%d-%m-%Y %H:%M:%S')
    arr.append({'name':name , 'message':message, 'time':st})
    channels[channel] = arr
    socketio.emit("all messages", channels[channel] , broadcast=True)

@socketio.on('get messages')
def get_messages(data):
    global channels
    data = data['channel']
    json = channels[data]
    socketio.emit('all messages',json,broadcast=True)


    

if __name__ == '__main__':
    socketio.run(app, debug=True)