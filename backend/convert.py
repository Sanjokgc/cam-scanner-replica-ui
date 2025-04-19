from pdf2docx import Converter
import sys
import os

def convert_pdf_to_word(pdf_path, docx_path):
    try:
        # Convert PDF to Word
        cv = Converter(pdf_path)
        cv.convert(docx_path)
        cv.close()
        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert.py <input_pdf> <output_docx>")
        sys.exit(1)
    
    input_pdf = sys.argv[1]
    output_docx = sys.argv[2]
    
    if convert_pdf_to_word(input_pdf, output_docx):
        print("Conversion successful")
    else:
        print("Conversion failed")
        sys.exit(1) 