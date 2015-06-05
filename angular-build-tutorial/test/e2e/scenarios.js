'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('MyShop App', function() {


  describe('Product view', function() {

    beforeEach(function() {
      browser.get('/index.html');
    });


    it('all products should be shown', function() {

      var productList = element.all(by.repeater('product in producten'));
      expect(productList.count()).toBe(3);
    });

  });
});


