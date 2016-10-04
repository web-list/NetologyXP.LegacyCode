player.showHighScoreList = function(pageToken) {
    document.querySelector('#highScoreListDiv').innerHTML = '';
    document.querySelector('#highScoreListDiv').style.display = 'block';
    // Create the request.
    LEADERBOARD_ID = document.getElementById('leaderboardIdShowHS').value;
    var request = gapi.client.games.scores.list(
        {leaderboardId: LEADERBOARD_ID,
            collection: 'PUBLIC',
            timeSpan: 'all_time',
            pageToken: pageToken,
            maxResults: '10'});
    // здесь находится шов
    // мы не знаем что вернет gapi.client.games.scores.list()
    // поэтому следует обернуть вызов request.execute в другую функцию,
    // которая не будет вызывать execute для request, если request не определен
    request.execute(
        function(response) {
            // здесь тоже находится шов
            // response может быть неопределен, необходимо обернуть
            // другой функцией все моменты где используется response:
            // @todo player.createPlayerList(...);
            // @todo  utilities.createButton(...)
            console.log('High score', response);
            if (response.error) {
                alert('Error ' + response.error.code + ': ' + response.message);
                return;
            }
            var root = document.getElementById('highScoreListDiv');
            player.createPlayerList(root, response.items, true);
            if (response.prevPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value);
                        }));
            }
            if (response.nextPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value);
                        }));
            }
        });
};