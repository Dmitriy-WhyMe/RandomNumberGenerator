<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="format-detection" content="telephone=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <title></title>
</head>

<body>
  <main class="page-container">
    <div class="generator">
      <div id="time-title">
        <img src="img/time.svg" alt="">
        <div id="date">31.1.2022, 17:15:49, GMT +2</div>
      </div>
      <h1>Генератор случайных <span>чисел.рф</span>
      </h1>
      <div class="title__sub" id="my-title">Случайное число:</div>
      <div id="numbers">0</div>
      <div class="count-random-number">Количество случайных чисел: <span id="max-count">1</span>
      </div>
      <div id="set-count-div">
        <input style="margin:15px auto 0 auto; text-align:center; width:50px; display:none;" id="set-count-num" onchange="SetNumCountManual()" oninput="SetNumCountManual()" type="text" onkeyup="this.value = this.value.replace (/[^\d]+/gi, '')" maxlength="4" value="1" autocomplete="off" value="0" />
      </div>
      <div class="block">
        <input class="slider" oninput="countChange()" type="range" id="count" min="1" max="100" value="1" step="1">
        <div class="bg-input"></div>
      </div>
      <div id="btns">
        <div id="my-button" onclick="Gen();">Сгенерировать</div>
      </div>
      <div class="row flex">
        <div class="diap flex">
          <input onclick="spoilers()" type="radio" name="action_r" id="diap" checked="checked">
          <label for="diap"> Из диапазона</label>
        </div>
        <div class="listr flex">
          <input onclick="spoilers()" type="radio" name="action_r" id="listr">
          <label for="listr"> Из списка</label>
        </div>
        <div style="display:none; align-items:center; padding-bottom:3px; padding-left:7px;">
          <input onclick="spoilers()" type="radio" name="action_r" id="listr2">
          <label for="listr2"></label>
        </div>
      </div>
      <div id="diap-spoiler">
        <div class="flex-block">
          <span>от</span>
          <input id="number-start" type="text" onkeyup="this.value = this.value.replace (/[^d]+/gi, '')" maxlength="5" value="1" autocomplete="off">
        </div>
        <div class="flex-block">
          <span>до</span>
          <input id="number-end" type="text" onkeyup="this.value = this.value.replace (/[^d]+/gi, '')" maxlength="5" value="100" autocomplete="off">
        </div>
      </div>
      <div id="list-spoiler">
        <textarea id="number-list" onkeyup="this.value = this.value.replace (/[^d ]+/gi, '')" cols="35" rows="5" maxlength="8388607" autocomplete="off" placeholder="укажите список целых чисел, через пробел"></textarea>
      </div>
      <div class="flex-column">
        <div id="sort-div">
          <input type="checkbox" id="sort_cb">
          <label for="sort_cb">сортировать по возрастанию</label>
        </div>
        <div id="exclude">
          <input type="checkbox" id="unique_r" checked="checked">
          <label for="unique_r">исключить повторения</label>
        </div>
      </div>
      <div id="winner-list">
        <div id="winner-title">История чисел:</div>
        <div id="winner-numbers">-</div>
      </div>
    </div>
  </main>
  <script src="js/jquery/dist/jquery.min.js"></script>
  <script src="js/common.js"></script>
</body>

</html>