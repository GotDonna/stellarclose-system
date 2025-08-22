const express = require('express');
const app = express();
const PORT = 3000;

console.log('🔍 Starting STELLARCLOSE server...');

const statePrices = {
    michigan: { name: "Michigan", price: "350" },
    newyork: { name: "New York", price: "700" },
    california: { name: "California", price: "850" },
    texas: { name: "Texas", price: "450" },
    florida: { name: "Florida", price: "500" },
    illinois: { name: "Illinois", price: "600" },
    pennsylvania: { name: "Pennsylvania", price: "400" },
    ohio: { name: "Ohio", price: "350" },
    georgia: { name: "Georgia", price: "400" },
    northcarolina: { name: "North Carolina", price: "375" }
};

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html><head><title>STELLARCLOSE - Premium Real Estate Transaction Coordination</title>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body { font-family: 'Segoe UI', sans-serif; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; text-align: center; }
.header { color: white; margin-bottom: 60px; }
.header h1 { font-size: 4em; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
.header p { font-size: 1.5em; margin: 20px 0; opacity: 0.9; }
.states-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 40px 0; }
.state-card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s; }
.state-card:hover { transform: translateY(-5px); }
.state-card h3 { color: #2c3e50; font-size: 1.8em; margin-bottom: 15px; }
.price { font-size: 3em; color: #e74c3c; font-weight: bold; margin: 20px 0; }
.cta-button { background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; margin-top: 20px; }
</style></head>
<body>
<div class="container">
<div class="header">
<h1>🌟 STELLARCLOSE</h1>
<p>The Ritz Carlton of Real Estate Transaction Coordination</p>
<p>100% Automated • Zero Risk • Pay Only After Successful Closing</p>
</div>
<div class="states-grid">
<div class="state-card">
<h3>Michigan</h3>
<div class="price">$350</div>
<p>Complete transaction coordination from listing to closing</p>
<a href="/pricing/michigan" class="cta-button">Get Started →</a>
</div>
<div class="state-card">
<h3>Coming Soon</h3>
<div class="price">More States</div>
<p>Expanding nationwide - your state could be next!</p>
<a href="/pricing/michigan" class="cta-button">Join Waitlist →</a>
</div>
</div>
</div>
</body></html>`);
});

app.get('/pricing/:state', (req, res) => {
    const state = req.params.state.toLowerCase();
    const stateInfo = statePrices[state];
    
    if (!stateInfo) {
        return res.status(404).send('State not found');
    }
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STELLARCLOSE - ${stateInfo.name} Real Estate Closing Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 20px; 
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            animation: slideUp 0.6s ease-out;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .header { 
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 { 
            font-size: 2.5em; 
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header h2 { 
            font-size: 1.5em; 
            font-weight: 300;
            opacity: 0.9;
        }
        .price-section {
            padding: 40px 30px;
            text-align: center;
        }
        .price-box { 
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white; 
            padding: 40px 30px; 
            border-radius: 15px; 
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
        }
        .price-box h3 { 
            font-size: 1.8em; 
            margin-bottom: 20px;
            font-weight: 300;
        }
        .price { 
            font-size: 4em; 
            font-weight: bold; 
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .price-details { 
            font-size: 1.2em; 
            opacity: 0.9;
            margin-top: 15px;
        }
        .benefits {
            background: #f8f9fa;
            padding: 40px 30px;
        }
        .benefits h3 {
            color: #2c3e50;
            font-size: 2em;
            text-align: center;
            margin-bottom: 30px;
        }
        .benefit-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .benefit {
            background: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border-left: 4px solid #3498db;
        }
        .benefit-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
        }
        .cta-section {
            padding: 40px 30px;
            text-align: center;
            background: white;
        }
        .cta-button { 
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white; 
            padding: 20px 40px; 
            text-decoration: none; 
            border-radius: 50px; 
            font-weight: bold; 
            font-size: 1.3em;
            display: inline-block; 
            margin-top: 20px;
            box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(231, 76, 60, 0.4);
        }
        .guarantee {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #27ae60;
        }
        .guarantee h4 {
            color: #27ae60;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 STELLARCLOSE</h1>
            <h2>${stateInfo.name} Real Estate Closing Services</h2>
            <p style="margin-top: 15px; font-size: 1.1em; opacity: 0.8;">
                The Ritz Carlton of Transaction Coordination
            </p>
        </div>
        
        <div class="price-section">
            <div class="price-box">
                <h3>Complete Transaction Coordination</h3>
                <div class="price">$${stateInfo.price}</div>
                <div class="price-details">
                    100% Automated • Zero Stress • Perfect Results<br>
                    <strong>Payment only due AFTER successful closing!</strong>
                </div>
            </div>
            
            <div class="guarantee">
                <h4>🛡️ Zero Risk Guarantee</h4>
                <p>You pay nothing unless your transaction closes successfully. That's our confidence in delivering exceptional results.</p>
            </div>
        </div>

        <div class="benefits">
            <h3>Why ${stateInfo.name} Agents Choose STELLARCLOSE</h3>
            <div class="benefit-grid">
                <div class="benefit">
                    <div class="benefit-icon">🤖</div>
                    <h4>551-Step Automation</h4>
                    <p>Every detail handled perfectly by our automated system</p>
                </div>
                <div class="benefit">
                    <div class="benefit-icon">💰</div>
                    <h4>Zero Risk</h4>
                    <p>Pay only after successful closing - 10 days NET terms</p>
                </div>
                <div class="benefit">
                    <div class="benefit-icon">🎯</div>
                    <h4>Premium Service</h4>
                    <p>Ritz Carlton level service that makes you look exceptional</p>
                </div>
                <div class="benefit">
                    <div class="benefit-icon">📱</div>
                    <h4>Free CRM Included</h4>
                    <p>Complete client relationship management system</p>
                </div>
                <div class="benefit">
                    <div class="benefit-icon">⏰</div>
                    <h4>24/7 Operation</h4>
                    <p>Never miss a deadline with round-the-clock monitoring</p>
                </div>
                <div class="benefit">
                    <div class="benefit-icon">🏆</div>
                    <h4>Perfect Results</h4>
                    <p>Consistent, flawless execution every single transaction</p>
                </div>
            </div>
        </div>

        <div class="cta-section">
            <h3 style="color: #2c3e50; margin-bottom: 20px;">Ready to Elevate Your Business?</h3>
            <p style="font-size: 1.2em; margin-bottom: 20px; color: #666;">
                Join the agents who deliver Ritz Carlton service while we handle everything behind the scenes.
            </p>
            <a href="/intake" class="cta-button">Start Your ${stateInfo.name} Closing →</a>
            <p style="margin-top: 20px; font-size: 0.9em; color: #888;">
                Free setup • No monthly fees • Pay only on successful closings
            </p>
        </div>
    </div>
</body>
</html>`;
    
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`🚀 STELLARCLOSE server running at http://localhost:${PORT}`);
});
