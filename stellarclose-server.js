const express = require("express");
const app = express();
const PORT = 3000;

console.log("🔍 Starting STELLARCLOSE server...");

const statePrices = {
    michigan: { name: "Michigan", price: "350" },
    newyork: { name: "New York", price: "700" },
    california: { name: "California", price: "850" }
};

app.get("/", (req, res) => {
    res.send("<h1>🌟 STELLARCLOSE</h1><p>Your real estate empire is live!</p><a href=\"/pricing/michigan\">Michigan Pricing</a>");
});

app.get("/pricing/:state", (req, res) => {
    const state = req.params.state.toLowerCase();
    const stateInfo = statePrices[state];
    
    if (!stateInfo) {
        return res.status(404).send("State not found");
    }
    
    res.send(`<h1>STELLARCLOSE ${stateInfo.name}</h1><h2>$${stateInfo.price}</h2><p>100% Automated Transaction Coordination</p><a href="/intake">Start Now</a>`);
});

app.listen(PORT, () => {
    console.log(`🚀 STELLARCLOSE server running at http://localhost:${PORT}`);
});
