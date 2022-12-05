https://user-images.githubusercontent.com/119897429/205748800-85fbfead-fdee-4c25-a821-a8edc0444b86.mp4

Browser extension that adds new features to FurAffinity, including a new recommendation tab that are based on your favorites and that you can scroll through up to the 300th result. The recommendations are retrieved via an API which is powered on the backend by a neural network trained on scraped data. Also, it adds new tabs for browsing new submissions from your watchlist as well as your favorites all in one place!

## How to install



### Chrome/Edge and chromium based browsers

 - Download the latest zip release and unzip it somewhere
 - Go to `chrome://extensions/`  or`edge://extensions/`
 - Toggle Developper Mode
 - Click on Load Unpacked
 - Select the folder where you unzip the archive
 - Go to furaffinity.net and you're done!
### Firefox
 - TODO

## FAQ

**I can see the tabs but when I click on Recommended it's empty!** 

First, make sure your ad blocker isn't blocking traffic (I'm looking into how to mitigate this). If disabling it has no effect then make sure your profile or your favorites isn't set to private. If it isn't, it's most likely because your fav gallery needs to contain at least one ID in the last 5 pages that is known by the model and its current dictionnary of 9 million submissions, which itself might be possible if you have very few favorites (like fewer than 5) so the only solution is to pretty much just go and like more stuff. If you feel this really shouldn't be the reason though (for instance if you have more than 100 favorites) feel free to ping me on Discord (https://discord.gg/DF6Vxyh7 / Beary#4996) and I'll take a look 

**I'm seeing submissions that are already in my favorites!**

Make sure it's actually the exact same submission and not a matter of commissioner and artist posting the same image as I've noticed that happening fairly often. If it's not, it might be because I've simply not scraped your profile entirely yet, which might be likely if you have more than 2000 favorites (scraping all of the 1.7B favorites on FA would take months so realistically I have to set a page limit per user) 

**"Ignore from users already faved" is checked but I'm seeing submissions from users that are already in my favorites!** 

Same as before 

**The UI looks kinda terrible**

Well, yeah... Unfortunately I'm not a professional developer (which you can probably guess from my code) and most certainly not a webdesigner, so if you have ideas on how to improve it please feel free to contact me or create a PR

**Honestly, I think the quality of the results could be better** 

That might be because I haven't trained the model on sufficient data or for not long enough, so please let me know if you do (but if you don't please let me know too!)
