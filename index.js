$(document).ready(function(){

    const showNotification = (type, text) => {
        new Noty({
            type: type,
            layout: 'topRight',
            text: text,
            theme: 'sunset',
            timeout: 1000
        }).show();
    }

    $('#search-btn').click((event) => {
        event.preventDefault();
        let input = $('#search-input').val();
        if(!input){
            showNotification('error', 'Enter a player id');
            return;
        }
        showNotification('info', 'Loading');
        axios.get(`https://cricapi.com/api/playerStats?pid=${input}&apikey=7lvR3s5tsxOG3tiKimH5YOrU5mS2`)
        .then((response) => {
            if(response.data.error){
                showNotification('warning', 'Enter valid player id');
                return;
            }
            showNotification('success', 'Success!');
            console.log(response.data);
            $('#image').attr('src', response.data.imageURL);
            $('#player-name').append(`<p>${response.data.fullName}</p>`);
            $('#player-country').append(`<p>(${response.data.country})</p>`);
            $('#player-profile').append(`<p>${response.data.profile}</p>`);
            $('#player-age').append(`<p>${response.data.currentAge}</p>`);
            $('#player-born').append(`<p>${response.data.born}</p>`);
            $('#player-batting-style').append(`<p>${response.data.battingStyle}</p>`);
            $('#player-bowling-style').append(`<p>${response.data.bowlingStyle}</p>`);
            $('#player-major-teams').append(`<p>${response.data.majorTeams}</p>`);
        })
        .catch((error) => {
            console.log(error);
            showNotification('error', 'Network Error');
        })
    });
});