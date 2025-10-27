const { readFileSync, writeFileSync } = require("fs");
const TinySegmenter = require("tiny-segmenter");

const tinySegmenter = new TinySegmenter();

function segmentString(str) {
    return tinySegmenter.segment(str);
}

const ids = readFileSync(process.cwd() + "/assets/booths/allIds.txt").toString().split("\n");

const booths = ids.map(id => JSON.parse(readFileSync(process.cwd() + "/assets/booths/" + id + ".json").toString()));

const ret = booths.map(booth => ({
    booth_id: booth.booth_id,
    words: booth.booth_name + "\n" + booth.short_description + "\n" + booth.long_description,
})).map(booth => ({
    booth_id: booth.booth_id,
    tokens: segmentString(booth.words)
        .filter(token => token.length > 2),
})).map(booth => ({
    booth_id: booth.booth_id,
    tokens: [...new Set(booth.tokens)],
}));

const json = JSON.stringify(ret);

console.log("generated SearchIndex")
console.log("length: " + json.length);
console.log("saving into `/public/search-index.json`");
writeFileSync(process.cwd() + "/public/search-index.json", json);
console.log("saved");