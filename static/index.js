document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    /////////
    socket.on('connect', () => {
        document.querySelector('#form2').onsubmit = () => {
            var channelName = document.querySelector('#channelName').value
            if (channelName.length == 0){
                alert('Please enter some value!')
                return false;
            } else {
                socket.emit('submit channel', {'channelName': channelName});
                return false;
            }
        }
    });


    ///////
    socket.on('all channels', function(json) {
        let channel_list="";
        if (json != 0){
            for (j in json) {
                channel_list += `<button class="btn btn-light" onclick="setChannel('${json[j]}')">${json[j]}</button><hr>`;
            }
            document.querySelector('#active').innerHTML = channel_list
        } else {
            alert('Channel already exists!')
        }
    })

    

    /////// SET USERNAME
    document.querySelector('#form').onsubmit = () => {
        //AJAX REQUEST
        var displayName = document.querySelector('#displayName').value
        const request = new XMLHttpRequest();
        request.open('POST', '/adduser');

        // Callback function for when request completes
        request.onload = () => {

            // Extract JSON data from request
            const data = JSON.parse(request.responseText);

            // Update the result div
            if (data.success) {
                localStorage.setItem('user',displayName)
                checkUser()
            }
            else {
                alert('User already exists!')
            }
        }

        // Add data to send with request
        const data = new FormData();
        data.append('user', displayName);

        // Send request
        request.send(data);
        return false;
    }

    //////



    function checkUser() {
        if('user' in localStorage){
            document.querySelector('#form').innerHTML = `<h4>Welcome,${localStorage.getItem('user')}</h4><button class='btn btn-danger' onclick="logout()" style="width:30%;">Logout</button>`
            document.getElementById('channelName').disabled = false
            document.getElementById('btn').disabled = false
            document.querySelector('#err').innerHTML = ''
        } else {
            document.getElementById('channelName').disabled = true
            document.getElementById('btn').disabled = true
            document.querySelector('#err').innerHTML = 'Please enter some display name'
            document.querySelector('#err').style.color = 'red'
        }
    }
    checkUser()
})




