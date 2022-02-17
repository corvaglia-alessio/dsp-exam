'use strict';

var utils = require('../utils/writer.js');
var Assignments = require('../service/AssignmentsService');

module.exports.assignAutomatically = function assignAutomatically (req, res, next) {
  Assignments.assignBalanced(req.user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
    });
};

module.exports.assignTaskToUser = function assignTaskToUser (req, res, next) {
  Assignments.assignTaskToUser(req.body.id, req.params.taskId, req.user)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (response) {
      if(response == 403){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not the owner of the task' }], }, 403);
      }
      else if (response == 404){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The task does not exist.' }], }, 404);
      }
      else {
          utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
      }
    });
};

module.exports.getUsersAssigned = function getUsersAssigned (req, res, next) {
  Assignments.getUsersAssigned(req.params.taskId, req.user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if(response == 403){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not the owner of the task' }], }, 403);
      }
      else if (response == 404){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The task does not exist.' }], }, 404);
      }
      else {
          utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
      }
    });
};

module.exports.removeUser = function removeUser (req, res, next) {
  Assignments.removeUser(req.params.taskId, req.params.userId, req.user)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (response) {
      if(response == 403){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not the owner of the task' }], }, 403);
      }
      else if (response == 404){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The task does not exist.' }], }, 404);
      }
      else if (response == 409){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not a task assegnee or the user has already completed the task.' }], }, 409);
      }
      else {
        utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
      }
    });
};

module.exports.selectTask = function selectTask(req, res, next) {
  var userId = req.params.userId;
  var taskId = req.body.id;
  if(taskId == undefined){
    utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Missing taskId query parameter'}],}, 400);
  }
  Assignments.selectTask(userId, taskId)
      .then(function(response) {
            utils.writeJson(res, response, 204);
      })
      .catch(function(response) {
        if(response == 403){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not an assignee of the task' }], }, 403);
        }
        else if (response == 404){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The task does not exist.' }], }, 404);
        } 
        else {
          utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
        }
      });
};


module.exports.deselectTask = function deselectTask(req, res, next) {
  var userId = req.params.userId;
  if(taskId == undefined){
    utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Missing taskId query parameter'}],}, 400);
  }
  Assignments.deselectTask(userId)
      .then(function(response) {
            utils.writeJson(res, response, 204);
      })
      .catch(function(response) {
        if(response == 409){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user has no active task' }], }, 409);
        }
        else {
          utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
        }
      });
};

module.exports.getUsersActive = function getUsersActive (req, res, next) {
  Assignments.getUsersActive(req.params.taskId, req.user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if(response == 403){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not the owner of the task' }], }, 403);
      }
      else if (response == 404){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The task does not exist.' }], }, 404);
      }
      else {
          utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
      }
    });
};

module.exports.getUsersCompleted = function getUsersCompleted (req, res, next) {
  Assignments.getUsersCompleted(req.params.taskId, req.user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if(response == 403){
        utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The user is not the owner of the task' }], }, 403);
      }
      else if (response == 404){
          utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': 'The task does not exist.' }], }, 404);
      }
      else {
          utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': response }],}, 500);
      }
    });
};