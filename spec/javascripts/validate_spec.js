require('/jquery.js');
require('/underscore.js');
require('/validate.js');

describe('Validating forms', function(){
  
  it('exposes a function validate() to jQuery', function(){
    expect($.fn.validate).toBeDefined();
  })
  
  describe('individual form fields', function(){
    var field;

    beforeEach(function(){
      field = $('<input type="text"/>');
    })

    it('should always be valid when there are no validate filters', function(){
      expect(field.validate()).toBeTruthy();
    })
    
    it('calls each validation function listed in data-validate', function(){
      field.attr('data-validate', 'always');
      $.fn.validate.rules.always = function(){}
      spyOn($.fn.validate.rules, 'always');
      
      field.validate();
      expect($.fn.validate.rules['always']).toHaveBeenCalledWith('');
    })
    
    it('should validate according to the result of the filter')

  })
  
})