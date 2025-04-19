import sys
import os
from pdf2docx import Converter
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def convert_pdf_to_docx(pdf_path, docx_path):
    try:
        logger.info(f"Starting conversion from {pdf_path} to {docx_path}")
        
        # Check if input file exists
        if not os.path.exists(pdf_path):
            logger.error(f"Input file not found: {pdf_path}")
            raise FileNotFoundError(f"Input file not found: {pdf_path}")
            
        # Create output directory if it doesn't exist
        output_dir = os.path.dirname(docx_path)
        if not os.path.exists(output_dir):
            logger.info(f"Creating output directory: {output_dir}")
            os.makedirs(output_dir)
            
        # Initialize converter
        logger.info("Initializing PDF converter")
        cv = Converter(pdf_path)
        
        # Convert PDF to DOCX
        logger.info("Converting PDF to DOCX")
        cv.convert(docx_path)
        cv.close()
        
        # Verify output file was created
        if not os.path.exists(docx_path):
            logger.error(f"Output file not created: {docx_path}")
            raise Exception("Conversion failed: Output file not created")
            
        logger.info(f"Conversion completed successfully: {docx_path}")
        return True
        
    except Exception as e:
        logger.error(f"Conversion error: {str(e)}")
        raise

if __name__ == "__main__":
    if len(sys.argv) != 3:
        logger.error("Usage: python convert.py <input_pdf> <output_docx>")
        sys.exit(1)
        
    try:
        input_pdf = sys.argv[1]
        output_docx = sys.argv[2]
        convert_pdf_to_docx(input_pdf, output_docx)
    except Exception as e:
        logger.error(f"Fatal error: {str(e)}")
        sys.exit(1) 