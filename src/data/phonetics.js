// 48个国际音标（国内教材常用版本：20个元音 + 28个辅音），音标统一用英式
// patterns: 发这个音的常见字母组合；例词 w 里用 [ ] 标出发这个音的字母，页面上显示为红色
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

// 去掉标记，得到单词原文
export const plainWord = (w) => w.replace(/[[\]]/g, '')

export const phonetics = [
  // 短元音
  { s: 'ɪ', g: 'short', tip: '短促的"衣"，嘴放松，不要拉长', patterns: [
    { letters: 'i', words: [{ w: 's[i]t', ph: '/sɪt/', zh: '坐' }, { w: 'b[i]g', ph: '/bɪɡ/', zh: '大的' }, { w: 'sh[i]p', ph: '/ʃɪp/', zh: '船' }] },
    { letters: 'y', words: [{ w: 's[y]stem', ph: '/ˈsɪstəm/', zh: '系统' }, { w: 's[y]mbol', ph: '/ˈsɪmbl/', zh: '符号' }, { w: 'cr[y]stal', ph: '/ˈkrɪstl/', zh: '晶体' }] },
    { letters: 'e', words: [{ w: 'pr[e]tty', ph: '/ˈprɪti/', zh: '漂亮的' }, { w: '[E]nglish', ph: '/ˈɪŋɡlɪʃ/', zh: '英语' }, { w: 'r[e]turn', ph: '/rɪˈtɜːn/', zh: '返回' }] },
  ] },
  { s: 'e', g: 'short', tip: '嘴比"诶"张大一点，短促', patterns: [
    { letters: 'e', words: [{ w: 'b[e]d', ph: '/bed/', zh: '床' }, { w: 'r[e]d', ph: '/red/', zh: '红色' }, { w: 'p[e]n', ph: '/pen/', zh: '钢笔' }] },
    { letters: 'ea', words: [{ w: 'h[ea]d', ph: '/hed/', zh: '头' }, { w: 'br[ea]d', ph: '/bred/', zh: '面包' }, { w: 'h[ea]vy', ph: '/ˈhevi/', zh: '重的' }] },
    { letters: 'a', words: [{ w: '[a]ny', ph: '/ˈeni/', zh: '任何' }, { w: 'm[a]ny', ph: '/ˈmeni/', zh: '许多' }] },
  ] },
  { s: 'æ', g: 'short', tip: '嘴张大，嘴角向两边拉，像"哎"和"啊"之间', patterns: [
    { letters: 'a', words: [{ w: 'c[a]t', ph: '/kæt/', zh: '猫' }, { w: 'b[a]d', ph: '/bæd/', zh: '坏的' }, { w: 'p[a]nel', ph: '/ˈpænl/', zh: '面板' }, { w: 'f[a]ctory', ph: '/ˈfæktri/', zh: '工厂' }] },
  ] },
  { s: 'ʌ', g: 'short', tip: '短促的"啊"，嘴半开', patterns: [
    { letters: 'u', words: [{ w: 'c[u]p', ph: '/kʌp/', zh: '杯子' }, { w: 'b[u]s', ph: '/bʌs/', zh: '公交车' }, { w: 's[u]n', ph: '/sʌn/', zh: '太阳' }] },
    { letters: 'o', words: [{ w: 'c[o]me', ph: '/kʌm/', zh: '来' }, { w: 's[o]me', ph: '/sʌm/', zh: '一些' }, { w: 'l[o]ve', ph: '/lʌv/', zh: '爱' }] },
    { letters: 'ou', words: [{ w: 'y[ou]ng', ph: '/jʌŋ/', zh: '年轻的' }, { w: 'c[ou]ntry', ph: '/ˈkʌntri/', zh: '国家' }, { w: 't[ou]ch', ph: '/tʌtʃ/', zh: '触摸' }] },
  ] },
  { s: 'ɒ', g: 'short', tip: '短促的"奥"，嘴圆', patterns: [
    { letters: 'o', words: [{ w: 'h[o]t', ph: '/hɒt/', zh: '热的' }, { w: 'b[o]x', ph: '/bɒks/', zh: '盒子' }, { w: 'st[o]ck', ph: '/stɒk/', zh: '库存' }] },
    { letters: 'a', words: [{ w: 'w[a]tch', ph: '/wɒtʃ/', zh: '手表' }, { w: 'wh[a]t', ph: '/wɒt/', zh: '什么' }, { w: 'w[a]nt', ph: '/wɒnt/', zh: '想要' }] },
  ] },
  { s: 'ʊ', g: 'short', tip: '短促的"乌"，嘴唇稍圆', patterns: [
    { letters: 'oo', words: [{ w: 'b[oo]k', ph: '/bʊk/', zh: '书' }, { w: 'g[oo]d', ph: '/ɡʊd/', zh: '好的' }, { w: 'l[oo]k', ph: '/lʊk/', zh: '看' }] },
    { letters: 'u', words: [{ w: 'p[u]t', ph: '/pʊt/', zh: '放' }, { w: 'p[u]sh', ph: '/pʊʃ/', zh: '推' }, { w: 'f[u]ll', ph: '/fʊl/', zh: '满的' }] },
    { letters: 'ou', words: [{ w: 'c[ou]ld', ph: '/kʊd/', zh: '能够' }, { w: 'sh[ou]ld', ph: '/ʃʊd/', zh: '应该' }, { w: 'w[ou]ld', ph: '/wʊd/', zh: '将会' }] },
  ] },
  { s: 'ə', g: 'short', tip: '最轻的"呃"，只出现在不重读的音节', patterns: [
    { letters: 'a', words: [{ w: '[a]bout', ph: '/əˈbaʊt/', zh: '关于' }, { w: 'Chin[a]', ph: '/ˈtʃaɪnə/', zh: '中国' }, { w: 'sof[a]', ph: '/ˈsəʊfə/', zh: '沙发' }] },
    { letters: 'o', words: [{ w: 'lem[o]n', ph: '/ˈlemən/', zh: '柠檬' }, { w: 'sec[o]nd', ph: '/ˈsekənd/', zh: '第二' }, { w: 'c[o]ntrol', ph: '/kənˈtrəʊl/', zh: '控制' }] },
    { letters: 'e', words: [{ w: 'op[e]n', ph: '/ˈəʊpən/', zh: '打开' }, { w: 'probl[e]m', ph: '/ˈprɒbləm/', zh: '问题' }, { w: 'happ[e]n', ph: '/ˈhæpən/', zh: '发生' }] },
    { letters: 'u', words: [{ w: 's[u]pport', ph: '/səˈpɔːt/', zh: '支持' }, { w: 's[u]pply', ph: '/səˈplaɪ/', zh: '供应' }] },
    { letters: 'er', words: [{ w: 'teach[er]', ph: '/ˈtiːtʃə/', zh: '老师' }, { w: 'ord[er]', ph: '/ˈɔːdə/', zh: '订单' }] },
  ] },

  // 长元音
  { s: 'iː', g: 'long', tip: '长"衣"，嘴角向两边拉', patterns: [
    { letters: 'ee', words: [{ w: 's[ee]', ph: '/siː/', zh: '看见' }, { w: 'thr[ee]', ph: '/θriː/', zh: '三' }, { w: 'sh[ee]t', ph: '/ʃiːt/', zh: '薄片' }] },
    { letters: 'ea', words: [{ w: 't[ea]', ph: '/tiː/', zh: '茶' }, { w: 's[ea]', ph: '/siː/', zh: '海' }, { w: 'pl[ea]se', ph: '/pliːz/', zh: '请' }] },
    { letters: 'e', words: [{ w: 'b[e]', ph: '/biː/', zh: '是' }, { w: 'm[e]', ph: '/miː/', zh: '我' }, { w: 'w[e]', ph: '/wiː/', zh: '我们' }] },
    { letters: 'ie', words: [{ w: 'p[ie]ce', ph: '/piːs/', zh: '片，块' }, { w: 'f[ie]ld', ph: '/fiːld/', zh: '领域' }, { w: 'bel[ie]ve', ph: '/bɪˈliːv/', zh: '相信' }] },
  ] },
  { s: 'ɑː', g: 'long', tip: '长"啊"，嘴张大，舌头放低', patterns: [
    { letters: 'ar', words: [{ w: 'c[ar]', ph: '/kɑː/', zh: '汽车' }, { w: 'st[ar]t', ph: '/stɑːt/', zh: '开始' }, { w: 'm[ar]ket', ph: '/ˈmɑːkɪt/', zh: '市场' }] },
    { letters: 'a', words: [{ w: 'f[a]ther', ph: '/ˈfɑːðə/', zh: '父亲' }, { w: 'cl[a]ss', ph: '/klɑːs/', zh: '班级' }, { w: '[a]fter', ph: '/ˈɑːftə/', zh: '在……之后' }] },
    { letters: 'al', words: [{ w: 'h[al]f', ph: '/hɑːf/', zh: '一半' }, { w: 'c[al]m', ph: '/kɑːm/', zh: '平静的' }] },
  ] },
  { s: 'ɔː', g: 'long', tip: '长"奥"，嘴唇圆', patterns: [
    { letters: 'or', words: [{ w: 'sh[or]t', ph: '/ʃɔːt/', zh: '短的' }, { w: 'sp[or]t', ph: '/spɔːt/', zh: '运动' }, { w: 'p[or]t', ph: '/pɔːt/', zh: '港口' }] },
    { letters: 'oor', words: [{ w: 'd[oor]', ph: '/dɔː/', zh: '门' }, { w: 'fl[oor]', ph: '/flɔː/', zh: '地板' }] },
    { letters: 'al', words: [{ w: 'c[al]l', ph: '/kɔːl/', zh: '打电话' }, { w: 'sm[al]l', ph: '/smɔːl/', zh: '小的' }, { w: '[al]l', ph: '/ɔːl/', zh: '全部' }] },
    { letters: 'aw', words: [{ w: 'l[aw]', ph: '/lɔː/', zh: '法律' }, { w: 'dr[aw]', ph: '/drɔː/', zh: '画' }, { w: 's[aw]', ph: '/sɔː/', zh: '看见（过去式）' }] },
    { letters: 'au', words: [{ w: 'c[au]se', ph: '/kɔːz/', zh: '原因' }, { w: '[Au]gust', ph: '/ˈɔːɡəst/', zh: '八月' }] },
  ] },
  { s: 'uː', g: 'long', tip: '长"乌"，嘴唇圆而小', patterns: [
    { letters: 'oo', words: [{ w: 'f[oo]d', ph: '/fuːd/', zh: '食物' }, { w: 'm[oo]n', ph: '/muːn/', zh: '月亮' }, { w: 'c[oo]l', ph: '/kuːl/', zh: '凉的' }] },
    { letters: 'u', words: [{ w: 'r[u]le', ph: '/ruːl/', zh: '规则' }, { w: 'J[u]ne', ph: '/dʒuːn/', zh: '六月' }, { w: 's[u]per', ph: '/ˈsuːpə/', zh: '超级的' }] },
    { letters: 'ue', words: [{ w: 'bl[ue]', ph: '/bluː/', zh: '蓝色' }, { w: 'tr[ue]', ph: '/truː/', zh: '真的' }] },
    { letters: 'ui', words: [{ w: 'fr[ui]t', ph: '/fruːt/', zh: '水果' }, { w: 's[ui]t', ph: '/suːt/', zh: '西装' }, { w: 'j[ui]ce', ph: '/dʒuːs/', zh: '果汁' }] },
  ] },
  { s: 'ɜː', g: 'long', tip: '长"呃"，嘴扁平，舌头不动', patterns: [
    { letters: 'er', words: [{ w: 'h[er]', ph: '/hɜː/', zh: '她' }, { w: 't[er]m', ph: '/tɜːm/', zh: '条款' }, { w: 's[er]vice', ph: '/ˈsɜːvɪs/', zh: '服务' }] },
    { letters: 'ir', words: [{ w: 'b[ir]d', ph: '/bɜːd/', zh: '鸟' }, { w: 'f[ir]st', ph: '/fɜːst/', zh: '第一' }, { w: 'g[ir]l', ph: '/ɡɜːl/', zh: '女孩' }] },
    { letters: 'ur', words: [{ w: 't[ur]n', ph: '/tɜːn/', zh: '转' }, { w: 'b[ur]n', ph: '/bɜːn/', zh: '燃烧' }, { w: 'n[ur]se', ph: '/nɜːs/', zh: '护士' }] },
    { letters: 'or', words: [{ w: 'w[or]d', ph: '/wɜːd/', zh: '单词' }, { w: 'w[or]k', ph: '/wɜːk/', zh: '工作' }, { w: 'w[or]ld', ph: '/wɜːld/', zh: '世界' }] },
  ] },

  // 双元音
  { s: 'eɪ', g: 'diph', tip: '从"诶"滑到"衣"', patterns: [
    { letters: 'a_e', words: [{ w: 'm[a]k[e]', ph: '/meɪk/', zh: '做' }, { w: 't[a]k[e]', ph: '/teɪk/', zh: '拿' }, { w: 'n[a]m[e]', ph: '/neɪm/', zh: '名字' }] },
    { letters: 'ai', words: [{ w: 'w[ai]t', ph: '/weɪt/', zh: '等待' }, { w: 'tr[ai]n', ph: '/treɪn/', zh: '火车' }, { w: 'm[ai]n', ph: '/meɪn/', zh: '主要的' }] },
    { letters: 'ay', words: [{ w: 'd[ay]', ph: '/deɪ/', zh: '天' }, { w: 'm[ay]', ph: '/meɪ/', zh: '可以' }, { w: 'p[ay]', ph: '/peɪ/', zh: '付款' }] },
    { letters: 'eigh', words: [{ w: '[eigh]t', ph: '/eɪt/', zh: '八' }, { w: 'w[eigh]t', ph: '/weɪt/', zh: '重量' }, { w: 'fr[eigh]t', ph: '/freɪt/', zh: '运费' }] },
  ] },
  { s: 'aɪ', g: 'diph', tip: '从"啊"滑到"衣"，像"爱"', patterns: [
    { letters: 'i_e', words: [{ w: 'l[i]k[e]', ph: '/laɪk/', zh: '喜欢' }, { w: 't[i]m[e]', ph: '/taɪm/', zh: '时间' }, { w: 'pr[i]c[e]', ph: '/praɪs/', zh: '价格' }] },
    { letters: 'i', words: [{ w: 'k[i]nd', ph: '/kaɪnd/', zh: '种类' }, { w: 'f[i]nd', ph: '/faɪnd/', zh: '找到' }, { w: 'beh[i]nd', ph: '/bɪˈhaɪnd/', zh: '在后面' }] },
    { letters: 'y', words: [{ w: 'm[y]', ph: '/maɪ/', zh: '我的' }, { w: 'tr[y]', ph: '/traɪ/', zh: '尝试' }, { w: 'suppl[y]', ph: '/səˈplaɪ/', zh: '供应' }] },
    { letters: 'igh', words: [{ w: 'h[igh]', ph: '/haɪ/', zh: '高的' }, { w: 'l[igh]t', ph: '/laɪt/', zh: '光' }, { w: 'r[igh]t', ph: '/raɪt/', zh: '正确的' }] },
  ] },
  { s: 'ɔɪ', g: 'diph', tip: '从"奥"滑到"衣"', patterns: [
    { letters: 'oi', words: [{ w: '[oi]l', ph: '/ɔɪl/', zh: '油' }, { w: 'p[oi]nt', ph: '/pɔɪnt/', zh: '点' }, { w: 'inv[oi]ce', ph: '/ˈɪnvɔɪs/', zh: '发票' }] },
    { letters: 'oy', words: [{ w: 'b[oy]', ph: '/bɔɪ/', zh: '男孩' }, { w: 't[oy]', ph: '/tɔɪ/', zh: '玩具' }, { w: 'enj[oy]', ph: '/ɪnˈdʒɔɪ/', zh: '享受' }] },
  ] },
  { s: 'aʊ', g: 'diph', tip: '从"啊"滑到"乌"，像"凹"', patterns: [
    { letters: 'ou', words: [{ w: '[ou]t', ph: '/aʊt/', zh: '外面' }, { w: 'h[ou]se', ph: '/haʊs/', zh: '房子' }, { w: 'ab[ou]t', ph: '/əˈbaʊt/', zh: '关于' }] },
    { letters: 'ow', words: [{ w: 'h[ow]', ph: '/haʊ/', zh: '怎样' }, { w: 'n[ow]', ph: '/naʊ/', zh: '现在' }, { w: 'p[ow]er', ph: '/ˈpaʊə/', zh: '功率' }] },
  ] },
  { s: 'əʊ', g: 'diph', tip: '从"呃"滑到"乌"，像"欧"（美式写作 oʊ）', patterns: [
    { letters: 'o', words: [{ w: 'g[o]', ph: '/ɡəʊ/', zh: '去' }, { w: 'n[o]', ph: '/nəʊ/', zh: '不' }, { w: 's[o]lar', ph: '/ˈsəʊlə/', zh: '太阳的' }] },
    { letters: 'o_e', words: [{ w: 'h[o]m[e]', ph: '/həʊm/', zh: '家' }, { w: 'h[o]p[e]', ph: '/həʊp/', zh: '希望' }, { w: 'ph[o]n[e]', ph: '/fəʊn/', zh: '电话' }] },
    { letters: 'ow', words: [{ w: 'sh[ow]', ph: '/ʃəʊ/', zh: '展示' }, { w: 'kn[ow]', ph: '/nəʊ/', zh: '知道' }, { w: 'l[ow]', ph: '/ləʊ/', zh: '低的' }] },
    { letters: 'oa', words: [{ w: 'b[oa]t', ph: '/bəʊt/', zh: '小船' }, { w: 'c[oa]t', ph: '/kəʊt/', zh: '外套' }, { w: 'l[oa]d', ph: '/ləʊd/', zh: '装载' }] },
  ] },
  { s: 'ɪə', g: 'diph', tip: '从"衣"滑到"呃"', patterns: [
    { letters: 'ear', words: [{ w: 'h[ear]', ph: '/hɪə/', zh: '听见' }, { w: 'n[ear]', ph: '/nɪə/', zh: '附近' }, { w: 'cl[ear]', ph: '/klɪə/', zh: '清楚的' }] },
    { letters: 'eer', words: [{ w: 'b[eer]', ph: '/bɪə/', zh: '啤酒' }, { w: 'ch[eer]', ph: '/tʃɪə/', zh: '欢呼' }, { w: 'engin[eer]', ph: '/ˌendʒɪˈnɪə/', zh: '工程师' }] },
    { letters: 'ere', words: [{ w: 'h[ere]', ph: '/hɪə/', zh: '这里' }, { w: 'sinc[ere]', ph: '/sɪnˈsɪə/', zh: '真诚的' }] },
  ] },
  { s: 'eə', g: 'diph', tip: '从"诶"滑到"呃"', patterns: [
    { letters: 'air', words: [{ w: '[air]', ph: '/eə/', zh: '空气' }, { w: 'ch[air]', ph: '/tʃeə/', zh: '椅子' }, { w: 'p[air]', ph: '/peə/', zh: '一对' }] },
    { letters: 'are', words: [{ w: 'c[are]', ph: '/keə/', zh: '关心' }, { w: 'sh[are]', ph: '/ʃeə/', zh: '分享' }, { w: 'softw[are]', ph: '/ˈsɒftweə/', zh: '软件' }] },
    { letters: 'ear', words: [{ w: 'b[ear]', ph: '/beə/', zh: '熊' }, { w: 'w[ear]', ph: '/weə/', zh: '穿' }, { w: 'p[ear]', ph: '/peə/', zh: '梨' }] },
    { letters: 'ere', words: [{ w: 'wh[ere]', ph: '/weə/', zh: '哪里' }, { w: 'th[ere]', ph: '/ðeə/', zh: '那里' }] },
  ] },
  { s: 'ʊə', g: 'diph', tip: '从"乌"滑到"呃"', patterns: [
    { letters: 'ure', words: [{ w: 's[ure]', ph: '/ʃʊə/', zh: '确定的' }, { w: 'p[ure]', ph: '/pjʊə/', zh: '纯的' }, { w: 'mat[ure]', ph: '/məˈtʃʊə/', zh: '成熟的' }] },
    { letters: 'oor', words: [{ w: 'p[oor]', ph: '/pʊə/', zh: '贫穷的' }] },
    { letters: 'our', words: [{ w: 't[our]', ph: '/tʊə/', zh: '旅游' }] },
  ] },

  // 爆破音
  { s: 'p', g: 'plosive', tip: '双唇闭合后突然送气，声带不振动', patterns: [
    { letters: 'p', words: [{ w: '[p]en', ph: '/pen/', zh: '钢笔' }, { w: '[p]rice', ph: '/praɪs/', zh: '价格' }, { w: '[p]anel', ph: '/ˈpænl/', zh: '面板' }] },
    { letters: 'pp', words: [{ w: 'a[pp]le', ph: '/ˈæpl/', zh: '苹果' }, { w: 'ha[pp]y', ph: '/ˈhæpi/', zh: '快乐的' }, { w: 'su[pp]ly', ph: '/səˈplaɪ/', zh: '供应' }] },
  ] },
  { s: 'b', g: 'plosive', tip: '同 p 的口型，声带振动', patterns: [
    { letters: 'b', words: [{ w: '[b]oy', ph: '/bɔɪ/', zh: '男孩' }, { w: '[b]ook', ph: '/bʊk/', zh: '书' }, { w: '[b]attery', ph: '/ˈbætri/', zh: '电池' }] },
    { letters: 'bb', words: [{ w: 'ru[bb]er', ph: '/ˈrʌbə/', zh: '橡胶' }, { w: 'ho[bb]y', ph: '/ˈhɒbi/', zh: '爱好' }] },
  ] },
  { s: 't', g: 'plosive', tip: '舌尖抵上齿龈，突然送气', patterns: [
    { letters: 't', words: [{ w: '[t]ea', ph: '/tiː/', zh: '茶' }, { w: '[t]ime', ph: '/taɪm/', zh: '时间' }, { w: '[t]est', ph: '/test/', zh: '测试' }] },
    { letters: 'tt', words: [{ w: 'be[tt]er', ph: '/ˈbetə/', zh: '更好的' }, { w: 'le[tt]er', ph: '/ˈletə/', zh: '信' }, { w: 'wa[tt]', ph: '/wɒt/', zh: '瓦特' }] },
    { letters: 'ed（在清辅音后）', words: [{ w: 'look[ed]', ph: '/lʊkt/', zh: '看（过去式）' }, { w: 'work[ed]', ph: '/wɜːkt/', zh: '工作（过去式）' }, { w: 'stopp[ed]', ph: '/stɒpt/', zh: '停止（过去式）' }] },
  ] },
  { s: 'd', g: 'plosive', tip: '同 t 的口型，声带振动', patterns: [
    { letters: 'd', words: [{ w: '[d]ay', ph: '/deɪ/', zh: '天' }, { w: '[d]eposit', ph: '/dɪˈpɒzɪt/', zh: '定金' }, { w: '[d]eliver', ph: '/dɪˈlɪvə/', zh: '交付' }] },
    { letters: 'dd', words: [{ w: 'a[dd]', ph: '/æd/', zh: '添加' }, { w: 'mi[dd]le', ph: '/ˈmɪdl/', zh: '中间' }] },
    { letters: 'ed（在浊音后）', words: [{ w: 'mov[ed]', ph: '/muːvd/', zh: '移动（过去式）' }, { w: 'play[ed]', ph: '/pleɪd/', zh: '玩（过去式）' }, { w: 'us[ed]', ph: '/juːzd/', zh: '使用（过去式）' }] },
  ] },
  { s: 'k', g: 'plosive', tip: '舌根抵软腭，突然送气', patterns: [
    { letters: 'k', words: [{ w: '[k]ey', ph: '/kiː/', zh: '钥匙' }, { w: '[k]ind', ph: '/kaɪnd/', zh: '种类' }, { w: 'ma[k]e', ph: '/meɪk/', zh: '做' }] },
    { letters: 'c', words: [{ w: '[c]at', ph: '/kæt/', zh: '猫' }, { w: '[c]able', ph: '/ˈkeɪbl/', zh: '电缆' }, { w: '[c]ost', ph: '/kɒst/', zh: '成本' }] },
    { letters: 'ck', words: [{ w: 'ba[ck]', ph: '/bæk/', zh: '后面' }, { w: 'pa[ck]', ph: '/pæk/', zh: '包装' }, { w: 'sto[ck]', ph: '/stɒk/', zh: '库存' }] },
    { letters: 'ch', words: [{ w: 's[ch]ool', ph: '/skuːl/', zh: '学校' }, { w: '[ch]emistry', ph: '/ˈkemɪstri/', zh: '化学' }] },
  ] },
  { s: 'ɡ', g: 'plosive', tip: '同 k 的口型，声带振动', patterns: [
    { letters: 'g', words: [{ w: '[g]o', ph: '/ɡəʊ/', zh: '去' }, { w: 'bi[g]', ph: '/bɪɡ/', zh: '大的' }, { w: '[g]rid', ph: '/ɡrɪd/', zh: '电网' }] },
    { letters: 'gg', words: [{ w: 'e[gg]', ph: '/eɡ/', zh: '鸡蛋' }, { w: 'bi[gg]er', ph: '/ˈbɪɡə/', zh: '更大的' }] },
    { letters: 'gu', words: [{ w: '[gu]ess', ph: '/ɡes/', zh: '猜' }, { w: '[gu]ide', ph: '/ɡaɪd/', zh: '指南' }] },
  ] },

  // 摩擦音
  { s: 'f', g: 'fric', tip: '上齿轻咬下唇，吹气', patterns: [
    { letters: 'f', words: [{ w: '[f]ive', ph: '/faɪv/', zh: '五' }, { w: '[f]rame', ph: '/freɪm/', zh: '边框' }, { w: 'hal[f]', ph: '/hɑːf/', zh: '一半' }] },
    { letters: 'ff', words: [{ w: 'o[ff]', ph: '/ɒf/', zh: '关闭' }, { w: 'o[ff]er', ph: '/ˈɒfə/', zh: '报价' }, { w: 'e[ff]iciency', ph: '/ɪˈfɪʃnsi/', zh: '效率' }] },
    { letters: 'ph', words: [{ w: '[ph]one', ph: '/fəʊn/', zh: '电话' }, { w: '[ph]oto', ph: '/ˈfəʊtəʊ/', zh: '照片' }, { w: 'gra[ph]', ph: '/ɡrɑːf/', zh: '图表' }] },
  ] },
  { s: 'v', g: 'fric', tip: '同 f 的口型，声带振动。不要读成"w"', patterns: [
    { letters: 'v', words: [{ w: '[v]ery', ph: '/ˈveri/', zh: '非常' }, { w: '[v]oltage', ph: '/ˈvəʊltɪdʒ/', zh: '电压' }, { w: 'se[v]en', ph: '/ˈsevn/', zh: '七' }] },
    { letters: 've', words: [{ w: 'ha[ve]', ph: '/hæv/', zh: '有' }, { w: 'gi[ve]', ph: '/ɡɪv/', zh: '给' }, { w: 'lo[ve]', ph: '/lʌv/', zh: '爱' }] },
  ] },
  { s: 'θ', g: 'fric', tip: '舌尖放在上下齿之间吹气，不要读成"s"', patterns: [
    { letters: 'th', words: [{ w: '[th]ree', ph: '/θriː/', zh: '三' }, { w: '[th]ink', ph: '/θɪŋk/', zh: '想' }, { w: '[th]ank', ph: '/θæŋk/', zh: '感谢' }, { w: 'mon[th]', ph: '/mʌnθ/', zh: '月' }] },
  ] },
  { s: 'ð', g: 'fric', tip: '同 θ 的口型，声带振动，不要读成"z"', patterns: [
    { letters: 'th', words: [{ w: '[th]is', ph: '/ðɪs/', zh: '这个' }, { w: '[th]at', ph: '/ðæt/', zh: '那个' }, { w: 'wi[th]', ph: '/wɪð/', zh: '和' }, { w: 'o[th]er', ph: '/ˈʌðə/', zh: '其他的' }] },
  ] },
  { s: 's', g: 'fric', tip: '舌尖靠近上齿龈，像"丝"', patterns: [
    { letters: 's', words: [{ w: '[s]ee', ph: '/siː/', zh: '看见' }, { w: '[s]ample', ph: '/ˈsɑːmpl/', zh: '样品' }, { w: '[s]ystem', ph: '/ˈsɪstəm/', zh: '系统' }] },
    { letters: 'ss', words: [{ w: 'pa[ss]', ph: '/pɑːs/', zh: '通过' }, { w: 'cla[ss]', ph: '/klɑːs/', zh: '班级' }, { w: 'proce[ss]', ph: '/ˈprəʊses/', zh: '过程' }] },
    { letters: 'c（在 e/i/y 前）', words: [{ w: '[c]ity', ph: '/ˈsɪti/', zh: '城市' }, { w: 'pri[c]e', ph: '/praɪs/', zh: '价格' }, { w: 'ni[c]e', ph: '/naɪs/', zh: '好的' }] },
  ] },
  { s: 'z', g: 'fric', tip: '同 s 的口型，声带振动', patterns: [
    { letters: 'z', words: [{ w: '[z]ero', ph: '/ˈzɪərəʊ/', zh: '零' }, { w: '[z]one', ph: '/zəʊn/', zh: '区域' }, { w: 'si[z]e', ph: '/saɪz/', zh: '尺寸' }] },
    { letters: 'zz', words: [{ w: 'bu[zz]', ph: '/bʌz/', zh: '嗡嗡声' }, { w: 'pu[zz]le', ph: '/ˈpʌzl/', zh: '谜题' }] },
    { letters: 's', words: [{ w: 'i[s]', ph: '/ɪz/', zh: '是' }, { w: 'hi[s]', ph: '/hɪz/', zh: '他的' }, { w: 'plea[s]e', ph: '/pliːz/', zh: '请' }] },
  ] },
  { s: 'ʃ', g: 'fric', tip: '嘴唇向前突出，像"嘘"', patterns: [
    { letters: 'sh', words: [{ w: '[sh]ip', ph: '/ʃɪp/', zh: '船' }, { w: '[sh]ort', ph: '/ʃɔːt/', zh: '短的' }, { w: 'wa[sh]', ph: '/wɒʃ/', zh: '洗' }] },
    { letters: 'ti', words: [{ w: 'sta[ti]on', ph: '/ˈsteɪʃn/', zh: '车站' }, { w: 'na[ti]on', ph: '/ˈneɪʃn/', zh: '国家' }, { w: 'quota[ti]on', ph: '/kwəʊˈteɪʃn/', zh: '报价' }] },
    { letters: 'ci', words: [{ w: 'spe[ci]al', ph: '/ˈspeʃl/', zh: '特别的' }, { w: 'so[ci]al', ph: '/ˈsəʊʃl/', zh: '社会的' }] },
  ] },
  { s: 'ʒ', g: 'fric', tip: '同 ʃ 的口型，声带振动', patterns: [
    { letters: 's', words: [{ w: 'u[s]ually', ph: '/ˈjuːʒuəli/', zh: '通常' }, { w: 'vi[s]ion', ph: '/ˈvɪʒn/', zh: '视力' }, { w: 'deci[s]ion', ph: '/dɪˈsɪʒn/', zh: '决定' }, { w: 'mea[s]ure', ph: '/ˈmeʒə/', zh: '测量' }] },
    { letters: 'ge', words: [{ w: 'gara[ge]', ph: '/ˈɡærɑːʒ/', zh: '车库' }, { w: 'bei[ge]', ph: '/beɪʒ/', zh: '米色' }] },
  ] },
  { s: 'h', g: 'fric', tip: '轻轻呼气，像"喝"但不用喉咙摩擦', patterns: [
    { letters: 'h', words: [{ w: '[h]e', ph: '/hiː/', zh: '他' }, { w: '[h]ot', ph: '/hɒt/', zh: '热的' }, { w: '[h]ouse', ph: '/haʊs/', zh: '房子' }] },
    { letters: 'wh（在 o 前）', words: [{ w: '[wh]o', ph: '/huː/', zh: '谁' }, { w: '[wh]ose', ph: '/huːz/', zh: '谁的' }, { w: '[wh]ole', ph: '/həʊl/', zh: '整个的' }] },
  ] },
  { s: 'r', g: 'fric', tip: '舌尖向上卷但不碰上腭，嘴唇稍圆', patterns: [
    { letters: 'r', words: [{ w: '[r]ed', ph: '/red/', zh: '红色' }, { w: '[r]oof', ph: '/ruːf/', zh: '屋顶' }, { w: '[r]ight', ph: '/raɪt/', zh: '正确的' }] },
    { letters: 'rr', words: [{ w: 'so[rr]y', ph: '/ˈsɒri/', zh: '抱歉' }, { w: 'ca[rr]y', ph: '/ˈkæri/', zh: '携带' }, { w: 'cu[rr]ent', ph: '/ˈkʌrənt/', zh: '电流' }] },
    { letters: 'wr', words: [{ w: '[wr]ite', ph: '/raɪt/', zh: '写' }, { w: '[wr]ong', ph: '/rɒŋ/', zh: '错的' }] },
  ] },

  // 破擦音
  { s: 'tʃ', g: 'affric', tip: '像"吃"但嘴唇向前突出', patterns: [
    { letters: 'ch', words: [{ w: '[Ch]ina', ph: '/ˈtʃaɪnə/', zh: '中国' }, { w: '[ch]eck', ph: '/tʃek/', zh: '检查' }, { w: 'mu[ch]', ph: '/mʌtʃ/', zh: '很多' }] },
    { letters: 'tch', words: [{ w: 'wa[tch]', ph: '/wɒtʃ/', zh: '手表' }, { w: 'ma[tch]', ph: '/mætʃ/', zh: '比赛' }, { w: 'ca[tch]', ph: '/kætʃ/', zh: '抓住' }] },
    { letters: 't（在 ure 前）', words: [{ w: 'pic[t]ure', ph: '/ˈpɪktʃə/', zh: '图片' }, { w: 'fu[t]ure', ph: '/ˈfjuːtʃə/', zh: '未来' }] },
  ] },
  { s: 'dʒ', g: 'affric', tip: '像"知"但嘴唇向前突出，声带振动', patterns: [
    { letters: 'j', words: [{ w: '[j]ob', ph: '/dʒɒb/', zh: '工作' }, { w: '[j]ust', ph: '/dʒʌst/', zh: '只是' }, { w: 'pro[j]ect', ph: '/ˈprɒdʒekt/', zh: '项目' }] },
    { letters: 'g（在 e/i/y 前）', words: [{ w: '[g]iant', ph: '/ˈdʒaɪənt/', zh: '巨大的' }, { w: 'ma[g]ic', ph: '/ˈmædʒɪk/', zh: '魔法' }, { w: 'ener[g]y', ph: '/ˈenədʒi/', zh: '能源' }] },
    { letters: 'ge', words: [{ w: 'chan[ge]', ph: '/tʃeɪndʒ/', zh: '改变' }, { w: 'lar[ge]', ph: '/lɑːdʒ/', zh: '大的' }, { w: 'packa[ge]', ph: '/ˈpækɪdʒ/', zh: '包装' }] },
    { letters: 'dge', words: [{ w: 'bri[dge]', ph: '/brɪdʒ/', zh: '桥' }, { w: 'e[dge]', ph: '/edʒ/', zh: '边缘' }] },
  ] },
  { s: 'tr', g: 'affric', tip: 't 和 r 连在一起快速读', patterns: [
    { letters: 'tr', words: [{ w: '[tr]ee', ph: '/triː/', zh: '树' }, { w: '[tr]y', ph: '/traɪ/', zh: '尝试' }, { w: '[tr]ade', ph: '/treɪd/', zh: '贸易' }] },
  ] },
  { s: 'dr', g: 'affric', tip: 'd 和 r 连在一起快速读', patterns: [
    { letters: 'dr', words: [{ w: '[dr]ive', ph: '/draɪv/', zh: '驾驶' }, { w: '[dr]aw', ph: '/drɔː/', zh: '画' }, { w: '[dr]ess', ph: '/dres/', zh: '连衣裙' }] },
  ] },
  { s: 'ts', g: 'affric', tip: '像"次"，常在词尾', patterns: [
    { letters: 'ts', words: [{ w: 'ca[ts]', ph: '/kæts/', zh: '猫（复数）' }, { w: 'par[ts]', ph: '/pɑːts/', zh: '零件' }, { w: 'wa[tts]', ph: '/wɒts/', zh: '瓦特（复数）' }] },
  ] },
  { s: 'dz', g: 'affric', tip: '像"自"，常在词尾', patterns: [
    { letters: 'ds', words: [{ w: 'goo[ds]', ph: '/ɡʊdz/', zh: '货物' }, { w: 'roa[ds]', ph: '/rəʊdz/', zh: '道路' }, { w: 'gri[ds]', ph: '/ɡrɪdz/', zh: '电网（复数）' }] },
  ] },

  // 鼻音
  { s: 'm', g: 'nasal', tip: '双唇闭合，气流从鼻子出', patterns: [
    { letters: 'm', words: [{ w: '[m]y', ph: '/maɪ/', zh: '我的' }, { w: 'so[m]e', ph: '/sʌm/', zh: '一些' }, { w: '[m]odule', ph: '/ˈmɒdjuːl/', zh: '组件' }] },
    { letters: 'mm', words: [{ w: 'su[mm]er', ph: '/ˈsʌmə/', zh: '夏天' }, { w: 'co[mm]ercial', ph: '/kəˈmɜːʃl/', zh: '商业的' }] },
    { letters: 'mb', words: [{ w: 'cli[mb]', ph: '/klaɪm/', zh: '爬' }, { w: 'bo[mb]', ph: '/bɒm/', zh: '炸弹' }] },
  ] },
  { s: 'n', g: 'nasal', tip: '舌尖抵上齿龈，气流从鼻子出', patterns: [
    { letters: 'n', words: [{ w: '[n]o', ph: '/nəʊ/', zh: '不' }, { w: '[n]eed', ph: '/niːd/', zh: '需要' }, { w: 'pe[n]', ph: '/pen/', zh: '钢笔' }] },
    { letters: 'nn', words: [{ w: 'di[nn]er', ph: '/ˈdɪnə/', zh: '晚餐' }, { w: 'a[nn]ual', ph: '/ˈænjuəl/', zh: '每年的' }] },
    { letters: 'kn', words: [{ w: '[kn]ow', ph: '/nəʊ/', zh: '知道' }, { w: '[kn]ife', ph: '/naɪf/', zh: '刀' }] },
  ] },
  { s: 'ŋ', g: 'nasal', tip: '舌根抵软腭，像"嗯"的后鼻音', patterns: [
    { letters: 'ng', words: [{ w: 'si[ng]', ph: '/sɪŋ/', zh: '唱' }, { w: 'lo[ng]', ph: '/lɒŋ/', zh: '长的' }, { w: 'mounti[ng]', ph: '/ˈmaʊntɪŋ/', zh: '安装' }] },
    { letters: 'n（在 k/g 前）', words: [{ w: 'thi[n]k', ph: '/θɪŋk/', zh: '想' }, { w: 'ba[n]k', ph: '/bæŋk/', zh: '银行' }, { w: 'E[n]glish', ph: '/ˈɪŋɡlɪʃ/', zh: '英语' }] },
  ] },

  // 舌侧音与半元音
  { s: 'l', g: 'other', tip: '舌尖抵上齿龈。词尾的 l 舌尖也要抬起', patterns: [
    { letters: 'l', words: [{ w: '[l]ike', ph: '/laɪk/', zh: '喜欢' }, { w: '[l]oad', ph: '/ləʊd/', zh: '装载' }, { w: 'pane[l]', ph: '/ˈpænl/', zh: '面板' }] },
    { letters: 'll', words: [{ w: 'a[ll]', ph: '/ɔːl/', zh: '全部' }, { w: 'ca[ll]', ph: '/kɔːl/', zh: '打电话' }, { w: 'ce[ll]', ph: '/sel/', zh: '电池片' }] },
  ] },
  { s: 'w', g: 'other', tip: '嘴唇圆而小，快速滑向后面的元音', patterns: [
    { letters: 'w', words: [{ w: '[w]e', ph: '/wiː/', zh: '我们' }, { w: '[w]ater', ph: '/ˈwɔːtə/', zh: '水' }, { w: '[w]att', ph: '/wɒt/', zh: '瓦特' }] },
    { letters: 'wh', words: [{ w: '[wh]at', ph: '/wɒt/', zh: '什么' }, { w: '[wh]en', ph: '/wen/', zh: '什么时候' }, { w: '[wh]ere', ph: '/weə/', zh: '哪里' }] },
  ] },
  { s: 'j', g: 'other', tip: '像"耶"的开头，快速滑向后面的元音', patterns: [
    { letters: 'y', words: [{ w: '[y]es', ph: '/jes/', zh: '是的' }, { w: '[y]ou', ph: '/juː/', zh: '你' }, { w: '[y]ear', ph: '/jɪə/', zh: '年' }] },
    { letters: 'u（读 /juː/）', words: [{ w: '[u]nit', ph: '/ˈjuːnɪt/', zh: '单位' }, { w: '[u]se', ph: '/juːz/', zh: '使用' }] },
    { letters: 'i（在元音前）', words: [{ w: 'on[i]on', ph: '/ˈʌnjən/', zh: '洋葱' }, { w: 'opin[i]on', ph: '/əˈpɪnjən/', zh: '意见' }] },
  ] },
]
