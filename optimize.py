from PIL import Image
import os

img = Image.open('background.png')
# Convert to RGB if it has alpha channel to save as JPEG
if img.mode in ('RGBA', 'LA'):
    background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
    background.paste(img, img.split()[-1])
    img = background
else:
    img = img.convert('RGB')

img.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
img.save('background.jpg', format='JPEG', quality=85)
os.remove('background.png')
