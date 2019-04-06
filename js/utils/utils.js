Utils = {} || Utils;

Utils.checaCampo = function(campo) {
  if (typeof campo == "undefined" || campo == "null" || campo == null)
    return "Não Informado";
  return campo;
};

Utils.encurtaCampo = function(campo, tam) {
  campo = Utils.checaCampo(campo);
  if (campo.length > tam) return campo.substring(0, tam - 1) + "..";
  return campo;
};

Utils.arraySort = function(array, field, direction) {
  if (direction == "ASC") {
    array.sort(function(a, b) {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  } else {
    array.sort(function(a, b) {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    });
  }

  return array;
};

Loading = {} || Loading;

Loading.show = function(div) {
  var loading = `<div class="text-center loading">
    <div class="spinner-border text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;
  $(div).html(loading);
};

Loading.hide = function() {
  $(".loading").remove();
};
