import hashlib
import subprocess
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


source = Path(sys.argv[1])
expected = "5326cfb097e3ab26fcb39329752b5c0a439bf8d5c4649520e4b492939c352a09"
if hashlib.sha256(source.read_bytes()).hexdigest() != expected:
    raise SystemExit("The source font does not match the documented SHA-256.")

paths = subprocess.check_output(
    ["git", "ls-files", "--cached", "--others", "--exclude-standard", "src"],
    text=True,
).splitlines()
text = "".join(Path(path).read_text() for path in paths if path.endswith((".ts", ".tsx")))
font = TTFont(source, recalcTimestamp=False)
font = instantiateVariableFont(font, {"wght": 400}, inplace=True)
for name in font["name"].names:
    if name.nameID in (1, 4, 6, 16):
        value = "SleepySerif-Regular" if name.nameID == 6 else "Sleepy Serif"
        name.string = value.encode(name.getEncoding())

options = subset.Options()
options.flavor = "woff2"
options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]
options.name_legacy = True
options.name_languages = [0x409]
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text + "0123456789，。·《》？！：、（）—…眠诗月夜")
subsetter.subset(font)
font.flavor = "woff2"
output = Path("public/fonts/sleepy-serif.woff2")
output.parent.mkdir(parents=True, exist_ok=True)
font.save(output)
print(f"Font subset: {output.stat().st_size:,} bytes; {len(font.getBestCmap())} glyphs.")
