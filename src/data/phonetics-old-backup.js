// 48个国际音标（国内教材常用版本：20个元音 + 28个辅音）
// 语音朗读无法单独读一个音标，所以点击时读例词
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
  { s: 'ɪ', g: 'short', words: ['sit', 'fish', 'big'], tip: '短促的"衣"，嘴放松，不要拉长' },
  { s: 'e', g: 'short', words: ['bed', 'red', 'pen'], tip: '嘴比"诶"张大一点，短促' },
  { s: 'æ', g: 'short', words: ['cat', 'bad', 'panel'], tip: '嘴张大，嘴角向两边拉，像"哎"和"啊"之间' },
  { s: 'ʌ', g: 'short', words: ['cup', 'bus', 'sun'], tip: '短促的"啊"，嘴半开' },
  { s: 'ɒ', g: 'short', words: ['hot', 'dog', 'box'], tip: '短促的"奥"，嘴圆' },
  { s: 'ʊ', g: 'short', words: ['book', 'good', 'put'], tip: '短促的"乌"，嘴唇稍圆' },
  { s: 'ə', g: 'short', words: ['about', 'banana', 'solar'], tip: '最轻的"呃"，用在不重读的音节' },
  // 长元音
  { s: 'iː', g: 'long', words: ['see', 'tea', 'sheet'], tip: '长"衣"，嘴角向两边拉' },
  { s: 'ɑː', g: 'long', words: ['car', 'father', 'start'], tip: '长"啊"，嘴张大，舌头放低' },
  { s: 'ɔː', g: 'long', words: ['door', 'call', 'warranty'], tip: '长"奥"，嘴唇圆' },
  { s: 'uː', g: 'long', words: ['food', 'blue', 'module'], tip: '长"乌"，嘴唇圆而小' },
  { s: 'ɜː', g: 'long', words: ['bird', 'word', 'current'], tip: '长"呃"，嘴扁平不动' },
  // 双元音
  { s: 'eɪ', g: 'diph', words: ['day', 'make', 'freight'], tip: '从"诶"滑到"衣"' },
  { s: 'aɪ', g: 'diph', words: ['my', 'price', 'supply'], tip: '从"啊"滑到"衣"，像"爱"' },
  { s: 'ɔɪ', g: 'diph', words: ['boy', 'oil', 'invoice'], tip: '从"奥"滑到"衣"' },
  { s: 'aʊ', g: 'diph', words: ['now', 'house', 'output'], tip: '从"啊"滑到"乌"，像"凹"' },
  { s: 'əʊ', g: 'diph', words: ['go', 'home', 'quote'], tip: '从"呃"滑到"乌"，像"欧"（美式写作 oʊ）' },
  { s: 'ɪə', g: 'diph', words: ['here', 'near', 'clear'], tip: '从"衣"滑到"呃"' },
  { s: 'eə', g: 'diph', words: ['hair', 'where', 'care'], tip: '从"诶"滑到"呃"' },
  { s: 'ʊə', g: 'diph', words: ['tour', 'sure', 'poor'], tip: '从"乌"滑到"呃"' },
  // 爆破音
  { s: 'p', g: 'plosive', words: ['pen', 'price', 'panel'], tip: '双唇闭合后突然送气，声带不振动' },
  { s: 'b', g: 'plosive', words: ['bed', 'box', 'battery'], tip: '同 p 的口型，声带振动' },
  { s: 't', g: 'plosive', words: ['ten', 'time', 'test'], tip: '舌尖抵上齿龈，突然送气' },
  { s: 'd', g: 'plosive', words: ['day', 'deposit', 'deliver'], tip: '同 t 的口型，声带振动' },
  { s: 'k', g: 'plosive', words: ['cat', 'cable', 'quote'], tip: '舌根抵软腭，突然送气' },
  { s: 'g', g: 'plosive', words: ['go', 'glass', 'grid'], tip: '同 k 的口型，声带振动' },
  // 摩擦音
  { s: 'f', g: 'fric', words: ['fish', 'frame', 'freight'], tip: '上齿轻咬下唇，吹气' },
  { s: 'v', g: 'fric', words: ['very', 'voltage', 'video'], tip: '同 f 的口型，声带振动。不要读成"w"' },
  { s: 'θ', g: 'fric', words: ['think', 'three', 'thank'], tip: '舌尖放在上下齿之间吹气，不要读成"s"' },
  { s: 'ð', g: 'fric', words: ['this', 'that', 'other'], tip: '同 θ 的口型，声带振动，不要读成"z"' },
  { s: 's', g: 'fric', words: ['sun', 'sample', 'system'], tip: '舌尖靠近上齿龈，像"丝"' },
  { s: 'z', g: 'fric', words: ['zoo', 'size', 'zero'], tip: '同 s 的口型，声带振动' },
  { s: 'ʃ', g: 'fric', words: ['she', 'ship', 'shipment'], tip: '嘴唇向前突出，像"嘘"' },
  { s: 'ʒ', g: 'fric', words: ['usually', 'measure', 'vision'], tip: '同 ʃ 的口型，声带振动' },
  { s: 'h', g: 'fric', words: ['hot', 'help', 'half'], tip: '轻轻呼气，像"喝"但不用喉咙摩擦' },
  { s: 'r', g: 'fric', words: ['red', 'roof', 'replace'], tip: '舌尖向上卷但不碰上腭，嘴唇稍圆' },
  // 破擦音
  { s: 'tʃ', g: 'affric', words: ['chair', 'check', 'China'], tip: '像"吃"但嘴唇向前突出' },
  { s: 'dʒ', g: 'affric', words: ['job', 'junction', 'large'], tip: '像"知"但嘴唇向前突出，声带振动' },
  { s: 'tr', g: 'affric', words: ['tree', 'try', 'trade'], tip: 't 和 r 连在一起快速读' },
  { s: 'dr', g: 'affric', words: ['dry', 'drive', 'dream'], tip: 'd 和 r 连在一起快速读' },
  { s: 'ts', g: 'affric', words: ['cats', 'parts', 'results'], tip: '像"次"，常在词尾' },
  { s: 'dz', g: 'affric', words: ['beds', 'goods', 'words'], tip: '像"自"，常在词尾' },
  // 鼻音
  { s: 'm', g: 'nasal', words: ['man', 'make', 'module'], tip: '双唇闭合，气流从鼻子出' },
  { s: 'n', g: 'nasal', words: ['no', 'need', 'inverter'], tip: '舌尖抵上齿龈，气流从鼻子出' },
  { s: 'ŋ', g: 'nasal', words: ['sing', 'long', 'mounting'], tip: '舌根抵软腭，像"嗯"的后鼻音' },
  // 舌侧音与半元音
  { s: 'l', g: 'other', words: ['let', 'lead', 'panel'], tip: '舌尖抵上齿龈。词尾的 l 舌尖也要抬起' },
  { s: 'w', g: 'other', words: ['we', 'watt', 'weight'], tip: '嘴唇圆而小，快速滑向后面的元音' },
  { s: 'j', g: 'other', words: ['yes', 'year', 'unit'], tip: '像"耶"的开头，快速滑向后面的元音' },
]
