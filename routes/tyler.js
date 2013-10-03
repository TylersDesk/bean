/*
 * GET home page.
 */

exports.tyler = function(req, res){
	res.render('tyler', {
		title:'Tylers\' Page'
	});
}

console.log('accessing tyler.js');