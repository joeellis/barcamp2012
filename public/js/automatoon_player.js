var automatoon_player;
var __slice = Array.prototype.slice;
automatoon_player = {};
(function() {
  var animate, animate_transition, animation_width, browser_android, browser_chrome, browser_ie, browser_ios, browser_mac, browser_mozilla, browser_prefix, browser_webkit, directory, divider, get_tick_count, heartbeat_mode, heartbeat_mode_steps, heartbeat_mode_transition_frame, ie_init_transition, ie_step_transition, lerp_angle, lerp_geometric, lerp_point, lerp_scalar, matrix_angle, matrix_position, matrix_scale, matrix_string, parse_mstr, partial, play_helper, preload_frame, prepare_frame, safe_dirname, set_transform, stopped, transform_point, transition_frame, transition_msec;
  browser_android = (navigator.userAgent.search('Android')) !== -1;
  browser_chrome = (navigator.userAgent.search('Chrome')) !== -1;
  browser_ie = $.browser.msie != null;
  browser_ios = ((navigator.userAgent.search('iPad')) !== -1) || ((navigator.userAgent.search('iPhone')) !== -1);
  browser_mozilla = $.browser.mozilla != null;
  browser_webkit = ($.browser.webkit != null) && !browser_android && !browser_ios;
  browser_mac = ((navigator.userAgent.search('Apple ')) !== -1) || ((navigator.userAgent.search('OS X')) !== -1);
  stopped = true;
  divider = null;
  directory = null;
  transition_msec = 100;
  animation_width = 1000;
  heartbeat_mode = browser_ie || browser_android || browser_mozilla || browser_ios || (browser_chrome && browser_mac);
  if (browser_mozilla) {
    browser_prefix = '-moz-';
  } else {
    browser_prefix = '-webkit-';
  }
  heartbeat_mode_steps = 3;
  partial = function() {
    var f, partial_arguments;
    f = arguments[0], partial_arguments = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return function() {
      return f.apply(this, __slice.call(partial_arguments).concat(__slice.call(arguments)));
    };
  };
  get_tick_count = function() {
    return new Date().getTime();
  };
  parse_mstr = function(mstr) {
    var arr, x, _i, _len, _ref, _results;
    if (!(mstr != null)) {
      return;
    }
    arr = mstr.split(/,|\(|\)/);
    _ref = [arr[1], arr[3], arr[5], arr[2], arr[4], arr[6]];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      _results.push(parseFloat(x));
    }
    return _results;
  };
  set_transform = function(img, mstr) {
    var matrix;
    if (heartbeat_mode) {
      matrix = parse_mstr(mstr);
      img.data('dst_matrix', matrix);
      return ie_step_transition(img, heartbeat_mode_steps - 1, 0);
    } else {
      return img.css(browser_prefix + 'transform', mstr);
    }
  };
  ie_init_transition = function(img, mstr) {
    var matrix;
    img.data('src_matrix', img.data('dst_matrix'));
    matrix = parse_mstr(mstr);
    return img.data('dst_matrix', matrix);
  };
  lerp_scalar = function(lerp_fraction, a, b) {
    return a + (b - a) * lerp_fraction;
  };
  lerp_geometric = function(lerp_fraction, a, b) {
    return a * (Math.pow(b / a, lerp_fraction));
  };
  lerp_point = function(lerp_fraction, _arg, _arg2) {
    var x1, x2, y1, y2;
    x1 = _arg[0], y1 = _arg[1];
    x2 = _arg2[0], y2 = _arg2[1];
    return [lerp_scalar(lerp_fraction, x1, x2), lerp_scalar(lerp_fraction, y1, y2)];
  };
  lerp_angle = function(lerp_fraction, angle1, angle2) {
    var angle_delta;
    angle_delta = angle2 - angle1;
    while (angle_delta < 0) {
      angle_delta += 2 * Math.PI;
    }
    while (angle_delta >= 2 * Math.PI) {
      angle_delta -= 2 * Math.PI;
    }
    if (angle_delta >= Math.PI) {
      angle_delta -= 2 * Math.PI;
    }
    return angle1 + (angle_delta * lerp_fraction);
  };
  matrix_angle = function(matrix) {
    return Math.atan2(matrix[3], matrix[4]);
  };
  matrix_position = function(matrix) {
    return [matrix[2], matrix[5]];
  };
  matrix_scale = function(matrix) {
    return Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
  };
  matrix_string = function(matrix) {
    return 'matrix(' + matrix[0].toFixed(5) + ',' + matrix[3].toFixed(5) + ',' + matrix[1].toFixed(5) + ',' + matrix[4].toFixed(5) + ',' + matrix[2].toFixed(5) + ',' + matrix[5].toFixed(5) + ')';
  };
  transform_point = function(_arg, _arg2) {
    var a11, a12, a13, a21, a22, a23, x1, x2, x3;
    x1 = _arg[0], x2 = _arg[1];
    a11 = _arg2[0], a12 = _arg2[1], a13 = _arg2[2], a21 = _arg2[3], a22 = _arg2[4], a23 = _arg2[5];
    x3 = 1;
    return [a11 * x1 + a12 * x2 + a13 * x3, a21 * x1 + a22 * x2 + a23 * x3];
  };
  ie_step_transition = function(img, step, opacity) {
    var angle, cos, dst_angle, dst_matrix, dst_position, dst_scale, h, hold, lerp_fraction, matrix, mstr, position, ptgoal, scale, sin, src_angle, src_matrix, src_position, src_scale, w, wold;
    if (step === heartbeat_mode_steps - 1) {
      matrix = img.data('dst_matrix');
    } else {
      src_matrix = img.data('src_matrix');
      dst_matrix = img.data('dst_matrix');
      if (!(src_matrix != null)) {
        matrix = dst_matrix;
      } else {
        src_angle = matrix_angle(src_matrix);
        src_position = matrix_position(src_matrix);
        src_scale = matrix_scale(src_matrix);
        dst_angle = matrix_angle(dst_matrix);
        dst_position = matrix_position(dst_matrix);
        dst_scale = matrix_scale(dst_matrix);
        lerp_fraction = (step + 1) / heartbeat_mode_steps;
        angle = lerp_angle(lerp_fraction, src_angle, dst_angle);
        position = lerp_point(lerp_fraction, src_position, dst_position);
        scale = lerp_geometric(lerp_fraction, src_scale, dst_scale);
        sin = (Math.sin(angle)) * scale;
        cos = (Math.cos(angle)) * scale;
        matrix = [cos, -sin, position[0], sin, cos, position[1]];
      }
    }
    if (!(matrix != null)) {
      return;
    }
    if (!browser_ie) {
      mstr = matrix_string(matrix);
      return img.css(browser_prefix + 'transform', mstr);
    } else {
      img.get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.Matrix(enabled=false)";
      wold = img.width();
      hold = img.height();
      ptgoal = transform_point([wold / 2, hold / 2], matrix);
      img.get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='" + matrix[0].toFixed(5) + "',M12='" + matrix[1].toFixed(5) + "',M21='" + matrix[3].toFixed(5) + "',M22='" + matrix[4].toFixed(5) + "', sizingMethod='auto expand')progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opacity + ")";
      w = img.width();
      h = img.height();
      return img.css({
        left: ptgoal[0] - w / 2,
        top: ptgoal[1] - h / 2
      });
    }
  };
  preload_frame = function(parent, animation, time) {};
  preload_frame = function(parent, animation, time) {
    var additions, deletions, enable_transition, frames, image, image_2, image_id, image_id_2, images, img, img_2, img_tween, matrix, matrix_2, morph_starts, morph_stops, morphings, order, part_id, transformations, tween, tweens, _i, _j, _len, _len2, _ref, _ref2, _ref3, _results;
    enable_transition = function(obj) {
      if (heartbeat_mode) {
        return;
      }
      return obj.css(browser_prefix + 'transition', browser_prefix + 'transform ' + transition_msec + 'ms linear,opacity ' + transition_msec + 'ms linear');
    };
    images = animation.images, tweens = animation.tweens, frames = animation.frames;
    _ref = frames[time], additions = _ref.additions, deletions = _ref.deletions, transformations = _ref.transformations, morph_starts = _ref.morph_starts, morph_stops = _ref.morph_stops, morphings = _ref.morphings, order = _ref.order;
    for (_i = 0, _len = additions.length; _i < _len; _i++) {
      _ref2 = additions[_i], part_id = _ref2.part_id, image_id = _ref2.image_id, matrix = _ref2.matrix;
      img = $('<img></img>');
      img.attr('id', 'automatoon_' + time + '_part_' + part_id);
      parent.append(img);
      img.addClass('automatoon_' + time);
      img.css(browser_prefix + 'transform-origin', '0 0');
      img.css({
        display: 'none',
        position: 'fixed'
      });
      if (images != null) {
        image = images[image_id];
        img.attr('src', image.get(0).toDataURL());
      } else {
        img.attr('src', directory + 'images' + divider + image_id +'.png');
      }
      set_transform(img, matrix);
      enable_transition(img);
    }
    _results = [];
    for (_j = 0, _len2 = morph_starts.length; _j < _len2; _j++) {
      _ref3 = morph_starts[_j], part_id = _ref3.part_id, image_id = _ref3.image_id, image_id_2 = _ref3.image_id_2, matrix_2 = _ref3.matrix_2, matrix = _ref3.matrix;
      _results.push(image_id_2 != null ? (image_id != null ? (img_tween = $('<img></img>'), img_tween.attr('id', 'automatoon_' + time + '_part_' + part_id + '_tween'), parent.append(img_tween), img_tween.addClass('part'), img_tween.addClass('automatoon_' + time), img_tween.css(browser_prefix + 'transform-origin', '0 0'), img_tween.css({
        display: 'none',
        position: 'fixed'
      }), tweens != null ? (tween = tweens[[part_id, image_id, image_id_2]].image, img_tween.attr('src', tween.get(0).toDataURL())) : img_tween.attr('src', directory + 'parts' + divider + part_id + divider + 'srcimages' + divider + image_id + divider + 'dstimages' + divider + image_id_2), set_transform(img_tween, matrix), enable_transition(img_tween)) : void 0, img_2 = $('<img></img>'), img_2.attr('id', 'automatoon_' + time + '_part_' + part_id + '_2'), img_2.addClass('automatoon_' + time), parent.append(img_2), img_2.css(browser_prefix + 'transform-origin', '0 0'), img_2.css({
        position: 'fixed',
        opacity: 0,
        display: 'none'
      }), images != null ? (image_2 = images[image_id_2], img_2.attr('src', image_2.get(0).toDataURL())) : img_2.attr('src', directory + 'images' + divider + image_id_2 + '.png'), set_transform(img_2, matrix_2), enable_transition(img_2)) : void 0);
    }
    return _results;
  };
  prepare_frame = function(parent, animation, time) {
    var additions, deletions, frames, image_id, image_id_2, images, img, img_2, img_tween, matrix, matrix_2, morph_starts, morph_stops, morphings, n, order, part_id, s, transformations, tweens, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _ref, _ref2, _ref3, _results;
    images = animation.images, tweens = animation.tweens, frames = animation.frames;
    _ref = frames[time], additions = _ref.additions, deletions = _ref.deletions, transformations = _ref.transformations, morph_starts = _ref.morph_starts, morph_stops = _ref.morph_stops, morphings = _ref.morphings, order = _ref.order;
    for (_i = 0, _len = additions.length; _i < _len; _i++) {
      _ref2 = additions[_i], part_id = _ref2.part_id, image_id = _ref2.image_id, matrix = _ref2.matrix;
      img = $('#automatoon_' + time + '_part_' + part_id);
      img.attr('id', 'animpart_' + part_id);
      img.css({
        display: 'inline'
      });
    }
    for (_j = 0, _len2 = deletions.length; _j < _len2; _j++) {
      part_id = deletions[_j].part_id;
      $('#animpart_' + part_id).remove();
    }
    for (_k = 0, _len3 = morph_stops.length; _k < _len3; _k++) {
      part_id = morph_stops[_k].part_id;
      $('#animpart_' + part_id).remove();
      $('#animpart_' + part_id + '_2').attr('id', 'animpart_' + part_id);
      $('#animpart_' + part_id).css('opacity', 1);
      $('#animpart_' + part_id + '_tween').remove();
    }
    for (_l = 0, _len4 = morph_starts.length; _l < _len4; _l++) {
      _ref3 = morph_starts[_l], part_id = _ref3.part_id, image_id = _ref3.image_id, image_id_2 = _ref3.image_id_2, matrix_2 = _ref3.matrix_2;
      if (image_id_2 != null) {
        if (image_id != null) {
          img_tween = $('#automatoon_' + time + '_part_' + part_id + '_tween');
          img_tween.attr('id', 'animpart_' + part_id + '_tween');
          img_tween.css({
            display: 'inline'
          });
        }
        img_2 = $('#automatoon_' + time + '_part_' + part_id + '_2');
        img_2.attr('id', 'animpart_' + part_id + '_2');
        img_2.css({
          display: 'inline'
        });
      }
    }
    _results = [];
    for (n = 0, _len5 = order.length; n < _len5; n++) {
      part_id = order[n];
      s = '#animpart_' + part_id;
      $(s + '_tween').css({
        'z-index': n * 3 + 2
      });
      $(s + '_2').css({
        'z-index': n * 3 + 3
      });
      _results.push($(s).css({
        'z-index': n * 3 + 4
      }));
    }
    return _results;
  };
  transition_frame = function(parent, animation, time) {
    var additions, deletions, frames, images, img, img_2, img_tween, lerp_fraction, matrix, matrix_2, morph_starts, morph_stops, morphings, order, part_id, transformations, tweens, _i, _len, _ref, _ref2, _results;
    images = animation.images, tweens = animation.tweens, frames = animation.frames;
    _ref = frames[time], additions = _ref.additions, deletions = _ref.deletions, transformations = _ref.transformations, morph_starts = _ref.morph_starts, morph_stops = _ref.morph_stops, morphings = _ref.morphings, order = _ref.order;
    for (_i = 0, _len = morphings.length; _i < _len; _i++) {
      _ref2 = morphings[_i], part_id = _ref2.part_id, lerp_fraction = _ref2.lerp_fraction, matrix_2 = _ref2.matrix_2;
      $('#animpart_' + part_id).css('opacity', 1 - lerp_fraction);
      img_2 = $('#animpart_' + part_id + '_2');
      img_2.css('opacity', lerp_fraction);
      set_transform(img_2, matrix_2);
    }
    _results = [];
    for (part_id in transformations) {
      matrix = transformations[part_id];
      img = $('#animpart_' + part_id);
      set_transform(img, matrix);
      img_tween = $('#animpart_' + part_id + '_tween');
      _results.push(img_tween.get(0) != null ? set_transform(img_tween, matrix) : void 0);
    }
    return _results;
  };
  heartbeat_mode_transition_frame = function(state, step) {
    var additions, animation, deletions, frames, images, img, img_2, img_tween, lerp_fraction, matrix, matrix_2, morph_starts, morph_stops, morphings, op, opacities, order, parent, part_id, start_msec, step_nu, time, transformations, tweens, used_msec, _i, _len, _ref, _ref2;
    start_msec = get_tick_count();
    parent = state.parent, animation = state.animation, time = state.time;
    images = animation.images, tweens = animation.tweens, frames = animation.frames;
    _ref = frames[time], additions = _ref.additions, deletions = _ref.deletions, transformations = _ref.transformations, morph_starts = _ref.morph_starts, morph_stops = _ref.morph_stops, morphings = _ref.morphings, order = _ref.order;
    opacities = {};
    for (_i = 0, _len = morphings.length; _i < _len; _i++) {
      _ref2 = morphings[_i], part_id = _ref2.part_id, lerp_fraction = _ref2.lerp_fraction, matrix_2 = _ref2.matrix_2;
      op = Math.floor((1 - lerp_fraction) * 100);
      opacities[part_id] = op;
      $('#animpart_' + part_id).css({
        'opacity': 1 - lerp_fraction,
        filter: 'alpha(opacity=' + op + ')'
      });
      img_2 = $('#animpart_' + part_id + '_2');
      op = Math.floor(lerp_fraction * 100);
      img_2.css({
        'opacity': lerp_fraction,
        filter: 'alpha(opacity=' + op + ')'
      });
      if (step === 0) {
        ie_init_transition(img_2, matrix_2);
      }
      ie_step_transition(img_2, step, op);
    }
    for (part_id in transformations) {
      matrix = transformations[part_id];
      img = $('#animpart_' + part_id);
      if (step === 0) {
        ie_init_transition(img, matrix);
      }
      op = opacities[part_id];
      if (!(op != null)) {
        op = 100;
      }
      ie_step_transition(img, step, op);
      img_tween = $('#animpart_' + part_id + '_tween');
      if (img_tween.get(0) != null) {
        if (step === 0) {
          ie_init_transition(img_tween, matrix);
        }
        ie_step_transition(img_tween, step, 100);
      }
    }
    step_nu = step + 1;
    if (step_nu === heartbeat_mode_steps) {
      state.time++;
      return setTimeout(partial(animate, state, start_msec), 1);
    } else {
      used_msec = (get_tick_count()) - start_msec;
      return setTimeout(partial(heartbeat_mode_transition_frame, state, step_nu), Math.max(transition_msec / heartbeat_mode_steps - used_msec, 1));
    }
  };
  animate = function(state, start_msec) {
    var animation, frames, images, parent, t, time, _ref;
    if (!(start_msec != null)) {
      start_msec = get_tick_count();
    }
    parent = state.parent, time = state.time, animation = state.animation;
    images = animation.images, frames = animation.frames;
    if (time === frames.length) {
      time = state.time = 0;
      parent.find('img').remove();
      return stopped = true;
    }
    if (time === 0) {
      for (t = 0, _ref = frames.length; 0 <= _ref ? t < _ref : t > _ref; 0 <= _ref ? t++ : t--) {
        preload_frame(parent, animation, t);
      }
    }
    prepare_frame(parent, animation, time);
    return setTimeout(partial(animate_transition, state, start_msec), 1);
  };
  animate_transition = function(state, start_msec) {
    var animation, frames, images, parent, time, used_msec;
    if (stopped) {
      return;
    }
    if (!(start_msec != null)) {
      start_msec = get_tick_count();
    }
    parent = state.parent, time = state.time, animation = state.animation;
    images = animation.images, frames = animation.frames;
    if (heartbeat_mode) {
      used_msec = (get_tick_count()) - start_msec;
      return setTimeout(partial(heartbeat_mode_transition_frame, state, 0), Math.max((transition_msec / heartbeat_mode_steps) - used_msec, 1));
    } else {
      transition_frame(parent, animation, time);
      state.time++;
      used_msec = (get_tick_count()) - start_msec;
      return setTimeout(partial(animate, state), transition_msec - used_msec);
    }
  };
  play_helper = function(params) {
    var animation, container, hosted, k, parent, script, tagline, time, wid, zoom;
    k = {
      time: 0,
      container: $("body")
    };
    params = $.extend(k, params);
    animation = k.animation, hosted = k.hosted, script = k.script, time = k.time, container = k.container;
    if (hosted != null) {
      divider = '/';
      directory = '';
    } else {
      divider = '_';
      directory = safe_dirname(script + '/');
    }
    ($(".automatoon_wrapper")).remove();
    parent = $("<div></div>");
    parent.addClass("automatoon_wrapper");
    wid = container.width();
    container.prepend(parent);
    zoom = wid / animation_width;
    parent.css({
      position: 'fixed',
      padding: 10,
      color: 'grey',
      '-webkit-transform': 'scale(' + zoom + ') ',
      '-moz-transform': 'scale(' + zoom + ') ',
      'font-size': 12
    });
    if (browser_ie) {
      parent.css({
        zoom: zoom
      });
    }
    k.parent = parent;
    return animate(k);
  };
  safe_dirname = function(s) {
    return s.replace(/\ /g, '_');
  };
  automatoon_player.play = function(params, container) {
    var url;
    stopped = false;
    if (($.type(params)) === 'string') {
      params = {
        script: params
      };
    }
    if (container != null) {
      params.container = container;
    }
    if (params.animation != null) {
      return play_helper(params);
    } else {
      if (params.hosted != null) {
        url = 'script.js';
      } else {
        url = (safe_dirname(params.script)) + '/script.js';
      }
      return $.getJSON(url, function(animation) {
        params.animation = animation;
        return play_helper(params);
      });
    }
  };
  return automatoon_player.stop = function() {
    return stopped = true;
  };
})();


$(function(){
  $("body").keydown(function(event) {
    if(event.which === 90) {
      automatoon_player.play({script: 'swing', top: $(window).scrollTop() });
    }
  })
})

$(function(){
  $("body").keydown(function(event) {
    if(event.which === 74) {
      automatoon_player.play({script: 'jetsons', top: $(window).scrollTop() });
    }
  })
})

$(function(){
  $("body").keydown(function(event) {
    if(event.which === 83) {
      automatoon_player.play({script: 'spiderman', top: $(window).scrollTop() });
    }
  })
})
