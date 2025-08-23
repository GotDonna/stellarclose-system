const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
const IntelligentWorkflowManager = require('./workflow-manager');

console.log('🔍 Starting STELLARCLOSE server...');
const workflowManager = new IntelligentWorkflowManager();

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
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STELLARCLOSE - Premium Real Estate Transaction Coordination</title>
</head>
<body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; margin: 0; padding: 40px; text-align: center;">
<div style="background: #ff6b35; color: white; text-align: center; padding: 15px; font-weight: bold; font-size: 1.2em; margin-bottom: 30px;">LAUNCHING SEPTEMBER 1ST, 2025 - JOIN WAITING LIST FOR EARLY ACCESS!</div>

    <h1 style="font-size: 3rem; margin-bottom: 20px;">STELLARCLOSE</h1>
    <h2 style="font-size: 1.6rem; margin-bottom: 30px;">PREMIUM AUTOMATED REAL ESTATE TRANSACTION COORDINATION</h2>
    <p style="font-size: 1.2rem; margin-bottom: 20px;">100% AUTOMATED - ZERO RISK - PAY ONLY AFTER SUCCESSFUL CLOSING</p>
    <p style="font-size: 1rem; margin-bottom: 40px; opacity: 0.9;">We coordinate your transactions from contract to close</p>
    <div style="margin: 40px 0;">
        <button onclick="window.location.href='/intake'" style="background: #e74c3c; color: white; padding: 15px 30px; border: none; border-radius: 25px; font-size: 1.1rem; margin: 10px; cursor: pointer;">NOW AVAILABLE IN MICHIGAN</button>
        <button style="background: #f39c12; color: white; padding: 15px 30px; border: none; border-radius: 25px; font-size: 1.1rem; margin: 10px; cursor: pointer;">COMING SOON TO MORE STATES</button>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 40px; margin: 40px 0; border-radius: 15px;">
        <h3 style="font-size: 1.8rem; margin-bottom: 20px;">Join Our Exclusive Waiting List</h3>
        <p style="margin-bottom: 25px;">Be the first to get access to STELLARCLOSE automation in your market</p>
        <input type="email" placeholder="Enter your email address" id="email" style="padding: 12px; border: none; border-radius: 25px; width: 300px; margin-right: 10px;">
        <button onclick="joinWaitingList()" style="background: #27ae60; color: white; padding: 12px 25px; border: none; border-radius: 25px; cursor: pointer;">JOIN NOW</button>
    </div>
    <script>
        function joinWaitingList() {
            const email = document.getElementById('email').value;
            if (email) {
                alert('Thank you! You have been added to our waiting list.');
                document.getElementById('email').value = '';
            } else {
                alert('Please enter your email address');
            }
        }
    </script>
</body>
</html>

    `);
});

// Intake form route
app.get('/intake', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STELLARCLOSE - Transaction Intake Form</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh; padding: 20px;
        }
        .container { 
            max-width: 900px; margin: 0 auto; background: white; 
            border-radius: 20px; overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white; padding: 40px 30px; text-align: center; 
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .form-section { padding: 40px 30px; }
        .form-group { margin-bottom: 25px; }
        .form-group label { 
            display: block; margin-bottom: 8px; font-weight: bold; 
            color: #2c3e50; font-size: 1.1em;
        }
        .form-group input, .form-group select, .form-group textarea { 
            width: 100%; padding: 15px; border: 2px solid #e1e8ed; 
            border-radius: 10px; font-size: 1em; transition: border-color 0.3s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
            border-color: #3498db; outline: none; 
        }
        .submit-btn { 
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white; padding: 20px 40px; border: none; 
            border-radius: 50px; font-weight: bold; font-size: 1.3em;
            cursor: pointer; width: 100%; margin-top: 20px;
            transition: transform 0.3s ease;
        }
        .submit-btn:hover { transform: translateY(-3px); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 STELLARCLOSE</h1>
            <h2>Transaction Intake Form</h2>
            <p>Begin your 551-step automated transaction coordination</p>
        </div>
        
        <div class="form-section">
            <form action="/submit-transaction" method="POST">
                <div class="form-group">
                    <label for="agentName">Agent Name *</label>
                    <input type="text" id="agentName" name="agentName" required>
                </div>
                
                <div class="form-group">
                    <label for="agentEmail">Agent Email *</label>
                    <input type="email" id="agentEmail" name="agentEmail" required>
                </div>
                
                <div class="form-group">
                    <label for="agentPhone">Agent Phone *</label>
                    <input type="tel" id="agentPhone" name="agentPhone" required>
                </div>
                
                <div class="form-group">
                    <label for="propertyAddress">Property Address *</label>
                    <input type="text" id="propertyAddress" name="propertyAddress" required>
                </div>
                
                <div class="form-group">
                    <label for="transactionType">Transaction Type *</label>
                    <select id="transactionType" name="transactionType" required>
                        <option value="">Select Transaction Type</option>
                        <option value="listing">Listing</option>
                        <option value="buyer">Buyer Representation</option>
                        <option value="dual">Dual Agency</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="salePrice">Sale Price *</label>
                    <input type="text" id="salePrice" name="salePrice" required placeholder="$300,000">
                </div>
                
                <div class="form-group">
                    <label for="closingDate">Expected Closing Date *</label>
                    <input type="date" id="closingDate" name="closingDate" required>
                </div>
                
                <button type="submit" class="submit-btn">
                    🚀 START 551-STEP AUTOMATION
                </button>
            </form>
        </div>
    </div>
<script>
document.getElementById('salePrice').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
        value = parseInt(value).toLocaleString();
        e.target.value = '$' + value;
    }

});
</script>
</body>
</html>
    `);
});

