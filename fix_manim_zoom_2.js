const fs = require('fs');

const dir = 'manim_scripts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.py'));

files.forEach(file => {
    const fullPath = dir + '/' + file;
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Zoom out to make everything smaller and fit better on screen
    if (content.includes('self.camera.frame_width = 22')) {
        content = content.replace(/self\.camera\.frame_width = 22/g, 'self.camera.frame_width = 26');
        content = content.replace(/self\.camera\.frame_height = 22 \* 9 \/ 16/g, 'self.camera.frame_height = 26 * 9 / 16');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated ' + file);
    }
});