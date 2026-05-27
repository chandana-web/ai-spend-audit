export const TOOLS = [
  { name: 'Cursor', plans: ['Hobby', 'Pro', 'Business', 'Enterprise'] },
  { name: 'GitHub Copilot', plans: ['Individual', 'Business', 'Enterprise'] },
  { name: 'Claude', plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API direct'] },
  { name: 'ChatGPT', plans: ['Plus', 'Team', 'Enterprise', 'API direct'] },
  { name: 'Anthropic API', plans: ['API direct'] },
  { name: 'OpenAI API', plans: ['API direct'] },
  { name: 'Gemini', plans: ['Pro', 'Ultra', 'API'] },
  { name: 'Windsurf', plans: ['Free', 'Pro', 'Enterprise'] },
];

export const USE_CASES = ['Coding', 'Writing', 'Data Analysis', 'Research', 'Mixed', 'Design', 'Marketing'];

export const PRICING_DATA = {
  Cursor: { Pro: 20, Business: 40, Enterprise: 60 },
  'GitHub Copilot': { Individual: 10, Business: 19, Enterprise: 39 },
  Claude: { Pro: 20, Max: 30, Team: 25, Enterprise: 50 },
  ChatGPT: { Plus: 20, Team: 25, Enterprise: 30 },
};

export const SAVINGS_THRESHOLDS = {
  HIGH_SAVINGS: 500,
  MEDIUM_SAVINGS: 100,
  LOW_SAVINGS: 0,
};