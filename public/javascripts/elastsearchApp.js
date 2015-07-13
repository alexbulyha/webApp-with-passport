

var elastsearchApp=angular.module('elastsearchApp', ['elasticsearch'])
elastsearchApp.service('client',function(esFactory) {
        return esFactory ({
            host: 'localhost:9200'
        });
    });
elastsearchApp.controller('elastCtrl', function($scope, client, esFactory) {

    var elastCtrl = this;

    elastCtrl.name='hehe';

    elastCtrl.search = function () {
        $scope.lastsearchterm = elastCtrl.searchterm;

        switch ($scope.querytype) {

            case 'Actor':
                client.search({
                    index: 'library',
                    type: 'movies',
                    body: {
                        query: {
                            match: {
                                Actor : $scope.lastsearchterm
                            }
                        }
                    }
                }).then(function(resp) {
                    $scope.movies = resp.hits.hits;
                }, function (err) {
                    console.trace(err.message);
                })  ;
                break;

            case 'Genre':
                client.search({
                    index: 'library',
                    type: 'movies',
                    body: {
                        query: {
                            match: {
                                Genre : $scope.lastsearchterm
                            }
                        }
                    }
                }).then(function(resp) {
                    $scope.movies = resp.hits.hits;
                }, function (err) {
                    console.trace(err.message);
                })  ;
                break;

            case 'Plot':
                client.search({
                    index: 'library',
                    type: 'movies',
                    body: {
                        query: {
                            match: {
                                Plot : $scope.lastsearchterm
                            }
                        }
                    }
                }).then(function(resp) {
                    $scope.movies = resp.hits.hits;
                }, function (err) {
                    console.trace(err.message);
                })  ;
                break;

            default:
                client.search({
                    index: 'library',
                    type: 'movies',
                    body: {
                        query: {
                            match: {
                                Title : $scope.lastsearchterm
                            }
                        }
                    }
                }).then(function(resp) {
                    $scope.movies = resp.hits.hits;
                }, function (err) {
                    console.trace(err.message);
                })  ;
                break;

        }

        elastCtrl.searchterm = '';

    };





    client.count({
        index: 'library'
    }).then(function (resp) {
        $scope.number=resp.count;
    }, function (err) {
        console.trace(err.message);
        $scope.number =0;
    });



    client.cluster.state({
        metric: [
            'cluster_name',
            'nodes',
            'master_node',
            'version'
        ]
    })
        .then(function (resp) {
            $scope.clusterState = resp;
            $scope.error = null;
        })
        .catch(function (err) {
            $scope.clusterState = null;
            $scope.error = err;
            if (err instanceof esFactory.errors.NoConnections) {
                $scope.error = new Error('Unable to connect to elasticsearch. ' +
                    'Make sure that it is running and listening at http://localhost:9200');
                $scope.error2='Unable to connect to elasticsearch. ' +
                    'Make sure that it is running and listening at http://localhost:9200';
            }
        })





});


