/*  */

const { parse } = require('csv-parse/sync');
const { readFileSync, writeFileSync } = require('fs');

const INPUT_FILE_PATH = '/assets/booths.csv';
const OUTPUT_DIR_PATH = '/assets/booths';
const INPUT_INDEX_FILE_PATH = '/assets/booth-index.csv';

const input = readFileSync(process.cwd() + INPUT_FILE_PATH, 'utf8');

const index_input = readFileSync(process.cwd() + INPUT_INDEX_FILE_PATH, 'utf8');

const index_records = parse(index_input, {
  columns: true,
  skip_empty_lines: true,
});

const records = parse(input, {
  columns: true,
  skip_empty_lines: true,
});

records.forEach((item, index) => {
  console.log(item);
  const boothObj = {
    booth_id: item.booth_id,
    booth_name: item.booth_name,
    short_description: item.short_description,
    long_description: item.long_description,
    tags: item.tags
      .replace('展示', 'exhibitioin')
      .replace('パフォーマンス', 'performance')
      .replace('ゲーム・体験', 'game/experience')
      .replace('食品', 'food')
      .replace('部誌販売(配布)', 'book')
      .replace('販売', 'store')
      .replace('アトラクション', 'attraction')
      .replace('映像', 'movie')
      .split(', '),
    color: item.color,
    has_cm: item.cm === 'true' ? true : false,
    has_website: item.has_website === 'true' ? true : false,
    group_name: (() => {
      return index_records.find(ite => ite.booth_id === item.booth_id)
        ?.group_name;
    })(),
    // place_id:
    place: (() => {
      return index_records.find(ite => ite.booth_id === item.booth_id)?.place;
    })(),
    overview: (() => {
      return index_records.find(ite => ite.booth_id === item.booth_id)
        ?.overview;
    })(),
  };
  const contentJson = JSON.stringify(boothObj);
  writeFileSync(
    process.cwd() + OUTPUT_DIR_PATH + '/' + item.booth_id + '.json',
    contentJson,
    {
      encoding: 'utf8',
    }
  );
});

// allIds.txt
const allIds = records
  .map(item => item.booth_id)
  .reduce((acc, curr) => {
    return acc + ',' + curr;
  });
writeFileSync(process.cwd() + OUTPUT_DIR_PATH + '/allIds.txt', allIds);
