'use strict';

const request = require('request')
const cheerio = require('cheerio')
const config = require('./config')

exports.getHtml = url => 
	
	new Promise((resolve,reject) => {
		// Get HTML of the Webpage using Node Request module
		request(`${config.url}${url}`, (error, response, html) => {

			if (response.statusCode == 200) {

				const $ = cheerio.load(html)
				// Remove unneeded divisions for the lite website
				$('header').remove()

				$('footer').remove()

				$('aside').remove()

				$('.l-titlebar').remove()

				$('.essb_bottombar').remove()

				$('.adsbygoogle').remove()

				$('.for_related').remove()
				// Remove unneeded scripts for ads, analytics which are not needed
				$('script').each((index, item) => {

					let src = item.attribs.src

					if (src != undefined && src.includes('adsbygoogle.js')) {

						item.parent.children = {}
					}

					if (src != undefined && (src.includes('OneSignalSDK.js') || src.includes('shBrushCSharp.js') || src.includes('shBrushDelphi.js') || src.includes('shBrushErlang.js') 
						|| src.includes('shBrushJavaFX.js') || src.includes('shBrushLatex.js') || src.includes('shBrushObjC.js') || src.includes('shBrushPowerShell.js')
						|| src.includes('shBrushR.js')  || src.includes('shBrushScala.js') || src.includes('shBrushVb.js') || src.includes('shBrushRuby.js')
						|| src.includes('shBrushPerl.js') || src.includes('shBrushMatlabKey.js') || src.includes('shBrushClojure.js') || src.includes('shBrushColdFusion.js'))) {

							item.children = {}
							item.attribs = {}
							item.type = undefined
							item.name = undefined
					}

					if (item != undefined && item.children[0] != undefined && item.children[0].data != undefined && 
						(item.children[0].data.includes('analytics.js') || item.children[0].data.includes('OneSignal') ||
						item.children[0].data.includes('DeveloperMedia') || item.children[0].data.includes('pagefair') ||
						item.children[0].data.includes('essb'))) {

						item.attribs = {}
						item.children = {}
						item.type = undefined
						item.name = undefined
					}
				})
				// Remove meta information
				$('meta').each((index, item) => {

					item.attribs = {}
					item.children = {}
					item.type = undefined
					item.name = undefined

				})
				// Replace href with lite url
				$('a').each((index,item) => {

					let href = item.attribs.href

					if (href != undefined && href.includes('.html') && href.includes(config.url)) {

						href = href.replace(config.url, config.lite_url)
						item.attribs.href = href
					}

					if (href != undefined && href.includes('/category/') && href.includes(config.url)) {

						href = href.replace(config.url, config.lite_url)
						item.attribs.href = href
					}

					if (href != undefined && href.includes('/author/') && href.includes(config.url)) {

						href = href.replace(config.url, config.lite_url)
						item.attribs.href = href
					}

					if (href != undefined && href.includes('/tag/') && href.includes(config.url)) {

						href = href.replace(config.url, config.lite_url)
						item.attribs.href = href
					}
				})

				$.root()
				.contents()
				.filter(function() { return this.type === 'comment'; })
				.remove()

				let modified = $.html()
				resolve(modified)

			} else {

				reject({message:'Not Found !', status: 404})
			}

		})
		
	});