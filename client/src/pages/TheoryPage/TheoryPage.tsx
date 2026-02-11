import React, { type FC } from 'react';

import AppTopbar from '@/components/AppTopbar/AppTopbar';
import SignInButton from '@/components/SignInButton/SignInButton';
import WelcomeDialog from '@/components/WelcomeDialog/WelcomeDialog';

export const TheoryPage: FC = () => {

  return (
    <React.Fragment>
      <AppTopbar/>
      <div className='App-Login'>
        <WelcomeDialog />
        <SignInButton />
      </div>
      <h1>Теория</h1>
    </React.Fragment  >
  );
} 

/*
https://www.trader-dale.com/beginners-guide-to-volume-profile-part-1-what-is-volume-profile/

Beginners Guide to Volume Profile Part 1: What is Volume Profile
----------------------------------------------------------------



This article is a part of a four-part Beginners Guide to Volume Profile. Here are links to all four parts:

    Beginners Guide to Volume Profile Part 1: What is Volume Profile / https://www.trader-dale.com/beginners-guide-to-volume-profile-part-1-what-is-volume-profile/
    Beginners Guide to Volume Profile Part 2: Simple Volume Profile Trading Setups / https://www.trader-dale.com/beginners-guide-to-volume-profile-part-2-simple-volume-profile-trading-setups/
    Beginners Guide to Volume Profile Part 3: Where to get Volume Profile & Setup Guide / https://www.trader-dale.com/beginners-guide-to-volume-profile-part-3-where-to-get-volume-profile-setup-guide/
    BONUS: How To Trade The Point Of Control (POC) / https://www.trader-dale.com/how-to-trade-the-point-of-control-poc/

VOLUME PROFILE DEFINITION: Volume Profile is a trading indicator which shows Volume at Price. It helps to identify where the big financial institutions put their money and helps to reveal their intentions.


What does Volume Profile look like?
-----------------------------------

Volume Profile can have many shapes – depending on how the volumes were distributed. It is created using horizontal lines (it is a histogram). The thicker the profile is, the more volume was traded at the given level. If a profile is thin in some place, then it means that there was not a great deal of volume traded there.

Here is an example of how Volume Profile can look.

<volume-profile-part-1-img-01>



How is Volume Profile different from standard Volume indicator's on MT4?
------------------------------------------------------------------------

Volume Profile shows volume at price. Standard volume indicator from MT4 (or any other software) shows volume during a specific time period.

There is a big difference!

Volume Profile shows you what price levels are important for the big trading institutions. Therefore, it points you to strong support and resistance zones.

Standard volume indicators only show you WHEN there were big volumes traded. This tells you nothing about important price levels (support/resistance zones).

<volume-profile-part-1-img-02>




What does Volume Profile tell us?
---------------------------------

Let me demonstrate with an example:

In the picture below, you can see two heavy volume zones, and one zone where the Volume Profile is thin.

<volume-profile-part-1-img-03>

What does this particular picture tell us? It tells us that that big financial institutions were interested in trading in those two heavy volume zones. On the other hand, they did not really care for trading too much in the middle where volume was clearly thin.

This scenario could be a sign that big institutions were:

1) Building up their big selling positions in the heavy volume zone (1.1230 -1.1240).

2)Then they manipulated the price to go into a sell-off (that’s the thin profile).

3) And finally, they quit their positions (or were adding to them) in the heavy volume zone around 1.1205-1.1215.




Different Volume Profile shapes
-------------------------------

There are many shapes Volume Profile histogram can print and many different stories it can tell. However, the shapes and the stories behind them tend to repeat themselves and in the end, it comes down to just a few basic shapes the Volume Profile can take:
1) D-shaped Profile

Corresponds with a letter “D” and it is the most common shape. It tells us, that there is temporary balance in the market. Big financial institutions are building-up their trading positions and they are getting ready for a big move.

<volume-profile-part-1-img-04>

2) P-shaped Profile

Corresponds with a letter “P” and it is a sign of an uptrend. Aggressive institutional buyers were pushing the price upwards. Then the price found a fair value and a rotation started. In this rotation heavy volumes are traded and market is getting ready for a next big move. P-shaped Profiles are usually seen in an uptrend or in the end of a downtrend.

<volume-profile-part-1-img-05>

3) b-shaped Profile

Corresponds with the letter “b” and it is the exact opposite of P-shaped profile.

b-shaped profiles are usually seen in a downtrend or at the end of an uptrend.

<volume-profile-part-1-img-06>

4) Thin Profile

Corresponds with the letter “I” (with little bumps in it).

Thin profile means a strong trend. There is not much time for building-up trading positions in an aggressive price movement. Only small Volume Clusters are created in this kind of profile.

One of my favorite trading strategies is based on those Volume Clusters!

<volume-profile-part-1-img-07>




What makes Volume Profile different to other trading indicators?
----------------------------------------------------------------

No other indicator can show you where the big trading institutions were likely buying/selling like Volume Profile can! Why? 99% of all standard indicators are calculated only from two variables: Price and Time. Volume Profile gets calculated using three variables – Price, Time and Volume.

In other words – 99% of standard trading indicators only show you how the price was moving in the past. The only difference between those thousands of indicators is how they visualize it. It does not matter whether it is EMA, Bollinger bands, RSI, MACD, or any other indicator… All those only show a different visualization of a price movement in the past (they are delayed – they visualize something that has already happened).

YES – they are pretty useless which is the reason traders keep jumping from one to the other. 

Volume Profile, on the other hand, points you to zones which were and will be important for big trading institutions. Simply put – Volume Profile can show you what will happen in the future!




Why should we care about volumes and what the big institutions are doing in the market?
---------------------------------------------------------------------------------------

We need to know what the big financial institutions are up to for one simple reason. They dominate, move and manipulate the markets. It is them who decide where the price will go, not you or I. We are too small.

Have a look at the picture below. It shows 10 biggest banks and how much volume they control. Together it is almost 80% of the market. Just 10 banks!

It is those guys who own this game. Those are the guys we need to track and follow. And how do we follow them? By using Volume Profile to track their volumes.

<volume-profile-part-1-img-08>





Are there any simple Volume Profile strategies I can learn?
-----------------------------------------------------------

Yes, there are! They are based on the Volume Profile shapes I have already shown you. There is a separate guide where I show you step-by-step my favorite Volume Profile strategies.

You can learn the strategies here: Volume Profile Trading Strategies / https://www.trader-dale.com/beginners-guide-to-volume-profile-part-2-simple-volume-profile-trading-setups/



I want an in-depth Volume Profile Education and training!

Congratulations! You are on the best place for that! I have designed unique Volume Profile educational courses, that will teach you all there is about Volume Profile!

You can chose the best fitting course here:

Dale’s Volume Profile Training / https://www.trader-dale.com/volume-profile-forex-trading-course/

Happy trading!

-Dale

Continue reading to Part 2 here:

Beginners Guide to Volume Profile Part 2: Simple Volume Profile Trading Setups / https://www.trader-dale.com/beginners-guide-to-volume-profile-part-2-simple-volume-profile-trading-setups/

*/