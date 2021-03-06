/*******************************************
 * Copyright 2014, moocRP                  *
 * Author: Kevin Kao                       *
 *******************************************/

/**
 * AdminController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdminController)
   */
  _config: {},

  // View to show all users on page
  manage_users: function(req, res) {
    User.find(function foundUsers(err, users) {
      return res.view({ title: 'User Management', users: users });
    });
  },

  // View to manage requests by researchers
  manage_requests: function (req, res) {
    Request.find().populate('requestingUser').populate('dataModel').exec(function foundRequests(err, requests) {
      return res.view({ title: 'Data Request Management', requests: requests });
    }); 
  },

  // View to manage uploads by researchers
  manage_analytics: function(req, res) {
    Analytic.find().populate('owner').exec(function foundAnalytics(err, analytics) {
      return res.view({ title: 'Module Management', analytics: analytics });
    });
  },

  manage_data_models: function(req, res) {
    DataModel.find(function foundDataModels(err, dataModels) {
      return res.view({ title: 'Data Model Management', dataModels: dataModels });
    });
  },

  manage_notices: function(req, res) {
    Notice.find(function foundNotices(err, notices) {
      return res.view({ title: 'Notice Management', notices: notices});
    });
  },

  manage_data_scripts: function(req, res) {
    DataModel.find(function foundDataModels(err, dataModels) {
      return res.view({ title: 'Data Script Management', dataModels: dataModels });
    });
  },
  
};
