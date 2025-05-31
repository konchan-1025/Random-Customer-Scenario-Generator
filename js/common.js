// js/common.js

// 共通のデータオプション
const gigaOptions = [
    "少なめ（～3GB程度）",
    "やや少なめ（～7GB程度）",
    "普通（～20GB程度）",
    "やや多め（～50GB程度）",
    "多め（～100GB程度）",
    "データ無制限希望"
];

const callOptions = [
    "ほぼLINE通話",
    "短い電話が多い（5分/10分かけ放題など検討）",
    "長電話も時々（かけ放題検討）",
    "仕事でもよく使う（かけ放題推奨）",
];

/**
 * 配列からランダムな要素を1つ取得します。
 * @param {Array} array - 対象の配列
 * @returns {*} 配列内のランダムな要素
 */
function getRandomElement(array) {
    if (!array || array.length === 0) {
        return ""; // またはエラーをスロー
    }
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * 指定された最小値と最大値の間でランダムな整数を生成します。
 * 年齢は20歳以上を基本とします。
 * @param {number} min - 最小値 (デフォルト20)
 * @param {number} max - 最大値 (デフォルト85)
 * @returns {number} ランダムな整数
 */
function generateRandomAge(min = 20, max = 85) {
    if (min < 20) min = 20; // 最低年齢を20歳に保証
    if (max < min) max = min; // maxがminより小さい場合はminと同じにする
    return Math.floor(Math.random() * (max - min + 1)) + min;
}