(function($){
  
  $.fn.validate = function(options) {
    var results = [];
    
    $(this).each(function(){
      if ($(this).is('form')) {
        $(this).submit(function(e){
          e.preventDefault();
          $.fn.validate.checkForm(this, options);
        });
      }
      
      var methods = _.compact(($(this).attr('data-validate') || '').split(' '));
      _.each(methods, function(method){
        results.push(
          $.fn.validate.rules[method]($(this).val())
        );
      })
    })
    
    return _.compact(results);
  }
  
  $.extend($.fn.validate, {
    
    rules: {
      required: function(v) { return v.replace(/\s/g,"") == "" ? 'requires a value' : null },
      over: function(v,age) { return parseInt(v) < parseInt(age) ? 'must be over '+age : null },
      numeric: function(v) { return !v.match(/\d+/) ? 'must be a number' : null }
    },
    
    applyRule: function(ruleName, value) {
      match = /(\w+)(\((.+)\))?/.exec(ruleName);
      return this.rules[match[1]](value, match[3]);
    },
    
    checkForm: function(form, options) {
      
      return options['beforeSubmit'] ? options['beforeSubmit']() : true;
    }
    
  });
  
})(jQuery);