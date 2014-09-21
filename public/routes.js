module.exports = [
	{ route:'/', resolve: {templateUrl:'/templates/root.html'}},
	{ route:'/about', resolve: {templateUrl:'/templates/about.html'}},
	{ route:'/route', resolve: {templateUrl:'/templates/root.html', reloadOnSearch: false}}

];