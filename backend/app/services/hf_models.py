from transformers import pipeline
import torch

class HFModels:
    def __init__(self):
        print("Loading BART summarizer...")

        device = 0 if torch.cuda.is_available() else -1

        self.summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn",
            tokenizer="facebook/bart-large-cnn",
            device=device
        )

    # ✅ EXISTING METHOD (UNCHANGED – used by text summarizer)
    def summarize(self, text, max_length=200, min_length=80):
        result = self.summarizer(
            text,
            max_length=max_length,
            min_length=min_length,
            do_sample=False,
            truncation=True
        )
        return result[0]["summary_text"]

    # ==================================================
    # 🔽 NEW METHODS (for PDF summarizer ONLY)
    # ==================================================

    def _chunk_text(self, text, chunk_size=900):
        return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

    def summarize_long_text(
        self,
        text,
        chunk_size=900,
        max_length=200,
        min_length=80
    ):
        chunks = self._chunk_text(text, chunk_size)

        summaries = []
        for chunk in chunks:
            if chunk.strip():
                result = self.summarizer(
                    chunk,
                    max_length=max_length,
                    min_length=min_length,
                    do_sample=False,
                    truncation=True
                )
                summaries.append(result[0]["summary_text"])

        return " ".join(summaries)


# ✅ EXISTING GLOBAL MODEL CACHE (UNCHANGED)
_models = None

def get_models():
    global _models
    if _models is None:
        _models = HFModels()
    return _models
