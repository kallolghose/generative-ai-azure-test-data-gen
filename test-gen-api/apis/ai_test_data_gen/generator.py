from openai import AzureOpenAI

class TestCaseGen:

    def __init__(self, api_endpoint, api_key):
        self.api_endpoint = api_endpoint
        self.api_key = api_key
        self.client = AzureOpenAI(
                        azure_endpoint = api_endpoint,
                        api_key = api_key,
                        api_version = "2023-03-15-preview"
                    )
        self.messages = [{"role": "system", "content": "You are a coding and test data assistant."}]
    
    def add_spec(self, open_api_spec):
        self.messages.append({"role": "user", "content": "Please use the below Open AI 3 spec for all your future references: {}".format(open_api_spec)})
    
    def generate_response(self, question):
        self.messages.append({"role": "user", "content": question})
        response = client.chat.completions.create(
                    model="gpt-35-turbo", # model = "deployment_name".
                    messages=self.messages
                )
        return response.choices[0].message.content
    
    def add_reponse(self, response):
        self.messages.append({"role": "assistant", "content": response})
