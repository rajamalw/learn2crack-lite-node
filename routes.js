'use strict';

const fs     = require('fs')
const mkdirp = require('mkdirp');
const engine = require('./engine')
const config = require('./config')

module.exports = router => {
	// To handle all the requests
	router.get('*', (req,res) => {

		let url = req.originalUrl
		let path = 'html'+ url

		if (!path.includes('.html')) {

			path = path + '.html'
		}

		if (url == '/') {

			path = 'html/index.html'
		}

		// Send html if it is already available
		if (fs.existsSync(path)) {
    		
    		res.sendFile(__dirname + '/' + path)

		} else if(checkSearch(req)) { // Do not cache html for search queries

			engine.getHtml(url)

			.then(html => res.end(html))

		} else {

			engine.getHtml(url)

			.then(html => writeHtml(path, html))

			.then(() => res.sendFile(__dirname + '/' + path))

			.catch((err) => res.status(err.status).json({message:err.message}))
			
		}
	})

	// To delete the cached files
	router.delete('*', (req, res) => {

		let token = req.headers['x-access-key']

		if (token != undefined && token == config.key) {

			let url = req.originalUrl
			let path = 'html'+ url

			if (!path.includes('.html')) {

				path = path + '.html'
			}

			if (url == '/') {

				path = 'html/index.html'
			}


			fs.unlink(path, err => {

				if (!err) {

					res.json({message: 'File Cleared'})

				} else {

					res.status(500).json({message: 'Internal Error'})
				}
			})
		} else {

			res.status(400).json({message: 'Bad Request'})
		}


	})

	// Check whether the url has a search query
	function checkSearch(req) {

		let searchParam = req.query.s

		return searchParam != undefined
	}

	// Write html to file
	function writeHtml(path, html) {

		return new Promise((resolve, reject) => {

			let dirPath =  path.substring(0, path.lastIndexOf('/'))

			mkdirp(dirPath, (err) => {

				if (err) {

					reject({message: err, status: 500})

				} else {

					if (!path.includes('.html')) {

    					path = path + '.html'
    				}

					fs.writeFile(path, html, function(err) {

    					if (err) {
    						console.log(err)

    						reject({message: err, status: 500})

    					} else {

    						resolve()
    					}
        			
    				})
				}
			})
		})

	}
}