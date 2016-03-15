/*!
 * Unmodal -- jQuery modal plugin
 * Version: 0.3.0
 * https://github.com/wangchi/unmodal
 *
 * Copyright 2015 hiwangchi@gmail.com
 * MIT License
 */
'use strict';

(function ($) {

  if (!$) {
    return console.warn('Unmodal needs jQuery!');
  }

  $.Unmodal = function (context, options) {
    var self = this;

    // 默认配置项
    self.defaults = {

      // 对话框标题
      title: 'Unmodal',

      // 对话框内容
      sContent: 'JQuery modal plugin',

      // 确定按钮文本
      btnOkText: 'Ok',

      // 取消按钮文本
      btnCancelText: 'Cancel',

      // 是否跟随浏览器滚动条滚动，默认false
      fixed: false,

      // 对话框打开动画
      animation: '',

      // 按esc时关闭对话框
      esc: true,

      // 对话框显示出来后回调
      onShown: null,

      // 对话框关闭后回调
      onClosed: null,

      // 是否显示弹窗背景
      backdrop: true,

      // 背景html
      sBackdrop: null,

      // 是否显示header
      header: true,

      // header内容
      sHeader: null,

      // 是否显示footer
      footer: true,

      // footer内容
      sFooter: null
    };

    // 配置项
    self.options = {};

    // 时间戳
    self.timestamp = new Date().getTime();

    // 上下文，默认body
    self.$context = context;

    // 模态框
    self.$unmodal = null;

    // 背景
    self.$backdrop = null;

    // 默认html模板
    self.html = function () {

      // 头部模板
      var header =  '<div class="unmodal-header">' +
                      '<h3 class="title">' +
                        self.options.title +
                      '</h3>' +
                      '<a class="unmodal-close j-unmodal-close" href="javascript:;">&times;</a>' +
                    '</div>';

      // 内容模板
      var content = '<div class="unmodal-cont">' +
                      self.options.sContent +
                    '</div>';

      // 尾部模板
      var footer =  '<div class="unmodal-footer">' +
                      '<a href="javascript:;" class="btn btn-ok j-unmodal-ok">' +
                        self.options.btnOkText +
                      '</a>'+
                      '<a href="javascript:;" class="btn btn-cancel j-unmodal-close">' +
                        self.options.btnCancelText +
                      '</a>' +
                    '</div>';

      if (!self.options.header) {
        header = '';
      }

      if (!self.options.footer) {
        footer = '';
      }

      // 整个模态框模板
      var unmodal = '<div class="unmodal" id="j-unmodal-' + self.timestamp + '">' +
                      '<div class="unmodal-container">' +
                      header +
                      content +
                      footer +
                      '</div>' +
                    '</div>';

      return {
        unmodal: unmodal,
        backdrop: '<div class="unmodal-backdrop" id="j-unmodal-backdrop"></div>'
      };
    };

    // 初始化，入口
    self.init = function (options) {
      self.options = $.extend({}, self.defaults, options);

      self.show();
    };

    // 显示模态框
    self.show = function () {
      self.setup();

      self.$backdrop.show();

      self.$unmodal.show();

      self.$unmodal.find('.j-unmodal-close').click(function () {
        self.close();
      });

      self.$unmodal.close = function () {
        self.close();
      };

      self.onShown();
    };

    // 显示后回调
    self.onShown = function () {

      // 如果模态框以message的形式显示，点击背景即可关闭
      if (!self.options.header && !self.options.footer) {
        self.$backdrop.click(function () {
          self.close();
        });
      }

      if (typeof self.options.onShown === 'function') {
        self.options.onShown(self.$unmodal);
      }

    };

    // 关闭模态框
    self.close = function () {
      self.$backdrop.remove();
      self.$unmodal.remove();

      self.onClosed();
    };

    // 关闭后回调
    self.onClosed = function () {
      if (typeof self.options.onClosed === 'function') {
        self.options.onClosed(self.$unmodal);
      }
    };

    // 模态框形状、样式等设置
    self.setup = function () {
      if (self.options.backdrop) {
        $('body').append(self.html().backdrop);
      }

      self.$context.append(self.html().unmodal);

      self.$unmodal = $('#j-unmodal-' + self.timestamp);
      self.$backdrop = $('#j-unmodal-backdrop');

      self.$unmodal.css({
        top: ( $(window).height() - self.$unmodal.outerHeight() )/2,
        left: ( $(window).width() - self.$unmodal.outerWidth() )/2
      });

      if (self.options.fixed) {
        self.$unmodal.css({
          position: 'fixed'
        });
      }
    };



    return self.init(options);
  };

  $.unmodal = function (opts) {
    return new $.Unmodal($('body'), opts);
  };

  $.fn.unmodal = function (opts) {
    return this.each(function () {
      var $this = $(this);
      return new $.Unmodal($this, opts);
    });
  };

})(window.jQuery);
