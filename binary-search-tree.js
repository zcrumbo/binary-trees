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

function BST() {
  this.root = null;
}

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
  var replacement = {
    node: null,
    parent: null,
  };

  if (returned.node.left) {
    replacement = findMax(returned.node.left);
  } else if (returned.node.right) {
    replacement = findMin(returned.node.right);
  } else {
    if ( returned.parent.left === returned.node) returned.parent.left = null;
    if ( returned.parent.right === returned.node) returned.parent.right = null;
    return this;
  }
  if ( !replacement.parent)replacement.parent = returned.node;
  if ( replacement.node !== returned.node.left) replacement.node.left = returned.node.left;
  if ( replacement.node !== returned.node.right) replacement.node.right = returned.node.right;
  if ( replacement.parent.left === replacement.node) replacement.parent.left = null;
  if ( replacement.parent.right === replacement.node) replacement.parent.right = null;
  if ( returned.parent.left === returned.node) returned.parent.left = replacement.node;
  if ( returned.parent.right === returned.node) returned.parent.right = replacement.node;

  return this;
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


