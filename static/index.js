document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        document.querySelector('#form2').onsubmit = () => {
            var channelName = document.querySelector('#channelName').value
            if (channelName.length != 0){
                socket.emit('submit channel', {'channelName': channelName});
                return false;
            } else {
                alert('Please enter some value!')
                return false;
            }
        }
    });

    socket.on('all channels', function(json) {
        let channel_list="";
        for (j in json) {
            channel_list += `<button class="btn btn-primary" onclick="setChannel('${json[j]}')">${json[j]}</button><hr>`;
        }
        document.querySelector('#active').innerHTML = channel_list
    })

    document.querySelector('#form').onsubmit = () => {
        var displayName = document.querySelector('#displayName').value
        if (displayName.length == 0){
            alert('Please enter some value!')
        } else {
            localStorage.setItem('user',displayName)
        }
    }
    function checkUser() {
        if('user' in localStorage){
            document.querySelector('#form').innerHTML = `<h1>Welcome,${localStorage.getItem('user')}</h1><button class='btn btn-danger' onclick="logout()" style="width:30%;">Logout</button>`
        }
    }
    checkUser()
})




