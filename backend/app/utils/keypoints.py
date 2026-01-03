import re

def extract_key_points(text, max_points=8):
    sentences = re.split(r'(?<=[.!?])\s+', text)

    points = []
    for s in sentences:
        s = s.strip()
        if len(s) > 40:
            points.append(s)
        if len(points) >= max_points:
            break

    return points
