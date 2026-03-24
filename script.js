// 取得 HTML 中的元素
const progressBar = document.getElementById('progress-bar');
const statusText = document.getElementById('status-text');

// 目前進度（0 ~ 100）
let progress = 0;
// 這一圈是否已經在 25% 之後換過一次隨機語句
let hasShownMessageThisCycle = false;

// 安撫使用者的隨機語句
const messages = [
    "正在檢查您的排隊順位...",
    "前方人數眾多，請稍候片刻...",
    "正在連線至售票伺服器...",
    "請勿關閉視窗，快到你了喔...",
    "快要輪到您了，請準備好您的信用卡！"
];

// 初始化狀態文字
statusText.innerText = "自動排隊中...";
statusText.style.color = "#00ADEF";

// 公用：依照規則更新進度與文字
function applyProgress(delta) {
    progress += delta;

    // 這一圈第一次達到「25% 以上且未滿 100%」，就換一句隨機語句
    if (!hasShownMessageThisCycle && progress >= 25 && progress < 100) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        statusText.innerText = messages[randomIndex];
        hasShownMessageThisCycle = true;
    }

    // 滿 100% 視為一圈結束：歸 0、重置旗標與文字
    if (progress >= 100) {
        progress = 0;
        hasShownMessageThisCycle = false;
        statusText.innerText = "自動排隊中...";
    }

    // 更新進度條
    progressBar.style.width = progress + "%";
}

// 自動模式：每 500ms 隨機前進 1% ~ 5%
setInterval(() => {
    const randomDelta = Math.floor(Math.random() * 5) + 1;
    applyProgress(randomDelta);
}, 500);

// 點畫面：每次額外 +5%
document.addEventListener('click', () => {
    applyProgress(5);
});