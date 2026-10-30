// 48个国际音标，每个音标包含：
// - 常见字母组合
// - 每个组合的代表单词
// - 发音提示
export const phoneticGroups = [
  { id: 'short', name: '短元音' },
  { id: 'long', name: '长元音' },
  { id: 'diph', name: '双元音' },
  { id: 'plosive', name: '爆破音' },
  { id: 'fric', name: '摩擦音' },
  { id: 'affric', name: '破擦音' },
  { id: 'nasal', name: '鼻音' },
  { id: 'other', name: '舌侧音与半元音' },
]

export const phonetics = [
  // 短元音
  {
    s: 'ɪ',
    g: 'short',
    tip: '短促的"衣"，嘴放松',
    patterns: [
      { letters: 'i', words: ['sit', 'big', 'ship'] },
      { letters: 'y', words: ['system', 'symbol', 'crystal'] },
      { letters: 'e', words: ['pretty', 'women', 'English'] },
    ]
  },
  {
    s: 'e',
    g: 'short',
    tip: '嘴比"诶"张大，短促',
    patterns: [
      { letters: 'e', words: ['bed', 'red', 'pen'] },
      { letters: 'ea', words: ['head', 'bread', 'dead'] },
      { letters: 'a', words: ['any', 'many', 'says'] },
    ]
  },
  {
    s: 'æ',
    g: 'short',
    tip: '嘴张大，嘴角向两边拉',
    patterns: [
      { letters: 'a', words: ['cat', 'bad', 'panel'] },
      { letters: 'ai', words: ['plait'] },
    ]
  },
  {
    s: 'ʌ',
    g: 'short',
    tip: '短促的"啊"，嘴半开',
    patterns: [
      { letters: 'u', words: ['cup', 'bus', 'sun'] },
      { letters: 'o', words: ['come', 'some', 'love'] },
      { letters: 'ou', words: ['young', 'country', 'touch'] },
    ]
  },
  {
    s: 'ɒ',
    g: 'short',
    tip: '短促的"奥"，嘴圆',
    patterns: [
      { letters: 'o', words: ['hot', 'box', 'dog'] },
      { letters: 'a', words: ['watch', 'what', 'want'] },
    ]
  },
  {
    s: 'ʊ',
    g: 'short',
    tip: '短促的"乌"，嘴唇稍圆',
    patterns: [
      { letters: 'oo', words: ['book', 'good', 'look'] },
      { letters: 'u', words: ['put', 'push', 'pull'] },
      { letters: 'ou', words: ['could', 'should', 'would'] },
    ]
  },
  {
    s: 'ə',
    g: 'short',
    tip: '最轻的"呃"，轻读音节',
    patterns: [
      { letters: 'a', words: ['about', 'China', 'sofa'] },
      { letters: 'o', words: ['lemon', 'melon', 'second'] },
      { letters: 'e', words: ['open', 'camera', 'problem'] },
      { letters: 'u', words: ['support', 'supply'] },
    ]
  },

  // 长元音
  {
    s: 'iː',
    g: 'long',
    tip: '长"衣"，嘴角向两边拉',
    patterns: [
      { letters: 'ee', words: ['see', 'three', 'sheet'] },
      { letters: 'ea', words: ['tea', 'sea', 'please'] },
      { letters: 'e', words: ['be', 'me', 'we'] },
      { letters: 'ie', words: ['piece', 'field', 'believe'] },
    ]
  },
  {
    s: 'ɑː',
    g: 'long',
    tip: '长"啊"，嘴张大',
    patterns: [
      { letters: 'ar', words: ['car', 'start', 'park'] },
      { letters: 'a', words: ['father', 'class', 'pass'] },
      { letters: 'al', words: ['half', 'calm'] },
    ]
  },
  {
    s: 'ɔː',
    g: 'long',
    tip: '长"奥"，嘴唇圆',
    patterns: [
      { letters: 'or', words: ['door', 'short', 'sport'] },
      { letters: 'al', words: ['call', 'small', 'ball'] },
      { letters: 'aw', words: ['law', 'draw', 'saw'] },
      { letters: 'au', words: ['cause', 'August'] },
    ]
  },
  {
    s: 'uː',
    g: 'long',
    tip: '长"乌"，嘴唇圆而小',
    patterns: [
      { letters: 'oo', words: ['food', 'moon', 'cool'] },
      { letters: 'u', words: ['blue', 'rule', 'June'] },
      { letters: 'ue', words: ['true', 'glue'] },
      { letters: 'ui', words: ['fruit', 'suit', 'juice'] },
    ]
  },
  {
    s: 'ɜː',
    g: 'long',
    tip: '长"呃"，嘴扁平',
    patterns: [
      { letters: 'er', words: ['her', 'term', 'serve'] },
      { letters: 'ir', words: ['bird', 'first', 'girl'] },
      { letters: 'ur', words: ['turn', 'burn', 'current'] },
      { letters: 'or', words: ['word', 'work', 'world'] },
    ]
  },

  // 双元音
  {
    s: 'eɪ',
    g: 'diph',
    tip: '从"诶"滑到"衣"',
    patterns: [
      { letters: 'a_e', words: ['make', 'take', 'name'] },
      { letters: 'ai', words: ['wait', 'train', 'main'] },
      { letters: 'ay', words: ['day', 'may', 'play'] },
      { letters: 'ei', words: ['eight', 'weight', 'freight'] },
    ]
  },
  {
    s: 'aɪ',
    g: 'diph',
    tip: '从"啊"滑到"衣"',
    patterns: [
      { letters: 'i_e', words: ['like', 'time', 'price'] },
      { letters: 'i', words: ['kind', 'find', 'behind'] },
      { letters: 'y', words: ['my', 'try', 'fly'] },
      { letters: 'igh', words: ['high', 'light', 'right'] },
    ]
  },
  {
    s: 'ɔɪ',
    g: 'diph',
    tip: '从"奥"滑到"衣"',
    patterns: [
      { letters: 'oi', words: ['oil', 'coin', 'point'] },
      { letters: 'oy', words: ['boy', 'toy', 'enjoy'] },
    ]
  },
  {
    s: 'aʊ',
    g: 'diph',
    tip: '从"啊"滑到"乌"',
    patterns: [
      { letters: 'ou', words: ['out', 'house', 'about'] },
      { letters: 'ow', words: ['how', 'now', 'power'] },
    ]
  },
  {
    s: 'əʊ',
    g: 'diph',
    tip: '从"呃"滑到"乌"',
    patterns: [
      { letters: 'o', words: ['go', 'no', 'solar'] },
      { letters: 'o_e', words: ['home', 'hope', 'phone'] },
      { letters: 'ow', words: ['show', 'know', 'flow'] },
      { letters: 'oa', words: ['boat', 'coat', 'load'] },
    ]
  },
  {
    s: 'ɪə',
    g: 'diph',
    tip: '从"衣"滑到"呃"',
    patterns: [
      { letters: 'ear', words: ['hear', 'near', 'clear'] },
      { letters: 'eer', words: ['beer', 'cheer', 'engineer'] },
      { letters: 'ere', words: ['here', 'sincere'] },
    ]
  },
  {
    s: 'eə',
    g: 'diph',
    tip: '从"诶"滑到"呃"',
    patterns: [
      { letters: 'air', words: ['air', 'chair', 'pair'] },
      { letters: 'are', words: ['care', 'share', 'ware'] },
      { letters: 'ear', words: ['bear', 'wear', 'pear'] },
    ]
  },
  {
    s: 'ʊə',
    g: 'diph',
    tip: '从"乌"滑到"呃"',
    patterns: [
      { letters: 'oor', words: ['poor', 'moor'] },
      { letters: 'ure', words: ['pure', 'sure', 'mature'] },
      { letters: 'our', words: ['tour'] },
    ]
  },

  // 爆破音
  {
    s: 'p',
    g: 'plosive',
    tip: '双唇闭合然后爆破，清辅音',
    patterns: [
      { letters: 'p', words: ['pen', 'cup', 'panel'] },
      { letters: 'pp', words: ['apple', 'happy', 'supply'] },
    ]
  },
  {
    s: 'b',
    g: 'plosive',
    tip: '双唇闭合然后爆破，浊辅音',
    patterns: [
      { letters: 'b', words: ['boy', 'book', 'battery'] },
      { letters: 'bb', words: ['rubber', 'hobby'] },
    ]
  },
  {
    s: 't',
    g: 'plosive',
    tip: '舌尖顶上齿龈然后爆破，清辅音',
    patterns: [
      { letters: 't', words: ['tea', 'time', 'street'] },
      { letters: 'tt', words: ['better', 'letter', 'watt'] },
      { letters: 'ed', words: ['looked', 'walked', 'stopped'] },
    ]
  },
  {
    s: 'd',
    g: 'plosive',
    tip: '舌尖顶上齿龈然后爆破，浊辅音',
    patterns: [
      { letters: 'd', words: ['day', 'good', 'grade'] },
      { letters: 'dd', words: ['add', 'middle'] },
      { letters: 'ed', words: ['moved', 'played', 'used'] },
    ]
  },
  {
    s: 'k',
    g: 'plosive',
    tip: '舌后部顶软腭然后爆破，清辅音',
    patterns: [
      { letters: 'k', words: ['key', 'like', 'kilowatt'] },
      { letters: 'c', words: ['cat', 'can', 'cost'] },
      { letters: 'ck', words: ['back', 'pack', 'stock'] },
      { letters: 'ch', words: ['school', 'chemistry'] },
    ]
  },
  {
    s: 'ɡ',
    g: 'plosive',
    tip: '舌后部顶软腭然后爆破，浊辅音',
    patterns: [
      { letters: 'g', words: ['go', 'big', 'grid'] },
      { letters: 'gg', words: ['egg', 'bigger'] },
      { letters: 'gh', words: ['ghost'] },
    ]
  },

  // 摩擦音
  {
    s: 'f',
    g: 'fric',
    tip: '上齿咬下唇，气流摩擦，清辅音',
    patterns: [
      { letters: 'f', words: ['five', 'half', 'life'] },
      { letters: 'ff', words: ['off', 'offer', 'efficiency'] },
      { letters: 'ph', words: ['phone', 'photo', 'graph'] },
    ]
  },
  {
    s: 'v',
    g: 'fric',
    tip: '上齿咬下唇，气流摩擦，浊辅音',
    patterns: [
      { letters: 'v', words: ['very', 'live', 'five'] },
      { letters: 've', words: ['have', 'give', 'love'] },
    ]
  },
  {
    s: 'θ',
    g: 'fric',
    tip: '舌尖放在上下齿间，清辅音',
    patterns: [
      { letters: 'th', words: ['three', 'think', 'month'] },
    ]
  },
  {
    s: 'ð',
    g: 'fric',
    tip: '舌尖放在上下齿间，浊辅音',
    patterns: [
      { letters: 'th', words: ['this', 'that', 'with'] },
    ]
  },
  {
    s: 's',
    g: 'fric',
    tip: '舌尖靠近上齿龈，气流摩擦，清辅音',
    patterns: [
      { letters: 's', words: ['see', 'bus', 'system'] },
      { letters: 'ss', words: ['pass', 'class', 'process'] },
      { letters: 'c', words: ['city', 'price', 'nice'] },
    ]
  },
  {
    s: 'z',
    g: 'fric',
    tip: '舌尖靠近上齿龈，气流摩擦，浊辅音',
    patterns: [
      { letters: 'z', words: ['zero', 'zone', 'size'] },
      { letters: 'zz', words: ['buzz', 'puzzle'] },
      { letters: 's', words: ['is', 'his', 'please'] },
    ]
  },
  {
    s: 'ʃ',
    g: 'fric',
    tip: '嘴唇前伸，舌前部抬起，清辅音',
    patterns: [
      { letters: 'sh', words: ['ship', 'wash', 'short'] },
      { letters: 'ti', words: ['station', 'nation'] },
      { letters: 'ci', words: ['special', 'social'] },
    ]
  },
  {
    s: 'ʒ',
    g: 'fric',
    tip: '嘴唇前伸，舌前部抬起，浊辅音',
    patterns: [
      { letters: 's', words: ['vision', 'decision', 'measure'] },
      { letters: 'ge', words: ['garage', 'beige'] },
    ]
  },
  {
    s: 'h',
    g: 'fric',
    tip: '口腔送气，清辅音',
    patterns: [
      { letters: 'h', words: ['he', 'hot', 'house'] },
      { letters: 'wh', words: ['who', 'whose', 'whole'] },
    ]
  },
  {
    s: 'r',
    g: 'fric',
    tip: '舌尖卷起，不碰上颚',
    patterns: [
      { letters: 'r', words: ['red', 'run', 'right'] },
      { letters: 'rr', words: ['sorry', 'carry', 'current'] },
      { letters: 'wr', words: ['write', 'wrong', 'wrap'] },
    ]
  },

  // 破擦音
  {
    s: 'tʃ',
    g: 'affric',
    tip: '舌尖顶上齿龈然后摩擦，清辅音',
    patterns: [
      { letters: 'ch', words: ['china', 'much', 'charge'] },
      { letters: 'tch', words: ['watch', 'match', 'catch'] },
      { letters: 'tu', words: ['picture', 'future'] },
    ]
  },
  {
    s: 'dʒ',
    g: 'affric',
    tip: '舌尖顶上齿龈然后摩擦，浊辅音',
    patterns: [
      { letters: 'j', words: ['job', 'jump', 'project'] },
      { letters: 'g', words: ['page', 'large', 'energy'] },
      { letters: 'ge', words: ['change', 'range', 'charge'] },
      { letters: 'dge', words: ['bridge', 'edge', 'knowledge'] },
    ]
  },
  {
    s: 'tr',
    g: 'affric',
    tip: '/t/和/r/快速连读',
    patterns: [
      { letters: 'tr', words: ['tree', 'try', 'trade'] },
    ]
  },
  {
    s: 'dr',
    g: 'affric',
    tip: '/d/和/r/快速连读',
    patterns: [
      { letters: 'dr', words: ['drive', 'draw', 'dry'] },
    ]
  },
  {
    s: 'ts',
    g: 'affric',
    tip: '/t/和/s/快速连读',
    patterns: [
      { letters: 'ts', words: ['cats', 'hats', 'watts'] },
    ]
  },
  {
    s: 'dz',
    g: 'affric',
    tip: '/d/和/z/快速连读',
    patterns: [
      { letters: 'ds', words: ['goods', 'roads', 'grids'] },
    ]
  },

  // 鼻音
  {
    s: 'm',
    g: 'nasal',
    tip: '双唇闭合，气流从鼻腔出',
    patterns: [
      { letters: 'm', words: ['my', 'some', 'module'] },
      { letters: 'mm', words: ['summer', 'hammer'] },
      { letters: 'mb', words: ['climb', 'comb', 'bomb'] },
    ]
  },
  {
    s: 'n',
    g: 'nasal',
    tip: '舌尖顶上齿龈，气流从鼻腔出',
    patterns: [
      { letters: 'n', words: ['no', 'pen', 'nation'] },
      { letters: 'nn', words: ['dinner', 'sunny', 'annual'] },
      { letters: 'kn', words: ['know', 'knife', 'knee'] },
    ]
  },
  {
    s: 'ŋ',
    g: 'nasal',
    tip: '舌后部顶软腭，气流从鼻腔出',
    patterns: [
      { letters: 'ng', words: ['sing', 'long', 'rating'] },
      { letters: 'n', words: ['think', 'bank', 'pink'] },
    ]
  },

  // 舌侧音与半元音
  {
    s: 'l',
    g: 'other',
    tip: '舌尖顶上齿龈，气流从舌侧出',
    patterns: [
      { letters: 'l', words: ['like', 'well', 'load'] },
      { letters: 'll', words: ['all', 'call', 'cell'] },
    ]
  },
  {
    s: 'w',
    g: 'other',
    tip: '双唇缩圆，快速滑到后面的元音',
    patterns: [
      { letters: 'w', words: ['we', 'water', 'watt'] },
      { letters: 'wh', words: ['what', 'when', 'where'] },
    ]
  },
  {
    s: 'j',
    g: 'other',
    tip: '舌中部抬起，快速滑到后面的元音',
    patterns: [
      { letters: 'y', words: ['yes', 'you', 'year'] },
      { letters: 'i', words: ['onion', 'opinion'] },
    ]
  },
]
