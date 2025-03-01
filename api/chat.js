module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET request - simple test endpoint
  if (req.method === 'GET') {
    res.status(200).json({ message: 'HS2 Chatbot API is working!' });
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      // Simple response logic
      let response = "I'm not sure I understand. Could you rephrase that?";
      
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "Hello! I can help with information about HS2, including the Homeowner Payment Scheme and Rural Support Zone. What would you like to know?";
      } 
      else if (lowerMessage.includes('homeowner payment') || lowerMessage.includes('payment scheme')) {
        response = "The Homeowner Payment Scheme provides compensation for property owners near the HS2 route. To qualify, your house or 25% of your property must be in the homeowner payment zone. You must be an owner-occupier who bought the property before April 9, 2014 (Phase 1) or November 30, 2015 (Phase 2a). Payments range from £8,000 to £24,000 depending on your payment band.";
      }
      else if (lowerMessage.includes('rural support') || lowerMessage.includes('support zone')) {
        response = "The Rural Support Zone is generally 60 to 120 meters from the HS2 route. If your house or 25% of your property is in this zone, you may be eligible for the Cash Offer or Voluntary Purchase Scheme. The Cash Offer is a lump-sum payment of 10% of your property's unblighted market value (£30,000 minimum to £100,000 maximum).";
      }
      else if (lowerMessage.includes('construction') || lowerMessage.includes('cutting') || lowerMessage.includes('embankment')) {
        response = "HS2 construction involves over 70 cuttings (44+ miles total) and 110+ embankments (38+ miles). The longest cutting is Calvert Cutting at 2.5 miles, while the deepest is Lower Thorpe Cutting at 30.5m. The longest embankment will be Grendon Underwood at 1.8 miles.";
      }
      else if ((lowerMessage.includes('speak') || lowerMessage.includes('talk') || lowerMessage.includes('human')) && 
               (lowerMessage.includes('human') || lowerMessage.includes('person') || lowerMessage.includes('agent'))) {
        response = "If you'd like to speak with a human representative, please email info@tlcompensation.com. A team member will get back to you as soon as possible.";
      }
      
      res.status(200).json({ 
        message: response,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
  } else {
    // Handle other methods
    res.status(405).json({ error: 'Method not allowed' });
  }
};
