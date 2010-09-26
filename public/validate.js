(function($){
  
  $.fn.validate = function(options) {
    var results = [];
    
    $(this).each(function(){
      var methods = _.compact(($(this).attr('data-validate') || '').split(' '));
      _.each(methods, function(method){
        $.fn.validate.rules[method]($(this).val());
      })
    })
    
    return _.isEmpty(_.compact(results));
  }
  
  $.fn.validate.rules = {}
  
})(jQuery);