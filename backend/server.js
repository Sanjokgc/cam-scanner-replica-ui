const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    python: process.env.PYTHON_PATH || 'python',
    node: process.version,
    uploadsDir: path.join(__dirname, 'uploads')
  });
});

// PDF to Word conversion endpoint
app.post('/convert/pdf-to-word', upload.single('file'), async (req, res) => {
  console.log('Received conversion request');
  
  try {
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded successfully:', req.file.path);

    const inputPath = req.file.path;
    const outputDir = path.dirname(inputPath);
    const outputFileName = path.basename(inputPath, '.pdf') + '.docx';
    const outputPath = path.join(outputDir, outputFileName);

    // Get Python path from environment or use default
    const pythonPath = process.env.PYTHON_PATH || 'python';
    console.log('Using Python path:', pythonPath);
    
    // Convert PDF to DOCX using Python script
    try {
      console.log('Starting Python conversion...');
      const { stdout, stderr } = await execPromise(
        `${pythonPath} "${path.join(__dirname, 'convert.py')}" "${inputPath}" "${outputPath}"`
      );
      
      console.log('Python conversion stdout:', stdout);
      
      if (stderr) {
        console.error('Python conversion stderr:', stderr);
        throw new Error('Conversion failed: ' + stderr);
      }

      // Check if conversion was successful
      if (!fs.existsSync(outputPath)) {
        console.error('Output file not created:', outputPath);
        throw new Error('Conversion failed: Output file not created');
      }

      console.log('Conversion successful, file created:', outputPath);

      // Set headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);

      // Send the converted file
      res.download(outputPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Clean up files
        try {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
          console.log('Temporary files cleaned up');
        } catch (cleanupError) {
          console.error('Cleanup error:', cleanupError);
        }
      });
    } catch (error) {
      console.error('Conversion error:', error);
      // Clean up input file
      try {
        fs.unlinkSync(inputPath);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
      throw new Error('Conversion failed: ' + error.message);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Conversion failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Python path:', process.env.PYTHON_PATH || 'python');
  console.log('Uploads directory:', path.join(__dirname, 'uploads'));
}); 