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

  drawCloud();
};
