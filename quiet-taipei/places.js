// 地點資料：之後想新增或修改地點，只需要編輯這個檔案。
// status: "sample" = 示意內容，尚未實地確認；"verified" = 已實地確認（請同時填 checked 日期）
// 注意：營業時間、票價、座位規定常常變動，這裡刻意不寫，請使用者點「在地圖開啟」或查官網。
window.PLACES = [
  {
    id: "tpml-main",
    name: "臺北市立圖書館總館",
    type: "library",
    area: "大安區",
    tagline: "一個人來很自然的地方，大家都低著頭做自己的事。",
    tags: ["noTalk", "doNothing", "manyAlone", "leaveFree"],
    cost: "免費入館",
    firstStep: "從大門進去後，不需要跟任何人說話，可以直接走向閱覽區找位子坐下。",
    canDo: ["翻一本書", "看雜誌", "什麼都不做，只是坐著"],
    note: "一般來說平日白天人較少，週末與考試季會比較多人。",
    status: "sample", checked: ""
  },
  {
    id: "ncl",
    name: "國家圖書館",
    type: "library",
    area: "中正區",
    tagline: "空間大、很安靜，適合想離人群遠一點的時候。",
    tags: ["noTalk", "manyAlone", "leaveFree"],
    cost: "請查官網",
    firstStep: "入館方式與規定請先看官網，第一次去可以早一點到，不用趕。",
    canDo: ["閱讀", "寫東西", "安靜地待著"],
    note: "入館規定可能調整，出發前建議先確認。",
    status: "sample", checked: ""
  },
  {
    id: "beitou-lib",
    name: "北投圖書館",
    type: "library",
    area: "北投區",
    tagline: "被樹和光線包圍的圖書館，走進去心情就慢下來。",
    tags: ["noTalk", "doNothing", "leaveFree"],
    cost: "免費入館",
    firstStep: "從公園方向慢慢走進去，入口很明顯，不需要詢問任何人。",
    canDo: ["看書", "看窗外的樹", "在公園散步後再進去"],
    note: "位置在北投公園附近，可以搭配散步一起安排。",
    status: "sample", checked: ""
  },
  {
    id: "tfam",
    name: "臺北市立美術館",
    type: "exhibit",
    area: "中山區",
    tagline: "展覽給你一個「正在看東西」的理由，不用跟任何人交談。",
    tags: ["noTalk", "manyAlone"],
    cost: "依展覽而定",
    firstStep: "到櫃檯買票或確認入場方式即可，之後就能照自己的步調慢慢走。",
    canDo: ["慢慢看展", "在展間的長椅休息", "只看喜歡的那一件作品"],
    note: "展覽內容每期不同，出發前可先看官網的當期展覽。",
    status: "sample", checked: ""
  },
  {
    id: "moca",
    name: "臺北當代藝術館",
    type: "exhibit",
    area: "大同區",
    tagline: "建築本身就很有氣氛，空間不大，不容易迷路。",
    tags: ["noTalk", "leaveFree"],
    cost: "依展覽而定",
    firstStep: "入口在建築正面，進去後依指示買票或入場，動線很單純。",
    canDo: ["看展", "看建築", "短短待一下也可以"],
    note: "規模較小，適合「只想去一下」的日子。",
    status: "sample", checked: ""
  },
  {
    id: "ntm",
    name: "國立臺灣博物館",
    type: "exhibit",
    area: "中正區",
    tagline: "老建築裡的展間，腳步聲都變得輕輕的。",
    tags: ["noTalk", "manyAlone"],
    cost: "依展覽而定",
    firstStep: "到入口確認票務後進場，館內有休息的座位，不必一直站著。",
    canDo: ["看標本與展品", "找個座位休息", "旁邊的公園也能走走"],
    note: "旁邊是二二八和平公園，看完展可以順路坐一下。",
    status: "sample", checked: ""
  },
  {
    id: "songshan",
    name: "松山文創園區",
    type: "exhibit",
    area: "信義區",
    tagline: "有展覽，也有一座小池塘，看累了可以到外面透透氣。",
    tags: ["noTalk", "doNothing", "leaveFree"],
    cost: "園區可入內，展覽依檔期",
    firstStep: "園區是開放式的，可以先在戶外走走，不想進展覽就不進。",
    canDo: ["逛園區", "看池塘", "挑一個想看的展"],
    note: "假日與活動期間人會比較多，想安靜可以挑平日。",
    status: "sample", checked: ""
  },
  {
    id: "daan-park",
    name: "大安森林公園",
    type: "nature",
    area: "大安區",
    tagline: "城市中間的一大片綠，一個人坐著不會顯得奇怪。",
    tags: ["noTalk", "doNothing", "manyAlone", "leaveFree"],
    cost: "免費",
    firstStep: "隨便從哪個入口進去，找一張離人群遠一點的長椅就好。",
    canDo: ["坐著發呆", "散步", "聽鳥叫"],
    note: "公園很大，往裡面走就會越來越安靜。",
    status: "sample", checked: ""
  },
  {
    id: "botanical",
    name: "臺北植物園",
    type: "nature",
    area: "中正區",
    tagline: "有很多一個人慢慢走的人，大家都在看樹和荷花。",
    tags: ["noTalk", "doNothing", "manyAlone", "leaveFree"],
    cost: "請查官網",
    firstStep: "從入口進去沿著小路走就好，沒有人會在意你走得多慢。",
    canDo: ["散步", "看植物", "找長椅休息"],
    note: "夏天較悶熱，建議帶水，挑早上或傍晚。",
    status: "sample", checked: ""
  },
  {
    id: "dajia",
    name: "大佳河濱公園",
    type: "nature",
    area: "中山區",
    tagline: "沿著河慢慢走，視野很開，不會有被包圍的感覺。",
    tags: ["noTalk", "doNothing", "leaveFree"],
    cost: "免費",
    firstStep: "走上河堤就是步道，沿著河往前或往回都可以，沒有壓力。",
    canDo: ["散步", "看河", "坐在堤邊吹風"],
    note: "天氣好時傍晚的人較多，視野也很漂亮。",
    status: "sample", checked: ""
  },
  {
    id: "longshan",
    name: "艋舺龍山寺",
    type: "quiet",
    area: "萬華區",
    tagline: "不用說話，雙手合十、站一會兒，也是一種靜下來。",
    tags: ["noTalk", "doNothing", "leaveFree"],
    cost: "免費",
    firstStep: "從側門或正門進入，跟著其他人的節奏走就好；參拜與否都可以。",
    canDo: ["靜靜站著", "看建築細節", "在旁邊的空位坐一下"],
    note: "香客多的時段會比較熱鬧，想安靜可以避開假日與節慶。",
    status: "sample", checked: ""
  },
  {
    id: "cafe-fika",
    name: "Fika Fika Cafe",
    type: "cafe",
    area: "中山區",
    tagline: "一個人點一杯咖啡坐下來，是很日常的畫面。",
    tags: ["manyAlone"],
    cost: "需點餐",
    firstStep: "進門後看菜單點餐，吧檯附近的位子比較不需要面對面。",
    canDo: ["喝咖啡", "看書", "發呆"],
    note: "熱門時段可能需要排隊或等位，建議避開週末午後。",
    status: "sample", checked: ""
  },
  {
    id: "cafe-astoria",
    name: "明星咖啡館",
    type: "cafe",
    area: "西門",
    tagline: "老派的空間，有一種被時間包著的安靜感。",
    tags: ["manyAlone", "doNothing"],
    cost: "需點餐",
    firstStep: "上樓後告知人數入座，一個人說「一位」就可以了。",
    canDo: ["喝咖啡", "寫字", "看窗外的街景"],
    note: "西門周邊人潮多，建議挑平日白天。",
    status: "sample", checked: ""
  }
];

window.TYPES = {
  library: "圖書館",
  exhibit: "展覽與博物館",
  nature: "公園與散步",
  quiet: "安靜的角落",
  cafe: "咖啡廳"
};

window.TAGS = {
  noTalk: "不用開口說話",
  doNothing: "可以什麼都不做",
  manyAlone: "很多人也是一個人",
  leaveFree: "想走隨時可以走"
};

// 今天的心情 → 推薦的標籤 / 類型
window.MOODS = [
  { id: "hide",  label: "想躲一下",         types: ["library", "quiet", "nature"], tags: ["noTalk", "leaveFree"] },
  { id: "calm",  label: "想安靜待著",       types: ["library", "nature", "cafe"],  tags: ["doNothing"] },
  { id: "some",  label: "想有點事做，但不想跟人說話", types: ["exhibit", "library"], tags: ["noTalk"] }
];
