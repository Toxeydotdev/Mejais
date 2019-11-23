# Mejai's Win-Streak

Hello! [Mejai's Win-Streak](https://mejais-winstreak.com/) is a website to use alongside the game [Legends of Runeterra](https://playruneterra.com/en-us/). It keeps track of your win-streaks based on what deck you are using. There is also a leaderboard that shows the top 100 players and their highest win-streaks and what deck they were using.

If I were to improve upon this project, I could see myself turning this into a local application that would run while playing so the user wouldn't have to go to the website. Another thing is to come up with a better way of displaying cards. When looking at a deck, it takes about the whole page which I'm not sure is the best user experience. Of course this is a couple of many ideas that could help improve this application. I am more than willing to consider any input for improvements.

## Flow of the Application

While a user has the website open, it'll check for response from the local game client.  This happens until the user enters a game and a response is sent from '/positional-rectangles'. I then take the PlayerName from this response and use that to query my database for records that match the PlayerName.  This information then gets displayed on 'Local Player Stats'.  At the same time, I also send a request to '/static-decklist' to display the current deck the user is playing with.  From here I send a request to '/game-result' on a cycle to get data once the current game has ended. Depending on win/loss, I update the database appropriately matching PlayerName and Deck that I had received earlier.  

The leaderboard can function independently and will have the same type of display of the deck based on either which player you had entered or which row you had selected from the leaderboard table.  Currently I have myself ([Tox is RIPPIN](https://lol.mobalytics.gg/summoner/na/tox%20is%20rippin/overview?season=13)) as well as the entire LCS roster at the end of the summer split as players to retrieve records from.

## Issues / Concerns

I ran into a CORS issue when calling the game client API from the site. My fix was to have the user install a [plugin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) for their browser to use alongside the website. I know this isn't the best approach but the many attempts I had at a work around didn't solve my problem. If possible I would love to update this project when I can make the calls appropriately.

If you don't feel comfortable with using the plugin, I've populated the website with some mock data so you are able to see what the functionality could be.

With the limited time I had for this project there are of course many ways to currently abuse the application. As it is now, it's assuming the user is not toxic and has good intentions. :)

## Dev Challenge Thoughts

I really like these dev challenges. The time crunch can get unsettling but having a project that works with something (League of Legends / Riot Games) that I am personally invested in is awesome and I would do it again in a heartbeat. I hope you like the project and I welcome any feedback or even casual conversation you would like to have.

## Contact

You can reach me at [Twitter](https://twitter.com/_Toxey) or email me at dev.AnthonyT@gmail.com

## Technology

.NET Core, Angular, MySQL all hosted on Google Cloud Platform.
