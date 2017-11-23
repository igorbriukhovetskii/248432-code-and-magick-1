'use strict';

/**
 * Функция отрисовки статистики прохождения игры.
 * @param {Object} ctx - канвас, на котором рисуется игра
 * @param {Array} names - массив имён игроков
 * @param {Array} times - массив времён прохождения игры
 */
window.renderStatistics = function (ctx, names, times) {
  var cloudXcoordinate = 100;
  var cloudYcoordinate = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudColor = 'rgba(255, 255, 255, 1)';
  var shadowXcoordinate = cloudXcoordinate + 10;
  var shadowYcoordinate = cloudYcoordinate + 10;
  var shadowWidth = cloudWidth;
  var shadowHeight = cloudHeight;
  var shadowColor = 'rgba(0, 0, 0, 0.7)';

  /**
   * Рисование прямоугольника и заливка его заданным цветом
   * @param {string} color - цвет заливки прямоугольника
   * @param {number} x - координата верхнего левого угла прямоугольника
   * @param {number} y - координата верхнего левого угла прямоугольника
   * @param {number} width - ширина прямоугольника
   * @param {number} height - высота прямоугольника
   */
  var drawRectangle = function (color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  // Рисование облака для статистики
  var drawCloud = function () {
    drawRectangle(shadowColor, shadowXcoordinate, shadowYcoordinate, shadowWidth, shadowHeight);
    drawRectangle(cloudColor, cloudXcoordinate, cloudYcoordinate, cloudWidth, cloudHeight);
  };

  var statisticText = ['Ура вы победили!', 'Список результатов:'];
  var font = '16px PT Mono';
  var fontColor = 'rgba(0, 0, 0, 1)';
  var statisticTextXcoordinate = 120;
  var statisticTextYcoordinate = 50;
  var interlineage = 20;

  // Вывод заголовочного текста для статистики
  var printText = function () {
    var initialY = statisticTextYcoordinate;

    ctx.font = font;
    ctx.fillStyle = fontColor;

    statisticText.forEach(function (line) {
      ctx.fillText(line, statisticTextXcoordinate, initialY);
      initialY += interlineage;
    });
  };

  /**
   * Получение случайного значения прозрачности для rgba функции
   * @param {number} minOpacity - минимальное значение прозрачности в формате десятичной дроби
   * @return {number} - возвращает случайное значение прозрачности
   */
  var getRandomOpacity = function (minOpacity) {
    var opacity = Math.random();
    if (opacity <= minOpacity) {
      opacity += minOpacity;
    }
    return opacity;
  };

  // Высота гистораммы
  var histogramHeight = 150;
  // Ширина колонки гистораммы
  var histogramColumnWidth = 50;
  // Расстояние между колонками гистограммы
  var histogramColumnGap = 40;
  // Координата верхнего левого угла поля гистограммы по оси Х
  var histogramXcoordinate = 150;
  // Координата верхнего левого угла поля гистограммы по оси Y
  var histogramYcoordinate = 100;
  // Цвет колонки с результатом игрока
  var playerColumnColor = 'rgba(255, 0, 0, 1)';
  // Отступ текста с временем прохождения игры от верха гистограммы
  var textTimeMarginTop = 10;
  // Координата текста с именами игроков по оси Y
  var textNameYcoordinate = 270;

  var drawHistogram = function () {
    // Максимальное время прохождения игры
    var maxTime = Math.max.apply(null, times);
    // Масштаб гистораммы
    var scale = histogramHeight / maxTime;
    // Координата колонки гистограммы по оси Х
    var columnXcoordinate = histogramXcoordinate;
    // Цвет колонки гистограммы
    var columnColor;
    times.forEach(function (time, name) {
      // Высота колонки гистораммы с учётом масштаба
      var columnHeight = time * scale;
      // Отступ колонки гистограммы от верхнего края поля гистограммы
      var columnMarginTop = histogramHeight - columnHeight;
      // Координата колонки гистораммы по оси Y с учётом отступа сверху
      var columnYcoordinate = histogramYcoordinate + columnMarginTop;
      // Координата по оси Y текста с результатом прохождения игры с учётом отступа сверху от верхнего края гистограммы
      var textTimeYcoordinate = columnYcoordinate - textTimeMarginTop;
      // Расчёт цвета колонки
      if (names[name] === 'Вы') {
        // Если это колонка игрока, то используется ранее определённый цвет
        columnColor = playerColumnColor;
      } else {
        // Если это колонка других игроков, то цвет колонки синий со случайной прозрачностью
        columnColor = 'rgba(0, 0, 255, ' + getRandomOpacity(0.2) + ')';
      }
      // Отрисовка колонки гистограммы
      drawRectangle(columnColor, columnXcoordinate, columnYcoordinate, histogramColumnWidth, time * scale);
      // Замена цвета заливки с цветов колонки гистограммы на цвет шрифта для гистограммы
      ctx.fillStyle = fontColor;
      // Вывод имени игрока, чей результат представлен в виде колонки в гистограмме
      ctx.fillText(names[name], columnXcoordinate, textNameYcoordinate);
      // Вывод времени игрока
      ctx.fillText(Math.floor(time), columnXcoordinate, textTimeYcoordinate);
      // Увеличение X координаты колонки гистограммы
      columnXcoordinate += histogramColumnGap + histogramColumnWidth;
    });
  };

  drawCloud();
  printText();
  drawHistogram();
};
