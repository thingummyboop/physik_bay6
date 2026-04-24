const fs = require('fs');
const glob = require('path');

const dir = 'manim_scripts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.py'));

files.forEach(file => {
    const fullPath = dir + '/' + file;
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Zoom out to make everything smaller and fit better on screen
    if (!content.includes('self.camera.frame_width = ')) {
        // Find def construct(self): and insert right after
        content = content.replace(/def construct\(self\):/, 'def construct(self):\n        self.camera.frame_width = 22');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated ' + file);
    }
});