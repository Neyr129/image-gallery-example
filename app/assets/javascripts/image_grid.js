(function($){

  SupaGridMaker = function(){

    this.createGrid = function(){
      images = $(".image-block").toArray().reverse();
      container = $(".container-wide");
      while ( images.length > 0){
        imageRow = [];
        while( this.sumLength(imageRow) < container.width() && images.length > 0){
          imageRow.push( $(images.pop()) );
          this.setEqualRowHeight(imageRow);
        }
        this.resizeSet(imageRow,container.width() - imageRow.length * 4);
      }
    }

    this.sumArray = function(images){
      total = 0;
      for (var i = 0; i < images.length; i++) {
        total += images[i];
      }
      return total;
    }

    this.sumLength = function(imageRow){
      var summ = 0;
      for(var i=0; i < imageRow.length; i++){
        summ += imageRow[i].width();
      }
      return summ;
    }

    this.resizeSet = function(imageRow, required_width){
      if (this.sumLength(imageRow) > required_width) {

        /**** TINY WIDTH REDUCE ****/
        this.reduceSetWidth(imageRow, 20)

        /**** RESIZE IF IT'S NOT ENOUGH ****/
        this.resizeSetByWidth(imageRow, required_width);

      }
    }

    this.reduceSetWidth = function(imageRow, limit){
      var widths = new Array(imageRow.length);
      $.each(imageRow, function(index, element) { widths[index] = element.width() });

      iterations = 0;
      while (this.sumArray(widths) > limit && iterations < limit){
        var i = 0;
        while ( (this.sumArray(widths) > limit) && (i < imageRow.length) ){
          widths[i]--;
          i++;
        }
        iterations ++;
      }
      $.each(imageRow, function(index, element) { element.width( widths[index] ) });
    }

    this.resizeSetByWidth = function(imageRow, width) {
        var widths = new Array(imageRow.length);
        $.each(imageRow, function(index, element) { widths[index] = element.width() });

        var ratio  =  width / this.sumArray(widths);

        $.each(imageRow, function(index, element){
          element.width(element.width() * ratio).height(element.height() * ratio);
        });

    };

    this.resizeByHeight = function(block, height) {
        var ratio = height / block.height();
        block.width(block.width() * ratio).height(block.height() * ratio);
    };

    this.setEqualRowHeight = function(imageRow){
      self = this;

      minHeight = 250;
      minFoundHeight = 9999;
      $.each(imageRow, function(index, element) {
        if (element.height() < minFoundHeight) {
          if (element.height() < minHeight){
            minFoundHeight = minHeight;
          }else{
            minFoundHeight = element.height()}
          };
      });

      $.each(imageRow, function(index, element) {
        self.resizeByHeight(element, minFoundHeight);
      });
    };

    this.init = function(){
      self = this;
      $(function(){

        self.createGrid();
      });
    };
  };


  window.SupaGridMaker = new SupaGridMaker();

  // SupaGridMaker.init();

})(jQuery);