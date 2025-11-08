require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const path = require('path');
const weatherRouter = require('./src/api/weather');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

// In-memory database (can be replaced with real DB)
const database = {
  users: [],
  creditTransactions: [],
  plans: [
    {
      id: 'max',
      name: 'Max Plan',
      credits: 1000,
      price: 99,
      description: 'Maximum credits for API usage'
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      credits: 500,
      price: 49,
      description: 'Professional plan with 500 credits'
    },
    {
      id: 'starter',
      name: 'Starter Plan',
      credits: 100,
      price: 9,
      description: 'Get started with 100 credits'
    }
  ]
};

// API Routes

// Get available plans
app.get('/api/plans', (req, res) => {
  res.json(database.plans);
});

// Get user by id
app.get('/api/users/:id', (req, res) => {
  const user = database.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Create new user with credits
app.post('/api/users', (req, res) => {
  const { name, email, planId } = req.body;

  if (!name || !email || !planId) {
    return res.status(400).json({ error: 'Missing required fields: name, email, planId' });
  }

  // Find the plan
  const plan = database.plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(400).json({ error: 'Plan not found' });
  }

  // Create user
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const user = {
    id: userId,
    name,
    email,
    planId,
    credits: plan.credits,
    maxCredits: plan.credits,
    createdAt: new Date().toISOString(),
    verified: false
  };

  database.users.push(user);

  // Record credit transaction
  database.creditTransactions.push({
    id: `txn_${Date.now()}`,
    userId,
    type: 'allocation',
    amount: plan.credits,
    description: `Initial credits for ${plan.name}`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    user,
    message: `User created with ${plan.credits} credits from ${plan.name}`
  });
});

// Get user credits
app.get('/api/users/:id/credits', (req, res) => {
  const user = database.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({
    userId: user.id,
    credits: user.credits,
    maxCredits: user.maxCredits,
    plan: user.planId
  });
});

// Verify security code (placeholder)
app.post('/api/users/:id/verify', (req, res) => {
  const { code } = req.body;
  const user = database.users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!code || code.length !== 6) {
    return res.status(400).json({ error: 'Invalid security code format' });
  }

  // Mark user as verified
  user.verified = true;

  res.json({
    success: true,
    message: 'User verified successfully',
    user
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Legacy routes
app.use(weatherRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  console.log(`API available at http://localhost:${port}/api`);
}); 