export const mockReadme = {
  "default": `# Model Name

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