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
    source: "https://zh.wikisource.org/wiki/春曉",
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
    source: "https://zh.wikisource.org/wiki/竹里館",
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
];
