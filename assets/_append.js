const fs = require('fs');
const P = String.fromCharCode(0x3002);   // 。
const C = String.fromCharCode(0xFF0C);   // ，
const S = String.fromCharCode(0xFF1B);   // ；
const COL = String.fromCharCode(0xFF1A); // ：
const LP = String.fromCharCode(0xFF08);  // （
const RP = String.fromCharCode(0xFF09);  // ）
const Q = String.fromCharCode(0x201C);   // “
const Q2 = String.fromCharCode(0x201D);  // ”
const X = String.fromCharCode(0xD7);     // ×
const AR = String.fromCharCode(0x2192);  // →
const path = 'C:/Users/helloworld/WorkBuddy/2026-08-29-21-04-37/.workbuddy/memory/2026-10-04.md';
let t = fs.readFileSync(path, 'utf8');
if (t.endsWith('\n')) t = t.slice(0, -1);

const bullet =
'- ' + Q + '按用户提供的新版 container specifications.pdf 终审并锁定装箱模拟器全部箱型数据' + C +
'并把重心配载做进装载算法本身' + Q2 + LP + '用户要求' + COL + '配载/重心安全应是方案自带属性' + C + '而非事后提示' + RP + S +
'数据终审' + COL + 'PDF 重量列顺序=建议载重(rec)/Tare(皮重)/最大载重(pay=最大净载重)' + C + '最大总重 maxGross=pay+tare' + S +
'据此锁定 5 箱型精确值' + COL + '20GP 5.898' + X + '2.352' + X + '2.392 门2.340' + X + '2.280 mg30645 皮2350 净28295 建议21740 容33.2' + S +
'40GP 12.031' + X + '2.352' + X + '2.392 门2.340' + X + '2.280 mg32610 皮3750 净28860 建议26630 容67.7' + S +
'40HQ 12.031' + X + '2.350' + X + '2.697 门2.340' + X + '2.585 mg32500 皮3900 净28600 建议26520 容76.3' + S +
'45HQ 13.555' + X + '2.348' + X + '2.695 门2.340' + X + '2.585 mg32420 皮4800 净27620 建议25620 容86.0' + S +
'40RH 11.578' + X + '2.290' + X + '2.425 门2.290' + X + '2.557 mg33845 皮4420 净29425 建议26380 容67.0(冷藏)' + S +
'相较上一版' + COL + '箱门高 2.292/2.597' + AR + '2.280/2.585' + C + '内高 2.700' + AR + '2.697/2.695' + C + 'maxGross 按 pay+tare 重算(30.645/32.61/32.5/32.42/33.845)' + S +
'新增 rec(建议载重)三档限重(建议<最大净载重)' + S +
'UI 箱型信息栏补建议载重' + C + 'computeCoGCore 在 货重∈(rec' + C + 'pay] 给 warn 提示留安全余量' + S +
'算法重心感知' + COL + 'packInto 成本=ep.z*10000(底优先)+ep.x*X_FILL(轻货沿箱长均匀铺填保容积)+yFILL(横向居中)+yBAL(重货左右对称)+xBAL(重货按轴荷目标 xTarget 后移保轴荷安全)' + C +
'K_Y=0.5' + C + 'K_X=0.4' + C + 'X_FILL=100' + C + 'xTarget=(xr+rAR*xf)/(1+rAR)' + S +
'轴限默认改代表重型底盘 12500/22000kg(HTML+代码兜底)' + S +
'演示多柜货物重设计为 120/200/20kg 现实分布' + S +
'Node DOM 桩 5 场景终审' + COL + '尺寸与 PDF 完全一致' + S + '默认货单' + AR + '单/少柜且横向居中' + S +
'重货压测(300' + X + '400kg)' + AR + '7 柜' + C + '柜1 X偏29mm 容积81% 载重73% 前轴12.6t(超测试显设11.34t 限' + AR + '正确 physics 危险标记)' + S +
'演示13柜0危险' + C + '轴荷4.7-9.8t 远低于限' + C + '横偏32-198mm' + S +
'临时校验脚本 _verify.js 已清理' + P;

fs.writeFileSync(path, t + '\n\n' + bullet, 'utf8');
console.log('APPENDED OK, new length=' + (t.length + bullet.length + 2));
