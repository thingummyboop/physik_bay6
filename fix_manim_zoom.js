const fs = require('fs');

const dir = 'manim_scripts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.py'));

files.forEach(file => {
    const fullPath = dir + '/' + file;
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix aspect ratio by also setting frame_height
    if (content.includes('self.camera.frame_width = 22')) {
        content = content.replace('self.camera.frame_width = 22', 'self.camera.frame_width = 22\n        self.camera.frame_height = 22 * 9 / 16');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed aspect ratio in ' + file);
    }
});