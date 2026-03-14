// 1. The "Scanner" that keeps the server awake every minute
Parse.Cloud.job("keepAliveScanner", async (request) => {
    const now = new Date();
    console.log("Scanner running at: " + now.toISOString());
    
    // Optional: You could add code here to fetch the latest price 
    // from Pionex just to log that the connection is active.
    return "Server is Awake";
});

// 2. The Webhook Receiver (The "Brain")
Parse.Cloud.define("tradingview_signal", async (request) => {
    const { action, ticker, price } = request.params;
    
    // Log the trade to Back4app Database
    const Trade = Parse.Object.extend("Trades");
    const trade = new Trade();
    await trade.save({ action, ticker, price: parseFloat(price) });

    // Send the signal to Pionex Signal Bot
    const PIONEX_WEBHOOK = "YOUR_PIONEX_SIGNAL_BOT_URL";
    
    return await Parse.Cloud.httpRequest({
        method: 'POST',
        url: PIONEX_WEBHOOK,
        body: {
            "secret": "YOUR_PIONEX_SECRET",
            "alert": action === "buy" ? "enter_long" : "exit_long"
        }
    });
});