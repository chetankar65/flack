import os
from flask import Flask, render_template,jsonify, request, session
from flask_socketio import SocketIO, emit
import time
import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = '29icsnvdhweio'
app.secret_key = 'any random string'
socketio = SocketIO(app)

channels={}
users = []

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/adduser",methods=['POST'])
def add_user():
    user = request.form.get('user')
    if user in users:
        return {'success':False}
    else:
        users.append(user)
        return {'success':True}

@socketio.on("submit channel")
def create_channel(data):
    name=data["channelName"].replace(' ', '-')
    if name in channels:
        socketio.emit("all channels",0,broadcast=True)
    else:
        channels[name]=[]
        lister=list(channels.keys())
        socketio.emit("all channels",lister, broadcast=True)

@socketio.on("get channels")
def get_channels():
    lister=list(channels.keys())
    socketio.emit("display channels", lister, broadcast=True)

@socketio.on("submit message")
def submit_message(data):
    global channels
    channel = data['channel']
    message = data ['message']
    name = data['name']
    arr = channels[channel]
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%d-%m-%Y %H:%M:%S')
    if (len(arr) > 99):
        arr.clear()
    arr.append({'name':name , 'message':message, 'time':st})
    channels[channel] = arr
    socketio.emit("all messages",{'channel':channel,'messages':arr},broadcast=True)

#if len(arr) > 5: arr.clear()

@socketio.on('get messages')
def get_messages(data):
    global channels
    data = data['channel']
    json = channels[data]
    socketio.emit('all messages',{'channel':data,'messages':json},broadcast=True)


    

if __name__ == '__main__':
    socketio.run(app, debug=True)