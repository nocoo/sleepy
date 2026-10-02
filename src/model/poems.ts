export type Theme = "moon" | "nature" | "childhood" | "shijing";

export interface Poem {
  id: string;
  title: string;
  author: string;
  era: string;
  theme: Theme;
  lines: string[];
  excerpt?: string;
  source: string;
  sourceNote?: string;
  reading: string;
  question: string;
  bedtime: string;
  words?: { word: string; pinyin: string; meaning: string }[];
}

export const themes: { id: Theme | "all" | "favorites"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "moon", label: "月色" },
  { id: "nature", label: "山水" },
  { id: "childhood", label: "童趣" },
  { id: "shijing", label: "诗经" },
  { id: "favorites", label: "心藏" },
];

export const themeNames: Record<Theme, string> = {
  moon: "月色入梦",
  nature: "山水之间",
  childhood: "小小天地",
  shijing: "草木有诗",
};

export const poems: Poem[] = [
  {
    id: "jing-ye-si",
    title: "静夜思",
    author: "李白",
    era: "唐",
    theme: "moon",
    lines: ["床前明月光，", "疑是地上霜。", "举头望明月，", "低头思故乡。"],
    source: "https://zh.wikisource.org/wiki/靜夜思",
    sourceNote: "采用通行本“床前明月光”“举头望明月”；古本有异文。",
    reading:
      "像说悄悄话一样读。读到“举头”时一起抬头，读到“低头”时慢慢低下头。句子之间，留一点安静。",
    question: "如果月光能替你带一句话，你想把它送给谁？",
    bedtime:
      "月亮轻轻照着窗，也照着我们的小床。想念的人，都好好放在心里。现在，把小脑袋靠过来，今晚的月光会陪着你。晚安。",
    words: [{ word: "思", pinyin: "sī", meaning: "想念。这里，诗人在想家。" }],
  },
  {
    id: "chun-xiao",
    title: "春晓",
    author: "孟浩然",
    era: "唐",
    theme: "childhood",
    lines: ["春眠不觉晓，", "处处闻啼鸟。", "夜来风雨声，", "花落知多少。"],
    source: "https://zh.wikisource.org/wiki/春曉_(孟浩然)",
    reading: "前两句读得轻快，像刚睁开眼睛。后两句放慢，和孩子一起想一想昨夜的小雨。",
    question: "明天早上，你最想听见什么声音？",
    bedtime:
      "小鸟已经收好了翅膀，花朵也在夜里歇一歇。我们把今天的声音轻轻放下。等睡醒了，再去听窗外的第一声鸟鸣。晚安。",
    words: [{ word: "晓", pinyin: "xiǎo", meaning: "天刚亮的时候。" }],
  },
  {
    id: "yong-e",
    title: "咏鹅",
    author: "骆宾王",
    era: "唐",
    theme: "childhood",
    lines: ["鹅，鹅，鹅，", "曲项向天歌。", "白毛浮绿水，", "红掌拨清波。"],
    source: "https://zh.wikisource.org/wiki/詠鵝",
    reading: "三个“鹅”可以一人读一个。读到最后一句，用手掌在被子上轻轻划一下水。",
    question: "大白鹅游过来时，水面会变成什么样？",
    bedtime:
      "大白鹅慢慢游回了岸边。小小的水纹，一圈比一圈轻。我们也把手放好，让小被子像温柔的湖水，轻轻围着你。晚安。",
    words: [{ word: "曲项", pinyin: "qū xiàng", meaning: "弯着脖子。" }],
  },
  {
    id: "shan-ju-qiu-ming",
    title: "山居秋暝",
    author: "王维",
    era: "唐",
    theme: "moon",
    lines: [
      "空山新雨后，",
      "天气晚来秋。",
      "明月松间照，",
      "清泉石上流。",
      "竹喧归浣女，",
      "莲动下渔舟。",
      "随意春芳歇，",
      "王孙自可留。",
    ],
    source: "https://zh.wikisource.org/wiki/山居秋暝",
    reading: "一联一联慢慢读。读“清泉石上流”时，把声音放轻，像泉水从小石头旁边经过。",
    question: "闭上眼睛，你能听见山里的哪一种声音？",
    bedtime:
      "雨停了，月光从松树间落下来。小船靠岸，山里的声音也渐渐远了。你不用去很远的地方，靠在我身边，就能安安静静地休息。晚安。",
    words: [
      { word: "暝", pinyin: "míng", meaning: "日落天晚。" },
      { word: "浣", pinyin: "huàn", meaning: "洗。浣女是洗衣服的女子。" },
    ],
  },
  {
    id: "xiao-chi",
    title: "小池",
    author: "杨万里",
    era: "宋",
    theme: "nature",
    lines: [
      "泉眼无声惜细流，",
      "树阴照水爱晴柔。",
      "小荷才露尖尖角，",
      "早有蜻蜓立上头。",
    ],
    source: "https://zh.wikisource.org/wiki/小池",
    sourceNote: "正文采用“树阴”；有版本作“树荫”。",
    reading: "把声音读得小一点，像怕惊动荷叶上的蜻蜓。最后两个字不必拖长，轻轻收住就好。",
    question: "如果你是一只蜻蜓，你想停在哪一片叶子上？",
    bedtime:
      "蜻蜓找到了一片小荷叶，我们也找到了自己的小枕头。水面很平，风也很轻。今天的小小发现，留到梦里慢慢看。晚安。",
    words: [{ word: "露", pinyin: "lù", meaning: "显露出来。这里读 lù。" }],
  },
  {
    id: "zhu-li-guan",
    title: "竹里馆",
    author: "王维",
    era: "唐",
    theme: "moon",
    lines: ["独坐幽篁里，", "弹琴复长啸。", "深林人不知，", "明月来相照。"],
    source: "https://zh.wikisource.org/wiki/輞川集_(王維)/竹里館",
    reading:
      "告诉孩子，这是一个人在竹林里和月亮相伴。最后一句读慢一些，让“月亮来了”的画面停一会儿。",
    question: "月亮来陪你的时候，你想给它看什么？",
    bedtime:
      "竹叶轻轻靠在一起，月亮从叶子缝里看过来。它不着急说话，只是安静地陪着。我们也这样靠一会儿，慢慢睡吧。晚安。",
    words: [
      { word: "幽篁", pinyin: "yōu huáng", meaning: "幽深的竹林。" },
      { word: "长啸", pinyin: "cháng xiào", meaning: "撮口发出悠长的声音。" },
    ],
  },
  {
    id: "chi-shang",
    title: "池上",
    author: "白居易",
    era: "唐",
    theme: "childhood",
    lines: ["小娃撑小艇，", "偷采白莲回。", "不解藏踪迹，", "浮萍一道开。"],
    source: "https://zh.wikisource.org/wiki/池上二絕",
    sourceNote: "《池上二绝》其二，通行题作《池上》。",
    reading: "像讲一个小故事一样读。读完后，可以用一根手指在被子上画出小船留下的路。",
    question: "你是从哪里发现小船刚刚经过的？",
    bedtime:
      "小船划回了家，水上的小路慢慢合起来。今天玩过的地方，也都安静下来了。我们收好小手，靠一靠，明天再去看看。晚安。",
    words: [{ word: "不解", pinyin: "bù jiě", meaning: "不知道，不懂得。" }],
  },
  {
    id: "chun-ye-xi-yu",
    title: "春夜喜雨",
    author: "杜甫",
    era: "唐",
    theme: "nature",
    lines: [
      "好雨知时节，",
      "当春乃发生。",
      "随风潜入夜，",
      "润物细无声。",
      "野径云俱黑，",
      "江船火独明。",
      "晓看红湿处，",
      "花重锦官城。",
    ],
    source: "https://zh.wikisource.org/wiki/春夜喜雨",
    reading:
      "前四句轻轻地读，像雨落在泥土上。后四句可以留到孩子还想听的时候，不必赶着读完。",
    question: "小雨在夜里，悄悄帮花草做了什么？",
    bedtime:
      "小雨轻轻落下，替花草喝一点水。它忙它的，我们睡我们的。等明天醒来，也许窗外会多一片新叶子。现在，先好好睡一觉。晚安。",
    words: [
      { word: "潜", pinyin: "qián", meaning: "悄悄地。" },
      { word: "重", pinyin: "zhòng", meaning: "花沾了雨水，显得沉甸甸。" },
    ],
  },
  {
    id: "jiang-nan",
    title: "江南",
    author: "汉乐府",
    era: "汉",
    theme: "childhood",
    lines: [
      "江南可采莲，",
      "莲叶何田田。",
      "鱼戏莲叶间。",
      "鱼戏莲叶东，",
      "鱼戏莲叶西，",
      "鱼戏莲叶南，",
      "鱼戏莲叶北。",
    ],
    source: "https://zh.wikisource.org/wiki/江南_(漢樂府)",
    sourceNote: "汉乐府民歌，作者无名。“汉乐府”是作品归属，不是诗人的姓名。",
    reading:
      "你读“鱼戏莲叶”，孩子接“东、西、南、北”。手指也可以做一条小鱼，在被子上慢慢游。",
    question: "莲叶底下的小鱼，在和谁捉迷藏？",
    bedtime:
      "小鱼游过了东边，也游过了西边。现在，它找了一片大荷叶，安静地停下来。我们也不用再赶路了，小枕头就在这里。晚安。",
    words: [{ word: "田田", pinyin: "tián tián", meaning: "莲叶茂盛、挨挨挤挤的样子。" }],
  },
  {
    id: "chi-le-ge",
    title: "敕勒歌",
    author: "北朝民歌",
    era: "北朝",
    theme: "nature",
    lines: [
      "敕勒川，",
      "阴山下。",
      "天似穹庐，",
      "笼盖四野。",
      "天苍苍，",
      "野茫茫，",
      "风吹草低见牛羊。",
    ],
    source: "https://zh.wikisource.org/wiki/敕勒歌",
    sourceNote: "北朝乐府民歌，作者无名；“见”通“现”，读 xiàn。",
    reading:
      "像看着一片很大的草原那样读。读到最后一句，慢慢放低手掌，让草丛里的牛羊露出来。",
    question: "如果躺在草原上抬头看，天空像什么？",
    bedtime:
      "草原上的牛羊，慢慢走回了家。风把小草梳顺了，也轻轻经过我们的窗。把被子盖好，好像躺在安静的大草原边。晚安。",
    words: [
      { word: "敕勒", pinyin: "chì lè", meaning: "古代北方的一个民族。" },
      { word: "穹庐", pinyin: "qióng lú", meaning: "圆顶的毡帐，诗里用来比喻天空。" },
      { word: "见", pinyin: "xiàn", meaning: "显现，露出来。" },
    ],
  },
  {
    id: "deng-guan-que-lou",
    title: "登鹳雀楼",
    author: "王之涣",
    era: "唐",
    theme: "nature",
    lines: ["白日依山尽，", "黄河入海流。", "欲穷千里目，", "更上一层楼。"],
    source: "https://zh.wikisource.org/wiki/登鸛雀樓_(王之渙)",
    reading:
      "先一起想象太阳慢慢落山，再用手指比一比高楼。睡前不必把它变成一道题，看看远方就好。",
    question: "站得高一点，你想看看远处的什么？",
    bedtime:
      "太阳走到了山的那一边，河水还在慢慢向前。今天我们看到了许多东西，眼睛也该休息了。明天还有新的远方。晚安。",
    words: [{ word: "鹳", pinyin: "guàn", meaning: "一种大鸟。这里是楼的名字。" }],
  },
  {
    id: "wang-lu-shan-pu-bu",
    title: "望庐山瀑布",
    author: "李白",
    era: "唐",
    theme: "nature",
    lines: [
      "日照香炉生紫烟，",
      "遥看瀑布挂前川。",
      "飞流直下三千尺，",
      "疑是银河落九天。",
    ],
    source: "https://zh.wikisource.org/wiki/望廬山瀑布_(日照香爐生紫烟)",
    sourceNote: "《望庐山瀑布二首》其二。",
    reading:
      "“飞流直下”可以稍快一点，“落九天”再慢下来。告诉孩子，诗人把瀑布想成了从天上落下的银河。",
    question: "你见过的水，还像什么有趣的东西？",
    bedtime:
      "白白的瀑布，从很高的山上落下来。到了远处，就成了一条慢慢流的小河。我们也把声音放轻，像小河一样，慢慢静下来。晚安。",
  },
  {
    id: "ye-su-shan-si",
    title: "夜宿山寺",
    author: "李白",
    era: "唐",
    theme: "moon",
    lines: ["危楼高百尺，", "手可摘星辰。", "不敢高声语，", "恐惊天上人。"],
    source: "https://zh.wikisource.org/wiki/夜宿山寺",
    reading: "第一句正常读，后两句轻轻读。可以伸出手，假装摘下一颗星星，再把它放回天上。",
    question: "如果你能碰到一颗星星，你觉得它会是什么感觉？",
    bedtime:
      "星星还挂在天上，我们把声音放得小小的。今天的小愿望，先藏在枕头旁。等你慢慢睡着，它们也会安静地陪着。晚安。",
    words: [
      { word: "危楼", pinyin: "wēi lóu", meaning: "很高的楼。这里的“危”是高的意思。" },
    ],
  },
  {
    id: "xun-yin-zhe-bu-yu",
    title: "寻隐者不遇",
    author: "贾岛",
    era: "唐",
    theme: "nature",
    lines: ["松下问童子，", "言师采药去。", "只在此山中，", "云深不知处。"],
    source: "https://zh.wikisource.org/wiki/尋隱者不遇",
    reading:
      "你来做问路的人，孩子来做松树下的小童子。最后一句轻轻读，像看着云慢慢飘过去。",
    question: "云朵飘到山里以后，可能会躲在哪里？",
    bedtime:
      "山里的小路慢慢绕进云里，采药的人也会找到回家的路。我们今天不用再找了，松树和白云的故事，明天还可以接着讲。晚安。",
    words: [{ word: "童子", pinyin: "tóng zǐ", meaning: "小孩子。" }],
  },
  {
    id: "jue-ju",
    title: "绝句",
    author: "杜甫",
    era: "唐",
    theme: "nature",
    lines: [
      "两个黄鹂鸣翠柳，",
      "一行白鹭上青天。",
      "窗含西岭千秋雪，",
      "门泊东吴万里船。",
    ],
    source: "https://zh.wikisource.org/wiki/絕句_(兩個黃鸝鳴翠柳)",
    sourceNote: "《绝句四首》其三，以首句“两个黄鹂鸣翠柳”辨识。",
    reading: "先找诗里的颜色，再慢慢读。黄、翠、白、青，像一张从窗户里看见的画。",
    question: "如果把窗外画下来，你会先用哪一种颜色？",
    bedtime:
      "鸟儿慢慢飞远，小船停在门前。窗外的山和雪，都安静地待在原处。我们也把今天的画看完了，闭上眼睛，休息一会儿。晚安。",
    words: [{ word: "泊", pinyin: "bó", meaning: "船停靠在岸边。" }],
  },
  {
    id: "lu-zhai",
    title: "鹿柴",
    author: "王维",
    era: "唐",
    theme: "nature",
    lines: ["空山不见人，", "但闻人语响。", "返景入深林，", "复照青苔上。"],
    source: "https://zh.wikisource.org/wiki/鹿柴_(王維)",
    sourceNote: "正文采用“返景”，不改写为“返影”。",
    reading:
      "每句之间停一下，听一听房间里有什么声音。再想象一束傍晚的阳光，轻轻落在青苔上。",
    question: "安静下来以后，你听见了什么刚才没注意到的声音？",
    bedtime:
      "树林里，最后一点阳光落在了小小的青苔上。走路的声音渐渐远了。我们也安安静静地躺好，今天可以慢慢结束了。晚安。",
    words: [{ word: "鹿柴", pinyin: "lù zhài", meaning: "地名。柴在这里读 zhài。" }],
  },
  {
    id: "niao-ming-jian",
    title: "鸟鸣涧",
    author: "王维",
    era: "唐",
    theme: "moon",
    lines: ["人闲桂花落，", "夜静春山空。", "月出惊山鸟，", "时鸣春涧中。"],
    source: "https://zh.wikisource.org/wiki/鳥鳴澗",
    reading: "轻轻地读前两句，稍停一下再读“月出”。不用模仿大声的鸟叫，小小的一声就够了。",
    question: "月亮升起来时，山里的小鸟会看见什么？",
    bedtime:
      "月亮升上来了，小鸟轻轻叫了一声，又把头藏进翅膀里。花瓣落下来，也没有着急。我们和山里的夜晚一起，慢慢安静。晚安。",
    words: [{ word: "涧", pinyin: "jiàn", meaning: "山间的小溪。" }],
  },
  {
    id: "feng",
    title: "风",
    author: "李峤",
    era: "唐",
    theme: "nature",
    lines: ["解落三秋叶，", "能开二月花。", "过江千尺浪，", "入竹万竿斜。"],
    source: "https://zh.wikisource.org/wiki/風_(解落三秋葉)",
    reading: "读完再让孩子猜一猜，诗里说的是谁。睡前可以只用轻轻的气声，像一阵很小的风。",
    question: "看不见风的时候，你怎么知道它来了？",
    bedtime:
      "风走过了树叶，走过了花，也走过一小片竹林。现在，它只轻轻吹一吹窗帘。我们把身体放松，今天不用再忙了。晚安。",
    words: [{ word: "李峤", pinyin: "lǐ qiáo", meaning: "这首诗的作者。" }],
  },
  {
    id: "suo-jian",
    title: "所见",
    author: "袁枚",
    era: "清",
    theme: "childhood",
    lines: ["牧童骑黄牛，", "歌声振林樾。", "意欲捕鸣蝉，", "忽然闭口立。"],
    source: "https://zh.wikisource.org/wiki/所見(袁枚)",
    reading: "前两句像讲故事，最后一句突然轻下来。和孩子一起做一秒钟的“安静小牧童”。",
    question: "小牧童为什么忽然不唱歌了？",
    bedtime:
      "小牧童的歌停了，树上的蝉也歇了一会儿。今天唱过的歌、说过的话，都轻轻收起来。我们不用再找什么，就这样靠在一起。晚安。",
    words: [{ word: "林樾", pinyin: "lín yuè", meaning: "树木成荫的地方。" }],
  },
  {
    id: "cun-ju",
    title: "村居",
    author: "高鼎",
    era: "清",
    theme: "childhood",
    lines: [
      "草长莺飞二月天，",
      "拂堤杨柳醉春烟。",
      "儿童散学归来早，",
      "忙趁东风放纸鸢。",
    ],
    source: "https://zh.wikisource.org/wiki/村居_(高鼎)",
    reading:
      "想一想放学以后最想做的事，再读这首诗。读到“放纸鸢”，手指可以沿着一条看不见的线往上走。",
    question: "如果给你一只风筝，你想把它画成什么样子？",
    bedtime:
      "风筝慢慢收回来了，长长的线也卷好了。小草和柳树留在窗外，明天还会在那里。今天玩得很开心的小身体，现在该歇歇了。晚安。",
    words: [
      { word: "纸鸢", pinyin: "zhǐ yuān", meaning: "纸做的风筝。" },
      { word: "长", pinyin: "zhǎng", meaning: "“草长”是小草生长的意思。" },
    ],
  },
  {
    id: "xiao-er-chui-diao",
    title: "小儿垂钓",
    author: "胡令能",
    era: "唐",
    theme: "childhood",
    lines: [
      "蓬头稚子学垂纶，",
      "侧坐莓苔草映身。",
      "路人借问遥招手，",
      "怕得鱼惊不应人。",
    ],
    source: "https://zh.wikisource.org/wiki/小兒垂釣",
    reading: "先说“有个小朋友正在钓鱼”，再读诗。最后一句轻轻读，和他一起不惊动小鱼。",
    question: "不能大声说话的时候，你会用什么动作打招呼？",
    bedtime:
      "小鱼慢慢游回了水草边，小朋友也收起鱼竿回家了。我们把今天的热闹轻轻放下，安安静静躺一会儿。晚安。",
    words: [
      { word: "垂纶", pinyin: "chuí lún", meaning: "放下钓鱼的丝线，就是钓鱼。" },
      { word: "应", pinyin: "yìng", meaning: "回应，答话。" },
    ],
  },
  {
    id: "yong-liu",
    title: "咏柳",
    author: "贺知章",
    era: "唐",
    theme: "nature",
    lines: [
      "碧玉妆成一树高，",
      "万条垂下绿丝绦。",
      "不知细叶谁裁出，",
      "二月春风似剪刀。",
    ],
    source: "https://zh.wikisource.org/wiki/詠柳_(賀知章)",
    reading:
      "第三句读得像一个小问题，第四句轻轻揭开答案。用手指比一比柳叶细细长长的样子。",
    question: "春风还会给谁做一件新衣裳？",
    bedtime:
      "柳树披着细细的绿丝带，安静地站在夜里。春风今天的工作做完了，我们也把小被子拉好，舒舒服服地躺下来。晚安。",
    words: [
      { word: "丝绦", pinyin: "sī tāo", meaning: "丝线编成的带子，诗里用来比喻柳条。" },
    ],
  },
  {
    id: "you-zi-yin",
    title: "游子吟",
    author: "孟郊",
    era: "唐",
    theme: "childhood",
    lines: [
      "慈母手中线，",
      "游子身上衣。",
      "临行密密缝，",
      "意恐迟迟归。",
      "谁言寸草心，",
      "报得三春晖。",
    ],
    source: "https://zh.wikisource.org/wiki/遊子吟_(孟郊)",
    reading:
      "像摸一摸一件柔软的衣服那样读。可以讲讲家里人为彼此做的一件小事，不必要求孩子作答或感恩。",
    question: "今天有什么小事，让你觉得被好好照顾了？",
    bedtime:
      "有人替你拉好衣角，有人替你盖好被子。你不用做什么特别的事，就值得被爱着。今天到这里就很好了，安心睡吧。晚安。",
    words: [{ word: "晖", pinyin: "huī", meaning: "阳光。“三春晖”是春天温暖的阳光。" }],
  },
  {
    id: "fu-de-gu-yuan-cao-song-bie",
    title: "赋得古原草送别",
    author: "白居易",
    era: "唐",
    theme: "nature",
    lines: [
      "离离原上草，",
      "一岁一枯荣。",
      "野火烧不尽，",
      "春风吹又生。",
      "远芳侵古道，",
      "晴翠接荒城。",
      "又送王孙去，",
      "萋萋满别情。",
    ],
    source: "https://zh.wikisource.org/wiki/賦得古原草送別",
    sourceNote: "收录八句全文；常见课文《草》是前四句的节选。",
    reading:
      "前四句可以一起读，后四句由大人慢慢接着读。聊聊小草枯了又长的样子，不必急着背下来。",
    question: "春天回来时，你最想看见哪一种小植物？",
    bedtime:
      "小草在泥土里藏着新的力气，等春风来的时候，再一点一点长出来。我们也先好好休息，把明天的精神慢慢攒起来。晚安。",
    words: [
      { word: "离离", pinyin: "lí lí", meaning: "草长得茂盛的样子。" },
      { word: "萋萋", pinyin: "qī qī", meaning: "草木繁茂的样子。" },
    ],
  },
  {
    id: "zao-fa-bai-di-cheng",
    title: "早发白帝城",
    author: "李白",
    era: "唐",
    theme: "nature",
    lines: [
      "朝辞白帝彩云间，",
      "千里江陵一日还。",
      "两岸猿声啼不住，",
      "轻舟已过万重山。",
    ],
    source: "https://zh.wikisource.org/wiki/早發白帝城",
    sourceNote:
      "亦题《下江陵》。采用通行本“两岸猿声啼不住”；所引页面同时列出“尽”等异文。",
    reading:
      "白天读可以轻快一点；睡前读，就想象小船已经到了岸边。最后一句顺着气息，慢慢读完。",
    question: "坐在小船上，你想看两岸的什么风景？",
    bedtime:
      "小船经过了很多很多山，终于到了可以停下来的地方。今天我们也走了不少路、做了不少事。现在靠岸了，小被子就是今晚的小港湾。晚安。",
    words: [
      { word: "朝", pinyin: "zhāo", meaning: "早晨。" },
      { word: "还", pinyin: "huán", meaning: "返回。" },
      { word: "重", pinyin: "chóng", meaning: "一层又一层。" },
    ],
  },
  {
    id: "jiang-shang-yu-zhe",
    title: "江上渔者",
    author: "范仲淹",
    era: "宋",
    theme: "nature",
    lines: ["江上往来人，", "但爱鲈鱼美。", "君看一叶舟，", "出没风波里。"],
    source: "https://zh.wikisource.org/wiki/江上漁者",
    reading:
      "慢慢读，看看诗里那条很小的船。可以说说食物从哪里来，轻轻记住为我们忙碌的人。",
    question: "今天吃到的一样东西，是谁帮我们准备的？",
    bedtime:
      "忙了一天的人，陆续回到了家。我们把今天吃到的美味、遇到的照顾，都好好记在心里。现在，小小的船也可以休息了。晚安。",
    words: [
      { word: "鲈鱼", pinyin: "lú yú", meaning: "一种鱼。" },
      { word: "没", pinyin: "mò", meaning: "隐没，不见了。" },
    ],
  },
  {
    id: "shui-diao-ge-tou",
    title: "水调歌头·明月几时有",
    author: "苏轼",
    era: "宋",
    theme: "moon",
    lines: [
      "明月几时有？",
      "把酒问青天。",
      "不知天上宫阙，",
      "今夕是何年。",
      "我欲乘风归去，",
      "又恐琼楼玉宇，",
      "高处不胜寒。",
      "起舞弄清影，",
      "何似在人间。",
      "转朱阁，",
      "低绮户，",
      "照无眠。",
      "不应有恨，",
      "何事长向别时圆？",
      "人有悲欢离合，",
      "月有阴晴圆缺，",
      "此事古难全。",
      "但愿人长久，",
      "千里共婵娟。",
    ],
    source: "https://zh.wikisource.org/wiki/水調歌頭_(明月幾時有)",
    sourceNote:
      "词全文，采用通行本“又恐”“不应有恨，何事长向别时圆”；所引文献同时列出异文。原作小序：“丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。”",
    reading:
      "这首词可以读很多个晚上。顺着屏幕慢慢往下读，孩子困了就停；也可以先读最后两句，给远方的人送个祝福。",
    question: "现在，有没有一个人，也可能在看同一轮月亮？",
    bedtime:
      "我们看着同一个月亮，也想着远方喜欢的人。有些话可以明天再说，有些路可以慢慢再走。今晚先靠在这里，好好睡一觉。晚安。",
    words: [
      { word: "绮户", pinyin: "qǐ hù", meaning: "有雕饰的门窗。" },
      { word: "婵娟", pinyin: "chán juān", meaning: "这里指美好的月色。" },
    ],
  },
  {
    id: "tao-yao",
    title: "诗经·周南·桃夭",
    author: "佚名",
    era: "先秦",
    theme: "shijing",
    lines: ["桃之夭夭，", "灼灼其华。", "之子于归，", "宜其室家。"],
    excerpt: "节选第一章 · 原作共三章",
    source: "https://zh.wikisource.org/wiki/詩經/桃夭",
    reading:
      "“夭夭”“灼灼”像重复的小鼓点，可以一人读一遍。告诉孩子，这是一首借桃花表达祝福的古老歌谣。",
    question: "如果用一种花送出祝福，你想选什么花？",
    bedtime:
      "桃花在树枝上挨在一起，小小的花瓣，收住了白天的阳光。我们也挨近一点，像花朵一样，安安静静地待一会儿。晚安。",
    words: [
      { word: "夭夭", pinyin: "yāo yāo", meaning: "树木茂盛、美好的样子。" },
      { word: "灼灼", pinyin: "zhuó zhuó", meaning: "鲜明、明亮的样子。" },
      { word: "华", pinyin: "huā", meaning: "同“花”，这里读 huā。" },
    ],
  },
  {
    id: "cai-wei",
    title: "诗经·小雅·采薇",
    author: "佚名",
    era: "先秦",
    theme: "shijing",
    lines: ["昔我往矣，", "杨柳依依。", "今我来思，", "雨雪霏霏。"],
    excerpt: "节选第六章前四句 · 原作共六章",
    source: "https://zh.wikisource.org/wiki/詩經/采薇",
    reading: "“依依”和“霏霏”读得轻一些。先想一想轻轻摆的柳枝，再想一想慢慢落下的雪花。",
    question: "如果把一段回家的路画出来，你会画上什么？",
    bedtime:
      "柳枝轻轻摇过，雪花慢慢落过。走了很远的路以后，能回到温暖的地方，真好。你已经到家了，我们就在这里。安心睡吧，晚安。",
    words: [
      { word: "雨雪", pinyin: "yù xuě", meaning: "下雪。“雨”在这里是动词。" },
      { word: "霏霏", pinyin: "fēi fēi", meaning: "雪花纷纷落下的样子。" },
    ],
  },
  {
    id: "lu-ming",
    title: "诗经·小雅·鹿鸣",
    author: "佚名",
    era: "先秦",
    theme: "shijing",
    lines: ["呦呦鹿鸣，", "食野之苹。", "我有嘉宾，", "鼓瑟吹笙。"],
    excerpt: "节选第一章前四句 · 原作共三章",
    source: "https://zh.wikisource.org/wiki/詩經/鹿鳴",
    reading:
      "把“呦呦”读成两声轻轻的呼唤。告诉孩子，这几句说的是小鹿相呼，还有人们欢迎朋友来做客。",
    question: "你最想邀请谁来家里，和你分享什么？",
    bedtime:
      "小鹿轻轻叫着同伴，一起走回树林。今天遇见的朋友，我们放在心里，明天还可以再见。现在，先回到自己的小窝里。晚安。",
    words: [
      { word: "呦呦", pinyin: "yōu yōu", meaning: "鹿的叫声。" },
      { word: "苹", pinyin: "píng", meaning: "这里指一种蒿草。" },
      { word: "瑟", pinyin: "sè", meaning: "一种古老的弦乐器。" },
      { word: "笙", pinyin: "shēng", meaning: "一种古老的吹奏乐器。" },
    ],
  },
];
