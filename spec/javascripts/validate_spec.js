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

    it('should always be valid (no messages) when there are no validate filters', function(){
      expect(field.validate()).toEqual([]);
    })
    
    it('calls each validation function listed in data-validate', function(){
      field.attr('data-validate', 'always valid');
      $.fn.validate.rules.always = function(){}
      $.fn.validate.rules.valid = function(){}
      spyOn($.fn.validate.rules, 'always');
      spyOn($.fn.validate.rules, 'valid');
      
      field.validate();
      expect($.fn.validate.rules['always']).toHaveBeenCalledWith('');
      expect($.fn.validate.rules['valid']).toHaveBeenCalledWith('');
    })
    
    it('should return messages if invalid', function(){
      field.attr('data-validate', 'fake');
      $.fn.validate.rules.fake = function() { return 'You fail' }
      expect(field.validate()).toEqual(['You fail'])
    })

  })
  
  describe('matching against defined rules', function(){
    
    // required over() under() phone email ...
    
    it('exposes $.fn.validate.applyRule', function(){
      expect($.fn.validate.applyRule).toBeDefined();
    })    
    
    it('the rule function receives a second argument when applicable', function(){
      $.fn.validate.rules.exactlyEquals = function(value, toEqual) {
        return (value != toEqual ? 'Does not match' : null);
      }
      
      expect(
        $.fn.validate.applyRule('exactlyEquals(foobar)', 'foobar')
      ).toBeFalsy();
      
      expect(
        $.fn.validate.applyRule('exactlyEquals(foobar)', 'asdf')
      ).toEqual('Does not match')
    })
    
    describe('standard ruleset', function(){
      
      it('tests "required" for present of a value', function(){
        expect($.fn.validate.applyRule('required', '')).toEqual('requires a value');
        expect($.fn.validate.applyRule('required', 'foo')).toBeFalsy();
      })
      
      it('tests "over()" for a value greater than the supplied argument', function(){
        expect($.fn.validate.applyRule('over(18)', '13')).toEqual('must be over 18');
        expect($.fn.validate.applyRule('over(18)', '21')).toBeFalsy();
      })
      
      it('tests "numeric" for a number', function(){
        expect($.fn.validate.applyRule('numeric', 'abc')).toEqual('must be a number');
        expect($.fn.validate.applyRule('numeric', '123')).toBeFalsy();
      })
      
    })
    
  })
  
})