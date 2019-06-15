
const http = require('http')
const fs = require('fs')
const path = require('path')

const crawlPage = (url = 'http://nodeprogram.com') => {
    console.log('downloading ', url)

    const fetchPage = (urlf, callback) => {
        http.get(urlf, (res) => {
            let buff = ''
            res.on('data', (chunk) => {
                buff += chunk
            })
            res.on('end', () => {
                callback(null, buff)
            })
        }).on('error', (error) => {
            console.log('Got error, ', error.message)
            callback(error)
        })
    }

    fetchPage(url, (error, data) => {
        if (error) return console.log(error)
        fs.writeFileSync(path.join(__dirname, 'pages', url.substring(7, url.length - 4)), data)
        console.log('The page is downloaded and saved in the Pages folder')
    })
}

crawlPage(process.argv[2])