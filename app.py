import os
import openai
import argparse
import json
from dotenv import load_dotenv

load_dotenv()
openai_api_key = os.environ.get("OPENAI_API_KEY")

MAX_INPUT_WORD_LIMIT = 60

def main():
    print("App is running...")
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    
    # Parse the input argument as a JSON string
    input_dict = json.loads(args.input)
    print(f"User input: {input_dict}")
    if validate_length(input_dict['topic']):
        description_result = generate_branding_description(input_dict['topic'], input_dict['category'], input_dict['keywords'], input_dict['num_of_words'])
        keywords_result = generate_branding_keywords(input_dict['topic'], input_dict['category'])
        print(description_result)
        print(keywords_result)
    else:
        raise ValueError(f"Input length exceeded the free-trial word limit. ({MAX_INPUT_WORD_LIMIT}) Please reduce it!")
    

def generate_branding_keywords(topic: str, category: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = openai_api_key
    enriched_prompt = f"Generate maximum 6 related hashtag keywords for the topic of {topic} to a {category}"
    response = openai.Completion.create(model="text-davinci-003", prompt=enriched_prompt, temperature=0.3, max_tokens=100)
    
    text: str = [response["choices"][0]["text"].strip().split(' ')]
    return text

def generate_branding_description(topic: str, category: str, keywords: str, num_of_words: int) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = openai_api_key
    enriched_prompt = f"Generate a {num_of_words} word catchy description to a {category} in the topic of {topic} and include these keywords: {keywords}"
    response = openai.Completion.create(model="text-davinci-003", prompt=enriched_prompt, temperature=0.3, max_tokens=100)
    
    text: str = response["choices"][0]["text"].strip()
    return text

def validate_length(prompt: str) -> bool:
    return len(prompt.strip(' ')) <= MAX_INPUT_WORD_LIMIT

if __name__ == "__main__":
    main()