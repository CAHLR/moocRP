/*******************************************
 * Copyright 2014, moocRP                  *
 * Author: Kevin Kao                       *
 *******************************************/

/**
 * RequestController
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

var path = require('path');
var TYPES = ['pii', 'non_pii'],
    DATASET_ROOT = sails.config.paths.DATASET_ROOT,
    ENCRYPT_PATH = sails.config.paths.DATASET_ENCRYPT_PATH;

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RequestController)
   */
   _config: {},
   
  // Create a data request
  create: function(req, res) {
    var params = req.params.all(),
        dataModelName = params['dataset'].split('__')[0],
        dataset = params['dataset'].split('__')[1];

    // TODO: Deny data requests if a data model is deleted
    DataModel.findOne({ displayName: dataModel }, function(err, datamodel) {
      params['dataModel'] = datamodel.id;
      params['dataset'] = dataset;

      Request.create(params, function requestCreated(err, request) {
        if (err) {
          FlashService.error(req, "Please fill in all fields");
        } else {
          FlashService.success(req, 'Successfully created a data request');
        }
        return res.redirect('/dashboard');
      });
    });
  }, 

  // Deny a data request
  deny: function(req, res) {
    Request.findOne(req.param('id'), function foundRequest(err, request) {
      if (err || !request) {
        FlashService.error(req, err ? err : 'Request does not exist');
        return res.redirect('/admin/manage_requests');
      }

      request.granted = false
      request.denied = true
      request.save(function (err) {
        if (err) {
          sails.log.error(err);
          FlashService.error(req, 'An error occurred while denying the request');
        } else {
          FlashService.success(req, 'Successfully denied request');
        }
        return res.redirect('/admin/manage_requests');
      });
    }); 
  },

  // Generate download for a data request
  download: function(req, res) {
    var path = require('path');
    var process = require('process');
    var fs = require('fs');

    Request.findOne(req.param('request_id')).populate('requestingUser').exec(function foundRequest(err, request) {
      if (err) {
        FlashService.error(req, err);
        return res.redirect('/dashboard');
      }
      if (!request) {
        FlashService.error(req, "Request does not exist");
        return res.redirect('/dashboard');
      }

      DataModel.findOne(request.dataModel, function(err, dataModel) {
        if (err || !dataModel) {
          FlashService.error(req, "Download unavailable due to update - please make a new request.");
          return res.redirect('/dashboard');
        }
        var data = request.dataset + '_' + request.requestingUser.id + '.zip.gpg',
            link = path.resolve(ENCRYPT_PATH, dataModel.fileSafeName, data);

        sails.log(link);

        request.downloaded = true
        request.save(function (err) {
          if (err) {
            sails.log.error(err);
            FlashService.error(req, err);
            return res.redirect('/dashboard');
          } else {
            sails.log.debug("Request " + request.id + " is being fulfilled and downloaded");
            sails.log.debug("Downloading: " + link);
            return res.download(link);
          }
        });
      });
    });   
  },

  // Delete all data requests - used for development 
  deleteAll: function(req, res) {
    Request.find().exec(function(err, requests) {
      for (request in requests) {
        Request.destroy(request.id, function(err) {
          sails.log.debug('Request destroyed');
        });
      }
      FlashService.success(req, 'Successfully deleted all requests');
      return res.redirect('/admin/manage_requests');
    });
  },

  // Grant the data request
  grant: function(req, res) {
    Request.findOne(req.param('id')).populate('requestingUser').exec(function foundRequest(err, request) {
      if (err || !request) {
        FlashService.error(req, err ? err : 'Request does not exist');
        return res.redirect('/admin/manage_requests');
      }

      EncryptionService.encrypt(request.requestingUser, request.dataModel, request.dataset, request.requestType, function(error, stdout, stderr, cmd) {
        if (error || stderr) {
          sails.log.error('Command: ' + cmd + '\t [Error: ' + error + ']');
          sails.log.debug('stdout: ' + stdout);
          sails.log.debug('stderr: ' + stderr);
          FlashService.error(req, 'An error occurred while encrypting dataset: ' + error);
          return res.redirect('/admin/manage_requests');
        }

        request.granted = true;
        request.denied = false;
        request.save(function (err) {
          if (err) {
            sails.log.error(err);
            FlashService.error(req, 'An error occurred while granting request');
          } else {
            Request.publishUpdate(request.id, {granted: true, denied: false});
            FlashService.success(req, 'Successfully granted request');
          }
          return res.redirect('/admin/manage_requests');
        });
      });

    }); 
  }
};
