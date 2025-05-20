const { spawn } = require('child_process');
const path = require('path');
const tsNode = spawn('npx', [
  'ts-node',
  '-r', 'tsconfig-paths/register',
  path.join(__dirname, 'seed.ts')
], {
  stdio: 'inherit',
  shell: true
});

tsNode.on('error', (err) => {
  console.error('Failed to start ts-node:', err);
  process.exit(1);
});

tsNode.on('close', (code) => {
  process.exit(code);
}); 