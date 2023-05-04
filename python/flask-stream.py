from dotenv import load_dotenv
from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.callbacks import get_openai_callback

load_dotenv()

app = Flask(__name__)

@app.route('/answer', methods=['POST'])
def answer_question():
    # Load the PDF file
    pdf_path = 'anotate.pdf'
    pdf_reader = PdfReader(pdf_path)
    text = ''
    for page in pdf_reader.pages:
        text += page.extract_text()

    # Split into chunks
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)

    # Create embeddings
    embeddings = OpenAIEmbeddings()
    knowledge_base = FAISS.from_texts(chunks, embeddings)

    # Get user question from the API request
    user_question = request.json['question']

    # Perform question answering
    docs = knowledge_base.similarity_search(user_question)
    llm = OpenAI()
    chain = load_qa_chain(llm, chain_type="stuff")
    with get_openai_callback() as cb:
        response = chain.run(input_documents=docs, question=user_question)

    return jsonify({'answer': response})

if __name__ == '__main__':
    app.run()