'use strict';

function Node(value) {
  this.value = value || null;
  this.left = null;
  this.right = null;
}

Node.prototype.addNodeWithValue = function(value) {
  if (value === this.value) return this; //return this allows chaining

  if (value < this.value) {
    if (this.left) {
      return this.left.addNodeWithValue(value);
    }
    this.left = new Node(value);
    return this;
  }

  if ( this.right) {
    return this.right.addNodeWithValue(value);
  }

  this.right = new Node(value);
  return this;
};

Node.prototype.addNode = function(node){

  if (node.value < this.value) {
    if (this.left) {
      return this.left.addNode(node);
    }
    this.left = node;
    return this;
  }

  if ( this.right) {
    return this.right.addNode(node);
  }

  this.right = node;
  return this;
};


function BST() {
  this.root = null;
}

BST.prototype.addNode = function(node){
  if (!this.root) {
    this.root = node;
  }

  this.root.addNode(node);
  return this;

};
BST.prototype.addNodeWithValue = function(value){ //wrapper function for node prototype method
  if (!this.root) {
    this.root = new Node(value);
  }

  this.root.addNodeWithValue(value);
  return this;
};

BST.prototype.deleteNode = function(val){

  var returned = this.search(val);
  if (!returned.node) return false;


  var replacement = findMax(returned.node.left) || findMin(returned.node.right);

  if (!replacement) {
    setParentNull(returned.parent, returned.node);
    return this;
  }

  if (this.root === returned.node) this.root = replacement.node;
  replacement.child = replacement.node.left || replacement.node.right;
  if (!replacement.parent) replacement.parent = returned.node;

  if ( replacement.node !== returned.node.left) replacement.node.left = returned.node.left;
  if ( replacement.node !== returned.node.right) replacement.node.right = returned.node.right;

  if (returned.parent) returned.parent = resetParent(returned.parent, returned.node, replacement.node);

  replacement.parent = setParentNull(replacement.parent, replacement.node);

  if (replacement.child) this.addNode(replacement.child);

  return this;

  function setParentNull(parent, child){
    if( parent.left === child) parent.left = null;
    if( parent.right === child) parent.right = null;
    return parent;
  }
  function resetParent(parent,oldChild, newChild){
    if ( parent.left === oldChild) parent.left = newChild;
    if ( parent.right === oldChild) parent.right = newChild;
    return parent;
  }
};

BST.prototype.search = function(value){

  var found = {};
  if (this.root.value === value) {
    found.node = this.root;
    return found;
  }
  function innerSearch(node, value){
    if (node.value === value) {
      found.node = node;
      return found.node;
    }
    found.parent = node;
    if (value<node.value && node.left) return innerSearch(node.left, value);
    if (value>node.value && node.right) return innerSearch(node.right, value);
  }
  innerSearch(this.root, value);
  return found;
};

function findMin(node){
  if (!node) return false;
  var found =  {};
  return _innerFind(node);

  function _innerFind(_node){
    if (!_node.left) {
      found.node = _node;
      return found;
    }
    found.parent = _node;
    return _innerFind(_node.left);
  }
}

function findMax(node){
  if (!node) return false;
  var found =  {};
  return _innerFind(node);

  function _innerFind(_node){
    if (!_node.right) {
      found.node = _node;
      return found;
    }
    found.parent = _node ;
    return _innerFind(_node.right);
  }
}



const bst = new BST();


bst.addNodeWithValue(33);
bst.addNodeWithValue(20);
bst.addNodeWithValue(30);
bst.addNodeWithValue(40);
bst.addNodeWithValue(50);
bst.addNodeWithValue(60);
bst.addNodeWithValue(8);
bst.addNodeWithValue(11);
bst.addNodeWithValue(22);
bst.addNodeWithValue(5);
bst.addNodeWithValue(44);
bst.addNodeWithValue(21);


