-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2021 年 06 月 03 日 23:28
-- 伺服器版本： 8.0.25-0ubuntu0.20.04.1
-- PHP 版本： 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `foodNTUST`
--

-- --------------------------------------------------------

--
-- 資料表結構 `food_menu`
--

CREATE TABLE `food_menu` (
  `food_id` int NOT NULL,
  `food_name` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `food_restaurant` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_price` int NOT NULL,
  `food_img` text COLLATE utf8_unicode_ci NOT NULL,
  `food_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `food_menu`
--

INSERT INTO `food_menu` (`food_id`, `food_name`, `food_restaurant`, `food_price`, `food_img`, `food_description`) VALUES
(1, '炒泡麵', '豪享來麵店', 65, 'https://i.imgur.com/lWLyJU3.png', '雞蛋的焦香及蔬菜甜味讓泡麵吃起來多了華麗的層次感，口味上也⽐原版泡麵來得更為清爽好吃，加點辣醬⼜更香辣開胃。'),
(2, '蕃茄義大利麵', '豪享來麵店', 80, 'https://i.imgur.com/nv3Ecs2.png', '嚴選有機農場自種的蕃茄，，主料選用豬肉肉配以義式蕃茄醬共同烹製而成，與多種料理進行搭配組合，義大利麵的口感很好，吃起來有嚼勁，不同於傳統麵食的柔軟，含有豐富的蛋白質成分，Q度和嚼勁度也很高。'),
(3, '炸豬排丼飯', '丼太郎丼飯專賣店', 65, 'https://i.imgur.com/KSbx3CY.jpg', '100％使用台灣豬肉，酥脆的外皮配上台灣豬肉軟內的肉質，和特調的醬汁組合形成一頓美食。'),
(4, '牛肉丼飯', '丼太郎丼飯專賣店', 80, 'https://i.imgur.com/q8IOv9h.jpg', '經過特別醃製過得牛肉片，8分熟的剛好熟度，彷彿可以聽到牛在哞哞哞'),
(5, '三圓冰', '鴉片粉圓', 50, 'https://i.imgur.com/9nV3SiO.jpg', '三圓分別是 : 粉圓/地瓜圓/芋圓，粉圓和芋圓地瓜圓都很Q彈嫩，ㄉㄨㄞ ㄉㄨㄞ ㄉㄨㄞ的，在口中咀嚼香甜味會散出~，夏天很適合來上一碗'),
(6, '檸檬愛玉粉圓', '鴉片粉圓', 40, 'https://i.imgur.com/6cdtwnc.png', '清涼的愛玉粉圓在夏天是解渴消暑的唯一選擇！'),
(7, '蔬菜天婦羅', '丼太郎丼飯專賣店', 45, 'https://i.imgur.com/SPY3mi5.jpg', '日式炸蔬菜的食材通常不會先調味，反而是炸好後再沾上醬汁食用，醬汁是把柴魚醬油、味醂混合均勻，加上蘿蔔泥及蔥花，就是相當清爽的天婦羅沾醬！'),
(8, '日式炸蝦', '丼太郎丼飯專賣店', 55, 'https://i.imgur.com/8mXRKql.png', '日式炸蝦吃起來特別酥脆，調配的「麵糊」是最大關鍵！本店的秘密在於利用「溫度差」來調製麵糊，過程中讓粉漿保持在低溫狀態，蝦子裹上麵衣後，放到高溫裡油炸，麵衣就會格外酥脆好吃！');

-- --------------------------------------------------------

--
-- 資料表結構 `food_order`
--

CREATE TABLE `food_order` (
  `id` int NOT NULL,
  `order_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_pname` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_fname` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_location` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_destination` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_phone` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_price` int NOT NULL,
  `order_status` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_deliver` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_restaurant` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `food_order`
--

INSERT INTO `food_order` (`id`, `order_id`, `order_pname`, `order_email`, `order_fname`, `food_location`, `food_destination`, `order_phone`, `order_price`, `order_status`, `food_deliver`, `order_restaurant`) VALUES
(38, '1622733224', 'customer', 'customer@gmail.com', '日式炸蝦', '台北市大安區基隆路四段43號(第1餐廳內): 丼太郎丼飯專賣店', 'EE809', '0987654321', 55, 'Finish', 'deliver＠deliver.com', '丼太郎丼飯專賣店'),
(39, '1622733224', 'customer', 'customer@gmail.com', '炸豬排丼飯', '台北市大安區基隆路四段43號(第1餐廳內): 丼太郎丼飯專賣店', 'EE809', '0987654321', 65, 'Finish', 'deliver＠deliver.com', '丼太郎丼飯專賣店');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `member_id` int NOT NULL,
  `member_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `member_location` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `member_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `member_phone` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `member_password` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `member_type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`member_id`, `member_name`, `member_location`, `member_email`, `member_phone`, `member_password`, `member_type`) VALUES
(1, '蔡卓倫', 'EE-809', 'eric248550@gmail.com', '0908325077', '00000000', 'customer'),
(7, 'deliver', '第一學生餐廳', 'deliver＠deliver.com', '0987654321', 'deliver', 'deliver'),
(9, '1', '1', '1', '1', '1', 'customer'),
(10, '豪享來麵店', '台北市大安區基隆路四段43號B1樓(第3餐廳內)', 'noodles@123.com', '0987654321', '1', 'restaurant'),
(25, 'customer', 'EE809', 'customer@gmail.com', '0987654321', '123456', 'customer'),
(26, '丼太郎丼飯專賣店', 'location', 'rice@gmail.com', '0123456789', '123456', 'restaurant'),
(28, '鴉片粉圓', 'test', 'dessert@gmail.com', '0911222333', '123456', 'restaurant');

-- --------------------------------------------------------

--
-- 資料表結構 `order_finish`
--

CREATE TABLE `order_finish` (
  `id` int NOT NULL,
  `order_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_pname` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_fname` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_location` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_destination` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_phone` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_price` int NOT NULL,
  `order_status` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `food_deliver` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurant_id` int NOT NULL,
  `restaurant_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `restaurant_location` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `restaurant_type` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `restaurant_img` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'https://i.imgur.com/xMThzGt.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `restaurant`
--

INSERT INTO `restaurant` (`restaurant_id`, `restaurant_name`, `restaurant_location`, `restaurant_type`, `restaurant_img`) VALUES
(1, '豪享來麵店', '台北市大安區基隆路四段43號B1樓(第3餐廳內)', 'noodles', 'https://i.imgur.com/CiA4Z7s.png'),
(2, '丼太郎丼飯專賣店', '台北市大安區基隆路四段43號(第1餐廳內)', 'rice', 'https://i.imgur.com/OeN2raD.jpg'),
(3, '鴉片粉圓', '台北市中正區羅斯福路四段52巷16弄4號', 'dessert', 'https://i.imgur.com/6CFnME7.jpg');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `food_menu`
--
ALTER TABLE `food_menu`
  ADD PRIMARY KEY (`food_id`);

--
-- 資料表索引 `food_order`
--
ALTER TABLE `food_order`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`),
  ADD UNIQUE KEY `member_email` (`member_email`);

--
-- 資料表索引 `order_finish`
--
ALTER TABLE `order_finish`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurant_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `food_menu`
--
ALTER TABLE `food_menu`
  MODIFY `food_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `food_order`
--
ALTER TABLE `food_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `member_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_finish`
--
ALTER TABLE `order_finish`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `restaurant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
