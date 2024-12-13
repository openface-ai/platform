export const mockReadme = {
  "default": `# Default Model

## Description
This is a default model description.

## Details
- **Owner:** defaultOwner
- **Category:** General
- **Task:** General Task
- **Downloads:** 100
- **Likes:** 10

## Usage
\`\`\`python
# Example code for using this model
print("Hello, World!")
\`\`\`
`,
  "ruliad/deepthought": `# DeepThought 8B Llama

This is a fine-tuned version of Llama-2 focused on deep reasoning and analysis.

## Model Details

- **Base Model:** Llama-2 8B
- **Training Data:** Specialized reasoning datasets
- **Use Cases:** Complex analysis, reasoning tasks

## Usage

\`\`\`python
from transformers import AutoTokenizer, AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("ruliad/deepthought-8b-llama")
tokenizer = AutoTokenizer.from_pretrained("ruliad/deepthought-8b-llama")
\`\`\`
`
}; 