// Form submission handler - triggers 551-step automation
app.post('/submit-transaction', (req, res) => {
    try {
        console.log('🎯 NEW TRANSACTION SUBMITTED!');
        console.log('Agent:', req.body.agentName);
        console.log('Property:', req.body.propertyAddress);
        console.log('🚀 Starting 551-step automation...');
        
        // Trigger the Intelligent Workflow Manager
        workflowManager.startTransaction(req.body);
        
        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STELLARCLOSE - Transaction Started!</title>
    <style>
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh; display: flex; align-items: center; justify-content: center;
        }
        .success-container { 
            background: white; padding: 60px; border-radius: 20px; 
            text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
        }
        .success-icon { font-size: 4em; margin-bottom: 20px; }
        h1 { color: #27ae60; font-size: 2.5em; margin-bottom: 20px; }
        .message { font-size: 1.3em; color: #2c3e50; margin-bottom: 30px; }
        .automation-status { 
            background: #e8f5e8; padding: 20px; border-radius: 10px; 
            border-left: 4px solid #27ae60; margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">🎉</div>
        <h1>Transaction Started Successfully!</h1>
        <div class="message">
            Your 551-step automated transaction coordination is now active!
        </div>
        <div class="automation-status">
            <h3>🤖 STELLARCLOSE Automation Active</h3>
            <p>• All reminders scheduled automatically<br>
            • Calendar integration activated<br>
            • CRM synchronization started<br>
            • Document monitoring initiated<br>
            • Crisis management protocols enabled</p>
        </div>
        <p style="color: #666; font-size: 1.1em;">
            You'll receive your first automated update within 24 hours!
        </p>
    </div>
</body>
</html>
        `);
    } catch (error) {
        console.error('❌ Error starting transaction:', error);
        res.status(500).send('Error starting transaction');
    }
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
                Premium Transaction Coordination Excellence
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
                    <p>Premium level service that makes you look exceptional</p>
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
                Join the agents who deliver premium service while we handle everything behind the scenes.
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
// Waitlist signup page
app.get('/waitlist', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STELLARCLOSE - Join Our Waitlist</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh; padding: 20px;
        }
        .container { 
            max-width: 700px; margin: 0 auto; background: white; 
            border-radius: 20px; overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white; padding: 40px 30px; text-align: center; 
        }
        .form-section { padding: 40px 30px; }
        .form-group { margin-bottom: 25px; }
        .form-group label { 
            display: block; margin-bottom: 8px; font-weight: bold; 
            color: #2c3e50; font-size: 1.1em;
        }
        .form-group input, .form-group select { 
            width: 100%; padding: 15px; border: 2px solid #e1e8ed; 
            border-radius: 10px; font-size: 1em;
        }
        .checkbox-group {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .submit-btn { 
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white; padding: 20px 40px; border: none; 
            border-radius: 50px; font-weight: bold; font-size: 1.3em;
            cursor: pointer; width: 100%; margin-top: 20px;
        }
        .privacy-section {
            background: #f1f3f4;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 STELLARCLOSE</h1>
            <h2>Join Our Expansion Waitlist</h2>
            <p>Be the first to know when we launch in your state</p>
        </div>
        
        <div class="form-section">
            <form action="/submit-waitlist" method="POST">
                <div class="form-group">
                    <label for="name">Your Name *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="state">Your State *</label>
                    <select id="state" name="state" required>
    <option value="">Select Your State</option>
    <option value="alabama">Alabama</option>
    <option value="alaska">Alaska</option>
    <option value="arkansas">Arkansas</option>
    <option value="california">California</option>
    <option value="colorado">Colorado</option>
    <option value="connecticut">Connecticut</option>
    <option value="delaware">Delaware</option>
    <option value="florida">Florida</option>
    <option value="georgia">Georgia</option>
    <option value="hawaii">Hawaii</option>
    <option value="idaho">Idaho</option>
    <option value="illinois">Illinois</option>
    <option value="indiana">Indiana</option>
    <option value="iowa">Iowa</option>
    <option value="kansas">Kansas</option>
    <option value="kentucky">Kentucky</option>
    <option value="louisiana">Louisiana</option>
    <option value="maine">Maine</option>
    <option value="maryland">Maryland</option>
    <option value="massachusetts">Massachusetts</option>
    <option value="minnesota">Minnesota</option>
    <option value="mississippi">Mississippi</option>
    <option value="missouri">Missouri</option>
    <option value="montana">Montana</option>
    <option value="nebraska">Nebraska</option>
    <option value="nevada">Nevada</option>
    <option value="newhampshire">New Hampshire</option>
    <option value="newjersey">New Jersey</option>
    <option value="newyork">New York</option>
    <option value="northcarolina">North Carolina</option>
    <option value="northdakota">North Dakota</option>
    <option value="ohio">Ohio</option>
    <option value="oklahoma">Oklahoma</option>
    <option value="oregon">Oregon</option>
    <option value="pennsylvania">Pennsylvania</option>
    <option value="rhodeisland">Rhode Island</option>
    <option value="southcarolina">South Carolina</option>
    <option value="southdakota">South Dakota</option>
    <option value="tennessee">Tennessee</option>
    <option value="texas">Texas</option>
    <option value="utah">Utah</option>
    <option value="vermont">Vermont</option>
    <option value="virginia">Virginia</option>
    <option value="washington">Washington</option>
    <option value="westvirginia">West Virginia</option>
    <option value="wisconsin">Wisconsin</option>
    <option value="wyoming">Wyoming</option>
    <option value="other">Other</option>
</select>
                </div>
                
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" name="emailConsent" value="yes" required>
                        I give STELLARCLOSE permission to send me email updates about service availability in my state. *
                    </label>
                </div>
                
                <button type="submit" class="submit-btn">
                    🚀 JOIN WAITLIST
                </button>
            </form>
            
            <div class="privacy-section">
                <h4>Privacy Policy</h4>
                <p><strong>We respect your privacy.</strong> Your information will only be used to notify you when STELLARCLOSE becomes available in your state. We never sell or share your personal information. Unsubscribe anytime at privacy@stellarclose.com.</p>
            </div>
        </div>
    </div>
</body>
</html>`);
});
// Handle waitlist form submission
app.post('/submit-waitlist', (req, res) => {
    console.log('🎯 NEW WAITLIST SIGNUP!');
    console.log('Name:', req.body.name);
    console.log('Email:', req.body.email);
    console.log('State:', req.body.state);
    console.log('Email Consent:', req.body.emailConsent);
    
    res.send(`<!DOCTYPE html>
<html>
<head><title>STELLARCLOSE - Thank You!</title>
<style>
body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.container { background: white; padding: 60px; border-radius: 20px; text-align: center; max-width: 500px; }
h1 { color: #27ae60; font-size: 2.5em; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="container">
<div style="font-size: 4em; margin-bottom: 20px;">✅</div>
<h1>You're on the Waitlist!</h1>
<p style="font-size: 1.3em; color: #2c3e50;">Thank you ${req.body.name}! We'll email you as soon as STELLARCLOSE launches in ${req.body.state}.</p>
<p style="margin-top: 30px;"><a href="/" style="color: #e74c3c; text-decoration: none; font-weight: bold;">← Back to Homepage</a></p>
</div>
</body>
</html>`);
});
app.listen(PORT, () => {
    console.log(`🚀 STELLARCLOSE server running at http://localhost:${PORT}`);
});
