PaneGrid = function(rows, cols) {
  this.panes = [];
  this.numRows = rows;
  this.numCols = cols;
  this.bounds = { top: 0, left: 0, bottom: this.numRows-1, right: this.numCols-1 };

  var $panes = $("<div>").attr("id", "windowPanes").appendTo($("body"));
  for(var r = 0; r < rows; r++) {
    this.panes[r] = [];
    $row = $("<div>").addClass("row row"+r);
    $panes.append($row);
    for(var c = 0; c < cols; c++) {
      $pane = $("<div>").attr("id", "pane-"+r+"-"+c).addClass("pane col"+c);
      $row.append($pane);
      this.panes[r][c] = new Pane(this, r, c, $pane);
    }
  }
};
PaneGrid.prototype.pane = function(row, col) {
  var invalid = col < this.bounds.left || col > this.bounds.right || row < this.bounds.top || row > this.bounds.bottom;
  if(invalid) return new Pane(this.grid, row, col, null);
  else return this.panes[row][col];
};
PaneGrid.prototype.topLeft = function() { return this.panes[this.bounds.top][this.bounds.left]; };
PaneGrid.prototype.topRight = function() { return this.panes[this.bounds.top][this.bounds.right]; };
PaneGrid.prototype.bottomRight = function() { return this.panes[this.bounds.bottom][this.bounds.right]; };
PaneGrid.prototype.bottomLeft = function() { return this.panes[this.bounds.bottom][this.bounds.left]; };

Pane = function(grid, row, col, $pane) {
  this.grid = grid;
  this.row = row;
  this.col = col;
  this.element = $pane;
};
Pane.prototype.isValid = function() {
  return this.element == null;
};
Pane.prototype.move = function(rowDelta, colDelta) {
  var newRow = this.row + rowDelta;
  var newCol = this.col + colDelta;
  return this.grid.pane(newRow, newCol);
};
Pane.prototype.up = function() { return this.move(-1, 0); };
Pane.prototype.down = function() { return this.move(1, 0); };
Pane.prototype.left = function() { return this.move(0, -1); };
Pane.prototype.right = function() { return this.move(0, 1); };
Pane.prototype.$ = function($find) {
  if($find) {
    return $($find, this.element); // optionally find another element inside the pane
  }
  else {
    return $(this.element); // or just return the pane
  }
};

window.grid = new PaneGrid(22, 7);
// window.grid.topLeft().down().right().$(".fire").remove(); // I removed <div class="fire">!

// automatically stuff #paneContents divs into appropriate pane-x-y window panes
$(function() {
  $("#paneContents").children().each(function(i, el) {
    $el = $(el);
    var paneId = null;
    if(paneId = $el.data("pane-id")) {
      $el.detach().appendTo($("#"+paneId));
    }
  });
});
