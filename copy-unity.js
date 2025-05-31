const fs = require('fs-extra');
const path = require('path');

// Source directories
const templateDataDir = path.join(__dirname, 'TemplateData');
const buildDir = path.join(__dirname, 'Build');

// Destination directories in public
const publicTemplateDataDir = path.join(__dirname, 'public', 'TemplateData');

async function copyUnityFiles() {
  try {
    // Create public directory if it doesn't exist
    await fs.ensureDir(path.join(__dirname, 'public'));
    
    // Copy TemplateData directory
    if (fs.existsSync(templateDataDir)) {
      await fs.copy(templateDataDir, publicTemplateDataDir);
      console.log('✅ TemplateData directory copied successfully');
    } else {
      console.error('❌ TemplateData directory not found');
      process.exit(1);
    }

    // Copy individual build files to TemplateData directory
    const buildFiles = ['build.data', 'build.framework.js', 'build.wasm', 'build.loader.js'];
    for (const file of buildFiles) {
      const sourcePath = path.join(buildDir, file);
      const destPath = path.join(publicTemplateDataDir, file);
      
      if (fs.existsSync(sourcePath)) {
        await fs.copy(sourcePath, destPath);
        console.log(`✅ ${file} copied successfully`);
      } else {
        console.error(`❌ ${file} not found in Build directory`);
      }
    }

    console.log('✅ All Unity files copied successfully');
  } catch (err) {
    console.error('Error copying Unity files:', err);
    process.exit(1);
  }
}

copyUnityFiles(); 